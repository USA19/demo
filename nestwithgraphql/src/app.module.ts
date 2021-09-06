import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { RoleModule } from './module/role/role.module';
import { UserModule } from './module/user/user.module';
import { PostModule } from './module/post/post.module';
import { PostMediaModule } from './module/post-media/post-media.module';
import { CommentModule } from './module/comment/comment.module';
import { NodeMailerModule } from './module/mailer/mailer.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    RoleModule,
    UserModule,
    PostModule,
    PostMediaModule,
    CommentModule,
    NodeMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
