import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { User } from 'src/model/user.model';
import { GqlAuthGuard } from 'src/core/guards/gql-auth-guard';
import { CurrentUser } from 'src/core/customDecorators/getCurrentUserDecorator';
import { CreatePostDto, UpdatePostDto } from './dto/createPostDto';
import { PostService } from './post.service';
import { Post as PostModel } from 'src/model/post.model';

import { getPostsResponse } from './interface/post.interface';
import { GetPostsResponseGql, GetPostResponseGql } from './output/output';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // getPost file
  @Query(() => GetPostsResponseGql)
  @UseGuards(GqlAuthGuard)
  async getPosts(
    @Args('limit') limit: number,
    @Args('page') page: number,
    @CurrentUser() user: User,
  ): Promise<getPostsResponse> {
    console.log('=====================>>>>', user);

    return await this.postService.getPosts(page ? page : 1, limit ? limit : 10);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => GetPostResponseGql)
  async createPost(
    @Args('body') body: CreatePostDto,
    @CurrentUser() user: User,
  ): Promise<PostModel> {
    return await this.postService.createPost(body, user);
  }

  @UseGuards(GqlAuthGuard)
  async updatePost(
    @Args('body') body: UpdatePostDto,
    @CurrentUser() user: User,
  ): Promise<PostModel> {
    return await this.postService.updatePost(
      user.id,
      body.postId,
      body.description,
    );
  }
  @UseGuards(GqlAuthGuard)
  async deletePost(
    @Args('postId') postId: string,
    @CurrentUser() user: User,
  ): Promise<string> {
    return await this.postService.deletePost(user.id, postId);
  }
}
