# Monday.com Solar Business Setup

Complete automation scripts for setting up a comprehensive Monday.com workspace for solar systems business management.

## 📚 Documentation

- **[COMPLETE IMPLEMENTATION GUIDE](COMPLETE_IMPLEMENTATION_GUIDE.md)** - Full setup guide with ICount integration, automations, dashboards, and daily operations
- **[MANUAL SETUP GUIDE](MANUAL_SETUP_GUIDE.md)** - Step-by-step mutations for manual board creation
- **[QUICK START GUIDE](QUICK_START.md)** - 5-minute quickstart for automated setup

## 📋 Overview

This setup creates **4 fully configured boards** on Monday.com:

1. **💡 Leads Management** - Track and nurture potential customers
2. **💰 Sales Pipeline** - Manage quotes, proposals, and contracts
3. **🔧 Projects & Installation** - Execute and monitor solar installations
4. **📊 Financial Management** - Handle invoicing, expenses, and P&L with ICount integration

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Monday.com account with admin access
- Monday.com API token

### Installation

```bash
# Navigate to the setup directory
cd monday-solar-setup

# Install dependencies
npm install

# Configure your environment
cp .env.template .env
# Edit .env and add your MONDAY_API_TOKEN
```

### Get Your API Token

1. Go to [Monday.com API Playground](https://monday.com/developers/v2/try-it-yourself)
2. Click your profile (bottom left) → **Admin** → **API**
3. Generate a new API token (v2)
4. Copy the token to your `.env` file

### Run the Setup

```bash
# Automated setup (recommended)
npm run setup

# Or directly with token
MONDAY_API_TOKEN=your_token_here node automated-setup.js
```

The script will:
- ✅ Create all 4 boards in your workspace
- ✅ Set up all groups (workflow stages)
- ✅ Create all columns with proper types
- ✅ Configure dropdowns, status labels, and formulas
- ✅ Save results to `setup-results.json`

## 📊 What Gets Created

### Board 1: Leads Management (5084262112)

**Groups:**
- New Leads
- Contacted
- Qualified
- Not Interested
- Converted to Sale

**15 Columns:**
- Customer Type (Business/Private)
- Contact Person
- Phone & Email
- Location/Address
- Lead Source (Website, Referral, Cold Call, etc.)
- Initial Interest
- Estimated System Size (kW)
- Estimated Budget (ILS)
- First/Last Contact Date
- Next Follow-up
- Lead Status
- Assigned To
- Notes

### Board 2: Sales Pipeline

**Groups:**
- Information Gathering
- Site Survey Scheduled
- Proposal/Quote Sent
- Negotiation
- Contract Signing
- Planning & Licensing
- Contract Signed
- Lost/Cancelled

**23 Columns:**
- Customer details
- System specifications
- Quoted Price & Profit calculations
- Probability & Weighted Value
- Important dates
- Deal Stage tracking
- Document storage
- Lost reason tracking

### Board 3: Projects & Installation

**Groups:**
- Planning & Permits
- Scheduled
- In Progress
- Inspection Pending
- Completed
- On Hold

**31 Columns:**
- Project details
- Financial tracking (Cost, Value, Profit, Margin)
- Complete timeline (Contract → Grid Connection)
- Team assignments
- Time tracking
- Inspection statuses
- Document management

### Board 4: Financial Management

**Groups:**
- Invoices to Create
- Invoices Sent
- Invoices Paid
- Overdue Invoices
- Expenses

**18 Columns:**
- Transaction tracking
- ICount integration fields
- Payment status & methods
- Tax/VAT calculations
- Days overdue formula
- Category management
- Document storage

## 📖 Usage Options

### Option 1: Automated Setup (Recommended)

Use the `automated-setup.js` script for a fully automated, hands-free setup:

```bash
npm run setup
```

**Benefits:**
- ✅ Fully automated - no manual steps
- ✅ Built-in error handling
- ✅ Progress tracking
- ✅ Results saved to JSON
- ✅ Configurable delay to avoid rate limits

### Option 2: Manual Setup

Use the `monday-setup-config.js` file with Monday.com API Playground:

1. Open [Monday.com API Playground](https://monday.com/developers/v2/try-it-yourself)
2. Copy mutations from `monday-setup-config.js`
3. Execute them one by one
4. Save returned IDs for next steps

**When to use:**
- You want full control over each step
- You're troubleshooting specific issues
- You only need to set up certain boards

## 🔧 Configuration

### Environment Variables

```bash
# Required
MONDAY_API_TOKEN=your_token

# Pre-configured
WORKSPACE_ID=5241558
LEADS_BOARD_ID=5084262112

# Optional
API_ENDPOINT=https://api.monday.com/v2
DELAY_BETWEEN_REQUESTS=500
```

### Customization

To customize the setup, edit `automated-setup.js`:

```javascript
// Add more groups
const groups = [
  'Planning & Permits',
  'Your Custom Group',  // Add here
  'Scheduled',
];

// Add more columns
const columns = [
  { title: 'Your Custom Field', type: 'text' },
  // Add more...
];
```

## 📁 Files

| File | Purpose |
|------|---------|
| `automated-setup.js` | Main automation script |
| `monday-setup-config.js` | Reference configuration with all mutations |
| `package.json` | Node.js dependencies |
| `.env.template` | Environment configuration template |
| `setup-results.json` | Generated after setup with all IDs |
| `README.md` | This file |

## ✅ Created Boards

All boards have been successfully created in workspace **5241558**:

| Board | ID | URL |
|-------|-----|-----|
| 💡 **Leads Management** | 5084262112 | https://monday.com/boards/5084262112 |
| 💰 **Sales Pipeline** | 5084268957 | https://monday.com/boards/5084268957 |
| 🔧 **Projects & Installation** | 5084270237 | https://monday.com/boards/5084270237 |
| 📊 **Financial Management** | 5084271089 | https://monday.com/boards/5084271089 |

## 🔍 After Setup

### Verify Your Boards

1. Go to Monday.com
2. Navigate to your workspace (ID: 5241558)
3. Click the board URLs above to access each board

### Check Results

```bash
cat setup-results.json
```

This file contains:
- All created board IDs
- All column IDs (useful for integrations)
- Any errors encountered

### Next Steps

1. **Add team members** to your workspace
2. **Configure automations** in Monday.com UI:
   - Auto-move leads when status changes
   - Send notifications on new quotes
   - Alert on overdue invoices
3. **Set up integrations**:
   - ICount for invoicing
   - Email for lead capture
   - Calendar for scheduling
4. **Customize views**:
   - Create dashboards
   - Set up charts for KPIs
   - Configure filters

## 🎯 Workflow

### Lead → Sale → Project → Invoice

```
1. Lead comes in → Add to "Leads Management"
2. Lead qualifies → Move to "Sales Pipeline"
3. Contract signed → Create in "Projects & Installation"
4. Project completes → Create invoice in "Financial Management"
```

### Recommended Automations

Set these up in Monday.com UI:

**Leads Board:**
- When status → "Qualified", create item in Sales Pipeline
- When "Next Follow-up" arrives, notify assigned person
- When no activity for 7 days, change status to "Cold Lead"

**Sales Board:**
- When moved to "Contract Signed", create item in Projects
- When "Quote Valid Until" passes, notify owner
- When status → "Lost", move to "Lost/Cancelled" group

**Projects Board:**
- When status → "Completed", create invoice in Financial
- When "Installation Start Date" arrives, notify team
- Track time automatically when status is "In Progress"

**Financial Board:**
- When "Due Date" passes and not paid, move to "Overdue"
- When payment received, update project profit
- Sync with ICount automatically

## 🐛 Troubleshooting

### API Token Issues

```bash
# Error: "Invalid authentication token"
# Solution: Generate a new token from Monday.com Admin → API
```

### Rate Limiting

```bash
# Error: "Too many requests"
# Solution: Increase DELAY_BETWEEN_REQUESTS in .env
DELAY_BETWEEN_REQUESTS=1000
```

### Column Creation Fails

Some column types may not be available on all Monday.com plans:
- `time_tracking` - Requires Pro plan or higher
- `formula` - Requires Pro plan or higher

**Solution:** Comment out these columns in the script or upgrade your plan.

### Partial Setup

If setup fails midway:
1. Check `setup-results.json` to see what was created
2. Manually delete incomplete boards if needed
3. Adjust the script to skip already-created items
4. Re-run the setup

## 📚 Resources

- [Monday.com API Documentation](https://developer.monday.com/api-reference/docs)
- [Monday.com GraphQL Playground](https://monday.com/developers/v2/try-it-yourself)
- [Column Types Reference](https://developer.monday.com/api-reference/docs/column-types)
- [Board Templates Gallery](https://monday.com/templates)

## 🤝 Support

### Common Issues

**Q: Can I run this multiple times?**
A: Running it again will create duplicate boards. Delete old boards first or modify the script to update existing ones.

**Q: How do I update an existing board?**
A: Use the column IDs from `setup-results.json` and create update mutations instead of create mutations.

**Q: Can I use this for other businesses?**
A: Yes! Customize the groups, columns, and board names to fit your needs.

**Q: Does this work with Monday.com free plan?**
A: Most features work, but some advanced column types (formulas, time tracking) require paid plans.

## 📝 License

MIT License - Feel free to modify and use for your business.

## 🎉 You're All Set!

Your Monday.com workspace is now configured with a complete solar business management system. Start adding leads, tracking sales, managing projects, and monitoring your finances!

For questions or issues, check the troubleshooting section or consult the Monday.com API documentation.

**Happy solar selling! ☀️**
