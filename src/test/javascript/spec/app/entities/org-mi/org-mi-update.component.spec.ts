/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { OrgMiUpdateComponent } from 'app/entities/org-mi/org-mi-update.component';
import { OrgMiService } from 'app/entities/org-mi/org-mi.service';
import { OrgMi } from 'app/shared/model/org-mi.model';

describe('Component Tests', () => {
    describe('OrgMi Management Update Component', () => {
        let comp: OrgMiUpdateComponent;
        let fixture: ComponentFixture<OrgMiUpdateComponent>;
        let service: OrgMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [OrgMiUpdateComponent]
            })
                .overrideTemplate(OrgMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrgMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrgMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrgMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.org = entity;
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
                    const entity = new OrgMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.org = entity;
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
