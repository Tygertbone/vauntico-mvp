import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppContent } from '../App';

describe('App', () => {
  it('renders the footer without a duplicate "Ascend" link', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <AppContent />
        </MemoryRouter>
      </HelmetProvider>
    );

    const footer = screen.getByRole('contentinfo');
    const ascendLinks = screen.getAllByText(/Ascend/i);

    // There should be only one "Ascend" link in the footer
    expect(ascendLinks.length).toBe(1);
  });
});
