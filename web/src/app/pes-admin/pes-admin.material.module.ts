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
  MatDialogModule,
  
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
    MatDialogModule,
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
    MatDialogModule,
  ],
})
export class PesAdminMaterialModule {}
