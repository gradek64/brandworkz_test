import { fireEvent, render } from '@testing-library/react';
import SearchTemperature from './SearchTemperature';


describe('@render', () => {
  it('Component has loaded data', async () => {
    const { asFragment } = render(<SearchTemperature filterCallback={() => { }} />);
    expect(asFragment()).toMatchSnapshot();
  });
})


