import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Reserva } from './Reserva';
import { Sala } from './Sala';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getReservas(): Observable<Reserva[]>{ //getReservas(): Observable<Reserva[]> return this.http.get<Reserva[]>
    return this.http.get<Reserva[]>(`${this.BASE_URL}/reservas`).pipe(map((result:any)=> result.data));
  }

  createReserva(nombre: string, fecha: string, email: string, sala: number): Observable<Reserva>{
    return this.http.post<Reserva>(`${this.BASE_URL}/reservas`,
    {nombre, fecha, email, sala});
  }

  deleteReserva(id: number): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/reservas/${id}`);
  }

  getSalas(): Observable<Sala[]>{
    return this.http.get<Sala[]>(`${this.BASE_URL}/salas`).pipe(map((result:any)=> result.data));
  }

}
