# Monday.com Solar Setup - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Get Your API Token (2 minutes)

1. Go to https://monday.com
2. Click your **profile picture** (bottom left)
3. Select **Admin** → **API**
4. Click **Generate** or **Copy** your API v2 token
5. Save it somewhere safe

### Step 2: Install & Configure (1 minute)

```bash
cd monday-solar-setup
npm install
cp .env.template .env
```

Edit `.env` and paste your token:
```bash
MONDAY_API_TOKEN=paste_your_token_here
```

### Step 3: Run Setup (2 minutes)

```bash
npm run setup
```

That's it! ✅

## 📋 What You'll Get

After running the setup, you'll have **4 complete boards**:

### 1. 💡 Leads Management
Track potential customers from first contact to conversion

### 2. 💰 Sales Pipeline
Manage quotes and contracts through your sales process

### 3. 🔧 Projects & Installation
Execute solar installations with full project tracking

### 4. 📊 Financial Management
Handle invoices, expenses, and integrate with ICount

## 🔍 Verify Setup

1. Open Monday.com
2. Go to your workspace
3. You should see all 4 new boards with emojis
4. Check `setup-results.json` for all board IDs

## 🎯 Start Using It

### Add Your First Lead

1. Go to "💡 Leads Management" board
2. Click **+ Add** in "New Leads" group
3. Fill in:
   - Lead name
   - Contact person
   - Phone & email
   - Lead source
   - Estimated budget

### Move Lead Through Pipeline

When a lead is qualified:
1. Change **Lead Status** to "Qualified"
2. Move to "Qualified" group
3. Create matching item in "💰 Sales Pipeline"

### Create a Project

When contract is signed:
1. Create item in "🔧 Projects & Installation"
2. Set installation dates
3. Assign team members
4. Track progress

### Generate Invoice

When project is complete:
1. Create item in "📊 Financial Management"
2. Link to project
3. Sync with ICount
4. Track payment

## 🚀 Next Steps

1. **Invite your team** to the workspace
2. **Set up automations** for workflow
3. **Create dashboards** for KPIs
4. **Connect integrations** (ICount, email, etc.)

## 💡 Pro Tips

- Use **@mentions** to notify team members
- Set **due dates** for follow-ups
- Upload **documents** directly to items
- Use **filters** to create custom views
- Create **dashboards** to visualize pipeline

## 🆘 Need Help?

Check the full `README.md` for:
- Detailed documentation
- Troubleshooting guide
- Customization options
- API references

---

**Ready to manage your solar business like a pro! ☀️**
