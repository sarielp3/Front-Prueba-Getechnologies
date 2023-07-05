import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {persona} from 'src/app/models/persona';
import {ServiciosTestService} from 'src/app/servicios-test.service'
import {ConfirmDialogComponentComponent} from 'src/app/confirm-dialog-component/confirm-dialog-component.component'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { factura } from '../models/factura';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent implements OnInit {
  columnas: string[] = ['fecha','monto','ide'];
  public loading!: boolean;
  dataSource:any;
  facturas : factura[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private servicioTest:ServiciosTestService,private activeRoute:ActivatedRoute){

  }

  ngOnInit(): void {
    this.getFacturas();
  }

  public getFacturas(){
    this.loading = true;  
    const id_entrada = <string>this.activeRoute.snapshot.params['idPersona'];
    console.log(id_entrada);
    this.servicioTest.findFacturasByPersona(id_entrada).subscribe(
      (data) => {
        this.loading = false;  
        this.dataSource = new MatTableDataSource<persona>(data);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;

      },err =>{
        console.log(err);
      }
    );

  }

}
