import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDTO } from './CreateUserDTO';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

describe('UserController', () => {
    let controller: UserController;
    let userService: UserService;
    let response: Response;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        findAll: jest.fn(),
                        findByID: jest.fn(),
                        verifyEmailExists: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of users without passwords', async () => {
            const users = [{ id: 1, email: 'test@test.com', senha: 'password' }];
            jest.spyOn(userService, 'findAll').mockResolvedValue(users);

            await controller.findAll(response);

            expect(userService.findAll).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(response.json).toHaveBeenCalledWith([{ id: 1, email: 'test@test.com' }]);
        });
    });

    describe('findById', () => {
        it('should return a user without password if found', async () => {
            const user = { id: 1, email: 'test@test.com', senha: 'password' };
            jest.spyOn(userService, 'findByID').mockResolvedValue(user);

            await controller.findById('1', response);

            expect(userService.findByID).toHaveBeenCalledWith(1);
            expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(response.json).toHaveBeenCalledWith({ id: 1, email: 'test@test.com' });
        });

        it('should return 404 if user not found', async () => {
            jest.spyOn(userService, 'findByID').mockResolvedValue(null);

            await controller.findById('1', response);

            expect(userService.findByID).toHaveBeenCalledWith(1);
            expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
            expect(response.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const dto: CreateUserDTO = { email: 'test@test.com', senha: 'password' };
            jest.spyOn(userService, 'verifyEmailExists').mockResolvedValue(false);
            jest.spyOn(userService, 'create').mockResolvedValue({ id: 1, ...dto });

            await controller.create(dto, response);

            expect(userService.verifyEmailExists).toHaveBeenCalledWith(dto.email);
            expect(userService.create).toHaveBeenCalledWith(dto);
            expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(response.json).toHaveBeenCalledWith({ id: 1, email: 'test@test.com' });
        });

        it('should return 400 if email already exists', async () => {
            const dto: CreateUserDTO = { email: 'test@test.com', senha: 'password' };
            jest.spyOn(userService, 'verifyEmailExists').mockResolvedValue(true);

            await controller.create(dto, response);

            expect(userService.verifyEmailExists).toHaveBeenCalledWith(dto.email);
            expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(response.json).toHaveBeenCalledWith({ message: 'Email já existe' });
        });
    });
});
