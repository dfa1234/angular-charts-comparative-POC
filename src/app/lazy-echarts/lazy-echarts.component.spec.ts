import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyEchartsComponent } from './lazy-echarts.component';

describe('LazyEchartsComponent', () => {
  let component: LazyEchartsComponent;
  let fixture: ComponentFixture<LazyEchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LazyEchartsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
