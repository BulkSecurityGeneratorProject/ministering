/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MinisteringTestModule } from '../../../test.module';
import { FamilyMiDeleteDialogComponent } from 'app/entities/family-mi/family-mi-delete-dialog.component';
import { FamilyMiService } from 'app/entities/family-mi/family-mi.service';

describe('Component Tests', () => {
    describe('FamilyMi Management Delete Component', () => {
        let comp: FamilyMiDeleteDialogComponent;
        let fixture: ComponentFixture<FamilyMiDeleteDialogComponent>;
        let service: FamilyMiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [FamilyMiDeleteDialogComponent]
            })
                .overrideTemplate(FamilyMiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FamilyMiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilyMiService);
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
