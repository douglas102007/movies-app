import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MovieListComponent } from './movie-list.component';
import { MovieListLoginRoutingModule } from './movie-list-routing.module';

@NgModule({
  imports: [TranslateModule, NgbModule, CoreModule, SharedModule, CommonModule, MovieListLoginRoutingModule],
  declarations: [MovieListComponent]
})
export class MovieListModule {}
