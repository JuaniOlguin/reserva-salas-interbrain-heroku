import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sala } from './Sala';
 
@Injectable({
  providedIn: 'root'
})
export class SalasService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getSalas(): Observable<Sala[]>{
    return this.http.get<Sala[]>(`${this.BASE_URL}/salas`)
  }

  createSala(nombre: string): Observable<Sala>{
    return this.http.post<Sala>(`${this.BASE_URL}/salas`,
    {nombre});
  }

  deleteSala(id: string): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/salas/${id}`);
  }

}