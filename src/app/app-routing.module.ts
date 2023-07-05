import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListarPersonasComponent} from 'src/app/listar-personas/listar-personas.component'
import {CrearPersonaComponent} from 'src/app/crear-persona/crear-persona.component'
import {CrearFacturaComponent} from 'src/app/crear-factura/crear-factura.component';
import {ListaFacturasComponent} from 'src/app/lista-facturas/lista-facturas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/lista-personas',
    pathMatch: 'full'
  },
  {
    path: 'lista-personas',
    component: ListarPersonasComponent
  },
  {
    path: 'insertar-personas',
    component: CrearPersonaComponent
  },
  {
    path: 'crear-factura',
    component: CrearFacturaComponent
  },
  {
    path: 'ver-facturas/:idPersona',
    component: ListaFacturasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
