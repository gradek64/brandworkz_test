import React, { useState, useEffect } from 'react'

//custom
import { useFetch } from '../services/useFetch'
import SearchTemperature from '../filters/SearchTemperature'
import { WeatherResponse } from '../services/I_WeatherResponse'
import './multipleLocation.css'
//misc
import { getDateFormat } from '../misc/formatDate';


const locations = {
  'london': { lon: '-0.118092', lat: '51.509865' },
  'mumbai': { lon: '72.877426', lat: '19.076090' },
  'new york': { lon: '-74.00597', lat: '40.71427' },
  'sydney': { lon: '151.209900', lat: '-33.865143' },
  'tokyo': { lon: '139.69171', lat: '35.6895' }
}

const MultipleLocations = () => {

  const { data, loading, error } = useFetch({ url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily', locations })
  const [filteredData, setData] = useState<WeatherResponse[] | null>(null)

  useEffect(() => {
    setData(data)
  }, [data])

  const filterTemperature = (filterData: [string, number]) => {
    const [minMax, temperature] = filterData
    let filter: WeatherResponse[]
    switch (minMax) {
      case 'min':
        filter = data!.map<WeatherResponse>(({ city_name, data }): any => {
          return {
            city_name,
            data: data!.filter(({ temp }: { temp: number }) => temp >= temperature),
          }
        })
        setData(filter)
        break;
      case 'max':
        filter = data!.map<WeatherResponse>(({ city_name, data }): any => {
          return {
            city_name,
            data: data!.filter(({ temp }: { temp: number }) => temp <= temperature
            ),
          }
        })
        setData(filter)
        break;
    }
  }

  return (
    <div className='multipleLocations'>
      <SearchTemperature filterCallback={filterTemperature} />
      {loading && 'loading'}
      {error && 'Ups something went wrong'}
      {filteredData && !!filteredData.length && filteredData.map(({ city_name, data }, i: number) => (
        <div key={`unit${i}`}>
          <h2>{city_name}</h2>
          <div className={'unitsContainer'}>
            {Array.isArray(data) &&
              data.map(({ temp, weather, datetime }, i: number) =>
                <div className='singleUnit' key={`data${i}`}>
                  <p>{getDateFormat(datetime, 'day')}</p>
                  <p>{getDateFormat(datetime, 'dateNumber')} {getDateFormat(datetime, 'month')}</p>
                  <span className="icon-alone" aria-hidden="true" data-icon="&#x231a;"></span>
                  <p>{temp}<span className='metric'>°C</span></p>
                  <p>{weather.description}</p>
                </div>
              )}
          </div>
        </div>))}
    </div>)

}

export default MultipleLocations