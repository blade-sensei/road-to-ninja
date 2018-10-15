import { TestBed, inject } from '@angular/core/testing';

import { RequiredProjectsEditorService } from './required-projects-editor.service';

describe('RequiredProjectsEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequiredProjectsEditorService],
    });
  });

  it('should be created', inject(
    [RequiredProjectsEditorService],
    (service: RequiredProjectsEditorService) => {
      expect(service).toBeTruthy();
    },
  ));
});
