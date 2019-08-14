import { TestBed, inject } from '@angular/core/testing';

import { ModalTrelloLikeService } from './modal-trello-like.service';

describe('ModalTrelloLikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalTrelloLikeService],
    });
  });

  it('should be created', inject(
    [ModalTrelloLikeService],
    (service: ModalTrelloLikeService) => {
      expect(service).toBeTruthy();
    },
  ));
});
