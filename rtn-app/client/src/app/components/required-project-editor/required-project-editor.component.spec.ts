import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredProjectsEditorComponent } from './required-project-editor.component';

describe('RequiredProjectsEditorComponent', () => {
  let component: RequiredProjectsEditorComponent;
  let fixture: ComponentFixture<RequiredProjectsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredProjectsEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredProjectsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
