import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dtos';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post() async create(@Body() createStudentDto: CreateStudentDto) {
    const created = await this.studentService.create(createStudentDto);
    return created;
  }

  @Get() async findMany() {
    const matches = await this.studentService.findMany();

    return matches;
  }

  @Get(':id') async findOne(@Param('id') id: string) {
    const match = await this.studentService.findOne(id);

    return match;
  }

  @Patch(':id') async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const updated = await this.studentService.update(id, updateStudentDto);

    return updated;
  }

  @Delete(':id') async archive(@Param('id') id: string) {
    return this.studentService.archive(id);
  }
}
