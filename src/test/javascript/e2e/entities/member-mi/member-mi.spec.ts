import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MemberComponentsPage, MemberUpdatePage } from './member-mi.page-object';

describe('Member e2e test', () => {
    let navBarPage: NavBarPage;
    let memberUpdatePage: MemberUpdatePage;
    let memberComponentsPage: MemberComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Members', () => {
        navBarPage.goToEntity('member-mi');
        memberComponentsPage = new MemberComponentsPage();
        expect(memberComponentsPage.getTitle()).toMatch(/ministeringApp.member.home.title/);
    });

    it('should load create Member page', () => {
        memberComponentsPage.clickOnCreateButton();
        memberUpdatePage = new MemberUpdatePage();
        expect(memberUpdatePage.getPageTitle()).toMatch(/ministeringApp.member.home.createOrEditLabel/);
        memberUpdatePage.cancel();
    });

    it('should create and save Members', () => {
        memberComponentsPage.clickOnCreateButton();
        memberUpdatePage.typeSelectLastOption();
        memberUpdatePage.setFirstNameInput('firstName');
        expect(memberUpdatePage.getFirstNameInput()).toMatch('firstName');
        memberUpdatePage.setMiddleNameInput('middleName');
        expect(memberUpdatePage.getMiddleNameInput()).toMatch('middleName');
        memberUpdatePage.setLastNameInput('lastName');
        expect(memberUpdatePage.getLastNameInput()).toMatch('lastName');
        memberUpdatePage.setBirthdateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(memberUpdatePage.getBirthdateInput()).toContain('2001-01-01T02:30');
        memberUpdatePage.familySelectLastOption();
        memberUpdatePage.phoneSelectLastOption();
        memberUpdatePage.emailSelectLastOption();
        memberUpdatePage.socialMediaSelectLastOption();
        memberUpdatePage.notesSelectLastOption();
        memberUpdatePage.companionSelectLastOption();
        memberUpdatePage.ministrySelectLastOption();
        memberUpdatePage.save();
        expect(memberUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
