/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { NotesMiDetailComponent } from 'app/entities/notes-mi/notes-mi-detail.component';
import { NotesMi } from 'app/shared/model/notes-mi.model';

describe('Component Tests', () => {
    describe('NotesMi Management Detail Component', () => {
        let comp: NotesMiDetailComponent;
        let fixture: ComponentFixture<NotesMiDetailComponent>;
        const route = ({ data: of({ notes: new NotesMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [NotesMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NotesMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NotesMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.notes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
