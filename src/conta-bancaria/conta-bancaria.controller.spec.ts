import { Test, TestingModule } from '@nestjs/testing';
import { ContaBancariaController } from './conta-bancaria.controller';
import { ContaBancariaService } from './conta-bancaria.service';

describe('ContaBancariaController', () => {
  let controller: ContaBancariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaBancariaController],
      providers: [ContaBancariaService],
    }).compile();

    controller = module.get<ContaBancariaController>(ContaBancariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
