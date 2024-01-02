import { TestBed } from '@angular/core/testing';

import { EstudiantesGuard } from './estudiantes.guard';

describe('EstudiantesGuard', () => {
  let guard: EstudiantesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EstudiantesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
