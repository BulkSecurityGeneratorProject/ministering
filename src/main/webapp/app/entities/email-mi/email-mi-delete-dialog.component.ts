import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmailMi } from 'app/shared/model/email-mi.model';
import { EmailMiService } from './email-mi.service';

@Component({
    selector: 'jhi-email-mi-delete-dialog',
    templateUrl: './email-mi-delete-dialog.component.html'
})
export class EmailMiDeleteDialogComponent {
    email: IEmailMi;

    constructor(private emailService: EmailMiService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emailService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'emailListModification',
                content: 'Deleted an email'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-email-mi-delete-popup',
    template: ''
})
export class EmailMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ email }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmailMiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.email = email;
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
