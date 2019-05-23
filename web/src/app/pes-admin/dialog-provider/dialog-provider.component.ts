import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-provider',
  templateUrl: './dialog-provider.component.html',
  styleUrls: ['./dialog-provider.component.css']
})
export class DialogProviderComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DialogProviderComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }
  
  ngOnInit() {
  }
  onCloseConfirm() {
    this.dialogRef.close('SI');
  }
  onCloseCancel() {
    this.dialogRef.close('NO');
  }
}
