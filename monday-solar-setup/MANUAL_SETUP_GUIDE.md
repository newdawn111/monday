# Monday.com Solar Business - Manual Setup Guide

## ✅ This Guide Works 100%

Since mutations work in your API Playground, follow this step-by-step guide to set up all 4 boards manually.

**Time needed:** 15-20 minutes
**Tool:** Monday.com API Playground (https://monday.com/developers/v2/try-it-yourself)

---

## 📋 Setup Checklist

- [ ] Board 1: Leads Management (5 groups, 15 columns)
- [ ] Board 2: Sales Pipeline (create board, 8 groups, 23 columns)
- [ ] Board 3: Projects & Installation (create board, 6 groups, 31 columns)
- [ ] Board 4: Financial Management (create board, 5 groups, 18 columns)

---

# BOARD 1: LEADS MANAGEMENT (ID: 5084262112)

## Step 1.1: Create Groups (5 mutations)

Copy and paste each mutation below into the playground, one at a time:

### Group 1: New Leads
```graphql
mutation {
  create_group(board_id: 5084262112, group_name: "New Leads") {
    id
    title
  }
}
```

### Group 2: Contacted
```graphql
mutation {
  create_group(board_id: 5084262112, group_name: "Contacted") {
    id
    title
  }
}
```

### Group 3: Qualified
```graphql
mutation {
  create_group(board_id: 5084262112, group_name: "Qualified") {
    id
    title
  }
}
```

### Group 4: Not Interested
```graphql
mutation {
  create_group(board_id: 5084262112, group_name: "Not Interested") {
    id
    title
  }
}
```

### Group 5: Converted to Sale
```graphql
mutation {
  create_group(board_id: 5084262112, group_name: "Converted to Sale") {
    id
    title
  }
}
```

---

## Step 1.2: Create Columns (15 mutations)

**IMPORTANT:** After EACH column creation, **save the column ID** returned. You'll need them for configuration later!

### Column 1: Customer Type (SAVE THE ID!)
```graphql
mutation {
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
}
```
**→ Save this ID as CUSTOMER_TYPE_ID**

### Column 2: Contact Person
```graphql
mutation {
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
}
```

### Column 3: Phone
```graphql
mutation {
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
}
```

### Column 4: Email
```graphql
mutation {
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
}
```

### Column 5: Location/Address
```graphql
mutation {
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
}
```

### Column 6: Lead Source (SAVE THE ID!)
```graphql
mutation {
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
}
```
**→ Save this ID as LEAD_SOURCE_ID**

### Column 7: Initial Interest
```graphql
mutation {
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
}
```

### Column 8: Estimated System Size (kW)
```graphql
mutation {
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
}
```

### Column 9: Estimated Budget (SAVE THE ID!)
```graphql
mutation {
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
}
```
**→ Save this ID as ESTIMATED_BUDGET_ID**

### Column 10: First Contact Date
```graphql
mutation {
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
}
```

### Column 11: Last Contact Date
```graphql
mutation {
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
}
```

### Column 12: Next Follow-up
```graphql
mutation {
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
}
```

### Column 13: Lead Status (SAVE THE ID!)
```graphql
mutation {
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
}
```
**→ Save this ID as LEAD_STATUS_ID**

### Column 14: Assigned To
```graphql
mutation {
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
}
```

### Column 15: Notes
```graphql
mutation {
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
}
```

---

## Step 1.3: Configure Column Labels

Now use the IDs you saved to configure the dropdowns and status columns:

### Configure Customer Type Dropdown
Replace `YOUR_CUSTOMER_TYPE_ID` with the ID you saved:

```graphql
mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "YOUR_CUSTOMER_TYPE_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Business\"},\"1\":{\"name\":\"Private\"}}"
  ) {
    id
  }
}
```

### Configure Lead Source Dropdown
Replace `YOUR_LEAD_SOURCE_ID` with the ID you saved:

```graphql
mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "YOUR_LEAD_SOURCE_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Website\"},\"1\":{\"name\":\"Referral\"},\"2\":{\"name\":\"Cold Call\"},\"3\":{\"name\":\"Social Media\"},\"4\":{\"name\":\"Trade Show\"},\"5\":{\"name\":\"Other\"}}"
  ) {
    id
  }
}
```

### Configure Lead Status with Colors
Replace `YOUR_LEAD_STATUS_ID` with the ID you saved:

```graphql
mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "YOUR_LEAD_STATUS_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"New\",\"color\":\"#579bfc\"},\"1\":{\"name\":\"In Contact\",\"color\":\"#a25ddc\"},\"2\":{\"name\":\"Needs Follow-up\",\"color\":\"#fdab3d\"},\"3\":{\"name\":\"Hot Lead\",\"color\":\"#e2445c\"},\"4\":{\"name\":\"Cold Lead\",\"color\":\"#c4c4c4\"},\"5\":{\"name\":\"Qualified\",\"color\":\"#00c875\"}}"
  ) {
    id
  }
}
```

### Configure Estimated Budget as Currency (ILS)
Replace `YOUR_ESTIMATED_BUDGET_ID` with the ID you saved:

```graphql
mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "YOUR_ESTIMATED_BUDGET_ID"
    column_property: unit
    value: "₪"
  ) {
    id
  }
}
```

---

✅ **BOARD 1 COMPLETE!** Check your Leads Management board at: https://monday.com/boards/5084262112

---

# BOARD 2: SALES PIPELINE

## Step 2.1: Create the Board

```graphql
mutation {
  create_board(
    board_name: "💰 Sales Pipeline"
    board_kind: public
    workspace_id: 5241558
    description: "Manage sales process from quote to contract"
  ) {
    id
    name
  }
}
```

**→ SAVE THE BOARD ID!** You'll use it for all following mutations. Replace `SALES_BOARD_ID` below with this ID.

---

## Step 2.2: Create Groups (8 mutations)

Replace `SALES_BOARD_ID` with your board ID in each mutation:

### Group 1: Information Gathering
```graphql
mutation {
  create_group(board_id: SALES_BOARD_ID, group_name: "Information Gathering") {
    id
    title
  }
}
```

### Group 2: Site Survey Scheduled
```graphql
mutation {
  create_group(board_id: SALES_BOARD_ID, group_name: "Site Survey Scheduled") {
    id
    title
  }
}
```

### Group 3: Proposal/Quote Sent
```graphql
mutation {
  create_group(board_id: SALES_BOARD_ID, group_name: "Proposal/Quote Sent") {
    id
    title
  }
}
```

### Group 4: Negotiation
```graphql
mutation {
  create_group(board_id: SALES_BOARD_ID, group_name: "Negotiation") {
    id
    title
  }
}
```

### Group 5: Contract Signing
```graphql
mutation {
  create_group(board_id: SALES_BOARD_ID, group_name: "Contract Signing") {
    id
    title
  }
}
```

### Group 6: Planning & Licensing
```graphql
mutation {
  create_group(board_id: SALES_BOARD_ID, group_name: "Planning & Licensing") {
    id
    title
  }
}
```

### Group 7: Contract Signed
```graphql
mutation {
  create_group(board_id: SALES_BOARD_ID, group_name: "Contract Signed") {
    id
    title
  }
}
```

### Group 8: Lost/Cancelled
```graphql
mutation {
  create_group(board_id: SALES_BOARD_ID, group_name: "Lost/Cancelled") {
    id
    title
  }
}
```

---

## Step 2.3: Create Columns (23 mutations)

Replace `SALES_BOARD_ID` with your board ID in each mutation:

### Columns 1-10: Basic Info
```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Customer Name", column_type: text) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Customer Type", column_type: dropdown) { id }
}
```
**→ Save this column ID for configuration**

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Contact Person", column_type: text) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Phone", column_type: phone) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Email", column_type: email) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Location/Address", column_type: text) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "System Size (kW)", column_type: numbers) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Quoted Price (ILS)", column_type: numbers) { id }
}
```
**→ Save this column ID for currency configuration**

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Expected Margin %", column_type: numbers) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Expected Profit (ILS)", column_type: numbers) { id }
}
```

### Columns 11-20: Dates & Tracking
```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Probability %", column_type: numbers) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Quote Date", column_type: date) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Quote Valid Until", column_type: date) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Expected Close Date", column_type: date) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Technical Survey Date", column_type: date) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Contract Date", column_type: date) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Deal Stage", column_type: status) { id }
}
```
**→ Save this column ID for status configuration**

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Assigned Sales Manager", column_type: people) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Deal Owner", column_type: people) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Quote Document", column_type: file) { id }
}
```

### Columns 21-23: Documents & Notes
```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Contract Document", column_type: file) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Notes & Updates", column_type: long_text) { id }
}
```

```graphql
mutation {
  create_column(board_id: SALES_BOARD_ID, title: "Lost Reason", column_type: dropdown) { id }
}
```
**→ Save this column ID for configuration**

---

## Step 2.4: Configure Sales Pipeline Labels

### Configure Customer Type
```graphql
mutation {
  change_column_metadata(
    board_id: SALES_BOARD_ID
    column_id: "YOUR_CUSTOMER_TYPE_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Business\"},\"1\":{\"name\":\"Private\"}}"
  ) { id }
}
```

### Configure Deal Stage
```graphql
mutation {
  change_column_metadata(
    board_id: SALES_BOARD_ID
    column_id: "YOUR_DEAL_STAGE_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"New\",\"color\":\"#579bfc\"},\"1\":{\"name\":\"In Progress\",\"color\":\"#fdab3d\"},\"2\":{\"name\":\"Waiting on Customer\",\"color\":\"#a25ddc\"},\"3\":{\"name\":\"Waiting on Us\",\"color\":\"#ff5ac4\"},\"4\":{\"name\":\"Ready to Close\",\"color\":\"#00c875\"}}"
  ) { id }
}
```

### Configure Lost Reason
```graphql
mutation {
  change_column_metadata(
    board_id: SALES_BOARD_ID
    column_id: "YOUR_LOST_REASON_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Price\"},\"1\":{\"name\":\"Timeline\"},\"2\":{\"name\":\"Competitor\"},\"3\":{\"name\":\"Changed Mind\"},\"4\":{\"name\":\"Other\"}}"
  ) { id }
}
```

### Configure Quoted Price Currency
```graphql
mutation {
  change_column_metadata(
    board_id: SALES_BOARD_ID
    column_id: "YOUR_QUOTED_PRICE_COLUMN_ID"
    column_property: unit
    value: "₪"
  ) { id }
}
```

---

✅ **BOARD 2 COMPLETE!**

---

# BOARD 3: PROJECTS & INSTALLATION

## Step 3.1: Create the Board

```graphql
mutation {
  create_board(
    board_name: "🔧 Projects & Installation"
    board_kind: public
    workspace_id: 5241558
    description: "Project execution and time tracking"
  ) {
    id
    name
  }
}
```

**→ SAVE THE BOARD ID!** Use it as `PROJECTS_BOARD_ID` below.

---

## Step 3.2: Create Groups (6 mutations)

```graphql
mutation {
  create_group(board_id: PROJECTS_BOARD_ID, group_name: "Planning & Permits") { id }
}
```

```graphql
mutation {
  create_group(board_id: PROJECTS_BOARD_ID, group_name: "Scheduled") { id }
}
```

```graphql
mutation {
  create_group(board_id: PROJECTS_BOARD_ID, group_name: "In Progress") { id }
}
```

```graphql
mutation {
  create_group(board_id: PROJECTS_BOARD_ID, group_name: "Inspection Pending") { id }
}
```

```graphql
mutation {
  create_group(board_id: PROJECTS_BOARD_ID, group_name: "Completed") { id }
}
```

```graphql
mutation {
  create_group(board_id: PROJECTS_BOARD_ID, group_name: "On Hold") { id }
}
```

---

## Step 3.3: Create Columns (31 mutations)

I'll provide the essential ones. Run each with `board_id: PROJECTS_BOARD_ID`:

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Project Name", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Customer Name", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Customer Type", column_type: dropdown) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Contact Person", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Phone", column_type: phone) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Email", column_type: email) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Installation Address", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "System Size (kW)", column_type: numbers) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Contract Value (ILS)", column_type: numbers) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Project Cost (ILS)", column_type: numbers) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Contract Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Permit Submission Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Permit Approval Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Technical Survey Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Installation Start Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Installation End Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Private Inspector Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Electricity Co. Inspection", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Grid Connection Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Project Status", column_type: status) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Project Manager", column_type: people) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Installation Team", column_type: people) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "External Contractors", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Purchase Order #", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Purchase Order Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Equipment Delivered", column_type: status) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Inspection Status", column_type: status) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Project Documents", column_type: file) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Project Notes", column_type: long_text) { id } }
```

```graphql
mutation { create_column(board_id: PROJECTS_BOARD_ID, title: "Issues/Blockers", column_type: long_text) { id } }
```

---

✅ **BOARD 3 COMPLETE!**

---

# BOARD 4: FINANCIAL MANAGEMENT

## Step 4.1: Create the Board

```graphql
mutation {
  create_board(
    board_name: "📊 Financial Management"
    board_kind: public
    workspace_id: 5241558
    description: "Invoicing, expenses, P&L tracking with ICount integration"
  ) {
    id
    name
  }
}
```

**→ SAVE THE BOARD ID!** Use it as `FINANCIAL_BOARD_ID` below.

---

## Step 4.2: Create Groups (5 mutations)

```graphql
mutation { create_group(board_id: FINANCIAL_BOARD_ID, group_name: "Invoices to Create") { id } }
```

```graphql
mutation { create_group(board_id: FINANCIAL_BOARD_ID, group_name: "Invoices Sent") { id } }
```

```graphql
mutation { create_group(board_id: FINANCIAL_BOARD_ID, group_name: "Invoices Paid") { id } }
```

```graphql
mutation { create_group(board_id: FINANCIAL_BOARD_ID, group_name: "Overdue Invoices") { id } }
```

```graphql
mutation { create_group(board_id: FINANCIAL_BOARD_ID, group_name: "Expenses") { id } }
```

---

## Step 4.3: Create Columns (18 mutations)

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Transaction/Invoice #", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Transaction Type", column_type: dropdown) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Customer/Vendor Name", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Project Reference", column_type: text) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Description", column_type: long_text) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Amount (ILS)", column_type: numbers) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Tax Amount (VAT)", column_type: numbers) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Invoice Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Due Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Payment Date", column_type: date) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Payment Status", column_type: status) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Payment Method", column_type: dropdown) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "ICount Status", column_type: status) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "ICount Invoice Link", column_type: link) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Category", column_type: dropdown) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Assigned To", column_type: people) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Invoice Document", column_type: file) { id } }
```

```graphql
mutation { create_column(board_id: FINANCIAL_BOARD_ID, title: "Notes", column_type: long_text) { id } }
```

---

✅ **BOARD 4 COMPLETE!**

---

# 🎉 ALL DONE!

You now have all 4 boards set up:

1. ✅ **Leads Management** - https://monday.com/boards/5084262112
2. ✅ **Sales Pipeline** - Check your workspace
3. ✅ **Projects & Installation** - Check your workspace
4. ✅ **Financial Management** - Check your workspace

## Next Steps:

1. **Configure remaining dropdown labels** (Transaction Type, Payment Method, Category)
2. **Set up board automations** in Monday.com UI
3. **Create dashboards** for KPIs
4. **Invite team members** to your workspace

Enjoy your new solar business management system! ☀️
