# Monday.com API Playground Setup Guide
## Step-by-Step Instructions for Manual Board Configuration

This guide shows you how to use the Monday.com API Playground to configure your solar business boards.

---

## 📍 Access the API Playground

**URL:** https://monday.com/developers/v2/try-it-yourself

**Important:** You must be logged into your Monday.com account before accessing the playground.

---

## 🎯 Understanding the Playground Interface

When you open the playground, you'll see:

1. **Left Panel** - Where you write GraphQL queries and mutations
2. **Right Panel** - Where results appear after running
3. **Top Bar** - Run button and API token info
4. **Documentation Panel** (optional) - GraphQL schema reference

---

## 🚀 Basic Workflow

### Step 1: Write the Mutation

In the left panel, paste your GraphQL mutation. Example:

```graphql
mutation {
  create_group(board_id: 5084262112, group_name: "New Leads") {
    id
    title
  }
}
```

### Step 2: Run the Mutation

Click the **▶ Run** button (or press Ctrl+Enter / Cmd+Enter)

### Step 3: Check the Results

The right panel shows the response:

```json
{
  "data": {
    "create_group": {
      "id": "new_group123",
      "title": "New Leads"
    }
  }
}
```

### Step 4: Save Important IDs

**CRITICAL:** Copy and save any IDs returned! You'll need them for configuration steps.

---

## 📋 Complete Setup Checklist

### ✅ Board 1: Leads Management (5084262112)

Already created! If you need to add more configurations:

#### Optional: Configure Additional Dropdown Labels

If you have dropdown column IDs that need labels configured:

```graphql
mutation {
  change_column_metadata(
    board_id: 5084262112
    column_id: "YOUR_COLUMN_ID_HERE"
    column_property: labels
    value: "{\"0\":{\"name\":\"Option 1\"},\"1\":{\"name\":\"Option 2\"}}"
  ) {
    id
  }
}
```

**Replace:**
- `YOUR_COLUMN_ID_HERE` with the actual column ID
- `Option 1`, `Option 2` with your desired options

---

### ✅ Board 2: Sales Pipeline (5084268957)

Already created! Here's how to configure remaining items:

#### Configure Expected Profit Currency

If you saved the "Expected Profit (ILS)" column ID:

```graphql
mutation {
  change_column_metadata(
    board_id: 5084268957
    column_id: "YOUR_EXPECTED_PROFIT_COLUMN_ID"
    column_property: unit
    value: "₪"
  ) {
    id
  }
}
```

#### Configure Expected Margin as Percentage

```graphql
mutation {
  change_column_metadata(
    board_id: 5084268957
    column_id: "YOUR_MARGIN_COLUMN_ID"
    column_property: unit
    value: "%"
  ) {
    id
  }
}
```

---

### ✅ Board 3: Projects & Installation (5084270237)

Already created! Configure additional settings:

#### Configure Contract Value & Project Cost as Currency

For Contract Value:
```graphql
mutation {
  change_column_metadata(
    board_id: 5084270237
    column_id: "YOUR_CONTRACT_VALUE_COLUMN_ID"
    column_property: unit
    value: "₪"
  ) {
    id
  }
}
```

For Project Cost:
```graphql
mutation {
  change_column_metadata(
    board_id: 5084270237
    column_id: "YOUR_PROJECT_COST_COLUMN_ID"
    column_property: unit
    value: "₪"
  ) {
    id
  }
}
```

#### Configure Customer Type Dropdown

```graphql
mutation {
  change_column_metadata(
    board_id: 5084270237
    column_id: "YOUR_CUSTOMER_TYPE_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Business\"},\"1\":{\"name\":\"Private\"}}"
  ) {
    id
  }
}
```

#### Configure Project Status Labels

```graphql
mutation {
  change_column_metadata(
    board_id: 5084270237
    column_id: "YOUR_PROJECT_STATUS_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"On Schedule\",\"color\":\"#00c875\"},\"1\":{\"name\":\"Delayed\",\"color\":\"#e2445c\"},\"2\":{\"name\":\"Waiting on Permits\",\"color\":\"#fdab3d\"},\"3\":{\"name\":\"Completed\",\"color\":\"#579bfc\"},\"4\":{\"name\":\"Issue\",\"color\":\"#ff5ac4\"}}"
  ) {
    id
  }
}
```

#### Configure Equipment Delivered Status

```graphql
mutation {
  change_column_metadata(
    board_id: 5084270237
    column_id: "YOUR_EQUIPMENT_DELIVERED_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Not Ordered\",\"color\":\"#c4c4c4\"},\"1\":{\"name\":\"Ordered\",\"color\":\"#fdab3d\"},\"2\":{\"name\":\"In Transit\",\"color\":\"#a25ddc\"},\"3\":{\"name\":\"Delivered\",\"color\":\"#00c875\"}}"
  ) {
    id
  }
}
```

#### Configure Inspection Status

```graphql
mutation {
  change_column_metadata(
    board_id: 5084270237
    column_id: "YOUR_INSPECTION_STATUS_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Not Started\",\"color\":\"#c4c4c4\"},\"1\":{\"name\":\"Private Inspector Done\",\"color\":\"#fdab3d\"},\"2\":{\"name\":\"Waiting Elec. Co.\",\"color\":\"#a25ddc\"},\"3\":{\"name\":\"All Complete\",\"color\":\"#00c875\"}}"
  ) {
    id
  }
}
```

---

### ✅ Board 4: Financial Management (5084271089)

Already created! Configure these settings:

#### Configure Transaction Type Dropdown

```graphql
mutation {
  change_column_metadata(
    board_id: 5084271089
    column_id: "YOUR_TRANSACTION_TYPE_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Invoice\"},\"1\":{\"name\":\"Expense\"},\"2\":{\"name\":\"Payment Received\"}}"
  ) {
    id
  }
}
```

#### Configure Amount & Tax as Currency

For Amount (ILS):
```graphql
mutation {
  change_column_metadata(
    board_id: 5084271089
    column_id: "YOUR_AMOUNT_COLUMN_ID"
    column_property: unit
    value: "₪"
  ) {
    id
  }
}
```

For Tax Amount (VAT):
```graphql
mutation {
  change_column_metadata(
    board_id: 5084271089
    column_id: "YOUR_TAX_AMOUNT_COLUMN_ID"
    column_property: unit
    value: "₪"
  ) {
    id
  }
}
```

#### Configure Payment Status

```graphql
mutation {
  change_column_metadata(
    board_id: 5084271089
    column_id: "YOUR_PAYMENT_STATUS_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Not Sent\",\"color\":\"#c4c4c4\"},\"1\":{\"name\":\"Sent\",\"color\":\"#fdab3d\"},\"2\":{\"name\":\"Paid\",\"color\":\"#00c875\"},\"3\":{\"name\":\"Overdue\",\"color\":\"#e2445c\"},\"4\":{\"name\":\"Cancelled\",\"color\":\"#808080\"}}"
  ) {
    id
  }
}
```

#### Configure Payment Method Dropdown

```graphql
mutation {
  change_column_metadata(
    board_id: 5084271089
    column_id: "YOUR_PAYMENT_METHOD_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Bank Transfer\"},\"1\":{\"name\":\"Check\"},\"2\":{\"name\":\"Credit Card\"},\"3\":{\"name\":\"Cash\"}}"
  ) {
    id
  }
}
```

#### Configure ICount Status

```graphql
mutation {
  change_column_metadata(
    board_id: 5084271089
    column_id: "YOUR_ICOUNT_STATUS_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Not in ICount\",\"color\":\"#c4c4c4\"},\"1\":{\"name\":\"Synced\",\"color\":\"#fdab3d\"},\"2\":{\"name\":\"Sent from ICount\",\"color\":\"#a25ddc\"},\"3\":{\"name\":\"Paid in ICount\",\"color\":\"#00c875\"}}"
  ) {
    id
  }
}
```

#### Configure Category Dropdown

```graphql
mutation {
  change_column_metadata(
    board_id: 5084271089
    column_id: "YOUR_CATEGORY_COLUMN_ID"
    column_property: labels
    value: "{\"0\":{\"name\":\"Equipment\"},\"1\":{\"name\":\"Labor\"},\"2\":{\"name\":\"Permits\"},\"3\":{\"name\":\"Marketing\"},\"4\":{\"name\":\"Operations\"},\"5\":{\"name\":\"Other\"}}"
  ) {
    id
  }
}
```

---

## 🔍 How to Find Column IDs

If you don't have the column IDs saved, you can find them:

### Method 1: Query the Board

Run this query to get all columns for a board:

```graphql
query {
  boards(ids: 5084271089) {
    columns {
      id
      title
      type
    }
  }
}
```

**Result:**
```json
{
  "data": {
    "boards": [
      {
        "columns": [
          {
            "id": "text",
            "title": "Transaction/Invoice #",
            "type": "text"
          },
          {
            "id": "dropdown",
            "title": "Transaction Type",
            "type": "dropdown"
          },
          ...
        ]
      }
    ]
  }
}
```

Copy the `id` values from the columns you need to configure.

---

## 📊 Advanced: Create Formula Columns

Formula columns can't be created via basic mutations. You need to:

### Step 1: Query to Get Column Type ID

```graphql
query {
  boards(ids: 5084268957) {
    columns {
      id
      title
      type
      settings_str
    }
  }
}
```

### Step 2: Use the Web UI

For formula columns like "Weighted Value" or "Project Profit":

1. Go to the board in Monday.com web interface
2. Click "+" to add a new column
3. Choose "Formula"
4. Name it and enter the formula
5. The UI makes this much easier than the API

**Example Formulas:**

**Weighted Value (Sales Pipeline):**
```
{Quoted Price (ILS)} * {Probability %} / 100
```

**Project Profit (Projects):**
```
{Contract Value (ILS)} - {Project Cost (ILS)}
```

**Profit Margin % (Projects):**
```
({Contract Value (ILS)} - {Project Cost (ILS)}) / {Contract Value (ILS)} * 100
```

**Days Overdue (Financial):**
```
IF({Payment Date} = "", IF({Due Date} < TODAY(), DAYS({Due Date}, TODAY()), 0), 0)
```

---

## 🎨 Color Codes Reference

When configuring status columns, use these Monday.com color codes:

| Color Name | Hex Code | Common Use |
|------------|----------|------------|
| Green | `#00c875` | Completed, Paid, Success |
| Red | `#e2445c` | Overdue, Error, Hot Lead |
| Orange | `#fdab3d` | In Progress, Pending |
| Blue | `#579bfc` | New, Info |
| Purple | `#a25ddc` | Waiting, In Contact |
| Pink | `#ff5ac4` | High Priority |
| Gray | `#c4c4c4` | Not Started, Cold |
| Dark Gray | `#808080` | Cancelled, Archived |

---

## 💡 Pro Tips

### 1. Use Browser DevTools to Copy Mutations

When using the playground:
1. Press F12 to open Developer Tools
2. Go to Network tab
3. Run a mutation in the playground
4. Find the request to `api.monday.com/v2`
5. Right-click → Copy → Copy as cURL (to see exact format)

### 2. Test Queries First

Before running mutations, test with queries:

```graphql
query {
  boards(ids: [5084262112, 5084268957]) {
    id
    name
    groups {
      id
      title
    }
  }
}
```

This confirms your boards exist and shows their structure.

### 3. Save Your Work

Create a text file and save all your mutations with the returned IDs:

```
Board: Leads Management (5084262112)
- Customer Type Column ID: dropdown_abc123
- Lead Source Column ID: dropdown_def456
...
```

### 4. Batch Similar Operations

If you're configuring multiple dropdowns with similar structures, write them all out first, then run them one by one.

---

## 🚨 Common Errors and Solutions

### Error: "Invalid board id"

**Problem:** Board ID is wrong or doesn't exist

**Solution:**
1. Check the board URL: `https://monday.com/boards/XXXXXXXX`
2. Use the numeric ID from the URL
3. Don't use quotes around numeric IDs: Use `5084262112` not `"5084262112"`

### Error: "Column not found"

**Problem:** Column ID doesn't exist or is misspelled

**Solution:**
1. Query the board to get all column IDs
2. Copy the exact ID from the response
3. Use quotes around column IDs: `"dropdown_abc123"`

### Error: "Invalid JSON in value field"

**Problem:** JSON is not properly formatted or escaped

**Solution:**
1. Use double backslashes before quotes: `\"`
2. Valid: `"{\"0\":{\"name\":\"Option\"}}")`
3. Invalid: `"{"0":{"name":"Option"}}"`

### Error: "Insufficient permissions"

**Problem:** Your API token doesn't have write access

**Solution:**
1. Make sure you're logged into Monday.com
2. Use the API Playground while logged in (it uses session auth)
3. For external scripts, generate a Personal API Token with full permissions

---

## 📱 Testing Your Configuration

After running mutations, verify in the Monday.com UI:

1. Go to the board
2. Click on a column header
3. Check that:
   - Dropdowns have the correct options
   - Status columns have colored labels
   - Currency columns show ₪ symbol
   - Formula columns calculate correctly

---

## ✅ Quick Configuration Checklist

Use this to track what you've configured:

**Board 1: Leads Management**
- [ ] Customer Type labels
- [ ] Lead Source labels
- [ ] Lead Status labels with colors
- [ ] Estimated Budget currency (₪)

**Board 2: Sales Pipeline**
- [ ] Customer Type labels
- [ ] Deal Stage labels with colors
- [ ] Lost Reason labels
- [ ] Quoted Price currency (₪)
- [ ] Expected Profit currency (₪)
- [ ] Expected Margin percentage (%)
- [ ] Formula columns (create in UI)

**Board 3: Projects**
- [ ] Customer Type labels
- [ ] Contract Value currency (₪)
- [ ] Project Cost currency (₪)
- [ ] Project Status labels with colors
- [ ] Equipment Delivered status labels
- [ ] Inspection Status labels
- [ ] Formula columns (create in UI)

**Board 4: Financial**
- [ ] Transaction Type labels
- [ ] Payment Status labels with colors
- [ ] Payment Method labels
- [ ] ICount Status labels
- [ ] Category labels
- [ ] Amount currency (₪)
- [ ] Tax Amount currency (₪)
- [ ] Formula columns (create in UI)

---

## 🎓 Learning Resources

**Monday.com API Documentation:**
- Main Docs: https://developer.monday.com/api-reference/docs
- Column Types: https://developer.monday.com/api-reference/docs/column-types
- Mutations: https://developer.monday.com/api-reference/docs/mutations

**GraphQL Basics:**
- Official Tutorial: https://graphql.org/learn/
- Interactive Tutorial: https://www.howtographql.com/

---

## 📞 Need Help?

If you get stuck:

1. **Check the error message** - It usually tells you exactly what's wrong
2. **Query first** - Use a query to verify IDs before running mutations
3. **Test in small steps** - Configure one column at a time
4. **Check the UI** - Some things are easier to do in the Monday.com interface

---

**You're all set! Use the API Playground to fine-tune your boards.** 🚀

For the complete business setup including automations and ICount integration, refer to the **COMPLETE_IMPLEMENTATION_GUIDE.md** file.
