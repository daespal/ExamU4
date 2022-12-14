import { Reservacion } from './../models/reservacion';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private cliente: Cliente[];
  private res: Reservacion[];
  public currentuser =""
  constructor( private firestore:AngularFirestore) { 
    this.cliente =[{
      nombre:"",
      telefono:"",
      domicilio:""
    }]; 
    this.getCliente().subscribe(resp=>{
      this.cliente = resp;
    });

  }

  public validarReservacion(){
    //tengo abierto la opcion de de que el calendario lo pongamos con una fecha minima que seria un dia despues de entrar. 
    
  }

  public newReservacion(reservacion:Reservacion){
    this.firestore.collection('reservacion').add(reservacion);
  }

  public getReservacion(){
    return this.firestore.collection('reservacion').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Cliente;
          const id=a.payload.doc.id;
          return {id,...data}
        })
      })
    );
  }

  public getUsuarioByTel(telefono:string){
    let item: Cliente = this.cliente.find((cliente)=>{
      return cliente.telefono===telefono
    })
    return item.nombre
  }



  public setCurrentUser(user:string){
    this.currentuser = user;
  }

  public getCurrentUser(){
    return this.currentuser;
  }

  public getCliente(){
    return this.firestore.collection('cliente').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Cliente;
          const id=a.payload.doc.id;
          return {id,...data}
        })
      })
    );
  }

  
}
