import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';

import { PostUser } from '../entities/post.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostService {

    constructor(@Inject('MONGO') private db: Db,
    @InjectModel(PostUser.name) private userModel: Model<PostUser>,) {}


    getPosts() {
        return this.db.collection('posts').find().toArray();
    }

    getPost(id: string) {
        return this.db.collection('posts').findOne({ id });
    }

    createPost(data: PostUser) {
        return this.db.collection('posts').insertOne(data);
    }

    deletePost(_id: string) {
        const objectId = new Types.ObjectId(_id);
        return this.db.collection('posts').deleteOne({ _id: objectId });
    }
}
