import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAssignmentMi } from 'app/shared/model/assignment-mi.model';
import { AssignmentMiService } from './assignment-mi.service';

@Component({
    selector: 'jhi-assignment-mi-delete-dialog',
    templateUrl: './assignment-mi-delete-dialog.component.html'
})
export class AssignmentMiDeleteDialogComponent {
    assignment: IAssignmentMi;

    constructor(
        private assignmentService: AssignmentMiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assignmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'assignmentListModification',
                content: 'Deleted an assignment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assignment-mi-delete-popup',
    template: ''
})
export class AssignmentMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ assignment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AssignmentMiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.assignment = assignment;
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
