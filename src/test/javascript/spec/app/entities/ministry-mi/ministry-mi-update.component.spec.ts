/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { MinistryMiUpdateComponent } from 'app/entities/ministry-mi/ministry-mi-update.component';
import { MinistryMiService } from 'app/entities/ministry-mi/ministry-mi.service';
import { MinistryMi } from 'app/shared/model/ministry-mi.model';

describe('Component Tests', () => {
    describe('MinistryMi Management Update Component', () => {
        let comp: MinistryMiUpdateComponent;
        let fixture: ComponentFixture<MinistryMiUpdateComponent>;
        let service: MinistryMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [MinistryMiUpdateComponent]
            })
                .overrideTemplate(MinistryMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MinistryMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MinistryMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MinistryMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ministry = entity;
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
                    const entity = new MinistryMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ministry = entity;
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
