/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { NotesMiComponent } from 'app/entities/notes-mi/notes-mi.component';
import { NotesMiService } from 'app/entities/notes-mi/notes-mi.service';
import { NotesMi } from 'app/shared/model/notes-mi.model';

describe('Component Tests', () => {
    describe('NotesMi Management Component', () => {
        let comp: NotesMiComponent;
        let fixture: ComponentFixture<NotesMiComponent>;
        let service: NotesMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [NotesMiComponent],
                providers: []
            })
                .overrideTemplate(NotesMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NotesMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotesMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NotesMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.notes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
