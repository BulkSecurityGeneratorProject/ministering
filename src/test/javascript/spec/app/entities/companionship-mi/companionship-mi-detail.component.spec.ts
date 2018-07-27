/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { CompanionshipMiDetailComponent } from 'app/entities/companionship-mi/companionship-mi-detail.component';
import { CompanionshipMi } from 'app/shared/model/companionship-mi.model';

describe('Component Tests', () => {
    describe('CompanionshipMi Management Detail Component', () => {
        let comp: CompanionshipMiDetailComponent;
        let fixture: ComponentFixture<CompanionshipMiDetailComponent>;
        const route = ({ data: of({ companionship: new CompanionshipMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [CompanionshipMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanionshipMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanionshipMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.companionship).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
