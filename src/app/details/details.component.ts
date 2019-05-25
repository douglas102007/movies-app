import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviedbService, Credits, Movie } from './../core/http/moviedb/moviedb.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  movie: Movie;
  credits: Credits;
  isLoadingMovie = false;
  isLoadingCredits = false;

  constructor(private movieService: MoviedbService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.isLoadingMovie = true;
    this.isLoadingCredits = true;

    this.route.paramMap.subscribe((params: any) => {
      this.movieService
        .getMovie(params.params.id)
        .pipe(
          finalize(() => {
            this.isLoadingMovie = false;
          })
        )
        .subscribe(movie => {
          this.movie = movie;
        });

      this.movieService
        .getMovieCredits(params.params.id)
        .pipe(
          finalize(() => {
            this.isLoadingCredits = false;
          })
        )
        .subscribe(credits => {
          this.credits = credits;
        });
    });
  }
}
