import { Test, TestingModule } from '@nestjs/testing';
import { LancamentoController } from './lancamento.controller';
import { LancamentoService } from './lancamento.service';

describe('LancamentoController', () => {
  let controller: LancamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LancamentoController],
      providers: [LancamentoService],
    }).compile();

    controller = module.get<LancamentoController>(LancamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
