# API Playground Configuration Mutations

**IMPORTANT:** The Monday.com API has limitations. These mutations will attempt different approaches, but some configurations can ONLY be done in the UI.

## How to Use This Guide

1. Open [Monday.com API Playground](https://monday.com/developers/v2/try-it-yourself)
2. Copy each mutation below
3. Paste into the left panel
4. Click "Run" (▶️ button)
5. Check the results in the right panel

---

## Step 1: Get Column IDs

First, we need to get all column IDs to know what we're working with.

### Sales Pipeline (5084268957)

```graphql
query {
  boards(ids: [5084268957]) {
    columns {
      id
      title
      type
      settings_str
    }
  }
}
```

**ACTION:** Run this query and note down the column IDs for:
- Lost Reason
- Quoted Price (ILS)
- Expected Profit (ILS)
- Expected Margin %
- Probability %

---

### Projects & Installation (5084270237)

```graphql
query {
  boards(ids: [5084270237]) {
    columns {
      id
      title
      type
      settings_str
    }
  }
}
```

**ACTION:** Run this query and note down the column IDs for:
- Customer Type
- Project Status
- Equipment Delivered
- Inspection Status
- Contract Value (ILS)
- Project Cost (ILS)

---

### Financial Management (5084271089)

```graphql
query {
  boards(ids: [5084271089]) {
    columns {
      id
      title
      type
      settings_str
    }
  }
}
```

**ACTION:** Run this query and note down the column IDs for:
- Transaction Type
- Payment Method
- Category
- Payment Status
- ICount Status
- Amount (ILS)
- Tax Amount (VAT)

---

## Step 2: Attempt API Configurations

⚠️ **IMPORTANT:** Based on testing, the Monday.com API does NOT support:
- Configuring dropdown labels (`labels` property doesn't exist in API)
- Configuring status colors (`labels` property doesn't exist in API)
- Configuring currency symbols (`unit` property doesn't exist in API)
- Creating formula columns (403 error)

**These MUST be done in the UI.**

However, let's try alternative approaches...

---

### Approach 1: Try creating a formula column

Replace `YOUR_QUOTED_PRICE_COLUMN_ID` with the actual ID from Step 1.

```graphql
mutation {
  create_column(
    board_id: 5084268957
    title: "Weighted Value"
    column_type: formula
    defaults: "{\"formula\": \"{col_YOUR_QUOTED_PRICE_COLUMN_ID} * {col_YOUR_PROBABILITY_COLUMN_ID} / 100\"}"
  ) {
    id
    title
  }
}
```

**Expected Result:** Likely will fail with 403 or "formula not supported" error.

---

### Approach 2: Try updating column title

Just to confirm the API works for basic operations:

```graphql
mutation {
  change_column_title(
    board_id: 5084268957
    column_id: "YOUR_COLUMN_ID"
    title: "Test Title Change"
  ) {
    id
    title
  }
}
```

**Expected Result:** Should work! This proves the API connection is functional.

---

## Step 3: Manual UI Configuration Required

Since the API cannot configure these settings, here's the **COMPLETE checklist** for manual configuration:

---

### 📋 SALES PIPELINE BOARD
**URL:** https://monday.com/boards/5084268957

#### 1. Lost Reason Dropdown
- **Column:** Lost Reason
- **Action:** Click column header → "Edit labels"
- **Labels:** Price, Timeline, Competitor, Changed Mind, Other

#### 2. Quoted Price Currency
- **Column:** Quoted Price (ILS)
- **Action:** Click column header → ⚙ gear icon → Customize
- **Unit:** ₪
- **Position:** Left

#### 3. Expected Profit Currency
- **Column:** Expected Profit (ILS)
- **Action:** Click column header → ⚙ gear icon → Customize
- **Unit:** ₪
- **Position:** Left

#### 4. Expected Margin Percentage
- **Column:** Expected Margin %
- **Action:** Click column header → ⚙ gear icon → Customize
- **Unit:** %
- **Position:** Right

#### 5. Probability Percentage
- **Column:** Probability %
- **Action:** Click column header → ⚙ gear icon → Customize
- **Unit:** %
- **Position:** Right

#### 6. Weighted Value Formula
- **Action:** Click "+" → Add Column → Formula
- **Name:** Weighted Value
- **Formula:** `{Quoted Price (ILS)} * {Probability %} / 100`

#### 7. Lead Time Formula
- **Action:** Click "+" → Add Column → Formula
- **Name:** Lead Time (days)
- **Formula:** `DAYS({Quote Date}, TODAY())`

---

### 🔧 PROJECTS & INSTALLATION BOARD
**URL:** https://monday.com/boards/5084270237

#### 8. Customer Type Dropdown
- **Column:** Customer Type
- **Action:** Click column header → "Edit labels"
- **Labels:** Business, Private

#### 9. Project Status Labels
- **Column:** Project Status
- **Action:** Click column header → "Edit labels"
- **Labels with colors:**
  - On Schedule (Green - #00c875)
  - Delayed (Red - #e2445c)
  - Waiting on Permits (Orange - #fdab3d)
  - Completed (Blue - #0086c0)
  - Issue (Pink - #ff5ac4)

#### 10. Equipment Delivered Status
- **Column:** Equipment Delivered
- **Action:** Click column header → "Edit labels"
- **Labels with colors:**
  - Not Ordered (Gray - #c4c4c4)
  - Ordered (Orange - #fdab3d)
  - In Transit (Purple - #a25ddc)
  - Delivered (Green - #00c875)

#### 11. Inspection Status Labels
- **Column:** Inspection Status
- **Action:** Click column header → "Edit labels"
- **Labels with colors:**
  - Not Started (Gray - #c4c4c4)
  - Private Inspector Done (Orange - #fdab3d)
  - Waiting Elec. Co. (Purple - #a25ddc)
  - All Complete (Green - #00c875)

#### 12. Contract Value Currency
- **Column:** Contract Value (ILS)
- **Action:** Click column header → ⚙ gear icon → Customize
- **Unit:** ₪
- **Position:** Left

#### 13. Project Cost Currency
- **Column:** Project Cost (ILS)
- **Action:** Click column header → ⚙ gear icon → Customize
- **Unit:** ₪
- **Position:** Left

#### 14. Project Profit Formula
- **Action:** Click "+" → Add Column → Formula
- **Name:** Project Profit (ILS)
- **Formula:** `{Contract Value (ILS)} - {Project Cost (ILS)}`
- **Then:** Configure currency (₪) on this new column

#### 15. Profit Margin Formula
- **Action:** Click "+" → Add Column → Formula
- **Name:** Profit Margin %
- **Formula:** `({Contract Value (ILS)} - {Project Cost (ILS)}) / {Contract Value (ILS)} * 100`
- **Then:** Configure percentage (%) on this new column

#### 16. Project Duration Formula
- **Action:** Click "+" → Add Column → Formula
- **Name:** Project Duration (days)
- **Formula:** `DAYS({Installation Start Date}, {Installation End Date})`

---

### 💰 FINANCIAL MANAGEMENT BOARD
**URL:** https://monday.com/boards/5084271089

#### 17. Transaction Type Dropdown
- **Column:** Transaction Type
- **Action:** Click column header → "Edit labels"
- **Labels:** Invoice, Expense, Payment Received

#### 18. Payment Method Dropdown
- **Column:** Payment Method
- **Action:** Click column header → "Edit labels"
- **Labels:** Bank Transfer, Check, Credit Card, Cash

#### 19. Category Dropdown
- **Column:** Category
- **Action:** Click column header → "Edit labels"
- **Labels:** Equipment, Labor, Permits, Marketing, Operations, Other

#### 20. Payment Status Labels
- **Column:** Payment Status
- **Action:** Click column header → "Edit labels"
- **Labels with colors:**
  - Not Sent (Gray - #c4c4c4)
  - Sent (Orange - #fdab3d)
  - Paid (Green - #00c875)
  - Overdue (Red - #e2445c)
  - Cancelled (Dark Gray - #808080)

#### 21. ICount Status Labels
- **Column:** ICount Status
- **Action:** Click column header → "Edit labels"
- **Labels with colors:**
  - Not in ICount (Gray - #c4c4c4)
  - Synced (Orange - #fdab3d)
  - Sent from ICount (Purple - #a25ddc)
  - Paid in ICount (Green - #00c875)

#### 22. Amount Currency
- **Column:** Amount (ILS)
- **Action:** Click column header → ⚙ gear icon → Customize
- **Unit:** ₪
- **Position:** Left

#### 23. Tax Amount Currency
- **Column:** Tax Amount (VAT)
- **Action:** Click column header → ⚙ gear icon → Customize
- **Unit:** ₪
- **Position:** Left

#### 24. Total with Tax Formula
- **Action:** Click "+" → Add Column → Formula
- **Name:** Total with Tax
- **Formula:** `{Amount (ILS)} + {Tax Amount (VAT)}`
- **Then:** Configure currency (₪) on this new column

#### 25. Days Overdue Formula
- **Action:** Click "+" → Add Column → Formula
- **Name:** Days Overdue
- **Formula:** `IF({Payment Date} = "", IF({Due Date} < TODAY(), DAYS({Due Date}, TODAY()), 0), 0)`

---

## Summary

✅ **What API CAN do:** Read boards, create items, update values
❌ **What API CANNOT do:** Configure dropdown labels, status colors, currency symbols, formulas

**Total manual steps needed:** 25 (approximately 15-20 minutes)

**Recommended approach:** Follow the manual checklist above step by step.

---

## Color Reference

Use these hex codes when setting colors in the UI:

| Color | Hex Code | Monday.com Default |
|-------|----------|-------------------|
| Green | #00c875 | ✅ Available |
| Blue | #0086c0 | ✅ Available |
| Orange | #fdab3d | ✅ Available |
| Red | #e2445c | ✅ Available |
| Purple | #a25ddc | ✅ Available |
| Pink | #ff5ac4 | ✅ Available |
| Gray | #c4c4c4 | ✅ Available |
| Dark Gray | #808080 | ✅ Available |

