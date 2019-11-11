import { FormGroup } from '@angular/forms';
/**
 * contiene funciones de utilidades para manejar los formularios de angular
 */
export class FormsUtils {

    /**
     * realiza la sincronizacion del formulario con el modelo pasados
     */
    static synchorizeWithModel(form: FormGroup, model: any = {}) {
        if (form && model) {
            for (const control in form.controls) {
                if (model.hasOwnProperty(control)) {
                    form.controls[control].setValue(model[control]);
                }
            }
        }
    }

    /**
     * retorna el modelo syncronizado con los valores en el formulario pasados
     */
    static extractModel<T extends {}>(form: FormGroup, model: T): T {
        if (form && model) {
            for (const control in form.controls) {
                model[control] = form.controls[control].value;
            }
        }
        return model;
    }
}