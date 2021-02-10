import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MultipleLocations from './MultipleLocations';

const mockData = {
  city_name: 'London',
  data: [
    {
      temp: 3,
      weather: {
        description: 'cloudy'
      },
    },
    {
      temp: 5,
      weather: {
        description: 'snowy'
      },
    }
  ]
}

const mockJsonPromise = Promise.resolve(mockData);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});

describe('@render', () => {
  it('Component is loading', () => {
    render(<MultipleLocations />);
    const linkElement = screen.getByText(/loading/i);
    expect(linkElement).toBeInTheDocument();

  });
  fit('Component has loaded data', async () => {
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    const { asFragment } = render(<MultipleLocations />);
    //after http response
    const comp = await waitFor(() => asFragment())
    expect(comp).toMatchSnapshot();
  });
})

