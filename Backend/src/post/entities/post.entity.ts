import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../../users/entities/user.entity'; // Asegúrate de que la entidad User esté definida e importada correctamente
import { string } from 'joi';

@Schema({ timestamps: true })
export class PostUser extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: 0 })
    likes: number;


    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: string;


}

export const PostSchema = SchemaFactory.createForClass(PostUser);
function ManyToOne(arg0: () => typeof User, arg1: (user: any) => any): (target: PostUser, propertyKey: "userId") => void {
  throw new Error('Function not implemented.');
}

