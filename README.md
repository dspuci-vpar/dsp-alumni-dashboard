# DSP Alumni Database Maintenance Scripts

This repository contains scripts to maintain and update the DSP Alumni Database with LinkedIn profile information.

## Setup

1. **Install Python Requirements**
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Setup**
   - Create a `.env` file in the `update-alumni-script` directory
   - Add your RapidAPI key:
     ```
     RAPIDAPI_KEY=your_api_key_here
     ```
   - Get your API key from [RapidAPI's LinkedIn Profile Data API](https://rapidapi.com/freshdata-freshdata-default/api/fresh-linkedin-profile-data/playground)

3. **Excel File Setup**
   - Place your Excel file named `db.xlsx` in the `update-alumni-script` directory
   - Required columns:
     - `Name`: Alumni name
     - `Linkedin`: LinkedIn profile URL
     - `Title`: Job title (will be updated by script)
     - `Company`: Company name (will be updated by script)

## Usage

### Updating LinkedIn Data Manually (Option 1)

*** Best for updating small amounts of people ***

1. Make edits to the excel file (alumni-data.xlsx) found in the public folder.
   You can do this by:
      - Downloading the excel file
      - Opening it in an editor (e.g. Excel, Google Sheets, etc)
      - Updating rows/columns and or adding more people
      - Exporting the new excel file
      - Replacing the alumni-data.xlsx file with the updated one. Ensure that they have the same name.

### Updating LinkedIn Data Using the Script (Option 2)

*** Best for updating larger amounts of people ***

1. Run the LinkedIn data update script:
   ```bash
   python update_linkedin_data.py
   ```

2. The script will:
   - Start from the last updated row (where Title is not empty)
   - Update job titles and companies from LinkedIn profiles
   - Save progress automatically in case of errors
   - Create a new file `db_updated.xlsx` with the results

### Error Handling

- The script includes rate limiting (1 request per second)
- If API credits are exhausted, it will save progress before stopping
- Detailed error logging is included for debugging

## Maintenance Tips

1. **API Credits**
   - Monitor your RapidAPI usage dashboard
   - The script will stop if credits are exhausted
   - If you need more requests, just make new RapidAPI accounts and update the keys

2. **Data Backup**
   - Always keep a backup of `db.xlsx`
   - The script creates `db_updated.xlsx` instead of overwriting
   - Review changes before replacing the original file

3. **Troubleshooting**
   - Check the console output for error messages
   - Verify LinkedIn URLs are correctly formatted
   - Ensure your API key is valid and has available credits

4. **Best Practices**
   - Run updates periodically (e.g., every quarter)
   - Verify data accuracy after updates
   - Keep the requirements.txt updated if new dependencies are added
