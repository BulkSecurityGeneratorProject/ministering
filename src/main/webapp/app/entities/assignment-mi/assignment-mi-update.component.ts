import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAssignmentMi } from 'app/shared/model/assignment-mi.model';
import { AssignmentMiService } from './assignment-mi.service';

@Component({
    selector: 'jhi-assignment-mi-update',
    templateUrl: './assignment-mi-update.component.html'
})
export class AssignmentMiUpdateComponent implements OnInit {
    private _assignment: IAssignmentMi;
    isSaving: boolean;

    constructor(private assignmentService: AssignmentMiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ assignment }) => {
            this.assignment = assignment;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.assignment.id !== undefined) {
            this.subscribeToSaveResponse(this.assignmentService.update(this.assignment));
        } else {
            this.subscribeToSaveResponse(this.assignmentService.create(this.assignment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAssignmentMi>>) {
        result.subscribe((res: HttpResponse<IAssignmentMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get assignment() {
        return this._assignment;
    }

    set assignment(assignment: IAssignmentMi) {
        this._assignment = assignment;
    }
}
