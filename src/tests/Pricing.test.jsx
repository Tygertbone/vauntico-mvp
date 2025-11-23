import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Pricing from '../pages/Pricing';

describe('Pricing', () => {
  it('includes all plans in the structured data', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Pricing />
        </MemoryRouter>
      </HelmetProvider>
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    const structuredData = JSON.parse(script.textContent);

    const offerNames = structuredData.offers.map(offer => offer.name);

    expect(offerNames).toContain('Free');
    expect(offerNames).toContain('Creator Pass');
    expect(offerNames).toContain('Enterprise');
  });
});
