import { 
  IsString, 
  IsNotEmpty, 
  IsEmail, 
  Length, 
  IsInt, 
  IsOptional, 
  IsDate } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "the user's full name" })
  readonly fullName: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: "the user's age" })
  readonly age: number;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: "the user's email" })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "the user's password", deprecated: true })
  readonly password: string;


  @IsOptional()
  @ApiProperty({ description: "the user's posts", type: [String] })
  readonly posts?: string[];

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: "the user's creation date" })
  readonly createdAt?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: "the user's update date" })
  readonly updatedAt?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ description: "the user's deletion date" })
  readonly deletedAt?: Date;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}