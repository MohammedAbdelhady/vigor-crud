import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
