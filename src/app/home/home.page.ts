import { Cliente } from './../models/cliente';
import { ClienteService } from './../services/cliente.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private usuario: Cliente[] = [];

  constructor(private clientSer:ClienteService, private activatedRoute: ActivatedRoute, private router: Router) {
    let fecha = Date.now()
  }

  public getUsuarioById(id:string):void{
    if(id == "admi"){
    this.router.navigate(['/administrador'], {
      queryParams: { id: id },
    });
    }else{
      this.router.navigate(['/administrador'], {
        queryParams: { id: id },
      });
    }
  }

}
