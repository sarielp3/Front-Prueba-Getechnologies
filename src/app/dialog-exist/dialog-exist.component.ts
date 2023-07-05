import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-exist',
  templateUrl: './dialog-exist.component.html',
  styleUrls: ['./dialog-exist.component.css']
})
export class DialogExistComponent implements OnInit{
  eliminarOHabilitar:boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private dialogRef: MatDialogRef<DialogExistComponent>
  ){}

  ngOnInit(): void {
      this.eliminarOHabilitar = this.data;
  }

  close(respuesta: boolean){
    this.dialogRef.close(respuesta);
  }
}
