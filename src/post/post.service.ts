import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @Inject(forwardRef(() => AuthorsService))
    private authorsService: AuthorsService,
  ) {}
  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();
    console.log(posts);
    return posts;
  }

  async findProductById(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findProductsByAuthorId(authorId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: {
        id: authorId,
      },
    });
  }

  createPost(post: CreatePostInput): Promise<Post> {
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  getAuthor(userId: number): Promise<Author> {
    return this.authorsService.findOne(userId);
  }
}
