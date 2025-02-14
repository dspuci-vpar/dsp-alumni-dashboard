import pandas as pd

# Load the Excel file
df = pd.read_excel('db.xlsx', sheet_name='Sheet1')

# Define a function to categorize industries using reasoning
def categorize_industry(job_title, company):
    # Convert job title and company to lowercase for easier matching
    job_title = str(job_title).lower()
    company = str(company).lower()

    # Reasoning logic to categorize industries
    if "marketing" in job_title or "marketing" in company or "brand" in job_title or "advertising" in job_title:
        return "Marketing"
    elif "product manager" in job_title or "product management" in job_title or "product owner" in job_title:
        return "Product Management"
    elif "engineer" in job_title or "software" in job_title or "developer" in job_title or "technology" in company:
        return "Technology"
    elif "finance" in job_title or "financial" in job_title or "investment" in job_title or "finance" in company:
        return "Finance"
    elif "accounting" in job_title or "accountant" in job_title or "tax" in job_title or "audit" in job_title:
        return "Accounting"
    elif "consulting" in job_title or "consultant" in job_title or "strategy" in job_title or "advisory" in job_title:
        return "Consulting"
    elif "data" in job_title or "analytics" in job_title or "data scientist" in job_title or "analyst" in job_title:
        return "Data"
    elif "sales" in job_title or "business development" in job_title or "sales" in company:
        return "Sales"
    elif "hr" in job_title or "human resources" in job_title or "recruitment" in job_title or "talent" in job_title:
        return "HR"
    elif "operations" in job_title or "operations" in company or "logistics" in job_title:
        return "Operations"
    elif "legal" in job_title or "law" in job_title or "attorney" in job_title or "compliance" in job_title:
        return "Legal"
    elif "real estate" in job_title or "real estate" in company or "mortgage" in job_title:
        return "Real Estate"
    elif "ui/ux" in job_title or "design" in job_title or "user experience" in job_title or "creative" in job_title:
        return "UI/UX"
    elif "strategy" in job_title or "strategic" in job_title or "business strategy" in job_title:
        return "Strategy"
    elif "project manager" in job_title or "project management" in job_title or "program manager" in job_title:
        return "Project Management"
    elif "bizops" in job_title or "business operations" in job_title or "operations manager" in job_title:
        return "BizOps"
    elif "entrepreneurship" in job_title or "entrepreneur" in job_title or "founder" in job_title:
        return "Entrepreneurship"
    elif "client services" in job_title or "client services" in company or "customer success" in job_title:
        return "Client Services"
    elif "insurance" in job_title or "insurance" in company or "risk management" in job_title:
        return "Insurance"
    elif "event management" in job_title or "event management" in company or "event planner" in job_title:
        return "Event Management"
    elif "startup" in job_title or "startup" in company or "venture capital" in job_title:
        return "Startup"
    elif "government" in job_title or "government" in company or "public sector" in job_title:
        return "Government"
    elif "education" in job_title or "education" in company or "professor" in job_title or "teacher" in job_title:
        return "Education"
    elif "healthcare" in job_title or "healthcare" in company or "medical" in job_title:
        return "Healthcare"
    elif "media" in job_title or "media" in company or "entertainment" in job_title:
        return "Media/Entertainment"
    elif "retail" in job_title or "retail" in company or "ecommerce" in job_title:
        return "Retail/E-commerce"
    elif "manufacturing" in job_title or "manufacturing" in company or "supply chain" in job_title:
        return "Manufacturing"
    else:
        return "Other"  # Default fallback

# Apply the reasoning function to update the Role/Industry column
df['Role/Industry'] = df.apply(lambda row: categorize_industry(row['Title'], row['Company']), axis=1)

# Save the updated DataFrame to a new Excel file
df.to_excel('db_updated.xlsx', index=False)

print("Role/Industry column updated using reasoning and saved to 'Updated_Role_Industry_Reasoning_FULL_DSP-PiSigma_Alumni_Database.xlsx'")