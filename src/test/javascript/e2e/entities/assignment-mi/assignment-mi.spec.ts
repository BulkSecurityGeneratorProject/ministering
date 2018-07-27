import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { AssignmentComponentsPage, AssignmentUpdatePage } from './assignment-mi.page-object';

describe('Assignment e2e test', () => {
    let navBarPage: NavBarPage;
    let assignmentUpdatePage: AssignmentUpdatePage;
    let assignmentComponentsPage: AssignmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Assignments', () => {
        navBarPage.goToEntity('assignment-mi');
        assignmentComponentsPage = new AssignmentComponentsPage();
        expect(assignmentComponentsPage.getTitle()).toMatch(/ministeringApp.assignment.home.title/);
    });

    it('should load create Assignment page', () => {
        assignmentComponentsPage.clickOnCreateButton();
        assignmentUpdatePage = new AssignmentUpdatePage();
        expect(assignmentUpdatePage.getPageTitle()).toMatch(/ministeringApp.assignment.home.createOrEditLabel/);
        assignmentUpdatePage.cancel();
    });

    it('should create and save Assignments', () => {
        assignmentComponentsPage.clickOnCreateButton();
        assignmentUpdatePage.save();
        expect(assignmentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
