import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISocialMediaMi } from 'app/shared/model/social-media-mi.model';

@Component({
    selector: 'jhi-social-media-mi-detail',
    templateUrl: './social-media-mi-detail.component.html'
})
export class SocialMediaMiDetailComponent implements OnInit {
    socialMedia: ISocialMediaMi;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ socialMedia }) => {
            this.socialMedia = socialMedia;
        });
    }

    previousState() {
        window.history.back();
    }
}
