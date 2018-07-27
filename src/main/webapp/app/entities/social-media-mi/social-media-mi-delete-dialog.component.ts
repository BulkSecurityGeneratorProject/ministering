import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISocialMediaMi } from 'app/shared/model/social-media-mi.model';
import { SocialMediaMiService } from './social-media-mi.service';

@Component({
    selector: 'jhi-social-media-mi-delete-dialog',
    templateUrl: './social-media-mi-delete-dialog.component.html'
})
export class SocialMediaMiDeleteDialogComponent {
    socialMedia: ISocialMediaMi;

    constructor(
        private socialMediaService: SocialMediaMiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.socialMediaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'socialMediaListModification',
                content: 'Deleted an socialMedia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-social-media-mi-delete-popup',
    template: ''
})
export class SocialMediaMiDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ socialMedia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SocialMediaMiDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.socialMedia = socialMedia;
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
