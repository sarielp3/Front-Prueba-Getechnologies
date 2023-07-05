import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ServiciosTestService } from '../servicios-test.service';
import { factura } from '../models/factura';
import { DialogExistComponent } from '../dialog-exist/dialog-exist.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent {
  facturas : factura = {
    id:0,
    fecha: new Date(),
    monto:0,
    idPersona:''
  }
  public altaForm: UntypedFormGroup;
  constructor(private servicioTest:ServiciosTestService, private _router:Router,private dialog: MatDialog){
    this.altaForm = new UntypedFormGroup({
      ide: new UntypedFormControl('',[Validators.required,Validators.minLength(1)] ),
      monto: new UntypedFormControl('',[Validators.required,Validators.minLength(1)] ),
      fecha: new UntypedFormControl('',[Validators.required] )
    });
  }

  onSubmit(){
    this.facturas.fecha = this.altaForm.controls['fecha'].value;
    this.facturas.monto = this.altaForm.controls['monto'].value;
    this.facturas.idPersona = this.altaForm.controls['ide'].value;
    console.log(this.facturas);

    this.servicioTest.getPersonaByIdentificacion(this.facturas.idPersona).subscribe(
      (data) =>{
        if(data.length > 0){
          this.servicioTest.storeFactura(this.facturas).subscribe(
            (data) =>{this._router.navigate(['/ver-facturas/' + this.facturas.idPersona]);}
            ,err =>{}
          )
        }else{
          const dialogoRef = this.dialog.open(DialogExistComponent, {
            disableClose: true,
            data: false,
          });
          dialogoRef.afterClosed().subscribe();

        }
      }

    );//fin subscribe find personas

    
  }
}
