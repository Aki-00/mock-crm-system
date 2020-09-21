import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignToAdvisorComponent } from './assign-to-advisor.component';

describe('AssignToAdvisorComponent', () => {
  let component: AssignToAdvisorComponent;
  let fixture: ComponentFixture<AssignToAdvisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignToAdvisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignToAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
