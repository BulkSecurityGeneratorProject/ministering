import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanionMi } from 'app/shared/model/companion-mi.model';

@Component({
    selector: 'jhi-companion-mi-detail',
    templateUrl: './companion-mi-detail.component.html'
})
export class CompanionMiDetailComponent implements OnInit {
    companion: ICompanionMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companion }) => {
            this.companion = companion;
        });
    }

    previousState() {
        window.history.back();
    }
}
