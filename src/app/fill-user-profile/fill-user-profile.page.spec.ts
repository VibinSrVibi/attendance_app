import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FillUserProfilePage } from './fill-user-profile.page';

describe('FillUserProfilePage', () => {
  let component: FillUserProfilePage;
  let fixture: ComponentFixture<FillUserProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FillUserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
