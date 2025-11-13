import { render, screen } from '@testing-library/react';
import PricingTable from '../components/PricingTable';

test('should display savings on the yearly plan', () => {
  render(<PricingTable />);
  const yearlyPlan = screen.getByText('Yearly').closest('div');
  const savingsText = screen.getByText(/Save \$149/i);
  expect(yearlyPlan).toContainElement(savingsText);
});
