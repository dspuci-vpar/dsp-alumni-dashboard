import pandas as pd
import requests
import time
import os
import argparse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_linkedin_data(linkedin_url, api_key):
    url = "https://fresh-linkedin-profile-data.p.rapidapi.com/enrich-lead"
    querystring = {
        "linkedin_url": linkedin_url,
        "include_skills": "false",
        "include_certifications": "false",
        "include_publications": "false",
        "include_honors": "false",
        "include_volunteers": "false",
        "include_projects": "false",
        "include_patents": "false",
        "include_courses": "false",
        "include_organizations": "false",
        "include_profile_status": "false",
        "include_company_public_url": "false"
    }
    headers = {
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": "fresh-linkedin-profile-data.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 429:  # Too Many Requests / Credits exhausted
        raise Exception("API credits exhausted! Please check your RapidAPI subscription.")
    else:
        print(f"Failed to fetch data for {linkedin_url}: {response.status_code}")
        return None

def update_excel_with_linkedin_data(df, api_key, update_all=False, start_row=None):
    try:
        # Determine starting point based on flags
        if start_row is not None:
            start_index = start_row
            print(f"Starting from specified row {start_index} (manual override)")
        elif update_all:
            start_index = 0
            print("Updating ALL rows (full refresh)")
        else:
            # Find the last row that was updated (has a Title)
            last_updated_index = -1
            for index, row in df.iterrows():
                if pd.notna(row.get('Title')):
                    last_updated_index = index
            start_index = last_updated_index + 1
            print(f"Resuming from row {start_index} (incremental update)")
        
        # Start iteration from the determined starting point
        for index, row in df.iloc[start_index:].iterrows():
            linkedin_url = row['Linkedin']
            if pd.notna(linkedin_url) and linkedin_url.strip() != "":
                try:
                    data = get_linkedin_data(linkedin_url, api_key)
                    if data and 'data' in data:
                        job_title = data['data'].get('job_title', '')
                        company = data['data'].get('company', '')
                        df.at[index, 'Title'] = job_title
                        df.at[index, 'Company'] = company
                        print(f"Updated {row['Name']} with {job_title} at {company}")
                    else:
                        print(f"No data found for {row['Name']}")
                except Exception as e:
                    if "API credits exhausted" in str(e):
                        print(f"\nSaving progress before exiting... (Last processed row: {index})")
                        return df  # Return partial results
                    raise  # Re-raise other exceptions
            else:
                print(f"No LinkedIn URL for {row['Name']}")
            time.sleep(1)  # Add delay to avoid hitting rate limits
        return df
    except Exception as e:
        print(f"\nError occurred: {str(e)}")
        return df  # Return partial results

def save_updated_excel(df, filename):
    df.to_excel(filename, index=False)
    print(f"Updated Excel file saved as {filename}")

if __name__ == "__main__":
    # Parse command-line arguments
    parser = argparse.ArgumentParser(
        description='Update alumni LinkedIn data from Excel file',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Update only new/missing entries (incremental):
  python update_linkedin_data.py
  
  # Update ALL entries (full refresh - use this for annual updates):
  python update_linkedin_data.py --update-all
  
  # Start from a specific row (e.g., row 253):
  python update_linkedin_data.py --start-row 253 --input ../public/UPDATED-alumni-data.xlsx
  
  # Use custom input/output files:
  python update_linkedin_data.py --input custom-data.xlsx --output custom-output.xlsx --update-all
        """
    )
    parser.add_argument(
        '--update-all',
        action='store_true',
        help='Update ALL rows, including previously updated ones (recommended for annual refresh)'
    )
    parser.add_argument(
        '--start-row',
        type=int,
        default=None,
        help='Start updating from a specific row number (0-indexed). Overrides --update-all and auto-resume.'
    )
    parser.add_argument(
        '--input',
        default=os.path.join('..', 'public', 'alumni-data.xlsx'),
        help='Path to input Excel file (default: ../public/alumni-data.xlsx)'
    )
    parser.add_argument(
        '--output',
        default=os.path.join('..', 'public', 'UPDATED-alumni-data.xlsx'),
        help='Path to output Excel file (default: ../public/UPDATED-alumni-data.xlsx)'
    )
    
    args = parser.parse_args()
    
    # Use environment variable instead of hardcoded API key
    api_key = os.getenv('RAPIDAPI_KEY')
    if not api_key:
        raise ValueError("API key not found in environment variables. Please set RAPIDAPI_KEY in .env file")
    
    print(f"Reading data from: {args.input}")
    df = pd.read_excel(args.input, sheet_name='Sheet1')
    print(f"Total rows in file: {len(df)}")
    
    updated_df = update_excel_with_linkedin_data(df, api_key, update_all=args.update_all, start_row=args.start_row)
    
    print(f"\nSaving updated data to: {args.output}")
    save_updated_excel(updated_df, args.output)