import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tarea } from '../../../core/models/tarea.model';
import { FormErrorMessageComponent } from '../../../shared/form-error-message/form-error-message.component';
import { AlertaService } from '../../../core/service/alerta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareaService } from '../../../core/service/tarea.service';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-tarea-registrar',
 imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormErrorMessageComponent,
    NavbarComponent
],
  templateUrl: './tarea-registrar.component.html',
  styleUrl: './tarea-registrar.component.css'
})
export class TareaRegistrarComponent implements OnInit  {
  private tareaService = inject(TareaService);
  private alerta = inject(AlertaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  tarea: Tarea = new Tarea();

  ngOnInit(): void {
    const idTarea = sessionStorage.getItem('tarea');
    //const idTarea = this.route.snapshot.paramMap.get('id');
    if (idTarea) {
      this.fnBuscarPorId(idTarea);
    }
  }

  fnBuscarPorId(id: any){
    this.tareaService.BuscarPorId(id).subscribe({
      next: (data: any) => {
        this.tarea = data.data;
      },
      error: (e) => {
        this.alerta.error('Tarea no encontrada.');
        console.error(e);
        this.router.navigate(['/listar']);
      }
    });
  }

  fnGuardar(){
    this.tareaService.Guardar(this.tarea).subscribe({
      next: (data: any) =>{
      if(data.status){
        sessionStorage.removeItem('tarea');
        this.alerta.success(data.message);
        this.router.navigate([`/tarea/listar`]);
      }else{
        this.alerta.info(data.message);
      }
    },error: (e) =>{
      this.alerta.error('Error al momento de guardar tarea.');
      console.log(e);
      }
    })
  }
}
