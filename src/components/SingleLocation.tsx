import React from 'react';
import { useFetch } from '../services/useFetch'


//custom 
import './singleLocation.css'
import { getDateFormat, dateToTimeDashFormat } from '../misc/formatDate'

const SingleLocation = () => {

  const location = { london: { lon: '-0.118092', lat: '51.509865' } }
  const { data, loading, error } = useFetch({ url: `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${location.london.lon}&lat=${location.london.lat}` })

  const formatDate = data && data.reduce((acc, { datetime }) => { acc = dateToTimeDashFormat(datetime); return acc }, '')

  return (
    <div className='singleLocation'>
      {loading && 'loading'}
      {error && error}
      {data && data.map(({ city_name, temp, clouds, weather, country_code }, i: number) =>
        <div key={i} className='singleUnit'>
          <div className='cityInfo'>
            <h2>{city_name},{country_code}</h2>
            <p>
              {`${formatDate && getDateFormat(formatDate, 'day')} 
              ${formatDate && getDateFormat(formatDate, 'dateNumber')}
              ${formatDate && getDateFormat(formatDate, 'month')}`}
            </p>
          </div>
          <div className='weatherInfo'>
            <span className="icon-alone" aria-hidden="true" data-icon="&#x231a;"></span>
            <p>{temp}<span className='metric'>°C</span></p>
            <span>{weather.description}</span>
          </div>

        </div>
      )}
    </div>
  )
}
export default SingleLocation