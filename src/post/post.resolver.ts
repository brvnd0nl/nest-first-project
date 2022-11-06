import { Post } from './post.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query((returns) => [Post])
  posts() {
    return this.postService.findAll();
  }

  @Query((returns) => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findProductById(id);
  }

  @ResolveField((returns) => Author)
  author(@Parent() post: Post): Promise<Author> {
    return this.postService.getAuthor(post.authorId);
  }

  @Mutation((returns) => Post)
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postService.createPost(postInput);
  }
}
