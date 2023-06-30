import { TestBed } from '@angular/core/testing';

import { ImgSalonesService } from './img-salones.service';

describe('ImgSalonesService', () => {
  let service: ImgSalonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgSalonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
