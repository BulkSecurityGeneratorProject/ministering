import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotesMi } from 'app/shared/model/notes-mi.model';

@Component({
    selector: 'jhi-notes-mi-detail',
    templateUrl: './notes-mi-detail.component.html'
})
export class NotesMiDetailComponent implements OnInit {
    notes: INotesMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ notes }) => {
            this.notes = notes;
        });
    }

    previousState() {
        window.history.back();
    }
}
