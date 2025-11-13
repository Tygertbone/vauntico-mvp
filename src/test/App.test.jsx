import { render, screen } from '@testing-library/react';
import { AppContent } from '../App';
import { MemoryRouter } from 'react-router-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

test('renders the App component', () => {
  render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>
  );
});

test('should have only one Ascend link in the footer', () => {
  render(
    <MemoryRouter>
      <AppContent />
    </MemoryRouter>
  );
  const ascendLinks = screen.getAllByRole('link', { name: /🏔️ Ascend/i });
  expect(ascendLinks).toHaveLength(1);
});
