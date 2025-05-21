import { PartialType } from '@nestjs/mapped-types';
import { CreateContaBancariaDto } from './create-conta-bancaria.dto';

export class UpdateContaBancariaDto extends PartialType(CreateContaBancariaDto) {}
