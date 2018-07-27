/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { PhoneMiUpdateComponent } from 'app/entities/phone-mi/phone-mi-update.component';
import { PhoneMiService } from 'app/entities/phone-mi/phone-mi.service';
import { PhoneMi } from 'app/shared/model/phone-mi.model';

describe('Component Tests', () => {
    describe('PhoneMi Management Update Component', () => {
        let comp: PhoneMiUpdateComponent;
        let fixture: ComponentFixture<PhoneMiUpdateComponent>;
        let service: PhoneMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [PhoneMiUpdateComponent]
            })
                .overrideTemplate(PhoneMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PhoneMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PhoneMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.phone = entity;
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
                    const entity = new PhoneMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.phone = entity;
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
