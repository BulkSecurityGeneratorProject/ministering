import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStewardshipMi } from 'app/shared/model/stewardship-mi.model';
import { Principal } from 'app/core';
import { StewardshipMiService } from './stewardship-mi.service';

@Component({
    selector: 'jhi-stewardship-mi',
    templateUrl: './stewardship-mi.component.html'
})
export class StewardshipMiComponent implements OnInit, OnDestroy {
    stewardships: IStewardshipMi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private stewardshipService: StewardshipMiService,
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
            this.stewardshipService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IStewardshipMi[]>) => (this.stewardships = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.stewardshipService.query().subscribe(
            (res: HttpResponse<IStewardshipMi[]>) => {
                this.stewardships = res.body;
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
        this.registerChangeInStewardships();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStewardshipMi) {
        return item.id;
    }

    registerChangeInStewardships() {
        this.eventSubscriber = this.eventManager.subscribe('stewardshipListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
