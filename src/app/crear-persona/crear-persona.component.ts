import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {persona} from 'src/app/models/persona';
import {ServiciosTestService} from 'src/app/servicios-test.service';
import { DialogExistComponent } from '../dialog-exist/dialog-exist.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent {
  personas : persona = {
    idPersona:0,
    nombre:'',
    apellidoPaterno:'',
    apellidoMaterno:'',
    identificacion:''
  };

  public altaForm: UntypedFormGroup;
  constructor(private servicioTest:ServiciosTestService, private _router:Router,private dialog: MatDialog){
    this.altaForm = new UntypedFormGroup({
      nombre: new UntypedFormControl('',[Validators.required,Validators.minLength(1)] ),
      apepat: new UntypedFormControl('',[Validators.required,Validators.minLength(1)] ),
      apemat: new UntypedFormControl(''),
      identificacion: new UntypedFormControl('',[Validators.required,Validators.minLength(1)] )
    });
  }

  public onSubmit(){
    if (this.altaForm.valid) {
      this.storePersona();
    } else {
      console.log("no valido")
    }
  }

  public storePersona(){
    this.personas.nombre = this.altaForm.controls["nombre"].value;
    this.personas.apellidoPaterno = this.altaForm.controls["apepat"].value;
    this.personas.apellidoMaterno = this.altaForm.controls["apemat"].value;
    this.personas.identificacion = this.altaForm.controls["identificacion"].value;

this.servicioTest.getPersonaByIdentificacion(this.personas.identificacion).subscribe(
  data => {
    if(data.length > 0){
      const dialogoRef = this.dialog.open(DialogExistComponent, {
        disableClose: true,
        data: true,
      });
      dialogoRef.afterClosed().subscribe();
    }else{
      this.servicioTest.storePersona(this.personas).subscribe(
        (data) =>{
          this._router.navigate(['/lista-personas']);
        },err=>{
  
        }
      );
    }
  }, err => {
  }
  );

  }

}
