import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule,
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
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
  ],
})
export class MaterialModule {}
