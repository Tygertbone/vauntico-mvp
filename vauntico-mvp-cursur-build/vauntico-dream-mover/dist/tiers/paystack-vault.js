export async function createPaystackIntent(email, amountCents, currency = 'ZAR') {
    // Stub: in production, call your /api/paystack/intent and return authorization_url
    const url = `https://paystack.com/pay/intent?email=${encodeURIComponent(email)}&amount=${amountCents}&currency=${currency}`;
    return { url, amount: amountCents, currency };
}
