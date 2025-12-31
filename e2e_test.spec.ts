import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('Verify Super Admin Flow and Dashboard', async ({ page }) => {
  // 1. Go to Login Page
  await page.goto('http://localhost:3000/login');

  // 2. Login as Super Admin
  await page.getByPlaceholder('you@example.com').fill('ya3777250@gmail.com');
  await page.getByPlaceholder('••••••••').fill('Ak998877');
  await page.click('button[type="submit"]');

  // 3. Verify Redirect to Home (Wait for navigation)
  await page.waitForURL('http://localhost:3000/');

  // 4. Navigate to Admin Dashboard
  await page.goto('http://localhost:3000/admin');

  // 5. Verify Dashboard Loading
  await expect(page.locator('h1')).toContainText('Mission Control');

  // 6. Check Tabs
  await expect(page.locator('nav button').filter({ hasText: 'Talent Pipeline' })).toBeVisible();
  await expect(page.locator('nav button').filter({ hasText: 'Users' })).toBeVisible();
  await expect(page.locator('nav button').filter({ hasText: 'System Settings' })).toBeVisible();
});

test('Verify Regular User Cannot Access Admin Dashboard', async ({ page }) => {
  // 1. Go to Signup Page
  await page.goto('http://localhost:3000/signup');

  // 2. Create Regular Account
  const userEmail = `user-${Date.now()}@example.com`;
  const userPassword = 'password123';
  await page.getByPlaceholder('John Doe').fill('Regular User');
  await page.getByPlaceholder('name@example.com').fill(userEmail);
  await page.getByLabel('Password', { exact: true }).fill(userPassword);
  await page.getByLabel('Confirm Password').fill(userPassword);
  await page.click('button[type="submit"]');

  // 3. Wait for redirect to home page (successful signup/login)
  await page.waitForURL('http://localhost:3000/');
  await expect(page.locator('h1')).toContainText('Eventology');

  // 4. Attempt to access the admin dashboard
  await page.goto('http://localhost:3000/admin');

  // 5. Expect to be redirected back to the home page
  await page.waitForURL('http://localhost:3000/');
  await expect(page.locator('h1')).not.toContainText('Mission Control');
});

test('Verify Public Form Submission and Admin Data', async ({ page }) => {
  // 1. Go to Join Us (Public)
  await page.goto('http://localhost:3000/#join');

  // 2. Fill Form
  await page.getByPlaceholder('Your Full Name').fill('Test Candidate');
  await page.getByPlaceholder('Your Email').fill('test@candidate.com');
  await page.getByPlaceholder('Your Country').fill('Testland');
  await page.getByPlaceholder('Your University').fill('Test University');
  await page.getByPlaceholder('Your Age').fill('25');
  await page.locator('select[aria-label="I am a..."]').selectOption('Beginner');
  await page.getByPlaceholder('Your Specialty (e.g. Frontend, Backend)').fill('Testing');
  await page.getByPlaceholder('Briefly tell us about your motivation...').fill('I want to learn.');
  await page.getByPlaceholder('https://...').fill('https://github.com/test');

  await page.click('button[type="submit"]:has-text("Submit Application")');

  // 3. Verify Success Message
  await expect(page.locator('text=Application Received!')).toBeVisible();

  // 4. Login as Admin
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('you@example.com').fill('ya3777250@gmail.com');
  await page.getByPlaceholder('••••••••').fill('Ak998877');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:3000/');

  // 5. Check Admin Dashboard for the new application
  await page.goto('http://localhost:3000/admin');
  await expect(page.locator('h3:has-text("Test Candidate")')).toBeVisible();
  await expect(page.locator('p:has-text("Test University")')).toBeVisible();
});

test('Verify Form Toggle Logic', async ({ page }) => {
    // 1. Login as Admin
    await page.goto('http://localhost:3000/login');
    await page.getByPlaceholder('you@example.com').fill('ya3777250@gmail.com');
    await page.getByPlaceholder('••••••••').fill('Ak998877');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/');

    // 2. Go to Admin Settings
    await page.goto('http://localhost:3000/admin');
    await page.click('nav button:has-text("System Settings")');

    // 3. Toggle Off
    await expect(page.locator('h3:has-text("Join Form Status")')).toBeVisible();
    await page.locator('button:has(svg.text-green-500)').click();
    await page.click('button:has-text("Save Changes")');
    await expect(page.locator('text=Settings saved!')).toBeVisible();

    // 4. Go to public site and verify the form is closed
    await page.goto('http://localhost:3000/#join');
    await expect(page.locator('h2:has-text("Applications are currently closed")')).toBeVisible();
    await expect(page.locator('button[type="submit"]:has-text("Submit Application")')).not.toBeVisible();

    // 5. Toggle On (Cleanup)
    await page.goto('http://localhost:3000/admin');
    await page.click('nav button:has-text("System Settings")');
    await page.locator('button:has(svg.text-slate-500)').click();
    await page.click('button:has-text("Save Changes")');
    await expect(page.locator('text=Settings saved!')).toBeVisible();
});
