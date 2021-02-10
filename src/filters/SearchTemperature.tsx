import React, { useState, useRef } from 'react'

//custom 
import './searchTemperature.css'


interface IProps {
  filterCallback: (arg: [string, number]) => void
}
const SearchTemperature = ({ filterCallback }: IProps) => {

  const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const [minOrMax, setMinOrMax] = useState('min')

  const onChangeMinMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setMinOrMax(value)
  }

  const submitChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const input = inputSearchRef.current
    const valueToNumber = Number(input!.value)
    //simple validation for non defined
    if (!valueToNumber) return
    filterCallback([minOrMax, valueToNumber])
  }

  return (
    <form className='searchTemperature' >
      <label htmlFor="search"></label>search Temperature
      <input name='search' type="number" ref={inputSearchRef}></input>
      <div className='minMaxContainer'>
        <label htmlFor="max">min
        <input name='max' type="radio" checked={minOrMax === 'min'} onChange={onChangeMinMax} value="min" />
        </label>
        <label htmlFor="min">max
        <input name='min' type="radio" checked={minOrMax === 'max'} onChange={onChangeMinMax} value="max" />
        </label>
      </div>
      <button id='submit' onClick={submitChange} >Search</button>
    </form>
  )
}


export default SearchTemperature