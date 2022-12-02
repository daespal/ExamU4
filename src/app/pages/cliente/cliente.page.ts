import { Router } from '@angular/router';
import { ClienteService } from './../../services/cliente.service';
import { Reservacion } from './../../models/reservacion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  private reservacion: Reservacion[];
  constructor( private reserService: ClienteService, private router:Router) { }

  ngOnInit() {
  }

  public newReservacion(){
    this.reservacion = {
      nombre:"",
      telefono:"",
      nivel:0,
      fecha:"",
      brinco:false,
      mesapos:false,
      futbol:false,
      total:0
    }

    this.reserService.newReservacion(this.reservacion)
    this.back()
  }
  back():void{
    this.router.navigateByUrl('')
  }
}
