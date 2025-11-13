import { render, screen, fireEvent } from '@testing-library/react';
import Pricing from '../pages/Pricing';
import { MemoryRouter } from 'react-router-dom';

test('should switch to annual pricing when the toggle is clicked', () => {
  render(
    <MemoryRouter>
      <Pricing />
    </MemoryRouter>
  );

  const annualButton = screen.getByRole('button', { name: /Annual/i });
  fireEvent.click(annualButton);

  const creatorPassPrice = screen.getByText(/\$999/i);
  expect(creatorPassPrice).toBeInTheDocument();
});
