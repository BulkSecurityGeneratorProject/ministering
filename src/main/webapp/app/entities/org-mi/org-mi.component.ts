import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrgMi } from 'app/shared/model/org-mi.model';
import { Principal } from 'app/core';
import { OrgMiService } from './org-mi.service';

@Component({
    selector: 'jhi-org-mi',
    templateUrl: './org-mi.component.html'
})
export class OrgMiComponent implements OnInit, OnDestroy {
    orgs: IOrgMi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private orgService: OrgMiService,
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
            this.orgService
                .search({
                    query: this.currentSearch
                })
                .subscribe((res: HttpResponse<IOrgMi[]>) => (this.orgs = res.body), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.orgService.query().subscribe(
            (res: HttpResponse<IOrgMi[]>) => {
                this.orgs = res.body;
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
        this.registerChangeInOrgs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrgMi) {
        return item.id;
    }

    registerChangeInOrgs() {
        this.eventSubscriber = this.eventManager.subscribe('orgListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
