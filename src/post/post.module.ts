import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthorsModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
