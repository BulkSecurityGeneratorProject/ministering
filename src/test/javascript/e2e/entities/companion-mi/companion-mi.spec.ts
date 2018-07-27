import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CompanionComponentsPage, CompanionUpdatePage } from './companion-mi.page-object';

describe('Companion e2e test', () => {
    let navBarPage: NavBarPage;
    let companionUpdatePage: CompanionUpdatePage;
    let companionComponentsPage: CompanionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Companions', () => {
        navBarPage.goToEntity('companion-mi');
        companionComponentsPage = new CompanionComponentsPage();
        expect(companionComponentsPage.getTitle()).toMatch(/ministeringApp.companion.home.title/);
    });

    it('should load create Companion page', () => {
        companionComponentsPage.clickOnCreateButton();
        companionUpdatePage = new CompanionUpdatePage();
        expect(companionUpdatePage.getPageTitle()).toMatch(/ministeringApp.companion.home.createOrEditLabel/);
        companionUpdatePage.cancel();
    });

    it('should create and save Companions', () => {
        companionComponentsPage.clickOnCreateButton();
        companionUpdatePage.save();
        expect(companionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
