import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private http = inject(HttpClient);
  private url: string = environment.baseUrl + 'tareas';

  ListarTodos() {
    return this.http.get<Tarea[]>( this.url);
  }

  BuscarPorId(id: number) {
    return this.http.get( this.url + '/'+ id);
  }

  Guardar(obj: Tarea): Observable<any> {
    if(obj.id == 0){
      return this.http.post( this.url , obj);
    }else{
      return this.http.put( this.url + '/'+ obj.id, obj);
    }
  }

  Eliminar(id: number){
    return this.http.delete( this.url + '/' + id);
  }
}
