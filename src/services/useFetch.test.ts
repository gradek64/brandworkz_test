import { cleanup, renderHook } from '@testing-library/react-hooks';

//custom hook
import {useFetch} from './useFetch';
const mockData = {
  data: [{
    city_name: 'London',
    temp: 3,
    datetime:'2012-120-01',
    country_code:'GB',
    clouds:32,
    weather: {
      description: 'cloudy'
    },
  }]
}
const mockDataMultipleLocations = [{data:mockData.data}]
const mockJsonPromise = Promise.resolve(mockData);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});

describe('useFetch() is loading data', () => {
  afterEach(cleanup);
  beforeEach(()=>{
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  })
  it('should set loading=true' , async () => {
    const { result,waitForNextUpdate } = renderHook(() => useFetch());
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
  });
  it('should set loading=false once data is loaded' , async () => {
    const { result,waitForNextUpdate } = renderHook(() => useFetch());
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
  });
}); 

describe('useFetch() responds with data', () => {
  afterEach(cleanup);
  beforeEach(()=>{
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  })
  it('should call useFetch() with no params and return data' , async () => {
    const { result,waitForNextUpdate } = renderHook(() => useFetch());
    await waitForNextUpdate()
    const mockDataJson = JSON.stringify(mockData.data)
    const hookResponseJson = JSON.stringify(result.current.data)
    expect(hookResponseJson).toBe(mockDataJson)
  });
  it('should call useFetch({url,location}) with no url,location obj and return data' , async () => {
    const paramObject = {url:'url',locations:{'london': { lon: '-0.118092', lat: '51.509865' },}};
    const { result,waitForNextUpdate } = renderHook(() => useFetch(paramObject))
    await waitForNextUpdate()
    const mockDataJson = JSON.stringify(mockDataMultipleLocations)
    const hookResponseJson = JSON.stringify(result.current.data)
    expect(hookResponseJson).toBe(mockDataJson)
  });
}); 

describe('useFetch() responds with error', () => {
  afterEach(cleanup);
  beforeEach(()=>{
    global.fetch = jest.fn().mockImplementation(() => Promise.reject('error'));
  })
  it('should set error' , async () => {
    const { result,waitForNextUpdate } = renderHook(() => useFetch());
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe('error')
  });
}); 

