import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanionMi } from 'app/shared/model/companion-mi.model';
import { Principal } from 'app/core';
import { CompanionMiService } from './companion-mi.service';

@Component({
    selector: 'jhi-companion-mi',
    templateUrl: './companion-mi.component.html'
})
export class CompanionMiComponent implements OnInit, OnDestroy {
    companions: ICompanionMi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private companionService: CompanionMiService,
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
            this.companionService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ICompanionMi[]>) => (this.companions = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.companionService.query().subscribe(
            (res: HttpResponse<ICompanionMi[]>) => {
                this.companions = res.body;
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
        this.registerChangeInCompanions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanionMi) {
        return item.id;
    }

    registerChangeInCompanions() {
        this.eventSubscriber = this.eventManager.subscribe('companionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
