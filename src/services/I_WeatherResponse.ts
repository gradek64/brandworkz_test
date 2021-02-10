export interface WeatherResponse
 {
    city_name:string,
      temp:number,
      datetime:string,
      message?:string,
      country_code:string,
      clouds:number,
      weather:{
        description:string
      },
      data?:{
        temp:number,
        datetime:string,
        weather:{
          description:string
        }}[]
}
      