import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PapersPublicationViewerComponent } from './papers-publication-viewer.component';

describe('PapersPublicationViewerComponent', () => {
  let component: PapersPublicationViewerComponent;
  let fixture: ComponentFixture<PapersPublicationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PapersPublicationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PapersPublicationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
