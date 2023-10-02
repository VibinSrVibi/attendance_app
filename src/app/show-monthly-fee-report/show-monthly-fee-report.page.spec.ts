import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowMonthlyFeeReportPage } from './show-monthly-fee-report.page';

describe('ShowMonthlyFeeReportPage', () => {
  let component: ShowMonthlyFeeReportPage;
  let fixture: ComponentFixture<ShowMonthlyFeeReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowMonthlyFeeReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
