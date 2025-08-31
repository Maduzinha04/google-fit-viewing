import { TestBed } from '@angular/core/testing';

import { CsvReader } from './csv-reader';

describe('CsvReader', () => {
  let service: CsvReader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvReader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
