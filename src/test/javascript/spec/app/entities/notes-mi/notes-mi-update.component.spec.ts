/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { NotesMiUpdateComponent } from 'app/entities/notes-mi/notes-mi-update.component';
import { NotesMiService } from 'app/entities/notes-mi/notes-mi.service';
import { NotesMi } from 'app/shared/model/notes-mi.model';

describe('Component Tests', () => {
    describe('NotesMi Management Update Component', () => {
        let comp: NotesMiUpdateComponent;
        let fixture: ComponentFixture<NotesMiUpdateComponent>;
        let service: NotesMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [NotesMiUpdateComponent]
            })
                .overrideTemplate(NotesMiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NotesMiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotesMiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NotesMi(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.notes = entity;
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
                    const entity = new NotesMi();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.notes = entity;
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
