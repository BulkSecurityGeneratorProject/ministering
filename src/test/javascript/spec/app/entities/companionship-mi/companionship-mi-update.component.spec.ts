/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { CompanionshipMiUpdateComponent } from 'app/entities/companionship-mi/companionship-mi-update.component';
import { CompanionshipMiService } from 'app/entities/companionship-mi/companionship-mi.service';
import { CompanionshipMi } from 'app/shared/model/companionship-mi.model';

describe('Component Tests', () => {
    describe('CompanionshipMi Management Update Component', () => {
        let comp: CompanionshipMiUpdateComponent;
        let fixture: ComponentFixture<CompanionshipMiUpdateComponent>;
        let service: CompanionshipMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [CompanionshipMiUpdateComponent]
            })
                .overrideTemplate(CompanionshipMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanionshipMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanionshipMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompanionshipMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.companionship = entity;
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
                    const entity = new CompanionshipMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.companionship = entity;
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
