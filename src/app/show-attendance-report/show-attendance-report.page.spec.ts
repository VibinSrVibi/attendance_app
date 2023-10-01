import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowAttendanceReportPage } from './show-attendance-report.page';

describe('ShowAttendanceReportPage', () => {
  let component: ShowAttendanceReportPage;
  let fixture: ComponentFixture<ShowAttendanceReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowAttendanceReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
