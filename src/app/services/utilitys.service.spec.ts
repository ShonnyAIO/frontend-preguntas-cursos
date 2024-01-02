import { TestBed } from '@angular/core/testing';

import { UtilitysService } from './utilitys.service';

describe('UtilitysService', () => {
  let service: UtilitysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
