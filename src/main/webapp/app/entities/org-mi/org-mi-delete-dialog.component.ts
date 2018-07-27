import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrgMi } from 'app/shared/model/org-mi.model';
import { OrgMiService } from './org-mi.service';

@Component({
    selector: 'jhi-org-mi-delete-dialog',
    templateUrl: './org-mi-delete-dialog.component.html'
})
export class OrgMiDeleteDialogComponent {
    org: IOrgMi;

    constructor(private orgService: OrgMiService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orgService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orgListModification',
                content: 'Deleted an org'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-org-mi-delete-popup',
    template: ''
})
export class OrgMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ org }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrgMiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.org = org;
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
