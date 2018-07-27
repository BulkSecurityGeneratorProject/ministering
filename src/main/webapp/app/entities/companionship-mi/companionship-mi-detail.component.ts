import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanionshipMi } from 'app/shared/model/companionship-mi.model';

@Component({
    selector: 'jhi-companionship-mi-detail',
    templateUrl: './companionship-mi-detail.component.html'
})
export class CompanionshipMiDetailComponent implements OnInit {
    companionship: ICompanionshipMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companionship }) => {
            this.companionship = companionship;
        });
    }

    previousState() {
        window.history.back();
    }
}
