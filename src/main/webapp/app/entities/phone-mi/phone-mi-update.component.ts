import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPhoneMi } from 'app/shared/model/phone-mi.model';
import { PhoneMiService } from './phone-mi.service';

@Component({
    selector: 'jhi-phone-mi-update',
    templateUrl: './phone-mi-update.component.html'
})
export class PhoneMiUpdateComponent implements OnInit {
    private _phone: IPhoneMi;
    isSaving: boolean;

    constructor(private phoneService: PhoneMiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ phone }) => {
            this.phone = phone;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.phone.id !== undefined) {
            this.subscribeToSaveResponse(this.phoneService.update(this.phone));
        } else {
            this.subscribeToSaveResponse(this.phoneService.create(this.phone));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPhoneMi>>) {
        result.subscribe((res: HttpResponse<IPhoneMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get phone() {
        return this._phone;
    }

    set phone(phone: IPhoneMi) {
        this._phone = phone;
    }
}
