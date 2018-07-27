/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MinisteringTestModule } from '../../../test.module';
import { MemberMiDeleteDialogComponent } from 'app/entities/member-mi/member-mi-delete-dialog.component';
import { MemberMiService } from 'app/entities/member-mi/member-mi.service';

describe('Component Tests', () => {
    describe('MemberMi Management Delete Component', () => {
        let comp: MemberMiDeleteDialogComponent;
        let fixture: ComponentFixture<MemberMiDeleteDialogComponent>;
        let service: MemberMiService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MinisteringTestModule],
                declarations: [MemberMiDeleteDialogComponent]
            })
                .overrideTemplate(MemberMiDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MemberMiDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MemberMiService);
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
