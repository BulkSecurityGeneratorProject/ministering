import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStewardshipMi } from 'app/shared/model/stewardship-mi.model';

@Component({
    selector: 'jhi-stewardship-mi-detail',
    templateUrl: './stewardship-mi-detail.component.html'
})
export class StewardshipMiDetailComponent implements OnInit {
    stewardship: IStewardshipMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stewardship }) => {
            this.stewardship = stewardship;
        });
    }

    previousState() {
        window.history.back();
    }
}
