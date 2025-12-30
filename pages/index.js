import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Home() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    async function fetchJobs() {
      const { data } = await supabase.from('jobs').select('*').order('date', { ascending: false })
      setJobs(data || [])
    }
    fetchJobs()
  }, [])

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      {/* Header - Modern Look */}
      <header style={{ backgroundColor: '#1a73e8', color: 'white', padding: '25px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Sarkari Naukri Portal 🚀</h1>
        <p style={{ marginTop: '5px', opacity: '0.9' }}>Sabse Tez aur Sahi Job Updates</p>
      </header>

      {/* Main Jobs Section */}
      <main style={{ maxWidth: '900px', margin: '30px auto', padding: '0 15px' }}>
        <h2 style={{ color: '#202124', borderLeft: '5px solid #1a73e8', paddingLeft: '15px', marginBottom: '25px' }}>Latest Job Notifications</h2>
        
        {jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '10px' }}>
            <p style={{ color: '#70757a' }}>Nayi naukriyan khoji ja rahi hain... Kripya thoda intezar karein.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} style={{ backgroundColor: 'white', margin: '15px 0', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #e8eaed' }}>
              <h3 style={{ margin: 0, color: '#1a73e8', fontSize: '1.3rem' }}>{job.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ backgroundColor: '#e8f0fe', color: '#1967d2', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>Update: {job.date}</span>
                <a href={job.link} target="_blank" style={{ backgroundColor: '#34a853', color: 'white', padding: '10px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>View Details</a>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Contact & Admin Section (Aapki Jankari ke saath) */}
      <footer style={{ backgroundColor: '#202124', color: 'white', padding: '40px 20px', marginTop: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#fbbc04' }}>📩 Admin Support (Contact Us)</h3>
        <p style={{ marginBottom: '10px' }}>Kisi bhi sahayata ya shikayat ke liye niche diye gaye details par sampark karein:</p>
        
        <div style={{ backgroundColor: '#303134', display: 'inline-block', padding: '15px 30px', borderRadius: '10px', marginTop: '10px' }}>
          <p style={{ margin: '5px 0' }}>📧 <strong>Email:</strong> roshan.kumar.official@outlook.com</p>
          <p style={{ margin: '5px 0' }}>📞 <strong>WhatsApp/Call:</strong> +91 9310245458</p>
        </div>
        
        <p style={{ marginTop: '30px', fontSize: '0.8rem', color: '#9aa0a6' }}>© 2025 Sarkari Naukri Bot | Design by Roshan Kumar</p>
      </footer>
    </div>
  )
        }
          
