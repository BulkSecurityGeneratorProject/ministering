import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEmailMi } from 'app/shared/model/email-mi.model';
import { EmailMiService } from './email-mi.service';

@Component({
    selector: 'jhi-email-mi-update',
    templateUrl: './email-mi-update.component.html'
})
export class EmailMiUpdateComponent implements OnInit {
    private _email: IEmailMi;
    isSaving: boolean;

    constructor(private emailService: EmailMiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ email }) => {
            this.email = email;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.email.id !== undefined) {
            this.subscribeToSaveResponse(this.emailService.update(this.email));
        } else {
            this.subscribeToSaveResponse(this.emailService.create(this.email));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmailMi>>) {
        result.subscribe((res: HttpResponse<IEmailMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get email() {
        return this._email;
    }

    set email(email: IEmailMi) {
        this._email = email;
    }
}
