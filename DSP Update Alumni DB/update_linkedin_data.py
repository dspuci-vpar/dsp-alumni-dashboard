import pandas as pd
import requests
import time
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_linkedin_data(linkedin_url, api_key):
    url = "https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile"
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

def update_excel_with_linkedin_data(df, api_key):
    try:
        # Find the last row that was updated (has a Title)
        last_updated_index = -1
        for index, row in df.iterrows():
            if pd.notna(row.get('Title')):
                last_updated_index = index
        
        print(f"Starting from row {last_updated_index + 1}")
        
        # Start iteration from the row after the last updated one
        for index, row in df.iloc[last_updated_index + 1:].iterrows():
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

# Use environment variable instead of hardcoded API key
api_key = os.getenv('RAPIDAPI_KEY')
if not api_key:
    raise ValueError("API key not found in environment variables")

df = pd.read_excel('Updated_FULL_DSP-PiSigma_Alumni_Database.xlsx', sheet_name='Sheet1')
updated_df = update_excel_with_linkedin_data(df, api_key)
save_updated_excel(updated_df, 'Updated_Updated_FULL_DSP-PiSigma_Alumni_Database.xlsx')