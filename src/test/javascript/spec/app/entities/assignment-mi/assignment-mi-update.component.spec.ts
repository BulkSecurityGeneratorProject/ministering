/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { AssignmentMiUpdateComponent } from 'app/entities/assignment-mi/assignment-mi-update.component';
import { AssignmentMiService } from 'app/entities/assignment-mi/assignment-mi.service';
import { AssignmentMi } from 'app/shared/model/assignment-mi.model';

describe('Component Tests', () => {
    describe('AssignmentMi Management Update Component', () => {
        let comp: AssignmentMiUpdateComponent;
        let fixture: ComponentFixture<AssignmentMiUpdateComponent>;
        let service: AssignmentMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [AssignmentMiUpdateComponent]
            })
                .overrideTemplate(AssignmentMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AssignmentMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AssignmentMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.assignment = entity;
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
                    const entity = new AssignmentMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.assignment = entity;
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
