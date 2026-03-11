# Alumni Data Update Scripts

This folder contains Python scripts to update and maintain the alumni database with current LinkedIn information.

## Prerequisites

1. **Python 3.x** installed
2. **Required packages** (install via pip):
   ```bash
   pip install pandas openpyxl requests python-dotenv
   ```
3. **RapidAPI Key** for LinkedIn Profile Data API
   - Get your key from: https://rapidapi.com/rockapis-rockapis-default/api/fresh-linkedin-profile-data
   - Create a `.env` file in this directory with:
     ```
     RAPIDAPI_KEY=your_api_key_here
     ```

## Scripts Overview

### 1. `update_linkedin_data.py`
Fetches current job titles and companies from LinkedIn profiles.

**Usage:**

```bash
# Incremental update (only new/missing entries)
python update_linkedin_data.py

# Full refresh (update ALL entries - recommended for annual updates)
python update_linkedin_data.py --update-all

# Custom input/output files
python update_linkedin_data.py --input custom.xlsx --output output.xlsx --update-all
```

**Features:**
- ✅ Resume capability: Automatically continues from where it left off
- ✅ API credit protection: Saves progress if credits run out
- ✅ Full refresh mode: Use `--update-all` for annual updates
- ✅ Rate limiting: Built-in 1-second delay between requests

### 2. `update_industry.py`
Categorizes alumni into industries based on job titles and companies.

**Usage:**

```bash
# Use default paths
python update_industry.py

# Custom input/output files
python update_industry.py --input input.xlsx --output output.xlsx
```

**Categories:**
Marketing, Product Management, Technology, Finance, Accounting, Consulting, Data, Sales, HR, Operations, Legal, Real Estate, UI/UX, Strategy, Project Management, BizOps, Entrepreneurship, Client Services, Insurance, Event Management, Startup, Government, Education, Healthcare, Media/Entertainment, Retail/E-commerce, Manufacturing, Other

## Complete Workflow for Annual Updates

Run these commands in order:

```bash
# Step 1: Update LinkedIn data (full refresh)
python update_linkedin_data.py --update-all

# Step 2: Categorize industries
python update_industry.py

# Step 3: Check the results
# The final output will be in ../public/alumni-data.xlsx
```

## File Flow

```
../public/alumni-data.xlsx
    ↓ (Step 1: update_linkedin_data.py --update-all)
../public/UPDATED-alumni-data.xlsx
    ↓ (Step 2: update_industry.py)
../public/alumni-data.xlsx (updated with new data)
```

## Troubleshooting

### "API key not found in environment variables"
- Create a `.env` file in this directory with your `RAPIDAPI_KEY`

### "FileNotFoundError: alumni-data.xlsx"
- Make sure the file exists in `../public/alumni-data.xlsx`
- Or specify a custom path with `--input`

### "API credits exhausted"
- The script will save progress automatically
- Check your RapidAPI subscription and credit balance
- Resume later by running the script again (without `--update-all`)

### Script stops midway
- Progress is automatically saved
- Run again without `--update-all` to resume from where it stopped
- Or run with `--update-all` to start fresh

## Notes

- **Incremental updates**: By default, the script only updates rows without a Title
- **Full refresh**: Use `--update-all` flag when you want to refresh all alumni data (recommended annually)
- **API costs**: Each LinkedIn profile fetch uses 1 API credit
- **Rate limits**: Built-in 1-second delay between requests to avoid hitting rate limits

