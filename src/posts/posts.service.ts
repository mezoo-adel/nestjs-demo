import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type CreatePostDto = Prisma.PostCreateInput;
type UpdatePostDto = Prisma.PostUpdateInput;

@Injectable()
export class PostsService {
  private readonly model: Prisma.PostDelegate;
  constructor(private readonly prisma: PrismaService) {
    this.model = this.prisma.post;
  }

  async create(createPostDto: CreatePostDto) {
    return this.model.create({
      data: createPostDto,
    });
  }

  async findAll() {
    return this.model.findMany({
      include: {
        author: true,
      },
    });
  }

  async findOne(id: number) {
    return this.model.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return this.model.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    return this.model.delete({
      where: { id },
    });
  }
}
