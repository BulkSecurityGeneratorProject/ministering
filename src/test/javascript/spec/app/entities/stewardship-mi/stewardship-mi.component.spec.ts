/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MinisteringTestModule } from '../../../test.module';
import { StewardshipMiComponent } from 'app/entities/stewardship-mi/stewardship-mi.component';
import { StewardshipMiService } from 'app/entities/stewardship-mi/stewardship-mi.service';
import { StewardshipMi } from 'app/shared/model/stewardship-mi.model';

describe('Component Tests', () => {
    describe('StewardshipMi Management Component', () => {
        let comp: StewardshipMiComponent;
        let fixture: ComponentFixture<StewardshipMiComponent>;
        let service: StewardshipMiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [StewardshipMiComponent],
                providers: []
            })
                .overrideTemplate(StewardshipMiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StewardshipMiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StewardshipMiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new StewardshipMi(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.stewardships[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
