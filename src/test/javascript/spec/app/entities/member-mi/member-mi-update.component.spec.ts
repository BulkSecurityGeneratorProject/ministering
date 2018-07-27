/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { MemberMiUpdateComponent } from 'app/entities/member-mi/member-mi-update.component';
import { MemberMiService } from 'app/entities/member-mi/member-mi.service';
import { MemberMi } from 'app/shared/model/member-mi.model';

describe('Component Tests', () => {
    describe('MemberMi Management Update Component', () => {
        let comp: MemberMiUpdateComponent;
        let fixture: ComponentFixture<MemberMiUpdateComponent>;
        let service: MemberMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [MemberMiUpdateComponent]
            })
                .overrideTemplate(MemberMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MemberMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MemberMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.member = entity;
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
                    const entity = new MemberMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.member = entity;
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
