import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhoneMi } from 'app/shared/model/phone-mi.model';

@Component({
    selector: 'jhi-phone-mi-detail',
    templateUrl: './phone-mi-detail.component.html'
})
export class PhoneMiDetailComponent implements OnInit {
    phone: IPhoneMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ phone }) => {
            this.phone = phone;
        });
    }

    previousState() {
        window.history.back();
    }
}
