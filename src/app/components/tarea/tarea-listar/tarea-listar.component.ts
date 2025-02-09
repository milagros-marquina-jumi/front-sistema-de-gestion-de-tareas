import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaService } from '../../../core/service/tarea.service';
import { AlertaService } from '../../../core/service/alerta.service';
import { Tarea } from '../../../core/models/tarea.model';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-tarea-listar',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent
],
  templateUrl: './tarea-listar.component.html',
  styleUrl: './tarea-listar.component.css'
})
export class TareaListarComponent implements OnInit{
  private tareaService = inject(TareaService);
  private alerta = inject(AlertaService);
  private router = inject(Router);
  tareas: Tarea[] = [];

  ngOnInit(): void {
    this.fnListar();
  }

  fnListar(): void {
    this.tareaService.ListarTodos().subscribe({
      next: (data) => {
        this.tareas = data;
      },
      error: (e) => {
        this.alerta.error('No se pudo cargar tareas.');
        console.error(e);
      },
    });
  }

  fnNueva(){
    sessionStorage.removeItem('tarea');
    this.router.navigate([`/tarea/nuevo`]);
  }

  fnEditar(id: number){
    sessionStorage.setItem('tarea', ''+id);
    this.router.navigate([`/tarea/editar`]);
   // this.router.navigate([`/tarea/editar/${id}`]);
  }

  fnEliminar(id: number){
    if (confirm('¿Estás seguro de eliminar este tarea con ID '+id+'?')) {
      this.tareaService.Eliminar(id).subscribe({
        next: (data: any) => {
          if(data.status){
            this.alerta.success(data.message);
            this.fnListar();
          }else{
            this.alerta.warning('No se pudo eliminar tarea');
          }
        },
        error: (e) => {
          this.alerta.error('No se pudo eliminar tarea');
          console.error(e);
        },
      });
    }
  }
}
