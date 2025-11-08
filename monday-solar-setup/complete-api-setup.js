#!/usr/bin/env node

/**
 * Complete API-Based Monday.com Configuration
 *
 * This script attempts EVERY possible API configuration.
 * It will clearly report what succeeds and what fails.
 */

require('dotenv').config();
const axios = require('axios');

const CONFIG = {
  API_TOKEN: process.env.MONDAY_API_TOKEN,
  API_ENDPOINT: 'https://api.monday.com/v2',
  WORKSPACE_ID: process.env.WORKSPACE_ID || '5241558',
  BOARDS: {
    sales: '5084268957',
    projects: '5084270237',
    financial: '5084271089'
  }
};

// Colors for status labels
const COLORS = {
  green: 0,
  blue: 1,
  orange: 2,
  red: 3,
  purple: 4,
  gray: 8,
  pink: 9,
  darkGray: 11
};

const results = {
  successful: [],
  failed: [],
  manualStepsRequired: []
};

async function makeRequest(query, variables = {}) {
  try {
    const response = await axios.post(
      CONFIG.API_ENDPOINT,
      { query, variables },
      {
        headers: {
          'Authorization': CONFIG.API_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.errors) {
      return { success: false, errors: response.data.errors };
    }

    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
  results.successful.push(message);
}

function logFailure(message, reason) {
  console.log(`❌ ${message}`);
  console.log(`   Reason: ${reason}`);
  results.failed.push({ message, reason });
}

function logManualStep(step) {
  console.log(`⚠️  MANUAL: ${step}`);
  results.manualStepsRequired.push(step);
}

async function getColumnIds(boardId) {
  const query = `
    query {
      boards(ids: ${boardId}) {
        columns {
          id
          title
          type
        }
      }
    }
  `;

  const result = await makeRequest(query);
  if (result.success) {
    return result.data.boards[0].columns;
  }
  return [];
}

// ============================================================
// APPROACH 1: Try change_column_value for dropdown settings
// ============================================================

async function trySettingDropdownLabels(boardId, columnId, labels) {
  console.log(`\n🔧 Trying to set dropdown labels for column ${columnId}...`);

  // Method 1: Try change_simple_column_value
  const query1 = `
    mutation {
      change_simple_column_value(
        board_id: ${boardId},
        item_id: 1,
        column_id: "${columnId}",
        value: "${labels[0]}"
      ) {
        id
      }
    }
  `;

  const result1 = await makeRequest(query1);
  if (result1.success) {
    logSuccess(`Set dropdown value using change_simple_column_value`);
    return true;
  } else {
    logFailure(`change_simple_column_value`, JSON.stringify(result1.errors || result1.error));
  }

  return false;
}

// ============================================================
// APPROACH 2: Try updating column settings via change_column_metadata
// ============================================================

async function tryColumnMetadata(boardId, columnId, property, value) {
  console.log(`\n🔧 Trying change_column_metadata for ${property}...`);

  const query = `
    mutation {
      change_column_metadata(
        board_id: ${boardId},
        column_id: "${columnId}",
        column_property: ${property},
        value: "${value}"
      ) {
        id
      }
    }
  `;

  const result = await makeRequest(query);
  if (result.success) {
    logSuccess(`Set column ${property} to ${value}`);
    return true;
  } else {
    logFailure(`change_column_metadata (${property})`, JSON.stringify(result.errors || result.error));
  }

  return false;
}

// ============================================================
// APPROACH 3: Try creating columns with settings in creation
// ============================================================

async function tryCreateColumnWithSettings(boardId, title, type, settings) {
  console.log(`\n🔧 Trying to create column "${title}" with settings...`);

  const settingsJson = JSON.stringify(settings).replace(/"/g, '\\"');

  const query = `
    mutation {
      create_column(
        board_id: ${boardId},
        title: "${title}",
        column_type: ${type},
        defaults: "${settingsJson}"
      ) {
        id
        title
      }
    }
  `;

  const result = await makeRequest(query);
  if (result.success) {
    logSuccess(`Created column "${title}" with settings`);
    return result.data.create_column.id;
  } else {
    logFailure(`create_column with settings (${title})`, JSON.stringify(result.errors || result.error));
  }

  return null;
}

// ============================================================
// APPROACH 4: Try change_multiple_column_values
// ============================================================

async function tryMultipleColumnValues(boardId, itemId, columnValues) {
  console.log(`\n🔧 Trying change_multiple_column_values...`);

  const columnValuesJson = JSON.stringify(columnValues).replace(/"/g, '\\"');

  const query = `
    mutation {
      change_multiple_column_values(
        board_id: ${boardId},
        item_id: ${itemId},
        column_values: "${columnValuesJson}"
      ) {
        id
      }
    }
  `;

  const result = await makeRequest(query);
  if (result.success) {
    logSuccess(`Set multiple column values`);
    return true;
  } else {
    logFailure(`change_multiple_column_values`, JSON.stringify(result.errors || result.error));
  }

  return false;
}

// ============================================================
// MAIN CONFIGURATION ATTEMPTS
// ============================================================

async function configureSalesPipeline() {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   BOARD: Sales Pipeline (5084268957)                         ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const boardId = CONFIG.BOARDS.sales;
  const columns = await getColumnIds(boardId);

  console.log(`Found ${columns.length} columns in Sales Pipeline board\n`);

  // Try configuring Lost Reason dropdown
  const lostReasonCol = columns.find(c => c.title.includes('Lost Reason'));
  if (lostReasonCol) {
    console.log(`\n--- Configuring "Lost Reason" dropdown ---`);
    const labels = ['Price', 'Timeline', 'Competitor', 'Changed Mind', 'Other'];

    // Try different approaches
    await tryColumnMetadata(boardId, lostReasonCol.id, 'labels', JSON.stringify(labels));
    await tryColumnMetadata(boardId, lostReasonCol.id, 'settings', JSON.stringify({ labels }));

    logManualStep('Configure "Lost Reason" dropdown with: Price, Timeline, Competitor, Changed Mind, Other');
  }

  // Try configuring currency symbols
  const quotedPriceCol = columns.find(c => c.title.includes('Quoted Price'));
  if (quotedPriceCol) {
    console.log(`\n--- Configuring "Quoted Price (ILS)" currency ---`);

    await tryColumnMetadata(boardId, quotedPriceCol.id, 'unit', '₪');
    await tryColumnMetadata(boardId, quotedPriceCol.id, 'symbol', '₪');
    await tryColumnMetadata(boardId, quotedPriceCol.id, 'settings', JSON.stringify({ unit: '₪', symbol: '₪' }));

    logManualStep('Configure "Quoted Price (ILS)" with currency symbol ₪');
  }

  // Try configuring percentage
  const marginCol = columns.find(c => c.title.includes('Expected Margin'));
  if (marginCol) {
    console.log(`\n--- Configuring "Expected Margin %" percentage ---`);

    await tryColumnMetadata(boardId, marginCol.id, 'unit', '%');
    await tryColumnMetadata(boardId, marginCol.id, 'settings', JSON.stringify({ unit: '%' }));

    logManualStep('Configure "Expected Margin %" with percentage symbol %');
  }

  // Try creating formula column
  console.log(`\n--- Attempting to create "Weighted Value" formula ---`);
  const formulaSettings = {
    formula: '{Quoted Price (ILS)} * {Probability %} / 100'
  };

  await tryCreateColumnWithSettings(boardId, 'Weighted Value Test', 'formula', formulaSettings);
  logManualStep('Create "Weighted Value" formula: {Quoted Price (ILS)} * {Probability %} / 100');
}

async function configureProjectsBoard() {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   BOARD: Projects & Installation (5084270237)                ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const boardId = CONFIG.BOARDS.projects;
  const columns = await getColumnIds(boardId);

  console.log(`Found ${columns.length} columns in Projects board\n`);

  // Try configuring status labels with colors
  const projectStatusCol = columns.find(c => c.title.includes('Project Status'));
  if (projectStatusCol) {
    console.log(`\n--- Configuring "Project Status" labels ---`);

    const statusLabels = {
      0: 'On Schedule',
      1: 'Delayed',
      2: 'Waiting on Permits',
      3: 'Completed',
      4: 'Issue'
    };

    const statusSettings = {
      labels: statusLabels,
      labels_colors: {
        0: { color: COLORS.green },
        1: { color: COLORS.red },
        2: { color: COLORS.orange },
        3: { color: COLORS.blue },
        4: { color: COLORS.pink }
      }
    };

    await tryColumnMetadata(boardId, projectStatusCol.id, 'labels', JSON.stringify(statusLabels));
    await tryColumnMetadata(boardId, projectStatusCol.id, 'settings', JSON.stringify(statusSettings));

    logManualStep('Configure "Project Status" with labels and colors (On Schedule-Green, Delayed-Red, Waiting on Permits-Orange, Completed-Blue, Issue-Pink)');
  }

  // Try currency configuration
  const contractValueCol = columns.find(c => c.title.includes('Contract Value'));
  if (contractValueCol) {
    console.log(`\n--- Configuring "Contract Value (ILS)" currency ---`);

    await tryColumnMetadata(boardId, contractValueCol.id, 'unit', '₪');
    logManualStep('Configure "Contract Value (ILS)" with currency symbol ₪');
  }

  logManualStep('Create "Project Profit (ILS)" formula: {Contract Value (ILS)} - {Project Cost (ILS)}');
  logManualStep('Create "Profit Margin %" formula: ({Contract Value (ILS)} - {Project Cost (ILS)}) / {Contract Value (ILS)} * 100');
}

async function configureFinancialBoard() {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   BOARD: Financial Management (5084271089)                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  const boardId = CONFIG.BOARDS.financial;
  const columns = await getColumnIds(boardId);

  console.log(`Found ${columns.length} columns in Financial board\n`);

  // Try configuring Transaction Type dropdown
  const transactionTypeCol = columns.find(c => c.title.includes('Transaction Type'));
  if (transactionTypeCol) {
    console.log(`\n--- Configuring "Transaction Type" dropdown ---`);

    const labels = ['Invoice', 'Expense', 'Payment Received'];
    await tryColumnMetadata(boardId, transactionTypeCol.id, 'labels', JSON.stringify(labels));

    logManualStep('Configure "Transaction Type" dropdown: Invoice, Expense, Payment Received');
  }

  // Try configuring Payment Status
  const paymentStatusCol = columns.find(c => c.title.includes('Payment Status'));
  if (paymentStatusCol) {
    console.log(`\n--- Configuring "Payment Status" labels ---`);

    const statusSettings = {
      labels: {
        0: 'Not Sent',
        1: 'Sent',
        2: 'Paid',
        3: 'Overdue',
        4: 'Cancelled'
      }
    };

    await tryColumnMetadata(boardId, paymentStatusCol.id, 'labels', JSON.stringify(statusSettings.labels));

    logManualStep('Configure "Payment Status" labels: Not Sent-Gray, Sent-Orange, Paid-Green, Overdue-Red, Cancelled-Dark Gray');
  }

  logManualStep('Configure "Amount (ILS)" with currency symbol ₪');
  logManualStep('Create "Total with Tax" formula: {Amount (ILS)} + {Tax Amount (VAT)}');
  logManualStep('Create "Days Overdue" formula: IF({Payment Date} = "", IF({Due Date} < TODAY(), DAYS({Due Date}, TODAY()), 0), 0)');
}

// ============================================================
// GENERATE MANUAL STEPS GUIDE
// ============================================================

function generateManualGuide() {
  console.log('\n\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   CONFIGURATION SUMMARY                                       ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  console.log(`✅ Successful API configurations: ${results.successful.length}`);
  results.successful.forEach(msg => console.log(`   - ${msg}`));

  console.log(`\n❌ Failed API attempts: ${results.failed.length}`);
  results.failed.forEach(({ message, reason }) => {
    console.log(`   - ${message}`);
    console.log(`     ${reason.substring(0, 100)}...`);
  });

  console.log(`\n⚠️  Manual steps required: ${results.manualStepsRequired.length}\n`);

  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('MANUAL CONFIGURATION CHECKLIST');
  console.log('(These CANNOT be done via API - Monday.com limitation)\n');
  console.log('═══════════════════════════════════════════════════════════════\n');

  results.manualStepsRequired.forEach((step, index) => {
    console.log(`${index + 1}. ${step}\n`);
  });

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('HOW TO COMPLETE MANUAL STEPS:');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('For each step above:');
  console.log('1. Open the board in Monday.com');
  console.log('2. Click the column header');
  console.log('3. Click "Edit labels" or the gear icon ⚙');
  console.log('4. Add the labels/settings shown');
  console.log('5. Click "Done" or "Save"\n');

  console.log('Board URLs:');
  console.log(`• Sales Pipeline: https://monday.com/boards/${CONFIG.BOARDS.sales}`);
  console.log(`• Projects: https://monday.com/boards/${CONFIG.BOARDS.projects}`);
  console.log(`• Financial: https://monday.com/boards/${CONFIG.BOARDS.financial}`);
  console.log('\n');
}

// ============================================================
// RUN ALL CONFIGURATIONS
// ============================================================

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   Monday.com Complete API Configuration Attempt              ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
  console.log('This script will try EVERY possible API approach to configure');
  console.log('your boards. It will clearly show what works and what doesn\'t.\n');

  if (!CONFIG.API_TOKEN) {
    console.error('❌ ERROR: MONDAY_API_TOKEN not found in .env file');
    console.error('Please add your API token to the .env file and try again.');
    process.exit(1);
  }

  console.log('Starting comprehensive API configuration attempts...\n');

  try {
    await configureSalesPipeline();
    await sleep(1000);

    await configureProjectsBoard();
    await sleep(1000);

    await configureFinancialBoard();
    await sleep(1000);

    generateManualGuide();

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

main();
