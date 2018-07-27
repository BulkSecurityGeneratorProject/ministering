import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFamilyMi } from 'app/shared/model/family-mi.model';
import { FamilyMiService } from './family-mi.service';
import { INotesMi } from 'app/shared/model/notes-mi.model';
import { NotesMiService } from 'app/entities/notes-mi';
import { IAssignmentMi } from 'app/shared/model/assignment-mi.model';
import { AssignmentMiService } from 'app/entities/assignment-mi';

@Component({
    selector: 'jhi-family-mi-update',
    templateUrl: './family-mi-update.component.html'
})
export class FamilyMiUpdateComponent implements OnInit {
    private _family: IFamilyMi;
    isSaving: boolean;

    notes: INotesMi[];

    assignments: IAssignmentMi[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private familyService: FamilyMiService,
        private notesService: NotesMiService,
        private assignmentService: AssignmentMiService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ family }) => {
            this.family = family;
        });
        this.notesService.query().subscribe(
            (res: HttpResponse<INotesMi[]>) => {
                this.notes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.assignmentService.query().subscribe(
            (res: HttpResponse<IAssignmentMi[]>) => {
                this.assignments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.family.id !== undefined) {
            this.subscribeToSaveResponse(this.familyService.update(this.family));
        } else {
            this.subscribeToSaveResponse(this.familyService.create(this.family));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFamilyMi>>) {
        result.subscribe((res: HttpResponse<IFamilyMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNotesById(index: number, item: INotesMi) {
        return item.id;
    }

    trackAssignmentById(index: number, item: IAssignmentMi) {
        return item.id;
    }
    get family() {
        return this._family;
    }

    set family(family: IFamilyMi) {
        this._family = family;
    }
}
