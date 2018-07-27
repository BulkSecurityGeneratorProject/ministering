/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { SocialMediaMiComponent } from 'app/entities/social-media-mi/social-media-mi.component';
import { SocialMediaMiService } from 'app/entities/social-media-mi/social-media-mi.service';
import { SocialMediaMi } from 'app/shared/model/social-media-mi.model';

describe('Component Tests', () => {
    describe('SocialMediaMi Management Component', () => {
        let comp: SocialMediaMiComponent;
        let fixture: ComponentFixture<SocialMediaMiComponent>;
        let service: SocialMediaMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [SocialMediaMiComponent],
                providers: []
            })
                .overrideTemplate(SocialMediaMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SocialMediaMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialMediaMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SocialMediaMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.socialMedias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
