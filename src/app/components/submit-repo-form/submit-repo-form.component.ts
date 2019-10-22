import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RepoSubmit, RepoSubmitAuthor } from 'src/app/types';
import { FormsUtils } from 'src/app/core';
import { StorageService, ReposService } from 'src/app/services';

@Component({
  selector: 'app-submit-repo-form',
  templateUrl: './submit-repo-form.component.html',
  styleUrls: ['./submit-repo-form.component.scss']
})
export class SubmitRepoFormComponent implements OnInit {

  @Input() repoSubmit: RepoSubmit;
  @Output() onSubmit: EventEmitter<{ status: 'success' | 'error', data: any }> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Input() showHeader: boolean = true;

  private _auhtorForm: FormGroup;
  /**
   * author a agregar o modificar
   */
  public author: RepoSubmitAuthor = { name: '', aff: '' };
  public formAuthoMode: 'edit' | 'new' = 'new';

  constructor(private formBuilder: FormBuilder, private reposService: ReposService) { }

  ngOnInit() {
  }

  /**
   * determina el formulario de captura de datos 
   */
  get authorForm(): FormGroup {
    if (!this._auhtorForm) {
      this._auhtorForm = this.formBuilder.group({
        name: ['', Validators.required],
        aff: ['', Validators.required],
        orcid: [],
      });
    }
    return this._auhtorForm;
  }

  /**
   * determina los authores del submit a realizar
   */
  get authors(): RepoSubmitAuthor[] {
    if (this.repoSubmit && !this.repoSubmit.authors) {
      this.repoSubmit.authors = [];
    }
    return this.repoSubmit ? this.repoSubmit.authors : [];
  }

  /**
   * determina si el contenido del submit es correcto para continuar
   */
  get valid() {
    return this.repoSubmit && this.repoSubmit.keywords && this.repoSubmit.keywords.length > 0;
  }

  /**
   * shortcut from #selectAuthor(null)
   */
  newAuthor() {
    this.selectAuthor(null);
  }

  /**
   * selecciona el author para su edicion o creacion
   * si el author enviado es nulo se iniciara una nueva creacion 
   * @param author author a seleccionar
   */
  selectAuthor(author: RepoSubmitAuthor) {
    if (author) {
      this.formAuthoMode = 'edit';
      this.author = author;
    } else {
      this.formAuthoMode = 'new';
      this.author = { name: '', aff: '', orcid: '' };
    }
    this.authorForm.reset();
    FormsUtils.synchorizeWithModel(this.authorForm, this.author)
  }

  /**
   * agrega el author que se este en la instancia actual
   */
  processAuthor() {
    if (this.repoSubmit && this.authorForm.valid) {
      this.author = FormsUtils.extractModel(this.authorForm, this.author);
      switch (this.formAuthoMode) {
        case 'new':
          this.repoSubmit.authors.push(this.author)
          break;
        case 'edit':
        default: {
        }
      }
      this.newAuthor();
    }
  }

  /**
   * elimina el author del submit del repo
   * @param author author a eliminar
   */
  removeAuthor(author: RepoSubmitAuthor) {
    let indexOf = this.repoSubmit.authors.indexOf(author);
    if (indexOf != -1) {
      this.repoSubmit.authors.splice(indexOf, 1);
    }
  }

  /**
   * controlador del submit del formulario
   */
  submit() {
    if (this.repoSubmit) {
      this.reposService.submitRepo(this.repoSubmit).subscribe(response => {
        this.onSubmit.emit({ status: 'success', data: response });
      }, error => {
        this.onSubmit.emit({ status: 'error', data: error });
      });
    }
  }

  /**
   * controlador del proceso de cancelacion del submit
   */
  cancel() {
    this.onCancel.emit(this.repoSubmit);
  }


}
