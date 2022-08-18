import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @Length(2, 100)
  @IsOptional()
  firstName?: string;

  @IsString()
  @Length(2, 100)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
