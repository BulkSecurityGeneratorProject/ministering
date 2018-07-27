import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMinistryMi } from 'app/shared/model/ministry-mi.model';

@Component({
    selector: 'jhi-ministry-mi-detail',
    templateUrl: './ministry-mi-detail.component.html'
})
export class MinistryMiDetailComponent implements OnInit {
    ministry: IMinistryMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ministry }) => {
            this.ministry = ministry;
        });
    }

    previousState() {
        window.history.back();
    }
}
