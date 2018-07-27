import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssignmentMi } from 'app/shared/model/assignment-mi.model';

@Component({
    selector: 'jhi-assignment-mi-detail',
    templateUrl: './assignment-mi-detail.component.html'
})
export class AssignmentMiDetailComponent implements OnInit {
    assignment: IAssignmentMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ assignment }) => {
            this.assignment = assignment;
        });
    }

    previousState() {
        window.history.back();
    }
}
