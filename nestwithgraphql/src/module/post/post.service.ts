import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/model/post.model';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPostDto';

import { deleteFile } from '../../utils/imageDelete';
import { GetPostsResponse } from './interface/post.interface';
// import { UserService } from '../user/user.service';
import { User } from 'src/model/user.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly PostModel: Repository<Post>,
  ) {}

  async getPosts(page = 1, limit = 10): Promise<GetPostsResponse> {
    try {
      const skip = (page - 1) * limit;

      const postQuery = this.PostModel.createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .leftJoinAndSelect('post.postMedia', 'media')
        .leftJoinAndSelect(
          'post.comments',
          'comments',
          'comments.parentId IS NULL',
        )
        .leftJoinAndSelect('comments.children', 'children')
        .leftJoinAndSelect('comments.user', 'commentedBy')
        .leftJoinAndSelect('children.user', 'repliedBy')
        .leftJoinAndSelect('children.children', 'subchild')
        .leftJoinAndSelect('subchild.user', 'subchildUser')
        .take(limit)
        .orderBy('post.id', 'DESC')
        .skip(skip ? skip : 0);

      const result = await postQuery.getMany();

      const count = await this.PostModel.count();

      return { count, posts: result };
    } catch (e) {
      console.log(e);
    }
  }

  async getPostById(id: string): Promise<Post> {
    return await this.PostModel.findOne(
      { id: id },
      { relations: ['user', 'postMedia', 'comments'] },
    );
  }

  async createPost(body: CreatePostDto, user: User): Promise<Post> {
    const post = { ...body, user: user };

    const newPost = this.PostModel.create(post);
    await this.PostModel.insert(newPost);
    return await this.getPostById(newPost.id);
  }

  async updatePost(
    loggedInUserId: string,
    postId: string,
    description: string,
  ): Promise<Post> {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new BadRequestException('no post with this id found');
    }
    if (post.user.id !== loggedInUserId) {
      throw new BadRequestException('only original creators can modify post');
    }
    await this.PostModel.update(
      { id: postId },
      {
        description: description,
      },
    );

    return await this.getPostById(postId);
  }

  async deletePost(loggedInUserId: string, postId: string): Promise<string> {
    const post = await this.getPostById(postId);
    if (!post) {
      throw new BadRequestException('no post with this id found');
    }
    if (post.user.id !== loggedInUserId) {
      throw new BadRequestException('creators can delete the post only');
    }
    await this.PostModel.delete({ id: postId });
    if (post.postMedia.length !== 0) {
      for (const media of post.postMedia) {
        deleteFile(media.mediaUrl);
      }
    }
    return 'post deleted successfully';
  }
}
