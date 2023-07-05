import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {persona} from 'src/app/models/persona';
import {ServiciosTestService} from 'src/app/servicios-test.service'
import {ConfirmDialogComponentComponent} from 'src/app/confirm-dialog-component/confirm-dialog-component.component'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { factura } from '../models/factura';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-personas',
  templateUrl: './listar-personas.component.html',
  styleUrls: ['./listar-personas.component.css']
})
export class ListarPersonasComponent implements OnInit {
  columnas: string[] = ['nombre','apepat','apemat','ide','eliminar','facturas'];
  color = 'white'
  personas : persona[] = [];
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  public loading!: boolean;
  public filtroForm: UntypedFormGroup;
  constructor(private servicioTest:ServiciosTestService,private dialog: MatDialog, private _router:Router){
    this.filtroForm = new UntypedFormGroup({
      identificacion: new UntypedFormControl('', Validators.minLength(1))
    });
  }
  ngOnInit() {
    this.getPersonas();
  }

  public getPersonas(){
    this.loading = true; 
    this.servicioTest.getPersonas().subscribe(
      (data)=>{
        this.personas = data;
        console.log(this.personas);
        this.loading = false;  
        this.dataSource = new MatTableDataSource<persona>(this.personas);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
      },err =>{
        console.log(err);
      }
    )
  }

  public borrarPersona(idPersona : persona){
    const dialogoRef = this.dialog.open(ConfirmDialogComponentComponent, {
      disableClose: true,
      data: true,
    });
    dialogoRef.afterClosed().subscribe((respuesta) => {
      if (respuesta) {
        this.servicioTest.deleteByIdentificacion(idPersona.identificacion).subscribe(
          data =>{
            console.log("persona eliminada");
            this.getPersonas();
          },
          err =>{
            console.log(err);
          }
          )
      }
    });
    
  }

  public facturas(personas: persona){
    this._router.navigate(['/ver-facturas/' + personas.identificacion]);
  }

  onSubmit(){
    if (this.filtroForm.controls['identificacion'].value != "") {
      var ide = this.filtroForm.controls['identificacion'].value;
      console.log(ide);
      this.filtrar(ide);
    } else {
      console.log("no valido")
    }
  }
  public filtrar(ide:any) {
      this.servicioTest.getPersonaByIdentificacion(ide).subscribe(
        (data) =>{
          console.log(data);
          this.personas = data;
          this.dataSource = new MatTableDataSource<persona>(this.personas);
         console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;
        },err=>{

        }
      );
  }

  public borrarFiltro(){
    this.filtroForm.controls['identificacion'].setValue('');
    this.getPersonas();
  }

}
