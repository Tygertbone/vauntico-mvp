// Paystack Integration Utility
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_your_test_key_here'
const CURRENCY = import.meta.env.VITE_CURRENCY || 'NGN'
const PRODUCT_PRICE = parseInt(import.meta.env.VITE_PRODUCT_PRICE) || 97

export const initializePaystackPayment = (email, amount, onSuccess, onClose) => {
  // Validate required data
  if (!email || !amount) {
    console.error('Email and amount are required for payment')
    onClose()
    return
  }

  // Load Paystack script if not already loaded
  if (!window.PaystackPop) {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = () => {
      startPayment(email, amount, onSuccess, onClose)
    }
    script.onerror = () => {
      console.error('Failed to load Paystack script')
      onClose()
    }
    document.head.appendChild(script)
  } else {
    startPayment(email, amount, onSuccess, onClose)
  }
}

const startPayment = (email, amount, onSuccess, onClose) => {
  // Calculate amount based on currency
  // Paystack expects amount in kobo (NGN) or cents (USD) - both require * 100
  const paymentAmount = amount * 100
  
  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: paymentAmount,
    currency: CURRENCY,
    ref: 'vault_' + Date.now() + '_' + Math.floor((Math.random() * 1000) + 1),
    metadata: {
      product: 'Vauntico Prompt Vault - Founders Edition',
      customer_email: email,
      amount: amount,
      currency: CURRENCY
    },
    callback: function(response) {
      // Payment successful - verify payment
      console.log('Payment successful:', response)
      onSuccess(response)
    },
    onClose: function() {
      // Payment cancelled
      console.log('Payment cancelled by user')
      onClose()
    }
  })
  
  handler.openIframe()
}

export const redirectToSuccess = () => {
  window.location.href = '/vault-success'
}

// Payment verification function (to be implemented with backend)
export const verifyPayment = async (reference) => {
  try {
    // This should be implemented with your backend API
    // For now, we'll just log the reference
    console.log('Verifying payment with reference:', reference)
    
    // In a real implementation, you would:
    // 1. Send the reference to your backend
    // 2. Backend calls Paystack API to verify
    // 3. Backend updates database with payment status
    // 4. Return verification result
    
    return {
      success: true,
      message: 'Payment verified successfully'
    }
  } catch (error) {
    console.error('Payment verification failed:', error)
    return {
      success: false,
      message: 'Payment verification failed'
    }
  }
}

