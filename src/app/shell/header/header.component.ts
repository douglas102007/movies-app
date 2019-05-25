import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviedbService, Genre } from './../../core/http/moviedb/moviedb.service';
import { finalize } from 'rxjs/operators';
import { AuthenticationService, CredentialsService, I18nService } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  isLoadingGenres = false;
  genres: Genre[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService,
    private movieService: MoviedbService
  ) {}

  ngOnInit() {
    this.isLoadingGenres = true;
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
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    if (language !== this.i18nService.language) {
      this.i18nService.language = language;
      window.location.reload();
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}
