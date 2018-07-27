import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFamilyMi } from 'app/shared/model/family-mi.model';

@Component({
    selector: 'jhi-family-mi-detail',
    templateUrl: './family-mi-detail.component.html'
})
export class FamilyMiDetailComponent implements OnInit {
    family: IFamilyMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ family }) => {
            this.family = family;
        });
    }

    previousState() {
        window.history.back();
    }
}
