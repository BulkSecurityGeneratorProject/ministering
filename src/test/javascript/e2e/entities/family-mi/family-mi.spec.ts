import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { FamilyComponentsPage, FamilyUpdatePage } from './family-mi.page-object';

describe('Family e2e test', () => {
    let navBarPage: NavBarPage;
    let familyUpdatePage: FamilyUpdatePage;
    let familyComponentsPage: FamilyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Families', () => {
        navBarPage.goToEntity('family-mi');
        familyComponentsPage = new FamilyComponentsPage();
        expect(familyComponentsPage.getTitle()).toMatch(/ministeringApp.family.home.title/);
    });

    it('should load create Family page', () => {
        familyComponentsPage.clickOnCreateButton();
        familyUpdatePage = new FamilyUpdatePage();
        expect(familyUpdatePage.getPageTitle()).toMatch(/ministeringApp.family.home.createOrEditLabel/);
        familyUpdatePage.cancel();
    });

    it('should create and save Families', () => {
        familyComponentsPage.clickOnCreateButton();
        familyUpdatePage.setNameInput('name');
        expect(familyUpdatePage.getNameInput()).toMatch('name');
        familyUpdatePage.setCoupleNameInput('coupleName');
        expect(familyUpdatePage.getCoupleNameInput()).toMatch('coupleName');
        familyUpdatePage.setAddressInput('address');
        expect(familyUpdatePage.getAddressInput()).toMatch('address');
        familyUpdatePage.notesSelectLastOption();
        familyUpdatePage.assignmentSelectLastOption();
        familyUpdatePage.save();
        expect(familyUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
