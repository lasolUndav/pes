import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-confirm-update-provider',
  templateUrl: './confirm-update-provider.component.html',
  styleUrls: ['./confirm-update-provider.component.css'],
})
export class ConfirmUpdateProviderComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmUpdateProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit() {}
  onCloseConfirm() {
    this.dialogRef.close('SI')
  }
  onCloseCancel() {
    this.dialogRef.close('NO')
  }
}
