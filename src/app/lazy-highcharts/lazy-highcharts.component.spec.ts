import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyHighChartComponent } from './lazy-highcharts.component';

describe('LazyHighChartComponent', () => {
  let component: LazyHighChartComponent;
  let fixture: ComponentFixture<LazyHighChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyHighChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyHighChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
