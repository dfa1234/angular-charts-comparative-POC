import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import type { ECharts, EChartsOption } from 'echarts';
import { asyncScheduler, Observable, Subject, Subscription } from 'rxjs';
import { switchMap, throttleTime } from 'rxjs/operators';
import { customTreeShakedChart } from './custom-echarts';

@Directive({
  selector: '[echarts]',
})
export class CustomNgxEchartsDirective
  implements OnChanges, OnDestroy, OnInit, AfterViewInit
{
  @Input() options: EChartsOption | null = null;
  @Input() loading: boolean = false;
  @Input() initOpts: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
    locale?: string;
  } = {};
  @Input() autoResize = true;

  @Output() chartInit = new EventEmitter<any>();
  @Output() chartClick = this.createLazyEvent('click');
  @Output() chartDataZoom = this.createLazyEvent('datazoom');

  public animationFrameID: number | null = null;
  private chart: ECharts | null = null;
  private echarts: any;
  private resizeOb: ResizeObserver | null = null;
  private resize$ = new Subject<void>();
  private resizeSub: Subscription | null = null;
  private initChartTimer?: number;

  constructor(private el: ElementRef, private ngZone: NgZone) {
    this.echarts = customTreeShakedChart; //TODO
  }

  ngOnChanges({ loading, options, initOpts }: SimpleChanges) {
    if (
      options?.currentValue &&
      options.currentValue !== options.previousValue
    ) {
      this.onOptionsChange(this.options);
    }

    if (loading && loading.currentValue !== loading.previousValue) {
      this.toggleLoading(this.loading);
    }

    if (initOpts && initOpts.currentValue !== initOpts.previousValue) {
      console.warn('################### REFRESH CHART #######################');
      this.refreshChart();
    }
  }

  ngOnInit() {
    if (!window.ResizeObserver) {
      throw new Error('please install a polyfill for ResizeObserver');
    }
    this.resizeSub = this.resize$
      .pipe(
        throttleTime(100, asyncScheduler, { leading: false, trailing: true })
      )
      .subscribe(() => this.resize());

    if (this.autoResize) {
      this.resizeOb = this.ngZone.runOutsideAngular(
        () =>
          new window.ResizeObserver(() => {
            this.animationFrameID = window.requestAnimationFrame(() =>
              this.resize$.next()
            );
          })
      );
      this.resizeOb.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    window.clearTimeout(this.initChartTimer);
    if (this.resizeSub) {
      this.resizeSub.unsubscribe();
    }
    if (this.animationFrameID) {
      window.cancelAnimationFrame(this.animationFrameID);
    }
    if (this.resizeOb) {
      this.resizeOb.unobserve(this.el.nativeElement);
    }
    this.dispose();
  }

  ngAfterViewInit() {
    this.initChartTimer = window.setTimeout(() => this.initChart());
  }

  private dispose() {
    if (this.chart) {
      if (!this.chart.isDisposed()) {
        this.chart.dispose();
      }
      this.chart = null;
    }
  }

  /**
   * resize chart
   */
  resize() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  private toggleLoading(loading: boolean) {
    if (this.chart) {
      loading ? this.chart.showLoading() : this.chart.hideLoading();
    }
  }

  private setOption(option: any, opts?: any) {
    if (this.chart) {
      try {
        this.chart.setOption(option, opts);
      } catch (e: any) {
        console.error(e);
      }
    }
  }

  /**
   * dispose old chart and create a new one.
   */
  async refreshChart() {
    this.dispose();
    await this.initChart();
  }

  private createChart() {
    const dom = this.el.nativeElement;

    if (window && window.getComputedStyle) {
      const prop = window
        .getComputedStyle(dom, null)
        .getPropertyValue('height');
      if (
        (!prop || prop === '0px') &&
        (!dom.style.height || dom.style.height === '0px')
      ) {
        dom.style.height = '400px';
      }
    }

    // here a bit tricky: we check if the echarts module is provided as function returning native import('...') then use the promise
    // otherwise create the function that imitates behaviour above with a provided as is module
    return this.ngZone.runOutsideAngular(() => {
      const load =
        typeof this.echarts === 'function'
          ? this.echarts
          : () => Promise.resolve(this.echarts);

      return load().then(({ init }: any) => init(dom, {}, this.initOpts));
    });
  }

  private async initChart() {
    await this.onOptionsChange(this.options);
  }

  private async onOptionsChange(opt: any) {
    if (!opt) {
      return;
    }

    if (this.chart) {
      this.setOption(this.options, true);
    } else {
      this.chart = await this.createChart();
      this.chartInit.emit(this.chart);
      this.setOption(this.options, true);
    }
  }

  // allows to lazily bind to only those events that are requested through the `@Output` by parent components
  // see https://stackoverflow.com/questions/51787972/optimal-reentering-the-ngzone-from-eventemitter-event for more info
  private createLazyEvent<T>(eventName: string): EventEmitter<T> {
    return this.chartInit.pipe(
      switchMap(
        (chart: any) =>
          new Observable((observer) => {
            chart.on(eventName, (data: T) =>
              this.ngZone.run(() => observer.next(data))
            );
            return () => {
              if (this.chart) {
                if (!this.chart.isDisposed()) {
                  chart.off(eventName);
                }
              }
            };
          })
      )
    ) as EventEmitter<T>;
  }
}
