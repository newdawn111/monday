# Monday.com API Token Permissions Guide

## Understanding Token Permissions

### The Issue

When you generate an API token in Monday.com, you may not see options to select specific permissions/scopes. This happens because:

1. **Account Plan Limitations:** Free/Basic plans have limited API access
2. **Account Role:** Only Admins can create tokens with full permissions
3. **Token Type:** Personal tokens vs OAuth tokens have different capabilities

## How to Generate API Tokens

### Method 1: Personal API Token (Current Method)

**Steps:**
1. Go to Monday.com
2. Click your profile picture (bottom left)
3. Click **Admin**
4. Click **API** in the left menu
5. Click **Generate** or **Copy** for "API v2 Token"

**What you get:**
- A token that inherits YOUR account permissions
- If you're an Admin: Full read/write access
- If you're not: Limited access based on your role

**Problem:**
- No granular scope selection
- Token has same permissions as your user account
- If your account is limited, so is the token

### Method 2: Check Your Current Token Permissions

Let's see what your current token can actually do:

```bash
cd monday-solar-setup
node check-api-permissions.js
```

This will show:
- ✅ What your token CAN do
- ❌ What your token CANNOT do

### Method 3: OAuth Token (Advanced)

For more control over permissions, you need to create a Monday App:

**Steps:**
1. Go to: https://monday.com/developers/apps
2. Click **Create App**
3. Choose permissions/scopes you need
4. Generate OAuth token

**Scopes available:**
- `boards:read` - Read board data
- `boards:write` - Create/update boards
- `users:read` - Read user info
- `account:read` - Read account info
- etc.

**Downside:**
- More complex setup
- Requires app approval
- OAuth flow needed

## Important: API Limitations (Even with Full Permissions!)

⚠️ **CRITICAL:** Even if you get a token with FULL permissions, the Monday.com API **still cannot** configure:

### What API CANNOT Do (Platform Limitation):

❌ **Dropdown labels** - No API endpoint exists
❌ **Status colors** - No API endpoint exists
❌ **Currency symbols (₪, $, etc.)** - No API endpoint exists
❌ **Percentage symbols (%)** - No API endpoint exists
❌ **Formula columns** - Can't create via API
❌ **Column settings** - `settings` property doesn't exist in API

### What API CAN Do:

✅ Create boards
✅ Create groups
✅ Create columns (basic types)
✅ Create items
✅ Update item values
✅ Change column titles
✅ Read all data

## Why Your Boards Still Need UI Configuration

Based on our testing:

```javascript
// This FAILS even with full permissions:
mutation {
  change_column_metadata(
    board_id: 123,
    column_id: "dropdown1",
    column_property: labels,  // ❌ Property doesn't exist
    value: '["Option 1", "Option 2"]'
  )
}

// This also FAILS:
mutation {
  create_column(
    board_id: 123,
    title: "My Formula",
    column_type: formula,  // ❌ 403 Forbidden
    defaults: "{\"formula\": \"{col1} + {col2}\"}"
  )
}
```

**Monday.com's official response:** These configurations must be done through the UI.

## Your Options

### Option 1: Verify You're an Admin

1. Go to Monday.com
2. Click your profile (bottom left)
3. Check if you see **Admin** option
4. If not, ask workspace owner to make you admin

### Option 2: Create Token as Admin

If you're an admin:
1. Admin → API
2. Generate new token
3. The token will have admin-level permissions automatically

### Option 3: Accept API Limitations

Even with perfect token permissions:
- API cannot configure UI settings
- You'll still need to configure 25 items manually
- Estimated time: 15-20 minutes

### Option 4: Use Browser Automation (On Your Computer)

Since API is limited, use browser automation on your local machine:

```bash
# On your Windows/Mac/Linux computer:
git clone your-repo
cd monday-solar-setup
npm install
npm run automate
```

This bypasses API limitations by controlling the browser.

### Option 5: Manual Configuration (Fastest)

Just follow the checklist:

```bash
cat SIMPLE_CHECKLIST.txt
```

Open the boards and configure the 25 items. Takes 15-20 minutes.

## Testing Your Token

Run this to see what your token can do:

```bash
cd monday-solar-setup
node check-api-permissions.js
```

Expected results:

**If token works:**
```
✅ SUCCESS - Can read user info
✅ SUCCESS - Can read boards
✅ SUCCESS - Can read columns
✅ SUCCESS - Can create columns
❌ FAILED - Cannot update column metadata (API limitation)
```

**If token has no permissions:**
```
❌ FAILED - Cannot read user info (403)
❌ FAILED - Cannot read boards (403)
❌ FAILED - Cannot read columns (403)
❌ FAILED - Cannot create columns (403)
❌ FAILED - Cannot update column metadata (403)
```

## Recommended Workflow

Since API limitations exist regardless of token permissions:

### Best Approach:

1. **Accept reality:** UI configuration is required
2. **Use the checklist:** `SIMPLE_CHECKLIST.txt`
3. **15-20 minutes:** Just do it manually
4. **Done!** Boards fully configured

### If You Must Automate:

1. **Clone repo to your computer** (not server)
2. **Run browser automation:** `npm run automate`
3. **10 minutes:** Auto-completes 60-70%
4. **5 minutes:** Manually finish failed items

## Summary

**The Token Permission Issue:**
- Monday.com doesn't always show scope selection
- Token inherits your account permissions
- Need to be Admin for full access

**The Bigger Issue:**
- Even with full token permissions
- API still can't configure dropdowns, colors, currency, formulas
- This is a Monday.com platform limitation
- NOT a permission issue

**The Solution:**
- Manual configuration via UI
- OR browser automation on local machine
- OR hire someone to do it

**Time investment:**
- Manual: 15-20 minutes
- Browser automation: 10 minutes + setup
- Hiring someone: $20-30, 30 minutes

## Need Help?

1. Check token: `node check-api-permissions.js`
2. View checklist: `cat SIMPLE_CHECKLIST.txt`
3. Read browser automation guide: `cat BROWSER_AUTOMATION.md`

---

**Bottom line:** Token permissions aren't your bottleneck - Monday.com's API limitations are. The fastest path forward is manual configuration using the checklist.
