// Paystack Integration Utility
const PAYSTACK_PUBLIC_KEY = 'pk_live_6170742d40545d6ee122fb1d8878be1cf4eb1b4e'

export const initializePaystackPayment = (email, amount, onSuccess, onClose) => {
  // Load Paystack script if not already loaded
  if (!window.PaystackPop) {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = () => {
      startPayment(email, amount, onSuccess, onClose)
    }
    document.head.appendChild(script)
  } else {
    startPayment(email, amount, onSuccess, onClose)
  }
}

const startPayment = (email, amount, onSuccess, onClose) => {
  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: amount * 100, // Paystack expects amount in kobo (cents)
    currency: 'USD',
    ref: 'vault_' + Math.floor((Math.random() * 1000000000) + 1),
    metadata: {
      product: 'Vauntico Prompt Vault - Founders Edition'
    },
    callback: function(response) {
      // Payment successful
      onSuccess(response)
    },
    onClose: function() {
      // Payment cancelled
      onClose()
    }
  })
  
  handler.openIframe()
}

export const redirectToSuccess = () => {
  window.location.href = '/vault-success'
}

