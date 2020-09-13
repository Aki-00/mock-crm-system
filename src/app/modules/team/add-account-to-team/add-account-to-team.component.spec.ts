import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountToTeamComponent } from './add-account-to-team.component';

describe('AddAccountToTeamComponent', () => {
  let component: AddAccountToTeamComponent;
  let fixture: ComponentFixture<AddAccountToTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountToTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
