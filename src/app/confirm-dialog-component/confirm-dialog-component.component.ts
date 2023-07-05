import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-component',
  templateUrl: './confirm-dialog-component.component.html',
  styleUrls: ['./confirm-dialog-component.component.css']
})
export class ConfirmDialogComponentComponent implements OnInit {
  eliminarOHabilitar:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private dialogRef: MatDialogRef<ConfirmDialogComponentComponent>
  ){}

  ngOnInit(): void {
      this.eliminarOHabilitar = this.data;
  }

  close(respuesta: boolean){
    this.dialogRef.close(respuesta);
  }

}
