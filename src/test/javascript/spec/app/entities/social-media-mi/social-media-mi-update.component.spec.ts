/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { SocialMediaMiUpdateComponent } from 'app/entities/social-media-mi/social-media-mi-update.component';
import { SocialMediaMiService } from 'app/entities/social-media-mi/social-media-mi.service';
import { SocialMediaMi } from 'app/shared/model/social-media-mi.model';

describe('Component Tests', () => {
    describe('SocialMediaMi Management Update Component', () => {
        let comp: SocialMediaMiUpdateComponent;
        let fixture: ComponentFixture<SocialMediaMiUpdateComponent>;
        let service: SocialMediaMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [SocialMediaMiUpdateComponent]
            })
                .overrideTemplate(SocialMediaMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SocialMediaMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SocialMediaMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SocialMediaMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.socialMedia = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SocialMediaMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.socialMedia = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
