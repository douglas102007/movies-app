import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { I18nService } from '@app/core';

export const routes = {
  GetGenres: (lang: string) =>
    `${environment.moviesApi}/genre/movie/list?api_key=${environment.moviesApiKey}&language=${lang}`,
  GetUpcoming: (lang: string) =>
    `${environment.moviesApi}/movie/upcoming?api_key=${environment.moviesApiKey}&language=${lang}`,
  GetNowPlaying: (lang: string) =>
    `${environment.moviesApi}/movie/now_playing?api_key=${environment.moviesApiKey}&language=${lang}`,
  GetMovie: (id: number, lang: string) =>
    `${environment.moviesApi}/movie/${id}?api_key=${environment.moviesApiKey}&language=${lang}`,
  GetMovieCredits: (id: number, lang: string) =>
    `${environment.moviesApi}/movie/${id}/credits?api_key=${environment.moviesApiKey}&language=${lang}`,
  GetTopRated: (lang: string) =>
    `${environment.moviesApi}/movie/top_rated?api_key=${environment.moviesApiKey}&language=${lang}&page=1`,
  GetByGenre: (sortBy: string, page: number, idGenre: number, lang: string) =>
    `${environment.moviesApi}/discover/movie?api_key=${
      environment.moviesApiKey
    }&language=${lang}&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_genres=${idGenre}`
};

export interface Movie {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  genres: [];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}

export interface Genre {
  name: string;
  id: number;
}

export interface Cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
}

export interface Crew {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
}

export interface MoviePages {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

@Injectable()
export class MoviedbService {
  constructor(private httpClient: HttpClient, private i18nService: I18nService) {}
  getGenres(): Observable<Genre[]> {
    return this.httpClient.get(routes.GetGenres(this.i18nService.language)).pipe(
      map((body: any) => body.genres),
      catchError(() => of('Error, could not load :-('))
    );
  }

  getUpcoming(): Observable<Movie[]> {
    return this.httpClient.get(routes.GetUpcoming(this.i18nService.language)).pipe(
      map((body: any) => body.results),
      catchError(() => of('Error, could not load :-('))
    );
  }

  getNowPlaying(): Observable<Movie[]> {
    return this.httpClient.get(routes.GetNowPlaying(this.i18nService.language)).pipe(
      map((body: any) => body.results),
      catchError(() => of('Error, could not load :-('))
    );
  }

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get(routes.GetMovie(id, this.i18nService.language)).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load :-('))
    );
  }

  getMovieCredits(id: number): Observable<Credits> {
    return this.httpClient.get(routes.GetMovieCredits(id, this.i18nService.language)).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load :-('))
    );
  }

  getTopRated(): Observable<Movie[]> {
    return this.httpClient.get(routes.GetTopRated(this.i18nService.language)).pipe(
      map((body: any) => body.results),
      catchError(() => of('Error, could not load :-('))
    );
  }

  getByGenre(sortBy: string, page: number, idGenre: number): Observable<MoviePages> {
    return this.httpClient.get(routes.GetByGenre(sortBy, page, idGenre, this.i18nService.language)).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load :-('))
    );
  }
}
