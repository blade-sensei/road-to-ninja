import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiresEditionContainerComponent } from './requires-edition-container.component';

describe('RequiresEditionContainerComponent', () => {
  let component: RequiresEditionContainerComponent;
  let fixture: ComponentFixture<RequiresEditionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiresEditionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiresEditionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
