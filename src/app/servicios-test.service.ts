import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {persona} from 'src/app/models/persona';
import {factura} from 'src/app/models/factura';

@Injectable({
  providedIn: 'root'
})
export class ServiciosTestService {
  personas : persona[] = [];
  facturas : factura[] = [];
  private apiUrl: string = 'http://localhost:8080/';
  constructor(private http: HttpClient) { 
   
  }

  getPersonas(): Observable<any>{
    return this.http.get<any>( this.apiUrl + 'directorio/all-personas');
  }

  getPersonaByIdentificacion(ide:string): Observable<any>{
    return this.http.get<any>( this.apiUrl + 'directorio/find-by-identificacion/' + ide);
  }

  deleteByIdentificacion(identificacion: string): Observable<any>{
    return this.http.delete<any>( this.apiUrl + 'directorio/delete-persona/' +identificacion);
  }

  storePersona(persona:any): Observable<any>{
    return this.http.post<any>( this.apiUrl + 'directorio/insertar-persona', persona);
  }

  storeFactura(factura:any): Observable<any>{
    return this.http.post<any>( this.apiUrl + 'ventas/insertar-factura',factura);
  }
  findFacturasByPersona(idPersona:string): Observable<any>{
    return  this.http.get<any>(this.apiUrl + 'ventas/find-facturas-by-persona/' + idPersona);
  }
}
