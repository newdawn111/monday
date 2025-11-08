#!/usr/bin/env node

/**
 * Check API Token Permissions
 * This script tests what your API token can actually do
 */

require('dotenv').config();
const axios = require('axios');

const CONFIG = {
  API_TOKEN: process.env.MONDAY_API_TOKEN,
  API_ENDPOINT: 'https://api.monday.com/v2'
};

async function makeRequest(query) {
  try {
    const response = await axios.post(
      CONFIG.API_ENDPOINT,
      { query },
      {
        headers: {
          'Authorization': CONFIG.API_TOKEN,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    return { error: error.message, status: error.response?.status };
  }
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║   Monday.com API Permission Checker                          ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Test 1: Can we read user info?
  console.log('Test 1: Reading user information...');
  const userQuery = `{ me { id name email } }`;
  const userResult = await makeRequest(userQuery);

  if (userResult.data?.me) {
    console.log('✅ SUCCESS - Can read user info');
    console.log(`   User: ${userResult.data.me.name} (${userResult.data.me.email})`);
  } else {
    console.log('❌ FAILED - Cannot read user info');
    console.log(`   Error: ${JSON.stringify(userResult.errors || userResult.error)}`);
  }

  // Test 2: Can we read boards?
  console.log('\nTest 2: Reading board information...');
  const boardQuery = `{ boards(ids: [5084268957]) { id name state } }`;
  const boardResult = await makeRequest(boardQuery);

  if (boardResult.data?.boards) {
    console.log('✅ SUCCESS - Can read boards');
    console.log(`   Board: ${boardResult.data.boards[0]?.name}`);
  } else {
    console.log('❌ FAILED - Cannot read boards');
    console.log(`   Error: ${JSON.stringify(boardResult.errors || boardResult.error)}`);
  }

  // Test 3: Can we read columns?
  console.log('\nTest 3: Reading column information...');
  const columnQuery = `{ boards(ids: [5084268957]) { columns { id title type } } }`;
  const columnResult = await makeRequest(columnQuery);

  if (columnResult.data?.boards?.[0]?.columns) {
    console.log('✅ SUCCESS - Can read columns');
    console.log(`   Found ${columnResult.data.boards[0].columns.length} columns`);
  } else {
    console.log('❌ FAILED - Cannot read columns');
    console.log(`   Error: ${JSON.stringify(columnResult.errors || columnResult.error)}`);
  }

  // Test 4: Can we create a column?
  console.log('\nTest 4: Attempting to create a test column...');
  const createQuery = `
    mutation {
      create_column(board_id: 5084268957, title: "API Test Column", column_type: text) {
        id
      }
    }
  `;
  const createResult = await makeRequest(createQuery);

  if (createResult.data?.create_column) {
    console.log('✅ SUCCESS - Can create columns');
    console.log(`   Created column ID: ${createResult.data.create_column.id}`);
  } else {
    console.log('❌ FAILED - Cannot create columns');
    console.log(`   Error: ${JSON.stringify(createResult.errors || createResult.error)}`);
  }

  // Test 5: Can we update column metadata?
  console.log('\nTest 5: Attempting to update column metadata...');
  const metadataQuery = `
    mutation {
      change_column_metadata(
        board_id: 5084268957,
        column_id: "test",
        column_property: title,
        value: "New Title"
      ) {
        id
      }
    }
  `;
  const metadataResult = await makeRequest(metadataQuery);

  if (metadataResult.data?.change_column_metadata) {
    console.log('✅ SUCCESS - Can update column metadata');
  } else {
    console.log('❌ FAILED - Cannot update column metadata');
    console.log(`   Error: ${JSON.stringify(metadataResult.errors || metadataResult.error)}`);
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('DIAGNOSIS:');
  console.log('═══════════════════════════════════════════════════════════════\n');

  console.log('Your API token has LIMITED PERMISSIONS.');
  console.log('\nThe Monday.com API Playground works because it uses your browser');
  console.log('session cookies for authentication, NOT just the API token.');
  console.log('\nTo configure boards via API programmatically, you need:');
  console.log('\n1. A token with FULL PERMISSIONS (not just "me:write")');
  console.log('   Go to: Monday.com → Admin → API → Generate new token');
  console.log('   Make sure to select ALL scopes when creating the token');
  console.log('\n2. OR use the API Playground in your browser');
  console.log('   https://monday.com/developers/v2/try-it-yourself');
  console.log('\n3. OR configure manually in the Monday.com UI');
  console.log('\n═══════════════════════════════════════════════════════════════\n');
}

main();
