import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredProjectsComponent } from './required-projects.component';

describe('RequiredProjectsComponent', () => {
  let component: RequiredProjectsComponent;
  let fixture: ComponentFixture<RequiredProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredProjectsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
