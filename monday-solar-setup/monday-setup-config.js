// Complete Monday.com Setup Script for Solar Systems Business
// Run these GraphQL mutations in order using Monday.com API Playground or Postman

const WORKSPACE_ID = 5241558;
const BOARD_IDS = {
  leadsManagement: 5084262112, // Already created
  salesPipeline: null,         // To be created
  projects: null,              // To be created
  financial: null              // To be created
};

// API endpoint: https://api.monday.com/v2
// Headers: { "Authorization": "YOUR_API_TOKEN", "Content-Type": "application/json" }

// ============================================
// BOARD 1: LEADS MANAGEMENT (ID: 5084262112)
// ============================================

// Step 1.1: Create Groups
const createLeadsGroups = [
  {
    mutation: `mutation {
      create_group(board_id: 5084262112, group_name: "New Leads") {
        id
        title
      }
    }`
  },
  {
    mutation: `mutation {
      create_group(board_id: 5084262112, group_name: "Contacted") {
        id
        title
      }
    }`
  },
  {
    mutation: `mutation {
      create_group(board_id: 5084262112, group_name: "Qualified") {
        id
        title
      }
    }`
  },
  {
    mutation: `mutation {
      create_group(board_id: 5084262112, group_name: "Not Interested") {
        id
        title
      }
    }`
  },
  {
    mutation: `mutation {
      create_group(board_id: 5084262112, group_name: "Converted to Sale") {
        id
        title
      }
    }`
  }
];

// Step 1.2: Create Columns for Leads Management
const createLeadsColumns = [
  // Column 1: Customer Type
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Customer Type"
        description: "Business or Private customer"
        column_type: dropdown
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'customerType'"
  },

  // Column 2: Contact Person
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Contact Person"
        description: "Main contact person name"
        column_type: text
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'contactPerson'"
  },

  // Column 3: Phone
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Phone"
        description: "Contact phone number"
        column_type: phone
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'phone'"
  },

  // Column 4: Email
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Email"
        description: "Contact email address"
        column_type: email
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'email'"
  },

  // Column 5: Location/Address
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Location/Address"
        description: "Customer location or address"
        column_type: text
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'location'"
  },

  // Column 6: Lead Source
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Lead Source"
        description: "Where the lead came from"
        column_type: dropdown
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'leadSource'"
  },

  // Column 7: Initial Interest
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Initial Interest"
        description: "Notes about what they're looking for"
        column_type: long_text
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'initialInterest'"
  },

  // Column 8: Estimated System Size
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Estimated System Size (kW)"
        description: "Estimated solar system size in kilowatts"
        column_type: numbers
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'systemSize'"
  },

  // Column 9: Estimated Budget
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Estimated Budget"
        description: "Customer's estimated budget in ILS"
        column_type: numbers
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'estimatedBudget'"
  },

  // Column 10: First Contact Date
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "First Contact Date"
        description: "Date of first contact with lead"
        column_type: date
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'firstContactDate'"
  },

  // Column 11: Last Contact Date
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Last Contact Date"
        description: "Date of most recent contact"
        column_type: date
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'lastContactDate'"
  },

  // Column 12: Next Follow-up
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Next Follow-up"
        description: "Scheduled next follow-up date"
        column_type: date
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'nextFollowup'"
  },

  // Column 13: Lead Status
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Lead Status"
        description: "Current status of the lead"
        column_type: status
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'leadStatus'"
  },

  // Column 14: Assigned To
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Assigned To"
        description: "Team member responsible for this lead"
        column_type: people
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'assignedTo'"
  },

  // Column 15: Notes
  {
    mutation: `mutation {
      create_column(
        board_id: 5084262112
        title: "Notes"
        description: "Additional notes and information"
        column_type: long_text
      ) {
        id
        title
        type
      }
    }`,
    note: "Save this column_id as 'notes'"
  }
];

// Step 1.3: Configure Customer Type Dropdown Labels
// Run AFTER creating the Customer Type column - replace CUSTOMER_TYPE_COLUMN_ID with actual ID
const configureCustomerTypeLabels = `mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "CUSTOMER_TYPE_COLUMN_ID"
    column_property: labels
    value: "{\\"0\\":{\\"name\\":\\"Business\\"},\\"1\\":{\\"name\\":\\"Private\\"}}"
  ) {
    id
  }
}`;

// Step 1.4: Configure Lead Source Dropdown Labels
// Run AFTER creating the Lead Source column - replace LEAD_SOURCE_COLUMN_ID with actual ID
const configureLeadSourceLabels = `mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "LEAD_SOURCE_COLUMN_ID"
    column_property: labels
    value: "{\\"0\\":{\\"name\\":\\"Website\\"},\\"1\\":{\\"name\\":\\"Referral\\"},\\"2\\":{\\"name\\":\\"Cold Call\\"},\\"3\\":{\\"name\\":\\"Social Media\\"},\\"4\\":{\\"name\\":\\"Trade Show\\"},\\"5\\":{\\"name\\":\\"Other\\"}}"
  ) {
    id
  }
}`;

// Step 1.5: Configure Lead Status Labels
// Run AFTER creating the Lead Status column - replace LEAD_STATUS_COLUMN_ID with actual ID
const configureLeadStatusLabels = `mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "LEAD_STATUS_COLUMN_ID"
    column_property: labels
    value: "{\\"0\\":{\\"name\\":\\"New\\",\\"color\\":\\"#579bfc\\"},\\"1\\":{\\"name\\":\\"In Contact\\",\\"color\\":\\"#a25ddc\\"},\\"2\\":{\\"name\\":\\"Needs Follow-up\\",\\"color\\":\\"#fdab3d\\"},\\"3\\":{\\"name\\":\\"Hot Lead\\",\\"color\\":\\"#e2445c\\"},\\"4\\":{\\"name\\":\\"Cold Lead\\",\\"color\\":\\"#c4c4c4\\"},\\"5\\":{\\"name\\":\\"Qualified\\",\\"color\\":\\"#00c875\\"}}"
  ) {
    id
  }
}`;

// Step 1.6: Configure Estimated Budget as Currency
// Run AFTER creating the Estimated Budget column - replace ESTIMATED_BUDGET_COLUMN_ID with actual ID
const configureEstimatedBudget = `mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "ESTIMATED_BUDGET_COLUMN_ID"
    column_property: unit
    value: "₪"
  ) {
    id
  }
}`;

// ============================================
// BOARD 2: SALES PIPELINE
// ============================================

// Step 2.1: Create Sales Pipeline Board
const createSalesPipelineBoard = `mutation {
  create_board(
    board_name: "💰 Sales Pipeline"
    board_kind: public
    workspace_id: 5241558
    description: "Manage sales process from quote to contract"
  ) {
    id
    name
  }
}`;
// SAVE THE RETURNED BOARD ID!

// Step 2.2: Create Groups for Sales Pipeline (use returned board_id)
const createSalesGroups = [
  "Information Gathering",
  "Site Survey Scheduled",
  "Proposal/Quote Sent",
  "Negotiation",
  "Contract Signing",
  "Planning & Licensing",
  "Contract Signed",
  "Lost/Cancelled"
];
// For each group: mutation { create_group(board_id: SALES_BOARD_ID, group_name: "GROUP_NAME") { id title } }

// Step 2.3: Create Sales Pipeline Columns
const createSalesColumns = [
  { title: "Customer Name", type: "text" },
  { title: "Customer Type", type: "dropdown", labels: ["Business", "Private"] },
  { title: "Contact Person", type: "text" },
  { title: "Phone", type: "phone" },
  { title: "Email", type: "email" },
  { title: "Location/Address", type: "text" },
  { title: "System Size (kW)", type: "numbers" },
  { title: "Quoted Price (ILS)", type: "numbers", format: "currency" },
  { title: "Expected Margin %", type: "numbers", format: "percentage" },
  { title: "Expected Profit (ILS)", type: "numbers", format: "currency" },
  { title: "Probability %", type: "numbers", format: "percentage" },
  { title: "Weighted Value", type: "formula", formula: "{Quoted Price (ILS)} * {Probability %} / 100" },
  { title: "Quote Date", type: "date" },
  { title: "Quote Valid Until", type: "date" },
  { title: "Expected Close Date", type: "date" },
  { title: "Technical Survey Date", type: "date" },
  { title: "Contract Date", type: "date" },
  { title: "Deal Stage", type: "status", labels: ["New", "In Progress", "Waiting on Customer", "Waiting on Us", "Ready to Close"] },
  { title: "Assigned Sales Manager", type: "people" },
  { title: "Deal Owner", type: "people" },
  { title: "Lead Time (days)", type: "formula", formula: "DAYS({Quote Date}, TODAY())" },
  { title: "Quote Document", type: "file" },
  { title: "Contract Document", type: "file" },
  { title: "Notes & Updates", type: "long_text" },
  { title: "Lost Reason", type: "dropdown", labels: ["Price", "Timeline", "Competitor", "Changed Mind", "Other"] }
];

// ============================================
// BOARD 3: PROJECTS & INSTALLATION
// ============================================

// Step 3.1: Create Projects Board
const createProjectsBoard = `mutation {
  create_board(
    board_name: "🔧 Projects & Installation"
    board_kind: public
    workspace_id: 5241558
    description: "Project execution and time tracking"
  ) {
    id
    name
  }
}`;

// Step 3.2: Projects Groups
const createProjectsGroups = [
  "Planning & Permits",
  "Scheduled",
  "In Progress",
  "Inspection Pending",
  "Completed",
  "On Hold"
];

// Step 3.3: Projects Columns (34 columns total)
const createProjectsColumns = [
  { title: "Project Name", type: "text" },
  { title: "Customer Name", type: "text" },
  { title: "Customer Type", type: "dropdown" },
  { title: "Contact Person", type: "text" },
  { title: "Phone", type: "phone" },
  { title: "Email", type: "email" },
  { title: "Installation Address", type: "text" },
  { title: "System Size (kW)", type: "numbers" },
  { title: "Contract Value (ILS)", type: "numbers", format: "currency" },
  { title: "Project Cost (ILS)", type: "numbers", format: "currency" },
  { title: "Project Profit (ILS)", type: "formula", formula: "{Contract Value (ILS)} - {Project Cost (ILS)}" },
  { title: "Profit Margin %", type: "formula", formula: "({Contract Value (ILS)} - {Project Cost (ILS)}) / {Contract Value (ILS)} * 100" },
  { title: "Contract Date", type: "date" },
  { title: "Permit Submission Date", type: "date" },
  { title: "Permit Approval Date", type: "date" },
  { title: "Technical Survey Date", type: "date" },
  { title: "Installation Start Date", type: "date" },
  { title: "Installation End Date", type: "date" },
  { title: "Private Inspector Date", type: "date" },
  { title: "Electricity Co. Inspection", type: "date" },
  { title: "Grid Connection Date", type: "date" },
  { title: "Project Duration (days)", type: "formula", formula: "DAYS({Installation Start Date}, {Installation End Date})" },
  { title: "Project Status", type: "status" },
  { title: "Project Manager", type: "people" },
  { title: "Installation Team", type: "people" },
  { title: "External Contractors", type: "text" },
  { title: "Time Tracked (hours)", type: "time_tracking" },
  { title: "Purchase Order #", type: "text" },
  { title: "Purchase Order Date", type: "date" },
  { title: "Equipment Delivered", type: "status" },
  { title: "Inspection Status", type: "status" },
  { title: "Project Documents", type: "file" },
  { title: "Project Notes", type: "long_text" },
  { title: "Issues/Blockers", type: "long_text" }
];

// ============================================
// BOARD 4: FINANCIAL MANAGEMENT
// ============================================

// Step 4.1: Create Financial Board
const createFinancialBoard = `mutation {
  create_board(
    board_name: "📊 Financial Management"
    board_kind: public
    workspace_id: 5241558
    description: "Invoicing, expenses, P&L tracking with ICount integration"
  ) {
    id
    name
  }
}`;

// Step 4.2: Financial Groups
const createFinancialGroups = [
  "Invoices to Create",
  "Invoices Sent",
  "Invoices Paid",
  "Overdue Invoices",
  "Expenses"
];

// Step 4.3: Financial Columns
const createFinancialColumns = [
  { title: "Transaction/Invoice #", type: "text" },
  { title: "Transaction Type", type: "dropdown", labels: ["Invoice", "Expense", "Payment Received"] },
  { title: "Customer/Vendor Name", type: "text" },
  { title: "Project Reference", type: "text" },
  { title: "Description", type: "long_text" },
  { title: "Amount (ILS)", type: "numbers", format: "currency" },
  { title: "Tax Amount (VAT)", type: "numbers", format: "currency" },
  { title: "Total with Tax", type: "formula", formula: "{Amount (ILS)} + {Tax Amount (VAT)}" },
  { title: "Invoice Date", type: "date" },
  { title: "Due Date", type: "date" },
  { title: "Payment Date", type: "date" },
  { title: "Days Overdue", type: "formula", formula: 'IF({Payment Date} = "", IF({Due Date} < TODAY(), DAYS({Due Date}, TODAY()), 0), 0)' },
  { title: "Payment Status", type: "status", labels: ["Not Sent", "Sent", "Paid", "Overdue", "Cancelled"] },
  { title: "Payment Method", type: "dropdown", labels: ["Bank Transfer", "Check", "Credit Card", "Cash"] },
  { title: "ICount Status", type: "status", labels: ["Not in ICount", "Synced", "Sent from ICount", "Paid in ICount"] },
  { title: "ICount Invoice Link", type: "link" },
  { title: "Category", type: "dropdown", labels: ["Equipment", "Labor", "Permits", "Marketing", "Operations", "Other"] },
  { title: "Assigned To", type: "people" },
  { title: "Invoice Document", type: "file" },
  { title: "Notes", type: "long_text" }
];

// ============================================
// EXPORT/USAGE INSTRUCTIONS
// ============================================

console.log(`
MONDAY.COM SETUP SCRIPT
========================

WORKSPACE ID: ${WORKSPACE_ID}
BOARD 1 (Leads): ${BOARD_IDS.leadsManagement}

HOW TO USE THIS SCRIPT:
-----------------------

1. Open Monday.com API Playground: https://monday.com/developers/v2/try-it-yourself
   OR use Postman with endpoint: https://api.monday.com/v2

2. Set Authorization Header:
   - Key: "Authorization"
   - Value: YOUR_MONDAY_API_TOKEN

3. Run mutations in this order:

   BOARD 1: LEADS MANAGEMENT
   -------------------------
   a) Run all mutations in createLeadsGroups array
   b) Run all mutations in createLeadsColumns array
   c) SAVE each column ID returned
   d) Replace column IDs in configuration mutations
   e) Run configureCustomerTypeLabels
   f) Run configureLeadSourceLabels
   g) Run configureLeadStatusLabels
   h) Run configureEstimatedBudget

   BOARD 2: SALES PIPELINE
   -----------------------
   a) Run createSalesPipelineBoard
   b) SAVE the board_id returned
   c) Create all groups
   d) Create all columns
   e) Configure dropdown/status labels

   BOARD 3: PROJECTS
   -----------------
   (Same process as Board 2)

   BOARD 4: FINANCIAL
   ------------------
   (Same process as Board 2)

4. After all boards are created, generate your complete .env file

TIPS:
-----
- Copy one mutation at a time
- Wait for response before next mutation
- Save all returned IDs
- Test each board after setup

Need help? Check the automated setup script!
`);

module.exports = {
  WORKSPACE_ID,
  BOARD_IDS,
  createLeadsGroups,
  createLeadsColumns,
  configureCustomerTypeLabels,
  configureLeadSourceLabels,
  configureLeadStatusLabels,
  configureEstimatedBudget,
  createSalesPipelineBoard,
  createProjectsBoard,
  createFinancialBoard
};
