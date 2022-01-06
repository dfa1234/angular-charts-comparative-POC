import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyChartComponent } from './lazy-chart.component';

describe('LazyChartComponent', () => {
  let component: LazyChartComponent;
  let fixture: ComponentFixture<LazyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
