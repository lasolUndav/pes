import { MatCardModule, MatFormFieldModule, MatToolbarModule } from '@angular/material'

import { CommonModule } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [MatToolbarModule, MatCardModule, MatInputModule, MatFormFieldModule],
})
export class MaterialModule {}
