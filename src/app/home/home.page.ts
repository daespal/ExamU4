import { Cliente } from './../models/cliente';
import { ClienteService } from './../services/cliente.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'path';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { allowedNodeEnvironmentFlags } from 'process';
import { Reservacion } from '../models/reservacion';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  private usuario: Cliente[] = [];
  private res: Cliente[] = [];
  myDate: String = new Date().toISOString();
  today: String = new Date().toISOString();
  public myForm: FormGroup;
  private reser: Reservacion;
  total=1000
  aux=0
  alberca=500
  poolbol=false;
  footbol=false;
  mesabol=false;
  brincobol=false;
  nombre:unknown = ''
  
  constructor( private alertController: AlertController,private fb: FormBuilder,private clientSer:ClienteService, private activatedRoute: ActivatedRoute, private router: Router) {
    if(clientSer.getCurrentUser()==""){
      this.router.navigate(['/login']);
    }
    this.clientSer.getReservacion().subscribe(resp=>{
      this.res = resp;
    });
    this.nombre =  this.clientSer.getUsuarioByTel(clientSer.getCurrentUser());

    console.log(this.nombre)

    this.myForm = this.fb.group({
      fecha:[this.myDate, Validators.compose([Validators.required])],
      telefono:[clientSer.getCurrentUser()],
      total:[this.total]
    });

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

  public pool(event){
    if (event.detail.checked) {
      this.total+=this.alberca
      this.aux = this.alberca
      this.poolbol = true
   }else{
    this.poolbol = false
   }
  }
  public futbol(event){
    if (event.detail.checked) {
      this.total+=100
      this.footbol = true
   }else{
    this.total-=100
    this.footbol = false
   }
  }

  public mesa(event){
    if (event.detail.checked) {
      this.total+=150
      this.mesabol = true
   }else{
    this.total-=150
    this.mesabol = false

   }
  }
  public brincolin(event){
    if (event.detail.checked) {
      this.total+=200
      this.brincobol = true
   }else{
    this.total-=200
    this.brincobol = false

   }
  }

  public range(event){
    this.alberca = (event.detail.value*100)
    if(this.poolbol){
      this.total-=this.aux
      this.total+= this.alberca
      this.aux= this.alberca
    }
  }

  public validateDate(){
    if(this.alreadyUsed(this.myForm.controls['fecha'].value)){
      this.alert()
    }else{
      this.newreservation() 
    }
  }

  public alreadyUsed(date){
    console.log(this.res)
    for (let i = 0; i < this.res.length; i++) {
      const fec= this.res[i].fecha.split("T")
      const d = date.split("T")
      if(fec[0] == d[0]){
        return true          
      }
    }
    return false
  }

  public newreservation() {
    this.reser = {
      fecha: this.myForm.controls['fecha'].value,
      telefono: this.clientSer.getCurrentUser(),
      nombre:this.nombre as string,
      brinco: this.brincobol,
      mesapos: this.mesabol,
      futbol: this.footbol,
      total: this.total
    }
    console.log(this.reser.nombre)
    this.clientSer.newReservacion(this.reser)
    this.Done()
    
  }
  
  async Done() {
    const alert = await this.alertController.create({
      header: 'Exito',
      message: "se agrego la reservacion",
      buttons:['OK'],
    });
    await alert.present();
  }
  async alert() {
    const alert = await this.alertController.create({
      header: 'Elija otra fecha',
      message: "Se encuentra reservado ese dia",
      buttons:['OK'],
    });
    await alert.present();
  }
}
