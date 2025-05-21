import { Test, TestingModule } from '@nestjs/testing';
import { ContaBancariaService } from './conta-bancaria.service';

describe('ContaBancariaService', () => {
  let service: ContaBancariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaBancariaService],
    }).compile();

    service = module.get<ContaBancariaService>(ContaBancariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
