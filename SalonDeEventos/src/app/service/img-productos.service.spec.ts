import { TestBed } from '@angular/core/testing';

import { ImgProductosService } from './img-productos.service';

describe('ImgProductosService', () => {
  let service: ImgProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
