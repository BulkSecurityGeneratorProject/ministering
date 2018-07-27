/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MinisteringTestModule } from '../../../test.module';
import { StewardshipMiDeleteDialogComponent } from 'app/entities/stewardship-mi/stewardship-mi-delete-dialog.component';
import { StewardshipMiService } from 'app/entities/stewardship-mi/stewardship-mi.service';

describe('Component Tests', () => {
    describe('StewardshipMi Management Delete Component', () => {
        let comp: StewardshipMiDeleteDialogComponent;
        let fixture: ComponentFixture<StewardshipMiDeleteDialogComponent>;
        let service: StewardshipMiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [StewardshipMiDeleteDialogComponent]
            })
                .overrideTemplate(StewardshipMiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StewardshipMiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StewardshipMiService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
