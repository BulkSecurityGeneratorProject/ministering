/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { StewardshipMiDetailComponent } from 'app/entities/stewardship-mi/stewardship-mi-detail.component';
import { StewardshipMi } from 'app/shared/model/stewardship-mi.model';

describe('Component Tests', () => {
    describe('StewardshipMi Management Detail Component', () => {
        let comp: StewardshipMiDetailComponent;
        let fixture: ComponentFixture<StewardshipMiDetailComponent>;
        const route = ({ data: of({ stewardship: new StewardshipMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [StewardshipMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StewardshipMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StewardshipMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stewardship).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
