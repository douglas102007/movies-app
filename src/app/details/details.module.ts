import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared';
import { DetailsRoutingModule } from '@app/details/details-routing.module';
import { DetailsComponent } from '@app/details/details.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

@NgModule({
  imports: [CommonModule, TranslateModule, DetailsRoutingModule, Ng2CarouselamosModule, SharedModule],
  declarations: [DetailsComponent]
})
export class DetailsModule {}
