import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INotesMi } from 'app/shared/model/notes-mi.model';
import { NotesMiService } from './notes-mi.service';

@Component({
    selector: 'jhi-notes-mi-update',
    templateUrl: './notes-mi-update.component.html'
})
export class NotesMiUpdateComponent implements OnInit {
    private _notes: INotesMi;
    isSaving: boolean;

    constructor(private notesService: NotesMiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ notes }) => {
            this.notes = notes;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.notes.id !== undefined) {
            this.subscribeToSaveResponse(this.notesService.update(this.notes));
        } else {
            this.subscribeToSaveResponse(this.notesService.create(this.notes));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INotesMi>>) {
        result.subscribe((res: HttpResponse<INotesMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get notes() {
        return this._notes;
    }

    set notes(notes: INotesMi) {
        this._notes = notes;
    }
}
