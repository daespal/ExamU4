import { Cliente } from './../../models/cliente';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  public clientes: Cliente[] = [];
  private bool=false

  constructor(private clienteservice:ClienteService) { 
    this.clienteservice.getCliente().subscribe(resp=>{
      this.clientes = resp;
    });
  }

  ngOnInit() {
    
  }

  public change(){
    if(this.bool){
      this.bool=false
      this.clienteservice.getCliente().subscribe(resp=>{
        this.clientes = resp;
      });
    }else{
      this.bool=true
      this.clienteservice.getCliente().subscribe(resp=>{
        this.clientes = resp;
        this.clientes.sort();
        console.log(this.clientes);
      });
    }
  }
}
