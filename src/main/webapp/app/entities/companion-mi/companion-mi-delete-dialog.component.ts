import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanionMi } from 'app/shared/model/companion-mi.model';
import { CompanionMiService } from './companion-mi.service';

@Component({
    selector: 'jhi-companion-mi-delete-dialog',
    templateUrl: './companion-mi-delete-dialog.component.html'
})
export class CompanionMiDeleteDialogComponent {
    companion: ICompanionMi;

    constructor(private companionService: CompanionMiService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'companionListModification',
                content: 'Deleted an companion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-companion-mi-delete-popup',
    template: ''
})
export class CompanionMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompanionMiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.companion = companion;
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
