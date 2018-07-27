import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrgMi } from 'app/shared/model/org-mi.model';

@Component({
    selector: 'jhi-org-mi-detail',
    templateUrl: './org-mi-detail.component.html'
})
export class OrgMiDetailComponent implements OnInit {
    org: IOrgMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ org }) => {
            this.org = org;
        });
    }

    previousState() {
        window.history.back();
    }
}
