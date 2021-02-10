import {useEffect,useState} from 'react'

//custom 
import {headers} from './credentials'
import {WeatherResponse} from './I_WeatherResponse'
// import {mockResponse} from './mockData'

//convert to RECORD {[key:string]:any}
export const useFetch = ({url,locations}:{url:string,locations?:{[key:string]:any}|boolean}={url:'',locations:false}) => {

  const [data, setData] = useState<WeatherResponse[] | null>(null)
  const [loading,isLoading] = useState(true)
  const [error,setError] = useState<any>(null)
  const locationsJsonString = JSON.stringify(locations)

  useEffect(() => {
   
      const callApi = async () => {
        try {
          isLoading(true);
          let responseData:WeatherResponse[] | null
          const locationsObject = locationsJsonString && JSON!.parse(locationsJsonString);

          //multiple locations
          if(locationsObject){
              const cities = Object.keys(locationsObject)
              const locationResponses =  cities!.map(
                async (city) => {
                const dataBack = await fetch(`${url}?lat=${locationsObject[city].lat}&lon=${locationsObject[city].lon}`, {
                    "method": "GET",
                    "headers": headers,
                })
                const dataBackJson = await dataBack.json()    
                return dataBackJson
              })
                responseData =  await Promise.all(locationResponses)
                //check for service provider errors
                const error = responseData.some(({message})=>message)
                !error ? setData(responseData) : setData(null)
                error ? setError(error) : setError(null)
                isLoading(false);   
          }
         
          //single location
          if(!locationsObject){
         const dataBack = await fetch(url, {
            "method": "GET",
            "headers":headers,
          })
          const singleLocation = await dataBack.json()
          
          //server error responses 
          responseData = singleLocation.data 
          responseData ? setData(responseData) : setData(null)
          responseData ? setError(null) : setError('error')   
          isLoading(false);
          }          
         
        }
        catch (error:any) {
          isLoading(false);
          setError(error) 
        }
        } 
      callApi()
    //has to be converted to string because of nested object comparison
  },[locationsJsonString,url])

  return {data,loading,error}

}