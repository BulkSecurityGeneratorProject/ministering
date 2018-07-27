import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { EmailComponentsPage, EmailUpdatePage } from './email-mi.page-object';

describe('Email e2e test', () => {
    let navBarPage: NavBarPage;
    let emailUpdatePage: EmailUpdatePage;
    let emailComponentsPage: EmailComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Emails', () => {
        navBarPage.goToEntity('email-mi');
        emailComponentsPage = new EmailComponentsPage();
        expect(emailComponentsPage.getTitle()).toMatch(/ministeringApp.email.home.title/);
    });

    it('should load create Email page', () => {
        emailComponentsPage.clickOnCreateButton();
        emailUpdatePage = new EmailUpdatePage();
        expect(emailUpdatePage.getPageTitle()).toMatch(/ministeringApp.email.home.createOrEditLabel/);
        emailUpdatePage.cancel();
    });

    it('should create and save Emails', () => {
        emailComponentsPage.clickOnCreateButton();
        emailUpdatePage.typeSelectLastOption();
        emailUpdatePage.setAddressInput('address');
        expect(emailUpdatePage.getAddressInput()).toMatch('address');
        emailUpdatePage.save();
        expect(emailUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
