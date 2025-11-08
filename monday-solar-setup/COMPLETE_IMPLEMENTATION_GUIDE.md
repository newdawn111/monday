# Monday.com Complete Setup Guide
## Solar Systems Business - Full Implementation Plan

**Business:** Solar Systems Installation (Business & Private Customers)
**Users:** 3 Managers
**Monday.com Plan:** Pro
**Integration:** ICount (Invoicing & Financial Management)

---

## Table of Contents

1. [Initial Cleanup & Preparation](#1-initial-cleanup--preparation)
2. [Board Structure Overview](#2-board-structure-overview)
3. [Board 1: Leads Management](#3-board-1-leads-management)
4. [Board 2: Sales Pipeline](#4-board-2-sales-pipeline)
5. [Board 3: Projects & Installation](#5-board-3-projects--installation)
6. [Board 4: Financial Management](#6-board-4-financial-management)
7. [ICount Integration Setup](#7-icount-integration-setup)
8. [Automations & Workflows](#8-automations--workflows)
9. [Dashboards & Reports](#9-dashboards--reports)
10. [Views & Filters](#10-views--filters)
11. [Daily Operations Guide](#11-daily-operations-guide)

---

## 1. Initial Cleanup & Preparation

### Step 1.1: Backup Current Data (if needed)

1. Go to your Monday.com workspace
2. For each board you want to save, click the three dots menu → Export board to Excel
3. Save these files to your computer as backup

### Step 1.2: Archive or Delete Old Boards

1. Click on your workspace name (top left)
2. Go to "Boards" section
3. For each board you want to remove:
   - Click the three dots next to the board name
   - Select "Archive board" (recommended) or "Delete board"

### Step 1.3: Prepare Your Workspace

1. Click your workspace name
2. Go to "Workspace settings"
3. Rename if needed to match your business name
4. Ensure all 3 managers are invited as members

---

## 2. Board Structure Overview

You will create **4 main boards**:

| Board Name | Purpose | Key Features |
|------------|---------|--------------|
| **💡 Leads Management** | Track all potential customers | Lead capture, qualification, initial contact |
| **💰 Sales Pipeline** | Manage sales process from quote to contract | Quotes, contracts, pricing, deal value |
| **🔧 Projects & Installation** | Project execution and time tracking | Installation scheduling, time logs, milestones |
| **📊 Financial Management** | Invoicing, expenses, P&L tracking | ICount integration, financial reports |

**Workflow:** Lead → Sales Pipeline → Project → Financial Management

---

## 3. Board 1: Leads Management

### Board Information
- **Board ID:** 5084262112
- **URL:** https://monday.com/boards/5084262112

### Groups (Status Categories)

1. **New Leads** - Fresh inquiries
2. **Contacted** - First conversation completed
3. **Qualified** - Serious prospects
4. **Not Interested** - Dead leads
5. **Converted to Sale** - Moved to Sales Pipeline

### Columns Configuration

| Column Name | Column Type | Configuration |
|-------------|-------------|---------------|
| **Customer Type** | Dropdown | Options: "Business", "Private" |
| **Contact Person** | Text | - |
| **Phone** | Phone | - |
| **Email** | Email | - |
| **Location/Address** | Text | - |
| **Lead Source** | Dropdown | Options: "Website", "Referral", "Cold Call", "Social Media", "Trade Show", "Other" |
| **Initial Interest** | Long Text | For notes about what they're looking for |
| **Estimated System Size (kW)** | Numbers | - |
| **Estimated Budget** | Numbers | Format: Currency (ILS), Show sum |
| **First Contact Date** | Date | - |
| **Last Contact Date** | Date | - |
| **Next Follow-up** | Date | - |
| **Lead Status** | Status | Labels: "New", "In Contact", "Needs Follow-up", "Hot Lead", "Cold Lead", "Qualified" |
| **Assigned To** | People | - |
| **Notes** | Long Text | - |

### Recommended Views

**View 1: All Leads (Main View)**
- Default view showing all columns

**View 2: Hot Leads**
- Filter: Lead Status = "Hot Lead" OR "Qualified"

**View 3: Follow-up This Week**
- Filter: Next Follow-up → This week

**View 4: By Assigned Manager**
- Group by: "Assigned To"

---

## 4. Board 2: Sales Pipeline

### Board Information
- **Board ID:** 5084268957
- **URL:** https://monday.com/boards/5084268957

### Groups (Sales Stages)

1. **Information Gathering** - Initial needs assessment
2. **Site Survey Scheduled** - Planning technical visit
3. **Proposal/Quote Sent** - Price quote provided
4. **Negotiation** - Discussing terms
5. **Contract Signing** - Ready to close
6. **Planning & Licensing** - Permit procedures
7. **Contract Signed** - Move to Projects board
8. **Lost/Cancelled** - Did not close

### Columns Configuration

| Column Name | Column Type | Configuration |
|-------------|-------------|---------------|
| **Customer Name** | Text | - |
| **Customer Type** | Dropdown | Options: "Business", "Private" |
| **Contact Person** | Text | - |
| **Phone** | Phone | - |
| **Email** | Email | - |
| **Location/Address** | Text | - |
| **System Size (kW)** | Numbers | Decimal format |
| **Quoted Price (ILS)** | Numbers | Currency format (ILS), Show sum |
| **Expected Margin %** | Numbers | Percentage format |
| **Expected Profit (ILS)** | Numbers | Currency format (ILS), Show sum |
| **Probability %** | Numbers | Percentage (e.g., 30%, 50%, 80%) |
| **Weighted Value** | Formula | Formula: `{Quoted Price (ILS)} * {Probability %} / 100` |
| **Quote Date** | Date | - |
| **Quote Valid Until** | Date | - |
| **Expected Close Date** | Date | - |
| **Technical Survey Date** | Date | - |
| **Contract Date** | Date | - |
| **Deal Stage** | Status | Labels: "New", "In Progress", "Waiting on Customer", "Waiting on Us", "Ready to Close" |
| **Assigned Sales Manager** | People | - |
| **Deal Owner** | People | Primary responsible person |
| **Lead Time (days)** | Formula | Formula: `DAYS({Quote Date}, TODAY())` |
| **Quote Document** | File | For uploading quote PDFs |
| **Contract Document** | File | For uploading signed contracts |
| **Notes & Updates** | Long Text | - |
| **Lost Reason** | Dropdown | Options: "Price", "Timeline", "Competitor", "Changed Mind", "Other" |

### Recommended Views

**View 1: Active Deals**
- Filter: Exclude "Contract Signed" and "Lost/Cancelled" groups

**View 2: Expected Closes This Month**
- Filter: Expected Close Date → This month
- Sort by: Expected Close Date (earliest first)

**View 3: High Value Deals**
- Filter: Quoted Price > 50000

**View 4: Pipeline by Manager**
- Group by: "Assigned Sales Manager"

**View 5: Kanban View**
- Type: Kanban
- Group by: Groups (shows sales stages)

---

## 5. Board 3: Projects & Installation

### Board Information
- **Board ID:** 5084270237
- **URL:** https://monday.com/boards/5084270237

### Groups (Project Phases)

1. **Planning & Permits** - License procedures in progress
2. **Scheduled** - Installation date confirmed
3. **In Progress** - Currently installing
4. **Inspection Pending** - Waiting for inspections
5. **Completed** - Connected to grid
6. **On Hold** - Delayed for any reason

### Columns Configuration

| Column Name | Column Type | Configuration |
|-------------|-------------|---------------|
| **Project Name** | Text | Auto-populated or manual |
| **Customer Name** | Text | - |
| **Customer Type** | Dropdown | Options: "Business", "Private" |
| **Contact Person** | Text | - |
| **Phone** | Phone | - |
| **Email** | Email | - |
| **Installation Address** | Text | Full address |
| **System Size (kW)** | Numbers | Decimal format |
| **Contract Value (ILS)** | Numbers | Currency (ILS), Show sum |
| **Project Cost (ILS)** | Numbers | Currency (ILS), Show sum - Your actual costs |
| **Project Profit (ILS)** | Formula | Formula: `{Contract Value (ILS)} - {Project Cost (ILS)}` |
| **Profit Margin %** | Formula | Formula: `({Contract Value (ILS)} - {Project Cost (ILS)}) / {Contract Value (ILS)} * 100` |
| **Contract Date** | Date | - |
| **Permit Submission Date** | Date | - |
| **Permit Approval Date** | Date | - |
| **Technical Survey Date** | Date | - |
| **Installation Start Date** | Date | - |
| **Installation End Date** | Date | - |
| **Private Inspector Date** | Date | Electrical inspector & constructor |
| **Electricity Co. Inspection** | Date | - |
| **Grid Connection Date** | Date | Final completion |
| **Project Duration (days)** | Formula | Formula: `DAYS({Installation Start Date}, {Installation End Date})` |
| **Project Status** | Status | Labels: "On Schedule", "Delayed", "Waiting on Permits", "Completed", "Issue" |
| **Project Manager** | People | - |
| **Installation Team** | People | Multiple people allowed |
| **External Contractors** | Text | If working with external teams |
| **Time Tracked (hours)** | Time Tracking | Enable time tracking |
| **Purchase Order #** | Text | - |
| **Purchase Order Date** | Date | - |
| **Equipment Delivered** | Status | Labels: "Not Ordered", "Ordered", "In Transit", "Delivered" |
| **Inspection Status** | Status | Labels: "Not Started", "Private Inspector Done", "Waiting Elec. Co.", "All Complete" |
| **Project Documents** | File | Contracts, permits, inspection reports |
| **Project Notes** | Long Text | - |
| **Issues/Blockers** | Long Text | Track any problems |

### Recommended Views

**View 1: Active Projects**
- Filter: Exclude "Completed" group

**View 2: This Week's Installations**
- Filter: Installation Start Date → This week OR Installation End Date → This week

**View 3: Waiting on Inspections**
- Filter: Group = "Inspection Pending"

**View 4: Timeline View**
- Type: Timeline
- Start date: Installation Start Date
- End date: Installation End Date

**View 5: Projects by Manager**
- Group by: "Project Manager"

---

## 6. Board 4: Financial Management

### Board Information
- **Board ID:** 5084271089
- **URL:** https://monday.com/boards/5084271089

### Groups

1. **Invoices to Create** - Need to be generated
2. **Invoices Sent** - Sent to customers
3. **Invoices Paid** - Payment received
4. **Overdue Invoices** - Past due date
5. **Expenses** - Business expenses to track

### Columns Configuration

| Column Name | Column Type | Configuration |
|-------------|-------------|---------------|
| **Transaction/Invoice #** | Text | ICount invoice number or reference |
| **Transaction Type** | Dropdown | Options: "Invoice", "Expense", "Payment Received" |
| **Customer/Vendor Name** | Text | - |
| **Project Reference** | Text | Link to project name |
| **Description** | Long Text | Details of transaction |
| **Amount (ILS)** | Numbers | Currency (ILS), Show sum |
| **Tax Amount (VAT)** | Numbers | Currency (ILS), Show sum |
| **Total with Tax** | Formula | Formula: `{Amount (ILS)} + {Tax Amount (VAT)}` |
| **Invoice Date** | Date | - |
| **Due Date** | Date | - |
| **Payment Date** | Date | When payment received |
| **Days Overdue** | Formula | Formula: `IF({Payment Date} = "", IF({Due Date} < TODAY(), DAYS({Due Date}, TODAY()), 0), 0)` |
| **Payment Status** | Status | Labels: "Not Sent", "Sent", "Paid", "Overdue", "Cancelled" |
| **Payment Method** | Dropdown | Options: "Bank Transfer", "Check", "Credit Card", "Cash" |
| **ICount Status** | Status | Labels: "Not in ICount", "Synced", "Sent from ICount", "Paid in ICount" |
| **ICount Invoice Link** | Link | URL to ICount invoice |
| **Category** | Dropdown | Options: "Equipment", "Labor", "Permits", "Marketing", "Operations", "Other" |
| **Assigned To** | People | Who's responsible |
| **Invoice Document** | File | PDF of invoice |
| **Notes** | Long Text | - |

### Recommended Views

**View 1: Outstanding Invoices**
- Filter: Payment Status = "Sent" OR "Overdue"
- Sort by: Due Date (earliest first)

**View 2: Overdue Only**
- Filter: Days Overdue > 0

**View 3: This Month Revenue**
- Filter: Transaction Type = "Invoice" OR "Payment Received"
- Filter: Invoice Date → This month

**View 4: Expenses Only**
- Filter: Transaction Type = "Expense"

**View 5: Chart View - Monthly Revenue**
- Type: Chart (Column)
- X-axis: Invoice Date (by month)
- Y-axis: Sum of Amount (ILS)

---

## 7. ICount Integration Setup

ICount doesn't have a native Monday.com integration, so we'll use **Make.com** (formerly Integrator) to connect them.

### Step 7.1: Choose Integration Platform

**Recommended: Make.com**
- More powerful for complex workflows
- Better ICount support
- Free tier: 1,000 operations/month
- Paid: Starts at $9/month for 10,000 operations

### Step 7.2: Set Up Make.com Account

1. Go to www.make.com
2. Sign up for free
3. Verify your email

### Step 7.3: Connect Monday.com to Make

1. In Make, create a new scenario
2. Add Monday.com module
3. Choose trigger: "Watch Items" or "New Item"
4. Sign in with Monday and authorize
5. Select your workspace

### Step 7.4: Connect ICount to Make

1. Add ICount module
2. Get API credentials from ICount:
   - Settings → API
   - Copy Company ID and API Key
3. Add credentials to Make
4. Save connection

### Step 7.5: Create Integration Scenarios

#### SCENARIO 1: Create Invoice in ICount When Project Completes

**Trigger:** Monday.com - Watch Items (Projects board)
**Condition:** When moved to "Completed" group
**Action 1:** ICount - Create Invoice
**Action 2:** Monday - Create item in Financial board
**Action 3:** Monday - Update project with invoice number

#### SCENARIO 2: Sync Invoice Status from ICount to Monday

**Trigger:** ICount - Watch Documents (scheduled check every 30 min)
**Condition:** Invoice status = "Paid"
**Action 1:** Monday - Search item by invoice number
**Action 2:** Monday - Update Payment Status to "Paid"
**Action 3:** Monday - Move to "Invoices Paid" group

#### SCENARIO 3: Sync Expenses from ICount to Monday

**Trigger:** ICount - List Documents (daily at 8 AM)
**Filter:** Document type = "Expense", Created in last 24 hours
**Action:** Monday - Create item in Financial board

---

## 8. Automations & Workflows

### Automations for Leads Management

1. **Auto-assign new leads**
   - When item is created → Assign to [person] and notify

2. **Set follow-up reminder**
   - When status → "In Contact" → Set "Next Follow-up" to 3 days from now

3. **Alert for overdue follow-ups**
   - When "Next Follow-up" arrives → Notify assigned person

4. **Move qualified leads**
   - When "Lead Status" → "Qualified" → Move to "Qualified" group

### Automations for Sales Pipeline

1. **Alert when quote expires soon**
   - When "Quote Valid Until" is 3 days away → Notify deal owner

2. **Auto-create project**
   - When moved to "Contract Signed" → Create item in Projects board
   - Copy: Customer Name, Contact, Phone, Email, Address, System Size, Contract Value

3. **Notify on high-value deals**
   - When "Quoted Price" > 100000 → Notify all team members

4. **Archive old lost deals**
   - Every month → Archive items in "Lost/Cancelled" older than 90 days

### Automations for Projects

1. **Set installation timeline**
   - When "Permit Approval Date" is set → Set "Installation Start Date" to 7 days later

2. **Alert on delayed projects**
   - When "Installation End Date" arrives and status ≠ "Completed" → Notify PM

3. **Auto-complete project**
   - When "Grid Connection Date" is set → Move to "Completed" and update status

4. **Create invoice trigger**
   - When moved to "Completed" → Trigger Make scenario to create invoice

### Automations for Financial Management

1. **Alert on overdue invoices**
   - When "Days Overdue" > 0 → Notify assigned person

2. **Weekly overdue report**
   - Every Monday at 9 AM → Email summary of overdue invoices

3. **Move paid invoices**
   - When "Payment Status" → "Paid" → Move to "Invoices Paid" group

---

## 9. Dashboards & Reports

### Main Business Overview Dashboard

Create a dashboard with these widgets:

1. **Total Pipeline Value** (Numbers widget)
   - Board: Sales Pipeline
   - Show: Sum of Quoted Price

2. **Weighted Pipeline** (Numbers widget)
   - Board: Sales Pipeline
   - Show: Sum of Weighted Value

3. **Active Projects** (Numbers widget)
   - Board: Projects
   - Show: Item count (exclude Completed)

4. **Monthly Revenue** (Chart widget)
   - Board: Financial Management
   - Type: Column chart
   - X-axis: Invoice Date (by month)
   - Y-axis: Sum of Amount

5. **Outstanding Receivables** (Numbers widget)
   - Board: Financial
   - Show: Sum of Amount where Payment Status = "Sent" or "Overdue"

6. **Overdue Invoices Alert** (Table widget)
   - Board: Financial
   - Filter: Days Overdue > 0
   - Show: Customer, Amount, Days Overdue

7. **This Month's Projects** (Battery chart)
   - Board: Projects
   - Group by: Project Status
   - Filter: This month

8. **Profit by Project** (Column chart)
   - Board: Projects
   - Show: Last 10 completed projects
   - Y-axis: Project Profit

9. **Hot Leads** (Numbers widget)
   - Board: Leads
   - Filter: Lead Status = "Hot Lead" or "Qualified"

10. **Expense Breakdown** (Pie chart)
    - Board: Financial
    - Group by: Category
    - Filter: Transaction Type = "Expense"

---

## 10. Views & Filters

### Cross-Board Views

**My Work View**
- Shows all items assigned to you across all boards
- Filter by due date, status, priority

**This Week's Critical Tasks**
- Combine from all boards
- Filter: Due this week OR Installation this week OR Follow-up this week

**Financial Actions Needed**
- Filter: Payment Status = "Overdue" OR Days Overdue > 7

---

## 11. Daily Operations Guide

### Morning Routine (9:00 AM)

1. **Open Dashboard**
   - Review key metrics
   - Check overdue invoices
   - See today's installations

2. **Check "My Work"**
   - Review assigned items
   - Prioritize tasks

3. **Review Leads**
   - Check "Follow-up This Week" view
   - Reach out to hot leads

4. **Check Sales Pipeline**
   - Review expected closes
   - Follow up on pending proposals

### During the Day

**New lead:**
1. Add to Leads Management board
2. Fill in details
3. Set follow-up date

**Preparing quote:**
1. Move to Sales Pipeline
2. Fill in system size and price
3. Upload quote document
4. Set probability

**Contract signed:**
1. Update Sales Pipeline
2. Upload signed contract
3. Automation creates Project
4. Set installation dates

**Project completion:**
1. Set grid connection date
2. Move to "Completed"
3. Invoice auto-created via Make.com

### End of Day (5:00 PM)

1. Log time on all projects
2. Update statuses
3. Set tomorrow's follow-ups
4. Review tomorrow's schedule

### Weekly Review (Monday morning)

1. Review dashboard - weekly trends
2. Update stale deals in pipeline
3. Ensure projects on track
4. Chase overdue payments
5. Plan the week

### Monthly Review (1st of month)

1. **Financial Reports**
   - Export boards to Excel
   - Calculate monthly revenue/expenses/profit
   - Compare to previous months

2. **Sales Analysis**
   - Conversion rates
   - Average deal size
   - Win/loss analysis

3. **Operations Review**
   - Project completion rates
   - Average duration
   - Profit margins

4. **Cleanup**
   - Archive completed projects
   - Archive old leads

---

## Quick Reference: Data Flow

```
LEAD ENTERS
  ↓
Leads Management Board
  ↓ (Qualified)
Sales Pipeline Board
  ↓ (Quote → Contract)
Projects & Installation Board
  ↓ (Completion triggers)
Financial Management Board
  ↓ (Integration)
ICount (Invoice created)
  ↓ (Payment received)
Back to Monday (Status updated)
```

---

## Board IDs Quick Reference

- **Leads Management:** 5084262112
- **Sales Pipeline:** 5084268957
- **Projects & Installation:** 5084270237
- **Financial Management:** 5084271089
- **Workspace ID:** 5241558

---

## Support Resources

- **Monday.com Help Center:** https://support.monday.com
- **Make.com Documentation:** https://www.make.com/en/help/tutorials
- **ICount Support:** Contact via your ICount account
- **Monday.com Community:** community.monday.com

---

## Troubleshooting

### Integration not working
- Check Make.com scenario is ON
- Verify API connections
- Check error logs in Make.com

### Formulas not calculating
- Verify source columns have data
- Check formula syntax
- Ensure correct column types

### Automations not firing
- Check automation is enabled
- Verify trigger conditions
- Review automation logs

---

**Total estimated setup time:** 4-6 hours
**Recommended approach:** Set up one board completely, test it, then move to the next.

**END OF IMPLEMENTATION GUIDE**
