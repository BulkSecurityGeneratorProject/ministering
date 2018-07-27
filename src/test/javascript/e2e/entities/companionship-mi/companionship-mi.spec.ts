import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CompanionshipComponentsPage, CompanionshipUpdatePage } from './companionship-mi.page-object';

describe('Companionship e2e test', () => {
    let navBarPage: NavBarPage;
    let companionshipUpdatePage: CompanionshipUpdatePage;
    let companionshipComponentsPage: CompanionshipComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Companionships', () => {
        navBarPage.goToEntity('companionship-mi');
        companionshipComponentsPage = new CompanionshipComponentsPage();
        expect(companionshipComponentsPage.getTitle()).toMatch(/ministeringApp.companionship.home.title/);
    });

    it('should load create Companionship page', () => {
        companionshipComponentsPage.clickOnCreateButton();
        companionshipUpdatePage = new CompanionshipUpdatePage();
        expect(companionshipUpdatePage.getPageTitle()).toMatch(/ministeringApp.companionship.home.createOrEditLabel/);
        companionshipUpdatePage.cancel();
    });

    it('should create and save Companionships', () => {
        companionshipComponentsPage.clickOnCreateButton();
        companionshipUpdatePage.setNameInput('name');
        expect(companionshipUpdatePage.getNameInput()).toMatch('name');
        companionshipUpdatePage.companionshipSelectLastOption();
        companionshipUpdatePage.notesSelectLastOption();
        companionshipUpdatePage.stewardshipSelectLastOption();
        companionshipUpdatePage.companionSelectLastOption();
        companionshipUpdatePage.ministrySelectLastOption();
        companionshipUpdatePage.save();
        expect(companionshipUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
