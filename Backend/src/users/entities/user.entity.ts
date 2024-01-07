import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PostUser } from '../../post/entities/post.entity'; // Asegúrate de que la entidad Post esté definida e importada correctamente

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Post' }] }) 
  posts: PostUser[];

  
}

export const UserSchema = SchemaFactory.createForClass(User);
