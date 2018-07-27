import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMemberMi } from 'app/shared/model/member-mi.model';

@Component({
    selector: 'jhi-member-mi-detail',
    templateUrl: './member-mi-detail.component.html'
})
export class MemberMiDetailComponent implements OnInit {
    member: IMemberMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ member }) => {
            this.member = member;
        });
    }

    previousState() {
        window.history.back();
    }
}
