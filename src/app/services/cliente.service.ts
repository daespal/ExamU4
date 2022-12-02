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
  constructor( private firestore:AngularFirestore) { 
    this.cliente =[{
      nombre:"",
      telefono:"",
      domicilio:""
    }];


  }

  public validarReservacion(){
    //tengo abierto la opcion de de que el calendario lo pongamos con una fecha minima que seria un dia despues de entrar. 
    
  }

  public newReservacion(reservacion:Reservacion){
    this.firestore.collection('reservacion').add(reservacion);
  }

  public getUsuarioByTel(telefono:string){
    let result = this.firestore.collection('students').doc(telefono).valueChanges();
    return result;
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
