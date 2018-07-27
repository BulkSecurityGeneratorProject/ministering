/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { StewardshipMiUpdateComponent } from 'app/entities/stewardship-mi/stewardship-mi-update.component';
import { StewardshipMiService } from 'app/entities/stewardship-mi/stewardship-mi.service';
import { StewardshipMi } from 'app/shared/model/stewardship-mi.model';

describe('Component Tests', () => {
    describe('StewardshipMi Management Update Component', () => {
        let comp: StewardshipMiUpdateComponent;
        let fixture: ComponentFixture<StewardshipMiUpdateComponent>;
        let service: StewardshipMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [StewardshipMiUpdateComponent]
            })
                .overrideTemplate(StewardshipMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StewardshipMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StewardshipMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StewardshipMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stewardship = entity;
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
                    const entity = new StewardshipMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.stewardship = entity;
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
