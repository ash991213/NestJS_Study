import { IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  // each: true 모든 요소를 하나씩 검사
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
