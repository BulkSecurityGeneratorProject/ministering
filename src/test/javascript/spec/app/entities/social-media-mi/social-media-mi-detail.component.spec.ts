/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { SocialMediaMiDetailComponent } from 'app/entities/social-media-mi/social-media-mi-detail.component';
import { SocialMediaMi } from 'app/shared/model/social-media-mi.model';

describe('Component Tests', () => {
    describe('SocialMediaMi Management Detail Component', () => {
        let comp: SocialMediaMiDetailComponent;
        let fixture: ComponentFixture<SocialMediaMiDetailComponent>;
        const route = ({ data: of({ socialMedia: new SocialMediaMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [SocialMediaMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SocialMediaMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SocialMediaMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.socialMedia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
