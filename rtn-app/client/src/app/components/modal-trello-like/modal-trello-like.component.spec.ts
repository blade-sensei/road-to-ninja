import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTrelloLikeComponent } from './modal-trello-like.component';

describe('ModalTrelloLikeComponent', () => {
  let component: ModalTrelloLikeComponent;
  let fixture: ComponentFixture<ModalTrelloLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTrelloLikeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTrelloLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
