import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PhoneComponentsPage, PhoneUpdatePage } from './phone-mi.page-object';

describe('Phone e2e test', () => {
    let navBarPage: NavBarPage;
    let phoneUpdatePage: PhoneUpdatePage;
    let phoneComponentsPage: PhoneComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Phones', () => {
        navBarPage.goToEntity('phone-mi');
        phoneComponentsPage = new PhoneComponentsPage();
        expect(phoneComponentsPage.getTitle()).toMatch(/ministeringApp.phone.home.title/);
    });

    it('should load create Phone page', () => {
        phoneComponentsPage.clickOnCreateButton();
        phoneUpdatePage = new PhoneUpdatePage();
        expect(phoneUpdatePage.getPageTitle()).toMatch(/ministeringApp.phone.home.createOrEditLabel/);
        phoneUpdatePage.cancel();
    });

    it('should create and save Phones', () => {
        phoneComponentsPage.clickOnCreateButton();
        phoneUpdatePage.typeSelectLastOption();
        phoneUpdatePage.setNumberInput('number');
        expect(phoneUpdatePage.getNumberInput()).toMatch('number');
        phoneUpdatePage
            .getTextMsgOkayInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    phoneUpdatePage.getTextMsgOkayInput().click();
                    expect(phoneUpdatePage.getTextMsgOkayInput().isSelected()).toBeFalsy();
                } else {
                    phoneUpdatePage.getTextMsgOkayInput().click();
                    expect(phoneUpdatePage.getTextMsgOkayInput().isSelected()).toBeTruthy();
                }
            });
        phoneUpdatePage.save();
        expect(phoneUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
