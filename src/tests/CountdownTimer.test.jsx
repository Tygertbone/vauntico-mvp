import { render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import CountdownTimer from '../components/CountdownTimer';

describe('CountdownTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with "00" for all time units on initial render', async () => {
    render(<CountdownTimer />);

    // Initial render should have all time units as "00"
    const allTimeUnits = screen.getAllByText('00');
    expect(allTimeUnits.length).toBe(4);

    // Advance timers by 1 second
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // After 1 second, the seconds should have changed
    const seconds = screen.getByText('59');
    expect(seconds).toBeInTheDocument();
  });
});
