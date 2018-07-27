import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISocialMediaMi } from 'app/shared/model/social-media-mi.model';
import { SocialMediaMiService } from './social-media-mi.service';

@Component({
    selector: 'jhi-social-media-mi-update',
    templateUrl: './social-media-mi-update.component.html'
})
export class SocialMediaMiUpdateComponent implements OnInit {
    private _socialMedia: ISocialMediaMi;
    isSaving: boolean;

    constructor(private socialMediaService: SocialMediaMiService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ socialMedia }) => {
            this.socialMedia = socialMedia;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.socialMedia.id !== undefined) {
            this.subscribeToSaveResponse(this.socialMediaService.update(this.socialMedia));
        } else {
            this.subscribeToSaveResponse(this.socialMediaService.create(this.socialMedia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISocialMediaMi>>) {
        result.subscribe((res: HttpResponse<ISocialMediaMi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get socialMedia() {
        return this._socialMedia;
    }

    set socialMedia(socialMedia: ISocialMediaMi) {
        this._socialMedia = socialMedia;
    }
}
