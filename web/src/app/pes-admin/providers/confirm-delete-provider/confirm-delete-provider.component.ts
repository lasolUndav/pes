import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-confirm-delete-provider',
  templateUrl: './confirm-delete-provider.component.html',
  styleUrls: ['./confirm-delete-provider.component.css'],
})
export class ConfirmDeleteProviderComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteProviderComponent>,
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
