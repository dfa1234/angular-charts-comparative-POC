import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyChartjsComponent } from './lazy-chartjs.component';

describe('LazyChartjsComponent', () => {
  let component: LazyChartjsComponent;
  let fixture: ComponentFixture<LazyChartjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyChartjsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyChartjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
