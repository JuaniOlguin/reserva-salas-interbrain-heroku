import { Component, OnInit } from '@angular/core';
import { Reserva } from '../Reserva';
import { ReservasService } from '../reservas.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public reservas: Reserva[];
  public columnas: ['fecha','nombre','email','sala','cancelar'];

//Inyeccion del servicio
  constructor(private reservasService: ReservasService){
    
  }

  ngOnInit(): void {
    this.reservasService.getReservas()
      .subscribe((reservas: Reserva[]) => {
        this.reservas = reservas;
        this.loading = false;
      }, (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      });

  }

  cancelarReserva(id: number){
    console.log(id);
    
    this.reservasService.deleteReserva(id)
      .pipe( //operador de rxjs
        mergeMap(() => this.reservasService.getReservas())
      )
      .subscribe((reservas: Reserva[]) => {
        this.reservas = reservas;
        this.successMsg = "Reserva cancelada correctamente"
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}
