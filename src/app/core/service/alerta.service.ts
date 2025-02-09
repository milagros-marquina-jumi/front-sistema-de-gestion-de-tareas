import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private toast = inject(ToastrService);

  success(msg: string){
    this.toast.success(msg, "¡Exito!", {
      timeOut: 5000,
    });
  }
  error(msg: string){
    this.toast.error(msg, "¡Error!", {
      timeOut: 5000,
    });
  }
  info(msg: string){
    this.toast.info(msg, "¡Aviso!", {
      timeOut: 5000,
    });
  }
  warning(msg: string){
    this.toast.warning(msg, "¡Advertencia!", {
      timeOut: 5000,
    });
  }
}
