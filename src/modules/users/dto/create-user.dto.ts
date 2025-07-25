import { IsEmail, IsNotEmpty, IsOptional, IsString, IsIn } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsIn(['admin', 'agent', 'user'])
  role?: UserRole;
}
