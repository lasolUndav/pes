import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material'

import { FlexLayoutModule } from '@angular/flex-layout'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    MatChipsModule,
    MatTooltipModule,
  ],
})
export class PesAdminMaterialModule {}
