import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMinistryMi } from 'app/shared/model/ministry-mi.model';
import { MinistryMiService } from './ministry-mi.service';

@Component({
    selector: 'jhi-ministry-mi-delete-dialog',
    templateUrl: './ministry-mi-delete-dialog.component.html'
})
export class MinistryMiDeleteDialogComponent {
    ministry: IMinistryMi;

    constructor(private ministryService: MinistryMiService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ministryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ministryListModification',
                content: 'Deleted an ministry'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ministry-mi-delete-popup',
    template: ''
})
export class MinistryMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ministry }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MinistryMiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ministry = ministry;
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
