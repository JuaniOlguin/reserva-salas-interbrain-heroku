import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  public fechaHoy: Date;
  

  constructor(private reservasService: ReservasService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.fechaHoy = new Date();
    
    this.reservasService.getSalas()
      .subscribe((salas: Sala[]) => {
        this.salas = salas;
      }, (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

  reloadCurrentPage() {
    if(this.successMsg){
      window.location.reload();
    }
 }

  createReserva(){
    
    let fechaAux = '';
    if(this.fecha){
      this.successMsg = '';
      this.errorMsg = '';
      fechaAux = this.datepipe.transform(this.fecha, 'MM/dd/yyyy') || '';
      this.fecha = fechaAux+' '+this.hora+'Z' || '';

      this.reservasService.createReserva(this.nombre, this.fecha , this.email, this.salaId)
      .subscribe((reservaCreada: Reserva) => {
        this.successMsg = `Reserva creada exitosamente para el día ${fechaAux} a las ${this.hora}hs`;
        this.fecha = '';
        this.nombre = '';
        this.hora = '';
        this.email = '';
        this.salaId = 0;
      },(error : ErrorEvent) => {
        this.errorMsg = error.error.message;
      })
    }else{
      this.errorMsg = 'Todos los campos son obligatorios'
    }
  }
}
