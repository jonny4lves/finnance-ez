import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './CreateUserDTO';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ){}

    @Get()
    async findAll(@Res() res: Response) {
        const users = await this.userService.findAll();
        const usersWithoutPassword = users.map(({ senha, ...user }) => user);
        return res.status(HttpStatus.OK).json(usersWithoutPassword);
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Res() res: Response) {
        const user = await this.userService.findByID(Number(id));

        if (!user)
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Usuário não encontrado' });

        const { senha, ...userWithoutPassword } = user;
        return res.status(HttpStatus.OK).json(userWithoutPassword);
    }

    @Post()
    async create(@Body() dto: CreateUserDTO, @Res() res: Response){
        if(await this.userService.verifyEmailExists(dto.email))
            return res.status(HttpStatus.CONFLICT).json({ message: 'Email já cadastrado' });

        await this.userService.create(dto);

        return res.status(HttpStatus.CREATED).json();
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response){
        await this.userService.deleteById(Number(id));

        return res.status(HttpStatus.OK).json();
    }

}
