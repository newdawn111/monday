#!/usr/bin/env node

/**
 * Automated Monday.com Setup Script for Solar Business
 *
 * This script automatically creates and configures all boards, groups, and columns
 * for a solar systems business on Monday.com
 *
 * Prerequisites:
 * - Node.js installed
 * - Monday.com API token (get from: https://monday.com/developers/v2/try-it-yourself)
 *
 * Usage:
 *   npm install axios dotenv
 *   node automated-setup.js
 *
 * Or with token directly:
 *   MONDAY_API_TOKEN=your_token_here node automated-setup.js
 */

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  WORKSPACE_ID: 5241558,
  LEADS_BOARD_ID: 5084262112,
  API_ENDPOINT: 'https://api.monday.com/v2',
  API_TOKEN: process.env.MONDAY_API_TOKEN || '',
  DELAY_BETWEEN_REQUESTS: 500, // ms - to avoid rate limiting
};

// Results storage
const RESULTS = {
  boards: {},
  groups: {},
  columns: {},
  errors: []
};

// Utility: Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: Make GraphQL request
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
      console.error('❌ GraphQL Errors:', JSON.stringify(response.data.errors, null, 2));
      RESULTS.errors.push({
        query: query.substring(0, 100),
        errors: response.data.errors
      });
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.error('❌ Request Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    RESULTS.errors.push({
      query: query.substring(0, 100),
      error: error.message
    });
    return null;
  }
}

// ============================================
// BOARD 1: LEADS MANAGEMENT
// ============================================

async function setupLeadsBoard() {
  console.log('\n🔷 BOARD 1: LEADS MANAGEMENT (ID: ' + CONFIG.LEADS_BOARD_ID + ')');
  console.log('═══════════════════════════════════════════════════\n');

  // Step 1: Create Groups
  console.log('📁 Creating groups...');
  const groups = ['New Leads', 'Contacted', 'Qualified', 'Not Interested', 'Converted to Sale'];

  for (const groupName of groups) {
    const query = `mutation {
      create_group(board_id: ${CONFIG.LEADS_BOARD_ID}, group_name: "${groupName}") {
        id
        title
      }
    }`;

    const result = await makeRequest(query);
    if (result && result.create_group) {
      console.log(`  ✓ Created group: ${groupName} (ID: ${result.create_group.id})`);
      RESULTS.groups[groupName] = result.create_group.id;
    }
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Step 2: Create Columns
  console.log('\n📋 Creating columns...');

  const columns = [
    { title: 'Customer Type', type: 'dropdown', description: 'Business or Private customer' },
    { title: 'Contact Person', type: 'text', description: 'Main contact person name' },
    { title: 'Phone', type: 'phone', description: 'Contact phone number' },
    { title: 'Email', type: 'email', description: 'Contact email address' },
    { title: 'Location/Address', type: 'text', description: 'Customer location or address' },
    { title: 'Lead Source', type: 'dropdown', description: 'Where the lead came from' },
    { title: 'Initial Interest', type: 'long_text', description: 'Notes about what they\'re looking for' },
    { title: 'Estimated System Size (kW)', type: 'numbers', description: 'Estimated solar system size in kilowatts' },
    { title: 'Estimated Budget', type: 'numbers', description: 'Customer\'s estimated budget in ILS' },
    { title: 'First Contact Date', type: 'date', description: 'Date of first contact with lead' },
    { title: 'Last Contact Date', type: 'date', description: 'Date of most recent contact' },
    { title: 'Next Follow-up', type: 'date', description: 'Scheduled next follow-up date' },
    { title: 'Lead Status', type: 'status', description: 'Current status of the lead' },
    { title: 'Assigned To', type: 'people', description: 'Team member responsible for this lead' },
    { title: 'Notes', type: 'long_text', description: 'Additional notes and information' }
  ];

  for (const column of columns) {
    const query = `mutation {
      create_column(
        board_id: ${CONFIG.LEADS_BOARD_ID}
        title: "${column.title}"
        description: "${column.description}"
        column_type: ${column.type}
      ) {
        id
        title
        type
      }
    }`;

    const result = await makeRequest(query);
    if (result && result.create_column) {
      console.log(`  ✓ Created column: ${column.title} (ID: ${result.create_column.id})`);
      RESULTS.columns[column.title] = result.create_column.id;
    }
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Step 3: Configure dropdown/status labels
  console.log('\n⚙️  Configuring column labels...');

  // Customer Type
  if (RESULTS.columns['Customer Type']) {
    const query = `mutation {
      change_column_metadata(
        board_id: ${CONFIG.LEADS_BOARD_ID}
        column_id: "${RESULTS.columns['Customer Type']}"
        column_property: labels
        value: "{\\"0\\":{\\"name\\":\\"Business\\"},\\"1\\":{\\"name\\":\\"Private\\"}}"
      ) {
        id
      }
    }`;
    await makeRequest(query);
    console.log('  ✓ Configured Customer Type labels');
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Lead Source
  if (RESULTS.columns['Lead Source']) {
    const query = `mutation {
      change_column_metadata(
        board_id: ${CONFIG.LEADS_BOARD_ID}
        column_id: "${RESULTS.columns['Lead Source']}"
        column_property: labels
        value: "{\\"0\\":{\\"name\\":\\"Website\\"},\\"1\\":{\\"name\\":\\"Referral\\"},\\"2\\":{\\"name\\":\\"Cold Call\\"},\\"3\\":{\\"name\\":\\"Social Media\\"},\\"4\\":{\\"name\\":\\"Trade Show\\"},\\"5\\":{\\"name\\":\\"Other\\"}}"
      ) {
        id
      }
    }`;
    await makeRequest(query);
    console.log('  ✓ Configured Lead Source labels');
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Lead Status
  if (RESULTS.columns['Lead Status']) {
    const query = `mutation {
      change_column_metadata(
        board_id: ${CONFIG.LEADS_BOARD_ID}
        column_id: "${RESULTS.columns['Lead Status']}"
        column_property: labels
        value: "{\\"0\\":{\\"name\\":\\"New\\",\\"color\\":\\"#579bfc\\"},\\"1\\":{\\"name\\":\\"In Contact\\",\\"color\\":\\"#a25ddc\\"},\\"2\\":{\\"name\\":\\"Needs Follow-up\\",\\"color\\":\\"#fdab3d\\"},\\"3\\":{\\"name\\":\\"Hot Lead\\",\\"color\\":\\"#e2445c\\"},\\"4\\":{\\"name\\":\\"Cold Lead\\",\\"color\\":\\"#c4c4c4\\"},\\"5\\":{\\"name\\":\\"Qualified\\",\\"color\\":\\"#00c875\\"}}"
      ) {
        id
      }
    }`;
    await makeRequest(query);
    console.log('  ✓ Configured Lead Status labels');
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Estimated Budget - Currency
  if (RESULTS.columns['Estimated Budget']) {
    const query = `mutation {
      change_column_metadata(
        board_id: ${CONFIG.LEADS_BOARD_ID}
        column_id: "${RESULTS.columns['Estimated Budget']}"
        column_property: unit
        value: "₪"
      ) {
        id
      }
    }`;
    await makeRequest(query);
    console.log('  ✓ Configured Estimated Budget currency (ILS)');
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  console.log('\n✅ Leads Management board setup complete!');
}

// ============================================
// BOARD 2: SALES PIPELINE
// ============================================

async function setupSalesBoard() {
  console.log('\n🔷 BOARD 2: SALES PIPELINE');
  console.log('═══════════════════════════════════════════════════\n');

  // Step 1: Create Board
  console.log('📊 Creating Sales Pipeline board...');
  const createBoardQuery = `mutation {
    create_board(
      board_name: "💰 Sales Pipeline"
      board_kind: public
      workspace_id: ${CONFIG.WORKSPACE_ID}
      description: "Manage sales process from quote to contract"
    ) {
      id
      name
    }
  }`;

  const boardResult = await makeRequest(createBoardQuery);
  if (!boardResult || !boardResult.create_board) {
    console.error('❌ Failed to create Sales Pipeline board');
    return;
  }

  const salesBoardId = boardResult.create_board.id;
  RESULTS.boards['Sales Pipeline'] = salesBoardId;
  console.log(`  ✓ Created board: Sales Pipeline (ID: ${salesBoardId})`);
  await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);

  // Step 2: Create Groups
  console.log('\n📁 Creating groups...');
  const groups = [
    'Information Gathering',
    'Site Survey Scheduled',
    'Proposal/Quote Sent',
    'Negotiation',
    'Contract Signing',
    'Planning & Licensing',
    'Contract Signed',
    'Lost/Cancelled'
  ];

  for (const groupName of groups) {
    const query = `mutation {
      create_group(board_id: ${salesBoardId}, group_name: "${groupName}") {
        id
        title
      }
    }`;

    const result = await makeRequest(query);
    if (result && result.create_group) {
      console.log(`  ✓ Created group: ${groupName}`);
    }
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Step 3: Create Columns
  console.log('\n📋 Creating columns...');

  const columns = [
    { title: 'Customer Name', type: 'text' },
    { title: 'Customer Type', type: 'dropdown' },
    { title: 'Contact Person', type: 'text' },
    { title: 'Phone', type: 'phone' },
    { title: 'Email', type: 'email' },
    { title: 'Location/Address', type: 'text' },
    { title: 'System Size (kW)', type: 'numbers' },
    { title: 'Quoted Price (ILS)', type: 'numbers' },
    { title: 'Expected Margin %', type: 'numbers' },
    { title: 'Expected Profit (ILS)', type: 'numbers' },
    { title: 'Probability %', type: 'numbers' },
    { title: 'Quote Date', type: 'date' },
    { title: 'Quote Valid Until', type: 'date' },
    { title: 'Expected Close Date', type: 'date' },
    { title: 'Technical Survey Date', type: 'date' },
    { title: 'Contract Date', type: 'date' },
    { title: 'Deal Stage', type: 'status' },
    { title: 'Assigned Sales Manager', type: 'people' },
    { title: 'Deal Owner', type: 'people' },
    { title: 'Quote Document', type: 'file' },
    { title: 'Contract Document', type: 'file' },
    { title: 'Notes & Updates', type: 'long_text' },
    { title: 'Lost Reason', type: 'dropdown' }
  ];

  const salesColumns = {};
  for (const column of columns) {
    const query = `mutation {
      create_column(
        board_id: ${salesBoardId}
        title: "${column.title}"
        column_type: ${column.type}
      ) {
        id
        title
        type
      }
    }`;

    const result = await makeRequest(query);
    if (result && result.create_column) {
      console.log(`  ✓ Created column: ${column.title}`);
      salesColumns[column.title] = result.create_column.id;
    }
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Configure labels
  console.log('\n⚙️  Configuring column labels...');

  if (salesColumns['Customer Type']) {
    const query = `mutation {
      change_column_metadata(
        board_id: ${salesBoardId}
        column_id: "${salesColumns['Customer Type']}"
        column_property: labels
        value: "{\\"0\\":{\\"name\\":\\"Business\\"},\\"1\\":{\\"name\\":\\"Private\\"}}"
      ) { id }
    }`;
    await makeRequest(query);
    console.log('  ✓ Configured Customer Type labels');
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  if (salesColumns['Quoted Price (ILS)']) {
    const query = `mutation {
      change_column_metadata(
        board_id: ${salesBoardId}
        column_id: "${salesColumns['Quoted Price (ILS)']}"
        column_property: unit
        value: "₪"
      ) { id }
    }`;
    await makeRequest(query);
    console.log('  ✓ Configured currency for Quoted Price');
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  console.log('\n✅ Sales Pipeline board setup complete!');
}

// ============================================
// BOARD 3: PROJECTS & INSTALLATION
// ============================================

async function setupProjectsBoard() {
  console.log('\n🔷 BOARD 3: PROJECTS & INSTALLATION');
  console.log('═══════════════════════════════════════════════════\n');

  // Step 1: Create Board
  console.log('📊 Creating Projects board...');
  const createBoardQuery = `mutation {
    create_board(
      board_name: "🔧 Projects & Installation"
      board_kind: public
      workspace_id: ${CONFIG.WORKSPACE_ID}
      description: "Project execution and time tracking"
    ) {
      id
      name
    }
  }`;

  const boardResult = await makeRequest(createBoardQuery);
  if (!boardResult || !boardResult.create_board) {
    console.error('❌ Failed to create Projects board');
    return;
  }

  const projectsBoardId = boardResult.create_board.id;
  RESULTS.boards['Projects'] = projectsBoardId;
  console.log(`  ✓ Created board: Projects & Installation (ID: ${projectsBoardId})`);
  await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);

  // Step 2: Create Groups
  console.log('\n📁 Creating groups...');
  const groups = [
    'Planning & Permits',
    'Scheduled',
    'In Progress',
    'Inspection Pending',
    'Completed',
    'On Hold'
  ];

  for (const groupName of groups) {
    const query = `mutation {
      create_group(board_id: ${projectsBoardId}, group_name: "${groupName}") {
        id
        title
      }
    }`;

    const result = await makeRequest(query);
    if (result && result.create_group) {
      console.log(`  ✓ Created group: ${groupName}`);
    }
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Step 3: Create Columns
  console.log('\n📋 Creating columns...');

  const columns = [
    { title: 'Project Name', type: 'text' },
    { title: 'Customer Name', type: 'text' },
    { title: 'Customer Type', type: 'dropdown' },
    { title: 'Contact Person', type: 'text' },
    { title: 'Phone', type: 'phone' },
    { title: 'Email', type: 'email' },
    { title: 'Installation Address', type: 'text' },
    { title: 'System Size (kW)', type: 'numbers' },
    { title: 'Contract Value (ILS)', type: 'numbers' },
    { title: 'Project Cost (ILS)', type: 'numbers' },
    { title: 'Contract Date', type: 'date' },
    { title: 'Permit Submission Date', type: 'date' },
    { title: 'Permit Approval Date', type: 'date' },
    { title: 'Technical Survey Date', type: 'date' },
    { title: 'Installation Start Date', type: 'date' },
    { title: 'Installation End Date', type: 'date' },
    { title: 'Private Inspector Date', type: 'date' },
    { title: 'Electricity Co. Inspection', type: 'date' },
    { title: 'Grid Connection Date', type: 'date' },
    { title: 'Project Status', type: 'status' },
    { title: 'Project Manager', type: 'people' },
    { title: 'Installation Team', type: 'people' },
    { title: 'External Contractors', type: 'text' },
    { title: 'Time Tracked (hours)', type: 'time_tracking' },
    { title: 'Purchase Order #', type: 'text' },
    { title: 'Purchase Order Date', type: 'date' },
    { title: 'Equipment Delivered', type: 'status' },
    { title: 'Inspection Status', type: 'status' },
    { title: 'Project Documents', type: 'file' },
    { title: 'Project Notes', type: 'long_text' },
    { title: 'Issues/Blockers', type: 'long_text' }
  ];

  const projectsColumns = {};
  for (const column of columns) {
    const query = `mutation {
      create_column(
        board_id: ${projectsBoardId}
        title: "${column.title}"
        column_type: ${column.type}
      ) {
        id
        title
        type
      }
    }`;

    const result = await makeRequest(query);
    if (result && result.create_column) {
      console.log(`  ✓ Created column: ${column.title}`);
      projectsColumns[column.title] = result.create_column.id;
    }
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  console.log('\n✅ Projects & Installation board setup complete!');
}

// ============================================
// BOARD 4: FINANCIAL MANAGEMENT
// ============================================

async function setupFinancialBoard() {
  console.log('\n🔷 BOARD 4: FINANCIAL MANAGEMENT');
  console.log('═══════════════════════════════════════════════════\n');

  // Step 1: Create Board
  console.log('📊 Creating Financial board...');
  const createBoardQuery = `mutation {
    create_board(
      board_name: "📊 Financial Management"
      board_kind: public
      workspace_id: ${CONFIG.WORKSPACE_ID}
      description: "Invoicing, expenses, P&L tracking with ICount integration"
    ) {
      id
      name
    }
  }`;

  const boardResult = await makeRequest(createBoardQuery);
  if (!boardResult || !boardResult.create_board) {
    console.error('❌ Failed to create Financial board');
    return;
  }

  const financialBoardId = boardResult.create_board.id;
  RESULTS.boards['Financial'] = financialBoardId;
  console.log(`  ✓ Created board: Financial Management (ID: ${financialBoardId})`);
  await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);

  // Step 2: Create Groups
  console.log('\n📁 Creating groups...');
  const groups = [
    'Invoices to Create',
    'Invoices Sent',
    'Invoices Paid',
    'Overdue Invoices',
    'Expenses'
  ];

  for (const groupName of groups) {
    const query = `mutation {
      create_group(board_id: ${financialBoardId}, group_name: "${groupName}") {
        id
        title
      }
    }`;

    const result = await makeRequest(query);
    if (result && result.create_group) {
      console.log(`  ✓ Created group: ${groupName}`);
    }
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  // Step 3: Create Columns
  console.log('\n📋 Creating columns...');

  const columns = [
    { title: 'Transaction/Invoice #', type: 'text' },
    { title: 'Transaction Type', type: 'dropdown' },
    { title: 'Customer/Vendor Name', type: 'text' },
    { title: 'Project Reference', type: 'text' },
    { title: 'Description', type: 'long_text' },
    { title: 'Amount (ILS)', type: 'numbers' },
    { title: 'Tax Amount (VAT)', type: 'numbers' },
    { title: 'Invoice Date', type: 'date' },
    { title: 'Due Date', type: 'date' },
    { title: 'Payment Date', type: 'date' },
    { title: 'Payment Status', type: 'status' },
    { title: 'Payment Method', type: 'dropdown' },
    { title: 'ICount Status', type: 'status' },
    { title: 'ICount Invoice Link', type: 'link' },
    { title: 'Category', type: 'dropdown' },
    { title: 'Assigned To', type: 'people' },
    { title: 'Invoice Document', type: 'file' },
    { title: 'Notes', type: 'long_text' }
  ];

  const financialColumns = {};
  for (const column of columns) {
    const query = `mutation {
      create_column(
        board_id: ${financialBoardId}
        title: "${column.title}"
        column_type: ${column.type}
      ) {
        id
        title
        type
      }
    }`;

    const result = await makeRequest(query);
    if (result && result.create_column) {
      console.log(`  ✓ Created column: ${column.title}`);
      financialColumns[column.title] = result.create_column.id;
    }
    await sleep(CONFIG.DELAY_BETWEEN_REQUESTS);
  }

  console.log('\n✅ Financial Management board setup complete!');
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main() {
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║   MONDAY.COM SOLAR BUSINESS AUTOMATED SETUP       ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // Check for API token
  if (!CONFIG.API_TOKEN) {
    console.error('❌ ERROR: MONDAY_API_TOKEN not found!');
    console.log('\nPlease set your API token:');
    console.log('  export MONDAY_API_TOKEN=your_token_here');
    console.log('  node automated-setup.js\n');
    console.log('Get your token from: https://monday.com/developers/v2/try-it-yourself\n');
    process.exit(1);
  }

  console.log('⚙️  Configuration:');
  console.log(`  Workspace ID: ${CONFIG.WORKSPACE_ID}`);
  console.log(`  Leads Board ID: ${CONFIG.LEADS_BOARD_ID}`);
  console.log(`  API Token: ${CONFIG.API_TOKEN.substring(0, 10)}...`);
  console.log(`  Delay: ${CONFIG.DELAY_BETWEEN_REQUESTS}ms\n`);

  const startTime = Date.now();

  try {
    // Setup all boards
    await setupLeadsBoard();
    await setupSalesBoard();
    await setupProjectsBoard();
    await setupFinancialBoard();

    // Save results
    const resultsFile = path.join(__dirname, 'setup-results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(RESULTS, null, 2));

    // Summary
    console.log('\n╔═══════════════════════════════════════════════════╗');
    console.log('║              SETUP COMPLETE!                      ║');
    console.log('╚═══════════════════════════════════════════════════╝\n');

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️  Total time: ${duration}s\n`);

    console.log('📊 Summary:');
    console.log(`  ✓ Boards created: ${Object.keys(RESULTS.boards).length + 1}`); // +1 for leads
    console.log(`  ✓ Columns created: ${Object.keys(RESULTS.columns).length}`);
    console.log(`  ✓ Groups created: ${Object.keys(RESULTS.groups).length}`);

    if (RESULTS.errors.length > 0) {
      console.log(`  ⚠️  Errors encountered: ${RESULTS.errors.length}`);
      console.log('\nCheck setup-results.json for details.');
    }

    console.log('\n📁 Results saved to: setup-results.json');

    console.log('\n🔗 Board URLs:');
    console.log(`  • Leads Management: https://monday.com/boards/${CONFIG.LEADS_BOARD_ID}`);
    if (RESULTS.boards['Sales Pipeline']) {
      console.log(`  • Sales Pipeline: https://monday.com/boards/${RESULTS.boards['Sales Pipeline']}`);
    }
    if (RESULTS.boards['Projects']) {
      console.log(`  • Projects: https://monday.com/boards/${RESULTS.boards['Projects']}`);
    }
    if (RESULTS.boards['Financial']) {
      console.log(`  • Financial: https://monday.com/boards/${RESULTS.boards['Financial']}`);
    }

    console.log('\n✅ Your Monday.com workspace is ready for solar business management!\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, RESULTS };
