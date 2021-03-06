import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { FindOneParamsDto } from 'src/utils/dto/find-one-params.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParamsDto) {
    return this.postsService.getPostById(+id);
  }

  @Patch(':id')
  updatePost(
    @Param() { id }: FindOneParamsDto,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param() { id }: FindOneParamsDto) {
    return this.postsService.deletePost(+id);
  }
}
