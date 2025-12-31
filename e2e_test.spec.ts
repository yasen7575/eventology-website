import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

// Helper to login
async function login(page, email, password) {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('you@example.com').fill(email);
  await page.getByPlaceholder('••••••••').fill(password);
  await page.click('button[type="submit"]');
}

test('Verify Super Admin Flow and Dashboard', async ({ page }) => {
  // Login as admin
  await login(page, 'ya3777250@gmail.com', 'Ak998877');

  // Verify redirect to admin dashboard
  await expect(page).toHaveURL('http://localhost:3000/admin');

  // Wait for the main heading to appear
  await page.waitForSelector('h1', { state: 'visible' });
  await expect(page.locator('h1')).toContainText('Mission Control');

  // Verify admin tabs are visible
  await expect(page.getByRole('button', { name: 'Talent Pipeline' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Users' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible();
});

test('Verify Regular User Cannot Access Admin Dashboard', async ({ page }) => {
  // Login as a regular user (no admin rights)
  await login(page, 'user@example.com', 'password123');

  // Should be redirected to home page after login
  await expect(page).toHaveURL('http://localhost:3000/');

  // Attempt to access admin dashboard directly
  await page.goto('http://localhost:3000/admin');

  // Should be redirected back to home page (protected route)
  await expect(page).toHaveURL('http://localhost:3000/');

  // Admin UI should not be rendered for regular users
  await expect(page.getByRole('button', { name: 'Talent Pipeline' })).not.toBeVisible();
});

test('Verify Public Form Submission and Admin Data', async ({ page }) => {
  // Fill public join form
  await page.goto('http://localhost:3000/#join');
  await page.getByPlaceholder('John Doe').fill('Test Candidate');
  await page.getByPlaceholder('john@example.com').fill('test@candidate.com');
  await page.getByPlaceholder('+20...').fill('0123456789');
  await page.getByPlaceholder('Nile University').fill('Test University');
  await page.getByPlaceholder('20', { exact: true }).fill('25');
  await page.getByPlaceholder('Tell us about your passion for events...').fill('I want to learn.');
  await page.click('button[type="submit"]');

  // Verify success message
  await expect(page.locator('text=Application Received!')).toBeVisible();

  // Login as admin to check the new application appears
  await login(page, 'ya3777250@gmail.com', 'Ak998877');
  await expect(page).toHaveURL('http://localhost:3000/admin');

  // The new application should be listed in the Talent Pipeline
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Test Candidate').first()).toBeVisible({ timeout: 10000 });
});

test('Verify Form Toggle Logic', async ({ page }) => {
  // Login as admin
  await login(page, 'ya3777250@gmail.com', 'Ak998877');
  await expect(page).toHaveURL('http://localhost:3000/admin');

  // Open Settings tab
  await page.getByRole('button', { name: 'Settings' }).click();

  // Verify the toggle works (turn off)
  await expect(page.getByRole('heading', { name: 'Recruitment Forms' })).toBeVisible();
  await page.locator('button').filter({ has: page.locator('span.rounded-full') }).click();
  await expect(page.locator('text=Settings saved!')).toBeVisible();

  // Public form should now be closed
  await page.goto('http://localhost:3000/#join');
  await expect(page.getByRole('heading', { name: 'Applications Closed' })).toBeVisible();
  await expect(page.locator('button[type="submit"]')).not.toBeVisible();

  // Turn the form back on (cleanup)
  await page.goto('http://localhost:3000/admin');
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.locator('button').filter({ has: page.locator('span.rounded-full') }).click();
  await expect(page.locator('text=Settings saved!')).toBeVisible();
});
