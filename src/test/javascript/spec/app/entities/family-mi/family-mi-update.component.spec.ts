/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { FamilyMiUpdateComponent } from 'app/entities/family-mi/family-mi-update.component';
import { FamilyMiService } from 'app/entities/family-mi/family-mi.service';
import { FamilyMi } from 'app/shared/model/family-mi.model';

describe('Component Tests', () => {
    describe('FamilyMi Management Update Component', () => {
        let comp: FamilyMiUpdateComponent;
        let fixture: ComponentFixture<FamilyMiUpdateComponent>;
        let service: FamilyMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [FamilyMiUpdateComponent]
            })
                .overrideTemplate(FamilyMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FamilyMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilyMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FamilyMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.family = entity;
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
                    const entity = new FamilyMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.family = entity;
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
