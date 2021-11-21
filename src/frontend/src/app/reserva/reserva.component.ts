import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Reserva } from '../Reserva';
import { ReservasService } from '../reservas.service';
import { Sala } from '../Sala';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  
  // form: FormGroup;

  public successMsg: string;
  public errorMsg: string;
  public fecha: string;
  public hora: string;
  public nombre: string;
  public email: string;
  public salaId: number;
  public salas: Sala[];
  public formValid: boolean;
  

  constructor(private reservasService: ReservasService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.reservasService.getSalas()
      .subscribe((salas: Sala[]) => {
        this.salas = salas;
      }, (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

  createReserva(event: Event){
    event.preventDefault();
    this.successMsg = '';
    this.errorMsg = '';
    
    let fechaAux = this.datepipe.transform(this.fecha, 'MM/dd/yyyy');
    this.fecha = fechaAux+' '+this.hora+'Z' || '';

    this.reservasService.createReserva(this.nombre, this.fecha , this.email, this.salaId)
      .subscribe((reservaCreada: Reserva) => {
        this.successMsg = `Reserva creada exitosamente para el día ${this.fecha}`;
        this.fecha = 'Elija una fecha';
        this.nombre = '';
        this.hora = '';
        this.email = '';
        this.salaId = 0;
      },(error : ErrorEvent) => {
        console.log(error.error.message);
        this.errorMsg = JSON.stringify(error.error.message);
      })
  }

}
