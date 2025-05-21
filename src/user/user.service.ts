import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './CreateUserDTO';
import { Usuario } from './Usuario';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
      ) {}
    
    async create(createUserDto: CreateUserDTO){
        const hashedPassword = await this.hashPassword(createUserDto.senha)
        const newUser = {... createUserDto,senha: hashedPassword, status: 1}

        return await this.save(newUser)
    }

    async save(user: Partial<Usuario>){
        const newUser = this.usuarioRepository.create({...user});

        return await this.usuarioRepository.save(newUser);
    }

    async findByID(id: number){
        return await this.usuarioRepository.findOne({where: {id: id}});	
    }

    async findAll(){
        return await this.usuarioRepository.find();
    }

    async deleteById(id: number){
        return await this.usuarioRepository.delete(id);
    }

    async verifyEmailExists(email: string){
        return await this.usuarioRepository.exists({where: {email: email}});
    }

    async findByEmail(email: string){
        return await this.usuarioRepository.findOne({where: {email: email}});
    }  

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
      }

}
