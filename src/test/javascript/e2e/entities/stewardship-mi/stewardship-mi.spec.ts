import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { StewardshipComponentsPage, StewardshipUpdatePage } from './stewardship-mi.page-object';

describe('Stewardship e2e test', () => {
    let navBarPage: NavBarPage;
    let stewardshipUpdatePage: StewardshipUpdatePage;
    let stewardshipComponentsPage: StewardshipComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Stewardships', () => {
        navBarPage.goToEntity('stewardship-mi');
        stewardshipComponentsPage = new StewardshipComponentsPage();
        expect(stewardshipComponentsPage.getTitle()).toMatch(/ministeringApp.stewardship.home.title/);
    });

    it('should load create Stewardship page', () => {
        stewardshipComponentsPage.clickOnCreateButton();
        stewardshipUpdatePage = new StewardshipUpdatePage();
        expect(stewardshipUpdatePage.getPageTitle()).toMatch(/ministeringApp.stewardship.home.createOrEditLabel/);
        stewardshipUpdatePage.cancel();
    });

    it('should create and save Stewardships', () => {
        stewardshipComponentsPage.clickOnCreateButton();
        stewardshipUpdatePage.assignmentSelectLastOption();
        stewardshipUpdatePage.ministrySelectLastOption();
        stewardshipUpdatePage.save();
        expect(stewardshipUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
