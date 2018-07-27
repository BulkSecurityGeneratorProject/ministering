/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { EmailMiUpdateComponent } from 'app/entities/email-mi/email-mi-update.component';
import { EmailMiService } from 'app/entities/email-mi/email-mi.service';
import { EmailMi } from 'app/shared/model/email-mi.model';

describe('Component Tests', () => {
    describe('EmailMi Management Update Component', () => {
        let comp: EmailMiUpdateComponent;
        let fixture: ComponentFixture<EmailMiUpdateComponent>;
        let service: EmailMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [EmailMiUpdateComponent]
            })
                .overrideTemplate(EmailMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmailMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmailMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.email = entity;
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
                    const entity = new EmailMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.email = entity;
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
