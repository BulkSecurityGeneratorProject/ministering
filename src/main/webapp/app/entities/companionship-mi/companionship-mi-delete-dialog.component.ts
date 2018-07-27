import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanionshipMi } from 'app/shared/model/companionship-mi.model';
import { CompanionshipMiService } from './companionship-mi.service';

@Component({
    selector: 'jhi-companionship-mi-delete-dialog',
    templateUrl: './companionship-mi-delete-dialog.component.html'
})
export class CompanionshipMiDeleteDialogComponent {
    companionship: ICompanionshipMi;

    constructor(
        private companionshipService: CompanionshipMiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companionshipService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'companionshipListModification',
                content: 'Deleted an companionship'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-companionship-mi-delete-popup',
    template: ''
})
export class CompanionshipMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companionship }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompanionshipMiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.companionship = companionship;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
