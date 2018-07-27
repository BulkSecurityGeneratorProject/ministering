/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MinisteringTestModule } from '../../../test.module';
import { MinistryMiDeleteDialogComponent } from 'app/entities/ministry-mi/ministry-mi-delete-dialog.component';
import { MinistryMiService } from 'app/entities/ministry-mi/ministry-mi.service';

describe('Component Tests', () => {
    describe('MinistryMi Management Delete Component', () => {
        let comp: MinistryMiDeleteDialogComponent;
        let fixture: ComponentFixture<MinistryMiDeleteDialogComponent>;
        let service: MinistryMiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [MinistryMiDeleteDialogComponent]
            })
                .overrideTemplate(MinistryMiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MinistryMiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MinistryMiService);
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
