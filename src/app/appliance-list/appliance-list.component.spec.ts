import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceListComponent } from './appliance-list.component';

describe('ApplianceListComponent', () => {
  let component: ApplianceListComponent;
  let fixture: ComponentFixture<ApplianceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplianceListComponent]
    });
    fixture = TestBed.createComponent(ApplianceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
