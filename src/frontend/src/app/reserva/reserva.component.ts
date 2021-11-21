import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Reserva } from '../Reserva';
import { ReservasService } from '../reservas.service';
import { Sala } from '../Sala';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  public fecha: string;
  public hora: string;
  public nombre: string;
  public email: string;
  public salaId: number;
  public salas: Sala[];
  

  constructor(private reservasService: ReservasService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.reservasService.getSalas()
      .subscribe((salas: Sala[]) => {
        this.salas = salas;
      }, (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

  createReserva(){
    this.successMsg = '';
    this.errorMsg = '';
    
    
    let fechaAux = this.datepipe.transform(this.fecha, 'MM/dd/yyyy');
    this.fecha = fechaAux+' '+this.hora+'Z' || '';

    this.reservasService.createReserva(this.nombre, this.fecha , this.email, this.salaId)
      .subscribe((reservaCreada: Reserva) => {
        this.successMsg = `Reserva creada exitosamente para el día ${this.fecha}`;
        this.fecha = '';
        this.nombre = '';
        this.hora = '';
        this.email = '';
        this.salaId = 0;
      },(error : HttpErrorResponse) => {
        console.log(error.error.message);
        
        this.errorMsg = JSON.stringify(error.error.message);
      })
  }

}
