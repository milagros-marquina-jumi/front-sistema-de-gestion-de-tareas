import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TareaListarComponent } from './tarea-listar.component'; // Importa el componente directamente
import { TareaService } from '../../../core/service/tarea.service';
import { AlertaService } from '../../../core/service/alerta.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para pruebas HTTP
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class MockTareaService {
  ListarTodos() {
    return of([
      { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción de la tarea' },
      { id: 2, titulo: 'Tarea 2', descripcion: 'Otra tarea' }
    ]);
  }

  Eliminar(id: number) {
    return of({ status: true, message: 'Tarea eliminada correctamente' });
  }
}

class MockAlertaService {
  success(message: string) {}
  error(message: string) {}
  warning(message: string) {}
}

class MockRouter {
  navigate(url: string) {}
}

describe('TareaListarComponent', () => {
  let component: TareaListarComponent;
  let fixture: ComponentFixture<TareaListarComponent>;
  let tareaService: TareaService;
  let alertaService: AlertaService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TareaListarComponent,
        NavbarComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TareaService, useClass: MockTareaService },
        { provide: AlertaService, useClass: MockAlertaService },
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TareaListarComponent);
    component = fixture.componentInstance;
    tareaService = TestBed.inject(TareaService);
    alertaService = TestBed.inject(AlertaService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the TareaListar component', () => {
    expect(component).toBeTruthy();
  });

  it('should list tasks on fnListar', fakeAsync(() => {
    spyOn(tareaService, 'ListarTodos').and.callThrough();

    component.fnListar();
    tick();

    expect(tareaService.ListarTodos).toHaveBeenCalled();
    expect(component.tareas.length).toBe(2);
    expect(component.tareas[0].titulo).toBe('Tarea 1');
    expect(component.tareas[1].titulo).toBe('Tarea 2');
  }));

  it('should navigate to new task page on fnNueva', () => {
    spyOn(router, 'navigate');
    component.fnNueva();
    expect(router.navigate).toHaveBeenCalledWith(['/tarea/nuevo']);
  });

  it('should navigate to edit task page on fnEditar', () => {
    spyOn(router, 'navigate');
    component.fnEditar(1);
    expect(router.navigate).toHaveBeenCalledWith(['/tarea/editar/1']);
  });
});
