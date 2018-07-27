import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStewardshipMi } from 'app/shared/model/stewardship-mi.model';
import { StewardshipMiService } from './stewardship-mi.service';
import { IAssignmentMi } from 'app/shared/model/assignment-mi.model';
import { AssignmentMiService } from 'app/entities/assignment-mi';
import { IMinistryMi } from 'app/shared/model/ministry-mi.model';
import { MinistryMiService } from 'app/entities/ministry-mi';

@Component({
    selector: 'jhi-stewardship-mi-update',
    templateUrl: './stewardship-mi-update.component.html'
})
export class StewardshipMiUpdateComponent implements OnInit {
    private _stewardship: IStewardshipMi;
    isSaving: boolean;

    assignments: IAssignmentMi[];

    ministries: IMinistryMi[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private stewardshipService: StewardshipMiService,
        private assignmentService: AssignmentMiService,
        private ministryService: MinistryMiService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stewardship }) => {
            this.stewardship = stewardship;
        });
        this.assignmentService.query().subscribe(
            (res: HttpResponse<IAssignmentMi[]>) => {
                this.assignments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ministryService.query().subscribe(
            (res: HttpResponse<IMinistryMi[]>) => {
                this.ministries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stewardship.id !== undefined) {
            this.subscribeToSaveResponse(this.stewardshipService.update(this.stewardship));
        } else {
            this.subscribeToSaveResponse(this.stewardshipService.create(this.stewardship));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStewardshipMi>>) {
        result.subscribe((res: HttpResponse<IStewardshipMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAssignmentById(index: number, item: IAssignmentMi) {
        return item.id;
    }

    trackMinistryById(index: number, item: IMinistryMi) {
        return item.id;
    }
    get stewardship() {
        return this._stewardship;
    }

    set stewardship(stewardship: IStewardshipMi) {
        this._stewardship = stewardship;
    }
}
