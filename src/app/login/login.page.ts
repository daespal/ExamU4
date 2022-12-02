import { ClienteService } from './../services/cliente.service';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm!: FormGroup;
  sLogin:Cliente;
  cliente:Cliente[];

 constructor(public fb: FormBuilder, private clienteser:ClienteService,loginService:LoginService,private router: Router) {

  
  this.clienteser.getCliente().subscribe(resp=>{
    this.cliente = resp;
  });

  this.sLogin={
    nombre: "",
    telefono: "",
    domicilio: "",
    id:""
   }
 }

  ngOnInit() {
    this.myForm = this.fb.group({
      'telefono': ["",Validators.required],
    })
  }

  public ingresar(){
    if(this.sLogin.telefono=="admi"){
      this.admin();
    }else{
    for (let i = 0; i < this.cliente.length; i++) {
      if(this.cliente[i].telefono == this.sLogin.telefono){
        this.goHome();
        this.clienteser.setCurrentUser(this.cliente[i].telefono)
      }
    }
  }
  }
 public goHome(){
    this.router.navigate(['/home']);
  }
  public admin(){
    this.router.navigate(['/administrador']);
  }
}
