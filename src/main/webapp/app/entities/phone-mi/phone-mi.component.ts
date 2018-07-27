import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPhoneMi } from 'app/shared/model/phone-mi.model';
import { Principal } from 'app/core';
import { PhoneMiService } from './phone-mi.service';

@Component({
    selector: 'jhi-phone-mi',
    templateUrl: './phone-mi.component.html'
})
export class PhoneMiComponent implements OnInit, OnDestroy {
    phones: IPhoneMi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private phoneService: PhoneMiService,
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
            this.phoneService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPhoneMi[]>) => (this.phones = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.phoneService.query().subscribe(
            (res: HttpResponse<IPhoneMi[]>) => {
                this.phones = res.body;
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
        this.registerChangeInPhones();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPhoneMi) {
        return item.id;
    }

    registerChangeInPhones() {
        this.eventSubscriber = this.eventManager.subscribe('phoneListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
