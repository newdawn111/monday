#!/usr/bin/env node

/**
 * Interactive Setup Guide for Monday.com Solar Business Boards
 *
 * This script guides you through configuring your boards in the Monday.com UI.
 * It will open board URLs and show you exactly what to do step-by-step.
 */

const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Board IDs
const BOARDS = {
  sales: '5084268957',
  projects: '5084270237',
  financial: '5084271089'
};

// Track progress
let currentStep = 0;
const totalSteps = 31;

function openURL(url) {
  const command = process.platform === 'win32' ? 'start' :
                  process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${command} ${url}`);
}

function waitForUser(message) {
  return new Promise((resolve) => {
    rl.question(`\n${message}\n\n Press ENTER when done... `, () => {
      resolve();
    });
  });
}

function showProgress() {
  const percent = Math.round((currentStep / totalSteps) * 100);
  const bar = '█'.repeat(Math.floor(percent / 2)) + '░'.repeat(50 - Math.floor(percent / 2));
  console.log(`\n[$bar] ${percent}% Complete (${currentStep}/${totalSteps})`);
}

async function configureBoard() {
  console.clear();
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   Monday.com Solar Business Setup - Interactive Guide        ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  console.log('This script will guide you through configuring your boards.');
  console.log('It will open each board and show you exactly what to do.\n');

  await waitForUser('Ready to begin?');

  // ============================================================
  // BOARD 2: SALES PIPELINE
  // ============================================================

  console.clear();
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   BOARD 2: 💰 Sales Pipeline                                  ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const salesURL = `https://monday.com/boards/${BOARDS.sales}`;
  console.log(`Opening Sales Pipeline board...`);
  console.log(`URL: ${salesURL}\n`);
  openURL(salesURL);

  await waitForUser('Board opened. Ready to configure?');

  // Step 1: Lost Reason dropdown
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 1: Configure "Lost Reason" Dropdown                   │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Lost Reason" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options:');
  console.log('   • Price');
  console.log('   • Timeline');
  console.log('   • Competitor');
  console.log('   • Changed Mind');
  console.log('   • Other');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Lost Reason" dropdown?');

  // Step 2: Quoted Price currency
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 2: Configure "Quoted Price (ILS)" Currency            │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Quoted Price (ILS)" column header');
  console.log('2. Click on the column header');
  console.log('3. Click the gear icon ⚙ or "Customize"');
  console.log('4. In "Unit", select or type: ₪');
  console.log('5. Set position: Left');
  console.log('6. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Quoted Price (ILS)" currency?');

  // Step 3: Expected Profit currency
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 3: Configure "Expected Profit (ILS)" Currency         │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Expected Profit (ILS)" column header');
  console.log('2. Click on the column header');
  console.log('3. Click the gear icon ⚙ or "Customize"');
  console.log('4. In "Unit", select or type: ₪');
  console.log('5. Set position: Left');
  console.log('6. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Expected Profit (ILS)" currency?');

  // Step 4: Expected Margin percentage
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 4: Configure "Expected Margin %" Percentage           │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Expected Margin %" column header');
  console.log('2. Click on the column header');
  console.log('3. Click the gear icon ⚙ or "Customize"');
  console.log('4. In "Unit", select or type: %');
  console.log('5. Set position: Right');
  console.log('6. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Expected Margin %" percentage?');

  // Step 5: Probability percentage
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 5: Configure "Probability %" Percentage               │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Probability %" column header');
  console.log('2. Click on the column header');
  console.log('3. Click the gear icon ⚙ or "Customize"');
  console.log('4. In "Unit", select or type: %');
  console.log('5. Set position: Right');
  console.log('6. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Probability %" percentage?');

  // Step 6: Weighted Value formula
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 6: Create "Weighted Value" Formula Column             │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Click the "+" button to add a new column');
  console.log('2. Search for "Formula" and select it');
  console.log('3. Name it: Weighted Value');
  console.log('4. Enter this formula:');
  console.log('   {Quoted Price (ILS)} * {Probability %} / 100');
  console.log('5. Click "Create Column"');
  await waitForUser('✓ Created "Weighted Value" formula column?');

  // Step 7: Lead Time formula
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 7: Create "Lead Time (days)" Formula Column           │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Click the "+" button to add a new column');
  console.log('2. Search for "Formula" and select it');
  console.log('3. Name it: Lead Time (days)');
  console.log('4. Enter this formula:');
  console.log('   DAYS({Quote Date}, TODAY())');
  console.log('5. Click "Create Column"');
  await waitForUser('✓ Created "Lead Time (days)" formula column?');

  // ============================================================
  // BOARD 3: PROJECTS & INSTALLATION
  // ============================================================

  console.clear();
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   BOARD 3: 🔧 Projects & Installation                         ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const projectsURL = `https://monday.com/boards/${BOARDS.projects}`;
  console.log(`Opening Projects & Installation board...`);
  console.log(`URL: ${projectsURL}\n`);
  openURL(projectsURL);

  await waitForUser('Board opened. Ready to configure?');

  // Step 8: Customer Type dropdown
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 8: Configure "Customer Type" Dropdown                 │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Customer Type" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options:');
  console.log('   • Business');
  console.log('   • Private');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Customer Type" dropdown?');

  // Step 9: Project Status
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 9: Configure "Project Status" Labels & Colors         │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Project Status" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options with colors:');
  console.log('   • On Schedule (Green)');
  console.log('   • Delayed (Red)');
  console.log('   • Waiting on Permits (Orange)');
  console.log('   • Completed (Blue)');
  console.log('   • Issue (Pink)');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Project Status" labels?');

  // Step 10: Equipment Delivered
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 10: Configure "Equipment Delivered" Status            │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Equipment Delivered" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options with colors:');
  console.log('   • Not Ordered (Gray)');
  console.log('   • Ordered (Orange)');
  console.log('   • In Transit (Purple)');
  console.log('   • Delivered (Green)');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Equipment Delivered" status?');

  // Step 11: Inspection Status
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 11: Configure "Inspection Status" Labels              │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Inspection Status" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options with colors:');
  console.log('   • Not Started (Gray)');
  console.log('   • Private Inspector Done (Orange)');
  console.log('   • Waiting Elec. Co. (Purple)');
  console.log('   • All Complete (Green)');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Inspection Status" labels?');

  // Step 12: Contract Value currency
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 12: Configure "Contract Value (ILS)" Currency         │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Contract Value (ILS)" column header');
  console.log('2. Click on the column header');
  console.log('3. Click the gear icon ⚙ or "Customize"');
  console.log('4. In "Unit", select or type: ₪');
  console.log('5. Set position: Left');
  console.log('6. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Contract Value (ILS)" currency?');

  // Step 13: Project Cost currency
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 13: Configure "Project Cost (ILS)" Currency           │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Project Cost (ILS)" column header');
  console.log('2. Click on the column header');
  console.log('3. Click the gear icon ⚙ or "Customize"');
  console.log('4. In "Unit", select or type: ₪');
  console.log('5. Set position: Left');
  console.log('6. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Project Cost (ILS)" currency?');

  // Step 14: Project Profit formula
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 14: Create "Project Profit (ILS)" Formula Column      │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Click the "+" button to add a new column');
  console.log('2. Search for "Formula" and select it');
  console.log('3. Name it: Project Profit (ILS)');
  console.log('4. Enter this formula:');
  console.log('   {Contract Value (ILS)} - {Project Cost (ILS)}');
  console.log('5. Click "Create Column"');
  console.log('6. Then configure currency (₪) for this new column');
  await waitForUser('✓ Created "Project Profit (ILS)" formula column?');

  // Step 15: Profit Margin formula
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 15: Create "Profit Margin %" Formula Column           │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Click the "+" button to add a new column');
  console.log('2. Search for "Formula" and select it');
  console.log('3. Name it: Profit Margin %');
  console.log('4. Enter this formula:');
  console.log('   ({Contract Value (ILS)} - {Project Cost (ILS)}) / {Contract Value (ILS)} * 100');
  console.log('5. Click "Create Column"');
  console.log('6. Then configure percentage (%) for this new column');
  await waitForUser('✓ Created "Profit Margin %" formula column?');

  // Step 16: Project Duration formula
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 16: Create "Project Duration (days)" Formula Column   │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Click the "+" button to add a new column');
  console.log('2. Search for "Formula" and select it');
  console.log('3. Name it: Project Duration (days)');
  console.log('4. Enter this formula:');
  console.log('   DAYS({Installation Start Date}, {Installation End Date})');
  console.log('5. Click "Create Column"');
  await waitForUser('✓ Created "Project Duration (days)" formula column?');

  // ============================================================
  // BOARD 4: FINANCIAL MANAGEMENT
  // ============================================================

  console.clear();
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   BOARD 4: 📊 Financial Management                            ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const financialURL = `https://monday.com/boards/${BOARDS.financial}`;
  console.log(`Opening Financial Management board...`);
  console.log(`URL: ${financialURL}\n`);
  openURL(financialURL);

  await waitForUser('Board opened. Ready to configure?');

  // Step 17: Transaction Type dropdown
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 17: Configure "Transaction Type" Dropdown             │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Transaction Type" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options:');
  console.log('   • Invoice');
  console.log('   • Expense');
  console.log('   • Payment Received');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Transaction Type" dropdown?');

  // Step 18: Payment Method dropdown
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 18: Configure "Payment Method" Dropdown               │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Payment Method" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options:');
  console.log('   • Bank Transfer');
  console.log('   • Check');
  console.log('   • Credit Card');
  console.log('   • Cash');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Payment Method" dropdown?');

  // Step 19: Category dropdown
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 19: Configure "Category" Dropdown                     │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Category" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options:');
  console.log('   • Equipment');
  console.log('   • Labor');
  console.log('   • Permits');
  console.log('   • Marketing');
  console.log('   • Operations');
  console.log('   • Other');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Category" dropdown?');

  // Step 20: Payment Status
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 20: Configure "Payment Status" Labels & Colors        │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Payment Status" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options with colors:');
  console.log('   • Not Sent (Gray)');
  console.log('   • Sent (Orange)');
  console.log('   • Paid (Green)');
  console.log('   • Overdue (Red)');
  console.log('   • Cancelled (Dark Gray)');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Payment Status" labels?');

  // Step 21: ICount Status
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 21: Configure "ICount Status" Labels & Colors         │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "ICount Status" column header');
  console.log('2. Click on the column header');
  console.log('3. Click "Edit labels"');
  console.log('4. Add these options with colors:');
  console.log('   • Not in ICount (Gray)');
  console.log('   • Synced (Orange)');
  console.log('   • Sent from ICount (Purple)');
  console.log('   • Paid in ICount (Green)');
  console.log('5. Click "Done" or "Save"');
  await waitForUser('✓ Configured "ICount Status" labels?');

  // Step 22: Amount currency
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 22: Configure "Amount (ILS)" Currency                 │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Amount (ILS)" column header');
  console.log('2. Click on the column header');
  console.log('3. Click the gear icon ⚙ or "Customize"');
  console.log('4. In "Unit", select or type: ₪');
  console.log('5. Set position: Left');
  console.log('6. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Amount (ILS)" currency?');

  // Step 23: Tax Amount currency
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 23: Configure "Tax Amount (VAT)" Currency             │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Find the "Tax Amount (VAT)" column header');
  console.log('2. Click on the column header');
  console.log('3. Click the gear icon ⚙ or "Customize"');
  console.log('4. In "Unit", select or type: ₪');
  console.log('5. Set position: Left');
  console.log('6. Click "Done" or "Save"');
  await waitForUser('✓ Configured "Tax Amount (VAT)" currency?');

  // Step 24: Total with Tax formula
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 24: Create "Total with Tax" Formula Column            │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Click the "+" button to add a new column');
  console.log('2. Search for "Formula" and select it');
  console.log('3. Name it: Total with Tax');
  console.log('4. Enter this formula:');
  console.log('   {Amount (ILS)} + {Tax Amount (VAT)}');
  console.log('5. Click "Create Column"');
  console.log('6. Then configure currency (₪) for this new column');
  await waitForUser('✓ Created "Total with Tax" formula column?');

  // Step 25: Days Overdue formula
  currentStep++;
  showProgress();
  console.log('\n┌─────────────────────────────────────────────────────────────┐');
  console.log('│ Step 25: Create "Days Overdue" Formula Column              │');
  console.log('└─────────────────────────────────────────────────────────────┘\n');
  console.log('1. Click the "+" button to add a new column');
  console.log('2. Search for "Formula" and select it');
  console.log('3. Name it: Days Overdue');
  console.log('4. Enter this formula:');
  console.log('   IF({Payment Date} = "", IF({Due Date} < TODAY(), DAYS({Due Date}, TODAY()), 0), 0)');
  console.log('5. Click "Create Column"');
  await waitForUser('✓ Created "Days Overdue" formula column?');

  // ============================================================
  // COMPLETION
  // ============================================================

  currentStep = totalSteps;
  showProgress();

  console.clear();
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   🎉 SETUP COMPLETE! 🎉                                       ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  console.log('Congratulations! Your Monday.com Solar Business boards are');
  console.log('now fully configured and ready to use.\n');
  console.log('✅ Sales Pipeline - Configured');
  console.log('✅ Projects & Installation - Configured');
  console.log('✅ Financial Management - Configured\n');
  console.log('Next Steps:');
  console.log('──────────────────────────────────────────────────────────────\n');
  console.log('1. Set up automations (see COMPLETE_IMPLEMENTATION_GUIDE.md)');
  console.log('2. Configure ICount integration via Make.com');
  console.log('3. Create dashboards and widgets');
  console.log('4. Start adding your business data!\n');
  console.log('📚 Documentation:');
  console.log('   - COMPLETE_IMPLEMENTATION_GUIDE.md - Full business setup');
  console.log('   - API_PLAYGROUND_GUIDE.md - Advanced API usage');
  console.log('   - README.md - Overview and board links\n');
  console.log('Thank you for using the Monday.com Solar Business Setup! 🌞⚡\n');

  rl.close();
}

// Run the configuration
configureBoard().catch(error => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});
