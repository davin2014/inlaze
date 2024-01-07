import { 
    IsString, 
    IsNotEmpty, 
    IsEmail, 
    Length, 
    IsInt, 
    IsOptional, 
    IsDate } from 'class-validator';
  import { PartialType, ApiProperty } from '@nestjs/swagger';
  
  export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "the post's title" })
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "the post's content" })
    readonly content: string;

    @IsInt()
    @ApiProperty({ description: "the post's likes" })
    readonly likes: number;

    @IsDate()
    @IsOptional()
    @ApiProperty({ description: "the post's creation date" })
    readonly createdAt?: Date;

    @IsDate()
    @IsOptional()
    @ApiProperty({ description: "the post's update date" })
    readonly updatedAt?: Date;

    @IsDate()
    @IsOptional()
    @ApiProperty({ description: "the post's deletion date" })
    readonly deletedAt?: Date;


    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ description: "the user's id" })
    readonly userId: number;
  }
  
  export class UpdatePostDto extends PartialType(CreatePostDto) {}