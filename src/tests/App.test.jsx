import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../App';

describe('App', () => {
  it('renders the footer without a duplicate "Ascend" link', () => {
    render(
      <MemoryRouter>
        <AppContent />
      </MemoryRouter>
    );

    const footer = screen.getByRole('contentinfo');
    const ascendLinks = screen.getAllByText(/Ascend/i);

    // There should be only one "Ascend" link in the footer
    expect(ascendLinks.length).toBe(1);
  });
});
