import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICompanionMi } from 'app/shared/model/companion-mi.model';
import { CompanionMiService } from './companion-mi.service';

@Component({
    selector: 'jhi-companion-mi-update',
    templateUrl: './companion-mi-update.component.html'
})
export class CompanionMiUpdateComponent implements OnInit {
    private _companion: ICompanionMi;
    isSaving: boolean;

    constructor(private companionService: CompanionMiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companion }) => {
            this.companion = companion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companion.id !== undefined) {
            this.subscribeToSaveResponse(this.companionService.update(this.companion));
        } else {
            this.subscribeToSaveResponse(this.companionService.create(this.companion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompanionMi>>) {
        result.subscribe((res: HttpResponse<ICompanionMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get companion() {
        return this._companion;
    }

    set companion(companion: ICompanionMi) {
        this._companion = companion;
    }
}
