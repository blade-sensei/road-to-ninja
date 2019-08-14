import { TestBed, inject } from '@angular/core/testing';

import { FilterProjectsService } from './filter-projects.service';

describe('FilterProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterProjectsService],
    });
  });

  it('should be created', inject(
    [FilterProjectsService],
    (service: FilterProjectsService) => {
      expect(service).toBeTruthy();
    },
  ));
});
