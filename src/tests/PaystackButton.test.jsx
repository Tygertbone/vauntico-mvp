import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PaystackButton from '../components/PaystackButton';
import { initializePaystackPayment } from '../utils/paystack';

vi.mock('../utils/paystack', () => ({
  initializePaystackPayment: vi.fn(),
  redirectToSuccess: vi.fn(),
  verifyPayment: vi.fn(),
}));

describe('PaystackButton', () => {
  it('calls initializePaystackPayment with the correct amount', () => {
    const amount = 100;
    const email = 'test@example.com';

    render(<PaystackButton amount={amount} email={email} />);

    fireEvent.click(screen.getByText('Buy with Apple Pay'));

    expect(initializePaystackPayment).toHaveBeenCalledWith(
      email,
      amount * 100,
      expect.any(Function),
      expect.any(Function)
    );
  });
});
