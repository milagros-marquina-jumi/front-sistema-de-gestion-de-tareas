import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TareaRegistrarComponent } from './tarea-registrar.component';
import { TareaService } from '../../../core/service/tarea.service';
import { AlertaService } from '../../../core/service/alerta.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { Tarea } from '../../../core/models/tarea.model';
import { ToastrModule } from 'ngx-toastr';

describe('TareaRegistrarComponent', () => {
  let component: TareaRegistrarComponent;
  let fixture: ComponentFixture<TareaRegistrarComponent>;
  let tareaService: TareaService;
  let alertaService: AlertaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TareaRegistrarComponent,
        NavbarComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        TareaService,
        AlertaService,
      ],
    }).compileComponents();

    tareaService = TestBed.inject(TareaService);
    alertaService = TestBed.inject(AlertaService);

    fixture = TestBed.createComponent(TareaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería guardar la tarea correctamente', fakeAsync(() => {
    const mockTarea = new Tarea();
    mockTarea.titulo = 'Tarea de prueba';
    mockTarea.descripcion = 'Descripción de la tarea';

    const mockResponse = { status: true, message: 'Tarea guardada con éxito' };
    spyOn(tareaService, 'Guardar').and.returnValue(of(mockResponse));
    spyOn(alertaService, 'success');
    spyOn(component['router'], 'navigate');

    component.tarea = mockTarea;
    component.fnGuardar();
    tick();

    expect(alertaService.success).toHaveBeenCalledWith('Tarea guardada con éxito');
    expect(component['router'].navigate).toHaveBeenCalledWith(['/tarea/listar']);
  }));
});
