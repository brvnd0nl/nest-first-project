import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { Repository } from 'typeorm';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @Inject(forwardRef(() => PostService))
    private postService: PostService,
  ) {}
  create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor = this.authorRepository.create(createAuthorInput);
    return this.authorRepository.save(newAuthor);
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  findOne(id: number): Promise<Author> {
    return this.authorRepository.findOne({
      where: {
        id,
      },
    });
  }

  getPosts(authorId: number): Promise<Post[]> {
    return this.postService.findProductsByAuthorId(authorId);
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
