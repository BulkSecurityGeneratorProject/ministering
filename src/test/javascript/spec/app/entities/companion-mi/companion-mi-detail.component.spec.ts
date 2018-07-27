/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { CompanionMiDetailComponent } from 'app/entities/companion-mi/companion-mi-detail.component';
import { CompanionMi } from 'app/shared/model/companion-mi.model';

describe('Component Tests', () => {
    describe('CompanionMi Management Detail Component', () => {
        let comp: CompanionMiDetailComponent;
        let fixture: ComponentFixture<CompanionMiDetailComponent>;
        const route = ({ data: of({ companion: new CompanionMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [CompanionMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanionMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanionMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.companion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
