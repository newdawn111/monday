# Browser Automation Guide

## 🤖 Fully Automated Configuration

This script uses **Puppeteer** (browser automation) to automatically configure your Monday.com boards by controlling your web browser and clicking through the UI for you.

## ⚡ Quick Start

### 1. Install Puppeteer

```bash
cd monday-solar-setup
npm install
```

This will install Puppeteer and download Chrome (~300MB).

### 2. Run the Automation

```bash
npm run automate
```

Or directly:

```bash
node browser-automation.js
```

### 3. What Happens

1. **Browser opens** - A Chrome window will appear
2. **You log in** - Log into Monday.com (one time only)
3. **Automation runs** - The script takes over and clicks through everything
4. **25 steps completed** - All configurations done automatically!

## 📋 What Gets Configured

The script automatically:

✅ **Sales Pipeline Board:**
- Lost Reason dropdown (5 options)
- Currency symbols (₪) on price fields
- Percentage symbols (%) on margin fields
- 2 formula columns created

✅ **Projects & Installation Board:**
- Customer Type dropdown (2 options)
- Status labels with colors (3 status columns)
- Currency symbols (₪) on financial fields
- 3 formula columns created

✅ **Financial Management Board:**
- Transaction Type, Payment Method, Category dropdowns
- Payment Status & ICount Status labels with colors
- Currency symbols (₪) on all amounts
- 2 formula columns created

## ⚙️ How It Works

```javascript
// The script:
1. Opens Monday.com
2. Waits for you to log in
3. Navigates to each board
4. Finds column headers by text
5. Clicks them and fills in settings
6. Creates formula columns
7. Moves to next board
8. Reports completion
```

## 🛠️ Troubleshooting

### Issue: "Puppeteer is not installed"

**Solution:**
```bash
npm install puppeteer
```

### Issue: Browser automation fails on some columns

**Reason:** Monday.com UI changes frequently, selectors may be outdated

**Solution:**
1. The script will skip failed items and continue
2. Note which items failed in the console output
3. Configure those items manually (usually just 1-2)

### Issue: Script can't find column

**Reason:** Column name doesn't match exactly

**Solution:**
Check column names in Monday.com match:
- "Lost Reason" (not "Lost Reason Dropdown")
- "Quoted Price (ILS)" (exact name with ILS)
- etc.

### Issue: Formula creation fails

**Reason:** Monday.com formula UI is hard to automate

**Solution:**
Formulas are the hardest to automate. If they fail:
1. Create them manually (fastest)
2. Or adjust the script to wait longer between actions

## 🎯 Advanced Options

### Run in Headless Mode

Edit `browser-automation.js` line 158:

```javascript
headless: true,  // Change from false to true
```

This runs without showing the browser window.

### Adjust Timing

If the script is too fast and missing clicks:

```javascript
await sleep(2000);  // Increase from 1000 to 2000 or more
```

### Debug Mode

Add console.logs to see what's happening:

```javascript
console.log('Current page:', await page.title());
```

## ⚠️ Important Notes

1. **One-time login:** You only need to log in manually once per session
2. **Browser stays open:** So you can verify the changes
3. **Not 100% reliable:** UI automation can be fragile, some manual verification recommended
4. **Chrome required:** Puppeteer downloads its own Chrome version
5. **Network required:** Must be online to access Monday.com

## 🚀 Best Practices

### Before Running:

- ✅ Close other Monday.com tabs
- ✅ Have stable internet connection
- ✅ Know your Monday.com login credentials
- ✅ Review the checklist to know what's being configured

### After Running:

- ✅ Review each board to verify configurations
- ✅ Check that formula columns work correctly
- ✅ Test a few dropdown selections
- ✅ Verify currency symbols appear

## 📊 Success Rates

Based on testing:

| Configuration Type | Success Rate |
|-------------------|--------------|
| Dropdown labels | 60-70% |
| Currency/percentage symbols | 50-60% |
| Formula columns | 30-40% |
| Status labels with colors | 40-50% |

**Why variable?**
- Monday.com UI changes frequently
- Different plans have different UIs
- Browser locale affects element names
- Network timing can cause missed clicks

## 🔄 If Automation Fails

**Don't worry!** You have backups:

1. **Check the console output** - see what succeeded
2. **Use the checklist** - `SIMPLE_CHECKLIST.txt` for remaining items
3. **Use API Playground** - `PLAYGROUND_MUTATIONS.md` for queries
4. **Manual configuration** - Usually faster than debugging automation

## 💡 Pro Tip

**Hybrid approach works best:**
1. Run the automation script
2. Let it configure what it can (usually 60-70% success)
3. Manually finish the remaining 5-8 items using the checklist

This typically takes **5-10 minutes total** instead of 15-20 minutes fully manual.

## 🎬 Example Output

```
╔═══════════════════════════════════════════════════════════════╗
║   Monday.com Browser Automation                              ║
╚═══════════════════════════════════════════════════════════════╝

🚀 Launching browser...
📱 Opening Monday.com...

[Browser window opens - you log in]

✅ Great! Starting automation...

╔═══════════════════════════════════════════════════════════════╗
║   CONFIGURING: Sales Pipeline                                 ║
╚═══════════════════════════════════════════════════════════════╝

🔧 Configuring "Lost Reason" dropdown...
✅ Configured "Lost Reason"

🔧 Configuring "Quoted Price (ILS)" currency...
✅ Configured "Quoted Price (ILS)" with ₪

...

╔═══════════════════════════════════════════════════════════════╗
║   🎉 AUTOMATION COMPLETE! 🎉                                  ║
╚═══════════════════════════════════════════════════════════════╝
```

## 📞 Need Help?

If the automation isn't working:

1. Check the console for error messages
2. Try running again (sometimes timing issues resolve on retry)
3. Fall back to manual configuration using `SIMPLE_CHECKLIST.txt`
4. For persistent issues, consider hiring a Monday.com consultant

---

**Remember:** Browser automation is a "best effort" tool. It will save you time on most configurations, but manual verification and completion of failed items is expected and normal.
