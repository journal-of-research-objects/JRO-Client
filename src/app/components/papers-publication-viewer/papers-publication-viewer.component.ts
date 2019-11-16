import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReposService } from 'src/app/services';
import { MessageService } from 'primeng/api';
import { RepoDescriptor } from 'src/app/types';
import { DomSanitizer } from '@angular/platform-browser';
import { CREDENTIALS } from 'src/app/credentials/credentials';

@Component({
  selector: 'app-papers-publication-viewer',
  templateUrl: './papers-publication-viewer.component.html',
  styleUrls: ['./papers-publication-viewer.component.scss']
})
export class PapersPublicationViewerComponent implements OnInit {

  public repository: RepoDescriptor;
  public loaded: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, protected _sanitizer: DomSanitizer,
    private reposService: ReposService, protected messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['fork_url']) {
        this.reposService.getPublishedRepo(decodeURIComponent(params['fork_url'])).toPromise().then(response => {
          this.repository = RepoDescriptor.import(response);
          this.pullPdfContents();
          this.loaded = true;
        }).catch(error => {
          this.notifyErrorAndGoToPapers(error ? error['status'] : 'unknow error');
        });
      } else {
        this.notifyErrorAndGoToPapers('repository fork url not found');
      }
    });
  }

  notifyErrorAndGoToPapers(error: string) {
    this.notify('error', error);
    this.router.navigate(['papers']);
  }

  notify(severity, detail) {
    this.messageService.add({
      key: 'notification',
      severity: severity,
      detail: detail,
      life: 10000
    });
  }

  /**
   * determina la ruta de acceso al recurso del pdf
   */
  get pdfSrcUrl() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://raw.githubusercontent.com/${CREDENTIALS.ghOrganizationName}/${this.repository.name}/master/paper.pdf`);
  }

  _pdfContents: any = null;
  _pdf_shows: boolean = false;
  pullPdfContents() {
    if (this._pdfContents == null && this.repository) {
      this._pdfContents = '';
      this.reposService.getGitHubApiContents(this.repository.name, 'paper.pdf').then(data => {
        console.log('getting dataads ',data);
        this._pdfContents = this._sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;${data['encoding']},${data['content']}`);
        console.log('see contents',this._pdfContents)
        this._pdf_shows = true;
      });
    }
  }

  //https://api.github.com/repos/journal-of-research-objects/Miguel08241993-dumb-repo/contents/paper.pdf

  get repoUrl() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.repository.oriUrl);
  }

  get repoIssuesUrl() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`${this.repoUrl}/issues`);
  }

  get repoPaperReview() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://github.com/${CREDENTIALS.ghOrganizationName}/${this.repository.name}/blob/master/paper.md`);
  }

  /**
   * retorna la lista de autores del repositorio
   */
  get repoAuthors() {
    const authors = [];
    //owner data added
    authors.push({ name: this.repository.properties.owner.login, orcid: this.repository.ownerOrcid });
    if (this.repository.authors) {
      this.repository.authors.forEach(author => {
        authors.push(author);
      });
    }
    return authors;
  }

}
