import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './dtos';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    const created = await this.prisma.student.create({
      data: { ...createStudentDto },
    });

    return created;
  }

  async findMany() {
    const students = await this.prisma.student.findMany({
      where: {
        archivedAt: null,
      },
    });

    return students;
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findFirst({
      where: { id, archivedAt: null },
    });

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    await this.checkStudentExistence(id);

    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: {
        ...updateStudentDto,
      },
    });

    return updatedStudent;
  }

  async archive(id: string) {
    await this.checkStudentExistence(id);

    return this.prisma.student.update({
      where: { id },
      data: {
        archivedAt: new Date(),
      },
    });
  }

  async checkStudentExistence(id: string) {
    const student = await this.findOne(id);

    if (!student) {
      throw new BadRequestException('No student found');
    }
  }
}
