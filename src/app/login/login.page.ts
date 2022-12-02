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

 constructor(public fb: FormBuilder, private clienteser:ClienteService,loginService:LoginService,private router: Router) {
  
   this.sLogin={
    nombre: "",
    telefono: "",
    domicilio: "",
    id:"",
   }
 }

  ngOnInit() {
    this.myForm = this.fb.group({
      'user': ["",Validators.required],
    })
  }

  public ingresar(){

    
  }
 public goHome(){
    this.router.navigate(['/home']);
  }

}
