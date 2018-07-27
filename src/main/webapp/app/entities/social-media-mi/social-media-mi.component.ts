import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISocialMediaMi } from 'app/shared/model/social-media-mi.model';
import { Principal } from 'app/core';
import { SocialMediaMiService } from './social-media-mi.service';

@Component({
    selector: 'jhi-social-media-mi',
    templateUrl: './social-media-mi.component.html'
})
export class SocialMediaMiComponent implements OnInit, OnDestroy {
    socialMedias: ISocialMediaMi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private socialMediaService: SocialMediaMiService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.socialMediaService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ISocialMediaMi[]>) => (this.socialMedias = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.socialMediaService.query().subscribe(
            (res: HttpResponse<ISocialMediaMi[]>) => {
                this.socialMedias = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSocialMedias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISocialMediaMi) {
        return item.id;
    }

    registerChangeInSocialMedias() {
        this.eventSubscriber = this.eventManager.subscribe('socialMediaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
