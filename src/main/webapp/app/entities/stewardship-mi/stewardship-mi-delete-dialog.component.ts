import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStewardshipMi } from 'app/shared/model/stewardship-mi.model';
import { StewardshipMiService } from './stewardship-mi.service';

@Component({
    selector: 'jhi-stewardship-mi-delete-dialog',
    templateUrl: './stewardship-mi-delete-dialog.component.html'
})
export class StewardshipMiDeleteDialogComponent {
    stewardship: IStewardshipMi;

    constructor(
        private stewardshipService: StewardshipMiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stewardshipService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stewardshipListModification',
                content: 'Deleted an stewardship'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stewardship-mi-delete-popup',
    template: ''
})
export class StewardshipMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stewardship }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StewardshipMiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stewardship = stewardship;
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
