import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) throw new NotFoundException('유효하지 않은 영화 ID입니다.');
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((v) => v.id !== id);
  }

  createMovie(movieData: CreateMovieDto): boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    return true;
  }

  updateMovie(id: number, updateData: CreateMovieDto): boolean {
    const movie = this.getOne(id);
    this.deleteOne(id);

    this.movies.push({
      ...movie,
      ...updateData,
    });

    return true;
  }
}
