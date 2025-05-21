import { Test, TestingModule } from '@nestjs/testing';
import { BancoController } from './banco.controller';
import { BancoService } from './banco.service';
import { CreateBancoDto } from './dto/create-banco.dto';

describe('BancoController', () => {
  let controller: BancoController;
  let service: BancoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BancoController],
      providers: [
        {
          provide: BancoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BancoController>(BancoController);
    service = module.get<BancoService>(BancoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call BancoService.create with the correct parameters', async () => {
      const createBancoDto: CreateBancoDto = { nome: 'Banco Teste', status: 1};
      const result = { id: 1, ...createBancoDto };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      const response = await controller.create(createBancoDto);

      expect(service.create).toHaveBeenCalledWith(createBancoDto);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of bancos', async () => {
      const result = [{ id: 1, nome: 'Banco Teste', status: 1}];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      const response = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single banco by ID', async () => {
      const result = { id: 1, nome: 'Banco Teste', status: 1};
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      const response = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(response).toEqual(result);
    });
  });
});
