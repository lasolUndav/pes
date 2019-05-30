import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.css'],
})
export class ProviderDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProviderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {}

  closeData() {
    this.dialogRef.close('Close')
  }
}
