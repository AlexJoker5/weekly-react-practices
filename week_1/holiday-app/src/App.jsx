import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'

const fetchCountries = async () => {
  const response = await fetch(`https://date.nager.at/api/v3/AvailableCountries`)
  if(!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const fetchHolidays = async ({ queryKey }) => {
  const [_, countryCode] = queryKey

  const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/2026/${countryCode}`)
  if(!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

function App() {

  const [selectedCountry, setSelectedCountry] = useState('US')

  const { data: countries, isLoading, isError } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  })

  if(isLoading) return <div className="container">Loading countries...</div>

  if(isError) return <div className="container">Error fetching countries...</div>

  const { data: holidays, isLoading: isLoadingHolidays, isError: isErrorHolidays } = useQuery({
    queryKey: ['holidays', selectedCountry],
    queryFn: fetchHolidays,
  })

  return (
    <div className="container paper">
      <header className="margin-bottom-large">
        <h1>🗓️National Holidays Explorer</h1>
        <p className="secondary-text">View public holidays for countries around the world</p>
      </header>

      <main>
        <div className="form-group">
          <label htmlFor="country-select">Select a Country:</label>
          <select id="country-select" value={selectedCountry}
          onChange={(e)=>setSelectedCountry(e.target.value)}>
            {
              countries?.map((country) => (
                <option key={country.countryCode} value={country.countryCode}>{country.name}</option>
              ))
            }
          </select>
        </div>

        <section className="margin-top-large">
            <h2>Holidays for {selectedCountry} (2026)</h2>

            {isLoadingHolidays && <p>Loading Holidays...</p>}
            {isErrorHolidays && <p className="text-danger">Error fetching holidays.</p>}



            <div className="row">

              {
              holidays?.map((holiday, index) => (
                <div key={`${holiday.date}-${index}`}
                className="card sm-12 md-6 col holding-space"
                style={{ marginBottom: '15px' }}>
                  <div className="card-body">
                    <h4 className="card-title">{holiday.name}</h4>
                    <p className="card-text">
                      📅 Date: <strong>{new Date(holiday.date).toLocaleDateString()}</strong>
                    </p>
                  </div>
                </div>
              ))
            }
            </div>
        </section>
      </main>

    </div>
  )
}

export default App
