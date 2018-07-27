/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { CompanionMiUpdateComponent } from 'app/entities/companion-mi/companion-mi-update.component';
import { CompanionMiService } from 'app/entities/companion-mi/companion-mi.service';
import { CompanionMi } from 'app/shared/model/companion-mi.model';

describe('Component Tests', () => {
    describe('CompanionMi Management Update Component', () => {
        let comp: CompanionMiUpdateComponent;
        let fixture: ComponentFixture<CompanionMiUpdateComponent>;
        let service: CompanionMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [CompanionMiUpdateComponent]
            })
                .overrideTemplate(CompanionMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanionMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanionMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompanionMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.companion = entity;
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
                    const entity = new CompanionMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.companion = entity;
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
