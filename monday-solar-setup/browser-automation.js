#!/usr/bin/env node

/**
 * Monday.com Browser Automation Script
 *
 * This script uses Puppeteer to automatically configure your Monday.com boards
 * by automating browser interactions (clicks, typing, etc.)
 *
 * IMPORTANT: You'll need to log into Monday.com manually once, then the script
 * will handle all the configuration automatically.
 */

const puppeteer = require('puppeteer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BOARDS = {
  sales: '5084268957',
  projects: '5084270237',
  financial: '5084271089'
};

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForUserToLogin(page) {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   LOGIN REQUIRED                                              ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  console.log('A browser window has opened. Please:');
  console.log('1. Log into your Monday.com account');
  console.log('2. Wait until you see your workspace/boards');
  console.log('3. Come back here and press ENTER\n');

  await question('Press ENTER after you\'ve logged in... ');
  console.log('\n✅ Great! Starting automation...\n');
}

async function configureDropdownColumn(page, columnTitle, options) {
  console.log(`\n🔧 Configuring "${columnTitle}" dropdown...`);

  try {
    // Find and click column header
    await page.waitForSelector(`[data-testid="column-header"]`, { timeout: 5000 });

    const columnHeaders = await page.$$('[data-testid="column-header"]');
    let found = false;

    for (const header of columnHeaders) {
      const text = await header.evaluate(el => el.textContent);
      if (text.includes(columnTitle)) {
        await header.click();
        found = true;
        break;
      }
    }

    if (!found) {
      console.log(`⚠️  Column "${columnTitle}" not found - skipping`);
      return false;
    }

    await sleep(1000);

    // Click "Edit labels" or similar option
    const editButton = await page.$('text=Edit labels');
    if (editButton) {
      await editButton.click();
      await sleep(1000);

      // Add each option
      for (const option of options) {
        // Find input field and type option
        const input = await page.$('input[placeholder*="label"], input[placeholder*="option"]');
        if (input) {
          await input.type(option);
          await input.press('Enter');
          await sleep(500);
        }
      }

      // Click Done/Save
      const doneButton = await page.$('text=Done, text=Save');
      if (doneButton) {
        await doneButton.click();
      }

      console.log(`✅ Configured "${columnTitle}"`);
      return true;
    }

    console.log(`⚠️  Could not find edit option for "${columnTitle}"`);
    return false;

  } catch (error) {
    console.log(`❌ Error configuring "${columnTitle}": ${error.message}`);
    return false;
  }
}

async function configureCurrencyColumn(page, columnTitle, symbol) {
  console.log(`\n🔧 Configuring "${columnTitle}" currency...`);

  try {
    // Similar approach to dropdown, but looking for customize/settings
    const columnHeaders = await page.$$('[data-testid="column-header"]');
    let found = false;

    for (const header of columnHeaders) {
      const text = await header.evaluate(el => el.textContent);
      if (text.includes(columnTitle)) {
        await header.click();
        found = true;
        break;
      }
    }

    if (!found) {
      console.log(`⚠️  Column "${columnTitle}" not found - skipping`);
      return false;
    }

    await sleep(1000);

    // Look for customize/settings option
    const customizeButton = await page.$('text=Customize, [aria-label="Customize"]');
    if (customizeButton) {
      await customizeButton.click();
      await sleep(1000);

      // Find unit/symbol input
      const symbolInput = await page.$('input[placeholder*="unit"], input[placeholder*="symbol"]');
      if (symbolInput) {
        await symbolInput.clear();
        await symbolInput.type(symbol);
        await sleep(500);
      }

      // Click Done/Save
      const doneButton = await page.$('text=Done, text=Save');
      if (doneButton) {
        await doneButton.click();
      }

      console.log(`✅ Configured "${columnTitle}" with ${symbol}`);
      return true;
    }

    console.log(`⚠️  Could not find customize option for "${columnTitle}"`);
    return false;

  } catch (error) {
    console.log(`❌ Error configuring "${columnTitle}": ${error.message}`);
    return false;
  }
}

async function createFormulaColumn(page, columnName, formula) {
  console.log(`\n🔧 Creating formula column "${columnName}"...`);

  try {
    // Click "+" to add column
    const addButton = await page.$('[aria-label="Add column"], text=Add column');
    if (addButton) {
      await addButton.click();
      await sleep(1000);

      // Search for "Formula"
      const searchInput = await page.$('input[placeholder*="Search"]');
      if (searchInput) {
        await searchInput.type('Formula');
        await sleep(500);
      }

      // Click Formula option
      const formulaOption = await page.$('text=Formula');
      if (formulaOption) {
        await formulaOption.click();
        await sleep(1000);

        // Enter column name
        const nameInput = await page.$('input[placeholder*="name"]');
        if (nameInput) {
          await nameInput.clear();
          await nameInput.type(columnName);
        }

        // Enter formula
        const formulaInput = await page.$('textarea, input[placeholder*="formula"]');
        if (formulaInput) {
          await formulaInput.type(formula);
          await sleep(500);
        }

        // Click Create/Add
        const createButton = await page.$('text=Create, text=Add column');
        if (createButton) {
          await createButton.click();
        }

        console.log(`✅ Created formula column "${columnName}"`);
        return true;
      }
    }

    console.log(`⚠️  Could not create formula column "${columnName}"`);
    return false;

  } catch (error) {
    console.log(`❌ Error creating formula "${columnName}": ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   Monday.com Browser Automation                              ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  console.log('This script will automatically configure your boards by');
  console.log('controlling your browser and clicking through the UI.\n');
  console.log('⚠️  IMPORTANT:');
  console.log('- You must have Chrome/Chromium installed');
  console.log('- You\'ll need to log into Monday.com once');
  console.log('- Then the script handles everything automatically\n');

  const confirm = await question('Ready to start? (yes/no): ');
  if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
    console.log('Cancelled.');
    rl.close();
    return;
  }

  console.log('\n🚀 Launching browser...\n');

  const browser = await puppeteer.launch({
    headless: false, // Show browser so you can see what's happening
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();

  try {
    // Navigate to Monday.com
    console.log('📱 Opening Monday.com...');
    await page.goto('https://monday.com/login', { waitUntil: 'networkidle2' });

    // Wait for user to log in
    await waitForUserToLogin(page);

    // ============================================================
    // SALES PIPELINE BOARD
    // ============================================================

    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║   CONFIGURING: Sales Pipeline                                 ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');

    await page.goto(`https://monday.com/boards/${BOARDS.sales}`, { waitUntil: 'networkidle2' });
    await sleep(2000);

    // Configure dropdowns and settings
    await configureDropdownColumn(page, 'Lost Reason', ['Price', 'Timeline', 'Competitor', 'Changed Mind', 'Other']);
    await configureCurrencyColumn(page, 'Quoted Price', '₪');
    await configureCurrencyColumn(page, 'Expected Profit', '₪');
    await configureCurrencyColumn(page, 'Expected Margin', '%');
    await configureCurrencyColumn(page, 'Probability', '%');

    // Create formulas
    await createFormulaColumn(page, 'Weighted Value', '{Quoted Price (ILS)} * {Probability %} / 100');
    await createFormulaColumn(page, 'Lead Time (days)', 'DAYS({Quote Date}, TODAY())');

    // ============================================================
    // PROJECTS & INSTALLATION BOARD
    // ============================================================

    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║   CONFIGURING: Projects & Installation                       ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');

    await page.goto(`https://monday.com/boards/${BOARDS.projects}`, { waitUntil: 'networkidle2' });
    await sleep(2000);

    await configureDropdownColumn(page, 'Customer Type', ['Business', 'Private']);
    await configureCurrencyColumn(page, 'Contract Value', '₪');
    await configureCurrencyColumn(page, 'Project Cost', '₪');

    await createFormulaColumn(page, 'Project Profit (ILS)', '{Contract Value (ILS)} - {Project Cost (ILS)}');
    await createFormulaColumn(page, 'Profit Margin %', '({Contract Value (ILS)} - {Project Cost (ILS)}) / {Contract Value (ILS)} * 100');
    await createFormulaColumn(page, 'Project Duration (days)', 'DAYS({Installation Start Date}, {Installation End Date})');

    // ============================================================
    // FINANCIAL MANAGEMENT BOARD
    // ============================================================

    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║   CONFIGURING: Financial Management                          ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');

    await page.goto(`https://monday.com/boards/${BOARDS.financial}`, { waitUntil: 'networkidle2' });
    await sleep(2000);

    await configureDropdownColumn(page, 'Transaction Type', ['Invoice', 'Expense', 'Payment Received']);
    await configureDropdownColumn(page, 'Payment Method', ['Bank Transfer', 'Check', 'Credit Card', 'Cash']);
    await configureDropdownColumn(page, 'Category', ['Equipment', 'Labor', 'Permits', 'Marketing', 'Operations', 'Other']);

    await configureCurrencyColumn(page, 'Amount', '₪');
    await configureCurrencyColumn(page, 'Tax Amount', '₪');

    await createFormulaColumn(page, 'Total with Tax', '{Amount (ILS)} + {Tax Amount (VAT)}');
    await createFormulaColumn(page, 'Days Overdue', 'IF({Payment Date} = "", IF({Due Date} < TODAY(), DAYS({Due Date}, TODAY()), 0), 0)');

    // ============================================================
    // COMPLETION
    // ============================================================

    console.log('\n\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║   🎉 AUTOMATION COMPLETE! 🎉                                  ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');
    console.log('The script has finished running!');
    console.log('Please review your boards to verify everything was configured.\n');
    console.log('Note: Some configurations may have failed due to UI changes.');
    console.log('You may need to manually verify and complete any missing items.\n');

    await question('Press ENTER to close the browser... ');

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
    rl.close();
  }
}

// Check if puppeteer is installed
try {
  require.resolve('puppeteer');
  main();
} catch (e) {
  console.error('❌ Puppeteer is not installed!');
  console.error('\nPlease run: npm install puppeteer');
  console.error('This will download Chrome and the automation tools needed.\n');
  process.exit(1);
}
