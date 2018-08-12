import { TestBed, inject } from '@angular/core/testing';

import { RequiresEditService } from './requires-edit.service';

describe('RequiresEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequiresEditService]
    });
  });

  it('should be created', inject([RequiresEditService], (service: RequiresEditService) => {
    expect(service).toBeTruthy();
  }));
});
