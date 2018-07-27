import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompanionshipMi } from 'app/shared/model/companionship-mi.model';
import { CompanionshipMiService } from './companionship-mi.service';
import { IStewardshipMi } from 'app/shared/model/stewardship-mi.model';
import { StewardshipMiService } from 'app/entities/stewardship-mi';
import { INotesMi } from 'app/shared/model/notes-mi.model';
import { NotesMiService } from 'app/entities/notes-mi';
import { ICompanionMi } from 'app/shared/model/companion-mi.model';
import { CompanionMiService } from 'app/entities/companion-mi';
import { IMinistryMi } from 'app/shared/model/ministry-mi.model';
import { MinistryMiService } from 'app/entities/ministry-mi';

@Component({
    selector: 'jhi-companionship-mi-update',
    templateUrl: './companionship-mi-update.component.html'
})
export class CompanionshipMiUpdateComponent implements OnInit {
    private _companionship: ICompanionshipMi;
    isSaving: boolean;

    companionships: IStewardshipMi[];

    notes: INotesMi[];

    stewardships: IStewardshipMi[];

    companions: ICompanionMi[];

    ministries: IMinistryMi[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private companionshipService: CompanionshipMiService,
        private stewardshipService: StewardshipMiService,
        private notesService: NotesMiService,
        private companionService: CompanionMiService,
        private ministryService: MinistryMiService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companionship }) => {
            this.companionship = companionship;
        });
        this.stewardshipService.query({ filter: 'companionship-is-null' }).subscribe(
            (res: HttpResponse<IStewardshipMi[]>) => {
                if (!this.companionship.companionship || !this.companionship.companionship.id) {
                    this.companionships = res.body;
                } else {
                    this.stewardshipService.find(this.companionship.companionship.id).subscribe(
                        (subRes: HttpResponse<IStewardshipMi>) => {
                            this.companionships = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.notesService.query().subscribe(
            (res: HttpResponse<INotesMi[]>) => {
                this.notes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.stewardshipService.query().subscribe(
            (res: HttpResponse<IStewardshipMi[]>) => {
                this.stewardships = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companionService.query().subscribe(
            (res: HttpResponse<ICompanionMi[]>) => {
                this.companions = res.body;
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
        if (this.companionship.id !== undefined) {
            this.subscribeToSaveResponse(this.companionshipService.update(this.companionship));
        } else {
            this.subscribeToSaveResponse(this.companionshipService.create(this.companionship));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompanionshipMi>>) {
        result.subscribe((res: HttpResponse<ICompanionshipMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStewardshipById(index: number, item: IStewardshipMi) {
        return item.id;
    }

    trackNotesById(index: number, item: INotesMi) {
        return item.id;
    }

    trackCompanionById(index: number, item: ICompanionMi) {
        return item.id;
    }

    trackMinistryById(index: number, item: IMinistryMi) {
        return item.id;
    }
    get companionship() {
        return this._companionship;
    }

    set companionship(companionship: ICompanionshipMi) {
        this._companionship = companionship;
    }
}
