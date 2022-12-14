import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from './../../models/cliente';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Reservacion } from 'src/app/models/reservacion';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  public clientes: Cliente[];
  public clientes2: Cliente[];
  public res: Reservacion[];
  public fecha:Date;
 

  private bool=false

  constructor(private clienteservice:ClienteService,  private firestore:AngularFirestore) { 
    this.clienteservice.getReservacion().subscribe(resp=>{
      this.clientes = resp;
      this.clientes2 = resp;
     
    });
  }

  ngOnInit() {
    


  }

  public noOrdenar(){
    this.clienteservice.getReservacion().subscribe(resp=>{
      this.clientes = resp;
    });
  }

  public change(){
    if(this.bool==false){
      this.bool=false
      
    }else{
      this.bool=true
      this.ordenar();
    }
  }
 
  public ordenar(){
    this.clienteservice.getReservacion().subscribe(resp=>{
      this.clientes = resp;
     this.clientes.forEach(a => {
      this.fecha = new Date(a.fecha)
      this.clientes.sort((a,b)=> new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      
     });
    });
  }
}
