import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMinistryMi } from 'app/shared/model/ministry-mi.model';
import { MinistryMiService } from './ministry-mi.service';

@Component({
    selector: 'jhi-ministry-mi-update',
    templateUrl: './ministry-mi-update.component.html'
})
export class MinistryMiUpdateComponent implements OnInit {
    private _ministry: IMinistryMi;
    isSaving: boolean;

    constructor(private ministryService: MinistryMiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ministry }) => {
            this.ministry = ministry;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ministry.id !== undefined) {
            this.subscribeToSaveResponse(this.ministryService.update(this.ministry));
        } else {
            this.subscribeToSaveResponse(this.ministryService.create(this.ministry));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMinistryMi>>) {
        result.subscribe((res: HttpResponse<IMinistryMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get ministry() {
        return this._ministry;
    }

    set ministry(ministry: IMinistryMi) {
        this._ministry = ministry;
    }
}
