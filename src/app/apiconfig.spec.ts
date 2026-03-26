import { TestBed } from '@angular/core/testing';

import { Apiconfig } from './apiconfig';

describe('Apiconfig', () => {
  let service: Apiconfig;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apiconfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
