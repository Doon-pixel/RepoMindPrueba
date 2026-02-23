import { TestBed } from '@angular/core/testing';

import { MatematicasService } from './matematicas.service';

describe('MatematicasService', () => {
  let service: MatematicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatematicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
