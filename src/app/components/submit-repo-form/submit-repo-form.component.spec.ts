import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRepoFormComponent } from './submit-repo-form.component';

describe('SubmitRepoFormComponent', () => {
  let component: SubmitRepoFormComponent;
  let fixture: ComponentFixture<SubmitRepoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitRepoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitRepoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
