import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
<<<<<<< HEAD
  MatTabsModule,
=======
  MatDatepickerModule,
>>>>>>> origin/pes-48
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
    MatTabsModule,
    MatDatepickerModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
<<<<<<< HEAD
    MatTabsModule,
=======
    MatDatepickerModule,
>>>>>>> origin/pes-48
  ],
})
export class MaterialModule { }
