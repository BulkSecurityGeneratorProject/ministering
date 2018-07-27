import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MinistryComponentsPage, MinistryUpdatePage } from './ministry-mi.page-object';

describe('Ministry e2e test', () => {
    let navBarPage: NavBarPage;
    let ministryUpdatePage: MinistryUpdatePage;
    let ministryComponentsPage: MinistryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Ministries', () => {
        navBarPage.goToEntity('ministry-mi');
        ministryComponentsPage = new MinistryComponentsPage();
        expect(ministryComponentsPage.getTitle()).toMatch(/ministeringApp.ministry.home.title/);
    });

    it('should load create Ministry page', () => {
        ministryComponentsPage.clickOnCreateButton();
        ministryUpdatePage = new MinistryUpdatePage();
        expect(ministryUpdatePage.getPageTitle()).toMatch(/ministeringApp.ministry.home.createOrEditLabel/);
        ministryUpdatePage.cancel();
    });

    it('should create and save Ministries', () => {
        ministryComponentsPage.clickOnCreateButton();
        ministryUpdatePage.save();
        expect(ministryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
