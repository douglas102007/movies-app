import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { MoviedbService, Genre, Movie } from './moviedb.service';
import { of } from 'rxjs';
import { I18nService } from '@app/core';

//I18n MOCK
class TranslateServiceStub {
  public get(key: any): any {
    of(key);
  }
}

describe('MoviedbService', () => {
  let movieService: MoviedbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviedbService, { provide: I18nService, useClass: TranslateServiceStub }]
    });

    movieService = TestBed.get(MoviedbService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve Genres from the Api via GET', () => {
    const dummyGenres = {
      genres: [{ id: 28, name: 'Ação' }, { id: 12, name: 'Aventura' }]
    };
    movieService.getGenres().subscribe(genres => {
      expect(genres).toEqual(dummyGenres.genres);
    });

    const request = httpMock.expectOne({ method: 'GET' });
    request.flush(dummyGenres);
  });

  it('should retrieve NowPlaying from the Api via GET', () => {
    let movies: Movie[] = [
      {
        vote_count: 123,
        id: 123,
        video: false,
        vote_average: 456,
        title: 'titulo teste',
        popularity: 78946,
        poster_path: 'teste',
        original_language: 'teste',
        original_title: 'teste',
        genre_ids: [],
        genres: [],
        backdrop_path: 'teste',
        adult: false,
        overview: 'teste',
        release_date: 'teste'
      },
      {
        vote_count: 9923,
        id: 123,
        video: false,
        vote_average: 456,
        title: 'titulo teste',
        popularity: 78946,
        poster_path: 'teste',
        original_language: 'teste',
        original_title: 'teste',
        genre_ids: [],
        genres: [],
        backdrop_path: 'teste',
        adult: false,
        overview: 'teste',
        release_date: 'teste'
      }
    ];
    const dummyMovies = {
      results: [...movies]
    };

    movieService.getNowPlaying().subscribe(movies => {
      expect(movies).toEqual(dummyMovies.results);
    });

    const request = httpMock.expectOne({ method: 'GET' });
    request.flush(dummyMovies);
  });
});
