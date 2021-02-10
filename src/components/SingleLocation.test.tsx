import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SingleLocation from './SingleLocation';

const mockData = {
  data: [{
    city_name: 'London',
    datetime: '2021-02-10:12',
    temp: 3,
    weather: {
      description: 'cloudy'
    },
  }]
}

const mockJsonPromise = Promise.resolve(mockData);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});

describe('@render', () => {
  it('Component is loading', () => {
    render(<SingleLocation />);
    const linkElement = screen.getByText(/loading/i);
    expect(linkElement).toBeInTheDocument();

  });
  it('Component has loaded data', async () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const { asFragment } = render(<SingleLocation />);
    //after http response
    const comp = await waitFor(() => asFragment())
    expect(comp).toMatchSnapshot();
  });
})

