/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MinisteringTestModule } from '../../../test.module';
import { MemberMiDetailComponent } from 'app/entities/member-mi/member-mi-detail.component';
import { MemberMi } from 'app/shared/model/member-mi.model';

describe('Component Tests', () => {
    describe('MemberMi Management Detail Component', () => {
        let comp: MemberMiDetailComponent;
        let fixture: ComponentFixture<MemberMiDetailComponent>;
        const route = ({ data: of({ member: new MemberMi(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [MemberMiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MemberMiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MemberMiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.member).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
