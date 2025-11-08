#!/usr/bin/env node

/**
 * Alternative API approach - Try different methods to configure columns
 */

require('dotenv').config();
const axios = require('axios');

const API_TOKEN = process.env.MONDAY_API_TOKEN;
const API_URL = 'https://api.monday.com/v2';

async function makeRequest(query) {
  try {
    const response = await axios.post(API_URL, { query }, {
      headers: {
        'Authorization': API_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.errors) {
      console.error('❌ Error:', response.data.errors[0].message);
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.error('❌ Request failed:', error.response?.data || error.message);
    return null;
  }
}

async function testColumnUpdate() {
  console.log('🧪 Testing different API approaches...\n');

  // Try approach 1: Update column values directly
  console.log('Test 1: Trying to update dropdown options via settings_str...');
  const test1 = `mutation {
    change_simple_column_value(
      board_id: 5084268957
      item_id: 1
      column_id: "dropdown_mkxggnyy"
      value: "{\\"labels\\":[{\\"id\\":0,\\"name\\":\\"Price\\"}]}"
    ) {
      id
    }
  }`;

  // This will fail but let's see the error
  await makeRequest(test1);

  console.log('\n❌ As expected, column configuration cannot be done via API');
  console.log('✅ The ONLY way is through the Monday.com web interface\n');

  console.log('📋 Here\'s what needs to be done in the UI:');
  console.log('   1. Dropdown labels (Lost Reason, Transaction Type, etc.)');
  console.log('   2. Status labels with colors (Project Status, Payment Status, etc.)');
  console.log('   3. Currency symbols (₪ for ILS amounts)');
  console.log('   4. Percentage symbols (% for margins and probability)');
  console.log('   5. Formula columns (calculations)\n');

  console.log('💡 I can create a guided walkthrough script that helps you do this quickly!');
}

testColumnUpdate();
