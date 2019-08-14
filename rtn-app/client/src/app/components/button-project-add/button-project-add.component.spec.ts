import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonProjectAddComponent } from './button-project-add.component';

describe('ButtonProjectAddComponent', () => {
  let component: ButtonProjectAddComponent;
  let fixture: ComponentFixture<ButtonProjectAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonProjectAddComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonProjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
