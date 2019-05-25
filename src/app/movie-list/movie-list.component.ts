import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MoviedbService, MoviePages } from './../core/http/moviedb/moviedb.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  isLoading = false;
  page: number = 1;
  moviePages: MoviePages;
  constructor(private movieService: MoviedbService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getMoviesByGenre();
  }

  getMoviesByGenre() {
    this.isLoading = true;
    //GET NOW PLAYING
    this.route.paramMap.subscribe((params: any) => {
      this.movieService
        .getByGenre('popularity.desc', this.page, params.params.id)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(moviePages => {
          console.log(moviePages);
          moviePages.total_pages = moviePages.total_pages > 1000 ? 1000 : moviePages.total_pages;
          this.moviePages = moviePages;
        });
    });
  }

  changePage(page: number) {
    this.page = page;
    this.getMoviesByGenre();
    console.log(this.page);
  }
}
