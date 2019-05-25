import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { finalize } from 'rxjs/operators';
import { MoviedbService, Genre, Movie } from './../core/http/moviedb/moviedb.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  genres: Genre[] = [];
  upcomingMovies: Movie[] = [];
  nowPlaying: Movie[] = [];
  topRated: Movie[] = [];

  isLoadingGenres = false;
  isLoadingUpcoming = false;
  isLoadingNowPlayings = false;
  isLoadingTopRated = false;

  constructor(private movieService: MoviedbService) {}

  ngOnInit() {
    this.isLoadingGenres = true;
    this.isLoadingUpcoming = true;
    this.isLoadingNowPlayings = true;
    this.isLoadingTopRated = true;

    //GET GENRES
    this.movieService
      .getGenres()
      .pipe(
        finalize(() => {
          this.isLoadingGenres = false;
        })
      )
      .subscribe(genres => {
        this.genres = genres;
      });

    //GET UPCOMING
    this.movieService
      .getUpcoming()
      .pipe(
        finalize(() => {
          this.isLoadingUpcoming = false;
        })
      )
      .subscribe(upcomingMovies => {
        this.upcomingMovies = upcomingMovies.filter(x => new Date(x.release_date) > new Date());
      });

    //GET NOW PLAYING
    this.movieService
      .getNowPlaying()
      .pipe(
        finalize(() => {
          this.isLoadingNowPlayings = false;
        })
      )
      .subscribe(nowPlaying => {
        this.nowPlaying = nowPlaying;
      });

    //GET TOP RATED MOVIES
    this.movieService
      .getTopRated()
      .pipe(
        finalize(() => {
          this.isLoadingTopRated = false;
        })
      )
      .subscribe(topRated => {
        this.topRated = topRated;
      });
  }
}
