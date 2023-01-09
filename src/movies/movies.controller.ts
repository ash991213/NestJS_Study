import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto): boolean {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  update(
    @Param('id') movieId: number,
    @Body() updateData: CreateMovieDto,
  ): boolean {
    return this.moviesService.updateMovie(movieId, updateData);
  }
}
