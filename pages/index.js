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
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* Top Banner with Your Name */}
      <header style={{ backgroundColor: '#1a73e8', color: 'white', padding: '40px 20px', textAlign: 'center', borderBottom: '5px solid #fbbc04' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Sarkari Naukri Portal 🚀</h1>
        <p style={{ fontSize: '1.2rem' }}>Powered by <strong>ROSHAN KUMAR</strong></p>
      </header>

      <main style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
        
        {/* Owner Info Section */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#ddd', overflow: 'hidden', border: '3px solid #1a73e8' }}>
            <img src="https://via.placeholder.com/80" alt="Roshan Kumar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#1a73e8' }}>ROSHAN KUMAR</h2>
            <p style={{ margin: 0, color: '#5f6368' }}>Founder & Chief Administrator</p>
          </div>
        </div>

        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', color: '#202124' }}>Latest Vacancies</h2>
        
        {/* Job Cards */}
        <div style={{ display: 'grid', gap: '15px' }}>
          {jobs.length === 0 ? (
            <p>Scanning internet for new jobs...</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e0e0e0' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#d93025' }}>{job.title}</h3>
                  <small style={{ color: '#70757a' }}>Posted on: {job.date}</small>
                </div>
                <a href={job.link} target="_blank" style={{ backgroundColor: '#188038', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>View Link</a>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Contact Footer */}
      <footer style={{ backgroundColor: '#202124', color: 'white', padding: '40px', marginTop: '50px', textAlign: 'center' }}>
        <h3 style={{ color: '#fbbc04' }}>Contact Info</h3>
        <p>📧 Email: roshan.kumar.official@outlook.com</p>
        <p>📞 Phone/WhatsApp: +91 9310245458</p>
        <hr style={{ borderColor: '#3c4043', margin: '20px 0' }} />
        <p>© 2025 | Created with ❤️ by Roshan Kumar</p>
      </footer>
    </div>
  )
          }
            
