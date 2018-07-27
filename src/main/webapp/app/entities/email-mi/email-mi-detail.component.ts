import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmailMi } from 'app/shared/model/email-mi.model';

@Component({
    selector: 'jhi-email-mi-detail',
    templateUrl: './email-mi-detail.component.html'
})
export class EmailMiDetailComponent implements OnInit {
    email: IEmailMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ email }) => {
            this.email = email;
        });
    }

    previousState() {
        window.history.back();
    }
}
