import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.createMovie({
      title: 'Test Movie',
      genres: ['test'],
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return an object', () => {
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('유효하지 않은 영화 ID입니다.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      const beforeDelete = service.getAll().length;

      service.deleteOne(1);

      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('유효하지 않은 영화 ID입니다.');
      }
    });
  });

  describe('createMovie', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;

      service.createMovie({
        title: 'Test Movie',
        genres: ['test'],
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      const beforeUpdate = service.getOne(1);

      service.updateMovie(1, {
        title: 'Updated Movie',
        genres: ['updated'],
      });

      const movie = service.getOne(1);

      expect(beforeUpdate).not.toEqual(movie);
    });

    it('should return a 404', () => {
      try {
        service.updateMovie(999, { title: 'Hello', genres: ['Hello'] });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('유효하지 않은 영화 ID입니다.');
      }
    });
  });
});
