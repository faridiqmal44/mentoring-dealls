const { test, expect, chromium } = require('@playwright/test');
const fs = require('fs');


test.describe('Register', () => {
    
    test('Register with Email | As Job Seeker / Mentee', async ({ page }) => {
        await page.goto('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring');
        await page.click('#dealls-navbar-register-btn');

        await page.click('a:has-text("Sign Up With Email"):first-child');

        const fullNameForm = page.locator('#fullName');
        await fullNameForm.fill('farid7');
        await page.locator('[type=submit]').click({ timeout: 0 });

        await page.locator('#jobSearchStatus').click();
        await page.locator('[name="Actively looking for the next 3 months "]').click();
        const whatsappForm = page.locator('#whatsapp');
        await whatsappForm.fill('62881082578607');
        const emailForm = page.locator('#email');
        await emailForm.fill('farid7@getnada.com');
        const campusForm = page.locator('#campus');
        await campusForm.click({ timeout: 0 });
        await campusForm.fill('Universitas', { timeout: 0 });
        await page.waitForSelector('.DropdownUniversity_popup_single__xlOzm >> .rc-virtual-list >> .ant-select-item-option', { timeout: 0 });
        await page.locator('.DropdownUniversity_popup_single__xlOzm >> .rc-virtual-list >> .ant-select-item-option').first().click({ timeout: 0 });
        await page.locator('#eligibility').click({ timeout: 0 });
        await page.waitForSelector('.YoEInput_eligibility_select__popup__EkF2v >> .rc-virtual-list >> .ant-select-item-option', { timeout: 0 });
        await page.locator('.YoEInput_eligibility_select__popup__EkF2v >> .rc-virtual-list >> .ant-select-item-option').first().click({ timeout: 0 });
        await page.locator('[type=submit]').click({ timeout: 0 });
        
        await page.click('button:has(p:text("Skip for now, my CV is not ready"))');
        await page.locator('[type=submit]').click();
        
        const companyNameForm = page.locator('#companyName');
        await companyNameForm.fill('pt');
        await page.waitForSelector('.dropdown_popup_single__76HQ5 >> .rc-virtual-list >> .ant-select-item-option', { timeout: 0 });
        await page.locator('.dropdown_popup_single__76HQ5 >> .rc-virtual-list >> .ant-select-item-option').first().click({ timeout: 0 });
        await page.locator('#roleLevel').click({ timeout: 0 });
        await page.waitForSelector('.dropdown_popup_single__76HQ5 >> .rc-virtual-list >> .ant-select-item-option', { timeout: 0 });
        await page.locator('.dropdown_popup_single__76HQ5 >> .rc-virtual-list >> .ant-select-item-option >> div:has-text("Associate / Officer")').click({ timeout: 10000 });
        const roleNameForm = page.locator('#roleName');
        await roleNameForm.click();
        await roleNameForm.fill('QA Software Engineer');
        await page.waitForSelector('.dropdown_popup_single__76HQ5 >> .rc-virtual-list >> .ant-select-item-option >> div:has-text("QA Software Engineer")', { timeout: 0 });
        await page.locator('.dropdown_popup_single__76HQ5 >> .rc-virtual-list >> .ant-select-item-option >> div:has-text("QA Software Engineer")').click({ timeout: 10000 });
        const startDateForm = page.locator('#startDate');
        await startDateForm.fill('05/2024');
        const endDateForm = page.locator('#endDate');
        await endDateForm.fill('05/2025');
        await page.locator('[type=submit]').click({ timeout: 10000 });
        
        await page.locator('.RoleCategoryDropdown_role_category_dropdown__yQYYr.ant-select-single').click({ timeout: 0 });
        await page.waitForSelector('.RoleCategoryDropdown_role_category_dropdown_popup__7H9jd >> .rc-virtual-list >> .ant-select-item-option', { timeout: 0 });
        await page.locator('.RoleCategoryDropdown_role_category_dropdown_popup__7H9jd >> .rc-virtual-list >> .ant-select-item-option >> div:has-text("IT & Engineering")').click({ timeout: 10000 });
        await page.check('label:has(span:text("QA / Test Engineer")) >> input[type="checkbox"]');
        await page.locator('[type=submit]').click({ timeout: 0 });
        
        const passwordForm = page.locator('#password');
        await passwordForm.fill('persibaink447');
        const passwordConfirmationForm = page.locator('#passwordConfirmation');
        await passwordConfirmationForm.fill('persibaink447');
        await page.check('#checkPrivacyPolicy');
        await page.locator('#dealls-onboarding-finish').click({ timeout: 0 });
    })

})

test.describe.only('Login', () => {

    // test.use({ storageState: undefined });

    test('Login with Email', async () => {
        test.setTimeout(60000);
        const storagePath = 'loginState.json';
        if (fs.existsSync(storagePath)) {
            fs.unlinkSync(storagePath);
            console.log('loginState.json dihapus untuk fresh login');
        }

        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        
        await page.goto('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring');
        await page.click('#dealls-navbar-login-btn');

        const loginBtn = page.locator('#dealls-navbar-login-btn');
        if (await loginBtn.isVisible()) {

            const basicEmailForm = page.locator('#basic_email');
            await basicEmailForm.fill('farid3@getnada.com');
            const basicPasswordForm = page.locator('#basic_password');
            await basicPasswordForm.fill('persibaink443');
            await page.locator('[type=submit]').click({ timeout: 0 });

            await expect(page.locator('span:has-text("Sign in success")')).toBeVisible({ timeout: 0 });
            const notificationButton = await page.locator('a[href="/notifications"]');
            await expect(notificationButton).toHaveCount(1, { timeout: 0 });
            await page.waitForURL('**/mentoring');
            expect(page.url()).toBe('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring');
            
            console.log('Login berhasil');
        } else {
            console.log('Sudah login, tidak perlu login ulang.');
        }
        

        await context.storageState({ path: 'loginState.json' });
        await browser.close();
    })
    
    test.describe.configure({ use: { storageState: 'loginState.json' } });
    
    test('Search Mentor', async ({ page }) => {
        await page.goto('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring');
        await page.locator('#searchMentor').fill('Kj Mentor', { timeout: 0 });
        await page.waitForSelector('.MentorCard_mentor_card__zMRXB', { timeout: 0 });
        const searchResult = await page.locator('.MentorCard_mentor_card__zMRXB >> h4:has-text("Kj Mentor")');
        await expect(searchResult).toBeVisible({ timeout: 0 });
    })
    
    test.describe.configure({ use: { storageState: 'loginState.json' } });

    test('Detail Mentor', async ({ page }) => {
        console.log('Detail Mentor');
        await page.goto('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring');
        await page.locator('#searchMentor').fill('Kj Mentor', { timeout: 0 });
        await page.waitForSelector('.MentorCard_mentor_card__zMRXB', { timeout: 0 });
        const searchResult = await page.locator('.MentorCard_mentor_card__zMRXB >> h4:has-text("Kj Mentor")');
        await expect(searchResult).toBeVisible({ timeout: 0 });
        await page.locator('.MentorCard_mentor_card__zMRXB >> h4:has-text("Kj Mentor")').click();
        expect(page.locator('h1:has-text("Kj Mentor")'));
        await page.waitForURL('**/mentoring/kj-mentor-002');
        expect(page.url()).toBe('https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring/kj-mentor-002');
    })

})
