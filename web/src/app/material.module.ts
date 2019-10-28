import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatDatepickerModule,
} from '@angular/material'

import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
})
export class MaterialModule {}
