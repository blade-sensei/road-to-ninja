import { TestBed, inject } from '@angular/core/testing';

import { UserProjectsService } from './user-projects.service';

describe('UserProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProjectsService],
    });
  });

  it('should be created', inject(
    [UserProjectsService],
    (service: UserProjectsService) => {
      expect(service).toBeTruthy();
    },
  ));
});
