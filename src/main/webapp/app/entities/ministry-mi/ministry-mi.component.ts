import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMinistryMi } from 'app/shared/model/ministry-mi.model';
import { Principal } from 'app/core';
import { MinistryMiService } from './ministry-mi.service';

@Component({
    selector: 'jhi-ministry-mi',
    templateUrl: './ministry-mi.component.html'
})
export class MinistryMiComponent implements OnInit, OnDestroy {
    ministries: IMinistryMi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private ministryService: MinistryMiService,
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
            this.ministryService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IMinistryMi[]>) => (this.ministries = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.ministryService.query().subscribe(
            (res: HttpResponse<IMinistryMi[]>) => {
                this.ministries = res.body;
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
        this.registerChangeInMinistries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMinistryMi) {
        return item.id;
    }

    registerChangeInMinistries() {
        this.eventSubscriber = this.eventManager.subscribe('ministryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
