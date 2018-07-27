import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOrgMi } from 'app/shared/model/org-mi.model';
import { OrgMiService } from './org-mi.service';
import { IMemberMi } from 'app/shared/model/member-mi.model';
import { MemberMiService } from 'app/entities/member-mi';

@Component({
    selector: 'jhi-org-mi-update',
    templateUrl: './org-mi-update.component.html'
})
export class OrgMiUpdateComponent implements OnInit {
    private _org: IOrgMi;
    isSaving: boolean;

    members: IMemberMi[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private orgService: OrgMiService,
        private memberService: MemberMiService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ org }) => {
            this.org = org;
        });
        this.memberService.query().subscribe(
            (res: HttpResponse<IMemberMi[]>) => {
                this.members = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.org.id !== undefined) {
            this.subscribeToSaveResponse(this.orgService.update(this.org));
        } else {
            this.subscribeToSaveResponse(this.orgService.create(this.org));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrgMi>>) {
        result.subscribe((res: HttpResponse<IOrgMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMemberById(index: number, item: IMemberMi) {
        return item.id;
    }
    get org() {
        return this._org;
    }

    set org(org: IOrgMi) {
        this._org = org;
    }
}
