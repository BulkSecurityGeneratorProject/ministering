import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAssignmentMi } from 'app/shared/model/assignment-mi.model';
import { Principal } from 'app/core';
import { AssignmentMiService } from './assignment-mi.service';

@Component({
    selector: 'jhi-assignment-mi',
    templateUrl: './assignment-mi.component.html'
})
export class AssignmentMiComponent implements OnInit, OnDestroy {
    assignments: IAssignmentMi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private assignmentService: AssignmentMiService,
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
            this.assignmentService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IAssignmentMi[]>) => (this.assignments = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.assignmentService.query().subscribe(
            (res: HttpResponse<IAssignmentMi[]>) => {
                this.assignments = res.body;
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
        this.registerChangeInAssignments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAssignmentMi) {
        return item.id;
    }

    registerChangeInAssignments() {
        this.eventSubscriber = this.eventManager.subscribe('assignmentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
