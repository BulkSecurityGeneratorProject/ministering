import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMemberMi } from 'app/shared/model/member-mi.model';
import { MemberMiService } from './member-mi.service';

@Component({
    selector: 'jhi-member-mi-delete-dialog',
    templateUrl: './member-mi-delete-dialog.component.html'
})
export class MemberMiDeleteDialogComponent {
    member: IMemberMi;

    constructor(private memberService: MemberMiService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.memberService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'memberListModification',
                content: 'Deleted an member'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-member-mi-delete-popup',
    template: ''
})
export class MemberMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ member }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MemberMiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.member = member;
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
