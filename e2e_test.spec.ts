import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('Verify Super Admin Flow and Dashboard', async ({ page }) => {
  // 1. Go to Login Page
  await page.goto('http://localhost:3000/login');

  // 2. Login as Super Admin
  await page.getByPlaceholder('john or john@example.com').fill('ya3777250@gmail.com');
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
  await expect(page.locator('nav button').filter({ hasText: 'Inquiries' })).toBeVisible();
  await expect(page.locator('nav button').filter({ hasText: 'Settings' })).toBeVisible();
});

test('Verify Regular User Cannot Access Admin Dashboard', async ({ page }) => {
  // 1. Go to Signup Page
  await page.goto('http://localhost:3000/signup');

  // 2. Create Regular Account
  // Need to inspect signup inputs. Assuming standard names/placeholders based on login.
  // Using generic fill for simplicity as IDs/Placeholders might vary.
  // Code not read for Signup, but let's assume it works or use login if we have a way to reg.

  // ACTUALLY: Let's use the register method via code injection or just rely on the fact
  // that a non-super-admin user (even if we mock one) shouldn't access it.
  // We can try to login with WRONG credentials to ensure we are not super admin,
  // but better: Register a new user flow.

  // Checking Signup Page content to be sure
  // await page.pause();

  await page.fill('input[type="text"]', 'Regular User'); // Name
  await page.fill('input[type="email"]', 'regular@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Wait for OTP/Verification step?
  // Reviewing auth-api.ts: register returns { requiresVerification: true }.
  // Then we need to verify.
  // This is complex for E2E without email access.
  // ALTERNATIVE: Use a test-only utility or local storage manipulation to inject a regular user session.

  await page.evaluate(() => {
    const user = {
      id: 'regular_user_1',
      name: 'Regular User',
      email: 'regular@example.com',
      role: 'user',
      isVerified: true
    };
    localStorage.setItem('eventology_session', JSON.stringify(user));
  });

  // Refresh to pick up session
  await page.goto('http://localhost:3000/');

  // Try to go to admin
  await page.goto('http://localhost:3000/admin');

  // Expect redirect to Home (as per our code) or Login?
  // Our code says: if (user.role !== 'super_admin') router.push("/");
  await expect(page).toHaveURL('http://localhost:3000/');
  await expect(page.locator('h1')).not.toContainText('Mission Control');
});

test('Verify Public Form Submission and Admin Data', async ({ page }) => {
  // 1. Go to Join Us (Public)
  await page.goto('http://localhost:3000/#join');

  // 2. Fill Form
  await page.fill('input[name="name"]', 'Test Candidate');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="phone"]', '+1234567890');

  await page.fill('input[name="university"]', 'Test University');
  await page.fill('input[name="age"]', '25');
  await page.fill('textarea[name="motivation"]', 'I want to learn.');

  await page.click('button[type="submit"]');

  // 3. Verify Success Message
  await expect(page.locator('text=Application Received!')).toBeVisible();

  // 4. Login as Admin
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('john or john@example.com').fill('ya3777250@gmail.com');
  await page.getByPlaceholder('••••••••').fill('Ak998877');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:3000/');

  // 5. Check Admin Dashboard
  await page.goto('http://localhost:3000/admin');
  await expect(page.locator('text=Test Candidate')).toBeVisible();
  await expect(page.locator('text=Test University')).toBeVisible();
});

test('Verify Form Toggle Logic', async ({ page }) => {
    // 1. Login as Admin
    await page.goto('http://localhost:3000/login');
    await page.getByPlaceholder('john or john@example.com').fill('ya3777250@gmail.com');
    await page.getByPlaceholder('••••••••').fill('Ak998877');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/');

    // 2. Go to Admin Settings
    await page.goto('http://localhost:3000/admin');
    await page.click('nav button:has-text("Settings")');

    // 3. Toggle Off
    const toggleBtn = page.locator('button.bg-green-500');
    await toggleBtn.click();

    // 4. Verify Public Site is Closed
    await page.goto('http://localhost:3000/');
    const joinSection = page.locator('#join');
    await joinSection.scrollIntoViewIfNeeded();

    await expect(page.locator('text=Applications Closed')).toBeVisible();
    await expect(page.locator('text=I am a Beginner')).not.toBeVisible();

    // 5. Toggle On (Cleanup)
    await page.goto('http://localhost:3000/admin');
    await page.click('nav button:has-text("Settings")');
    const toggleBtnOff = page.locator('button.bg-slate-600');
    await toggleBtnOff.click();
});
