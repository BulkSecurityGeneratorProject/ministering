import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrgComponentsPage, OrgUpdatePage } from './org-mi.page-object';

describe('Org e2e test', () => {
    let navBarPage: NavBarPage;
    let orgUpdatePage: OrgUpdatePage;
    let orgComponentsPage: OrgComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Orgs', () => {
        navBarPage.goToEntity('org-mi');
        orgComponentsPage = new OrgComponentsPage();
        expect(orgComponentsPage.getTitle()).toMatch(/ministeringApp.org.home.title/);
    });

    it('should load create Org page', () => {
        orgComponentsPage.clickOnCreateButton();
        orgUpdatePage = new OrgUpdatePage();
        expect(orgUpdatePage.getPageTitle()).toMatch(/ministeringApp.org.home.createOrEditLabel/);
        orgUpdatePage.cancel();
    });

    it('should create and save Orgs', () => {
        orgComponentsPage.clickOnCreateButton();
        orgUpdatePage.setNameInput('name');
        expect(orgUpdatePage.getNameInput()).toMatch('name');
        orgUpdatePage.memberSelectLastOption();
        orgUpdatePage.save();
        expect(orgUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
