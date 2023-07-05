import { TestBed } from '@angular/core/testing';

import { ServiciosTestService } from './servicios-test.service';

describe('ServiciosTestService', () => {
  let service: ServiciosTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
