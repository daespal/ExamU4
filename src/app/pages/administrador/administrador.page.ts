import { Cliente } from './../../models/cliente';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  private cliente: Cliente[];

  constructor(private clienteservice:ClienteService) { 
    this.clienteservice.getCliente().subscribe(resp=>{
      this.cliente = resp;
    });
  }

  ngOnInit() {
    
  }

}
