import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/entities/user.entity'; // Asegúrate de que la entidad User esté definida e importada correctamente

@Schema({ timestamps: true })
export class Post extends Document {
    @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) 
  userId: User;


}

export const PostSchema = SchemaFactory.createForClass(Post);
