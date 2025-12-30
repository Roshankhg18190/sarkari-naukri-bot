import requests
from bs4 import BeautifulSoup
import supabase
from datetime import datetime
import os

# Supabase connection
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase_client = supabase.create_client(url, key)

def scrape_sarkari_jobs():
    try:
        url = "https://sarkariresult.com"
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        jobs = []
        for item in soup.find_all('div', class_='list-row')[:10]:
            title_elem = item.find('h3')
            link_elem = item.find('a')
            
            if title_elem and link_elem:
                job = {
                    'title': title_elem.text.strip(),
                    'link': 'https://sarkariresult.com' + link_elem['href'],
                    'date': datetime.now().strftime('%Y-%m-%d'),
                    'category': 'Sarkari Naukri'
                }
                jobs.append(job)
        
        for job in jobs:
            supabase_client.table('jobs').upsert(job).execute()
        print(f"✅ {len(jobs)} jobs saved!")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    scrape_sarkari_jobs()
