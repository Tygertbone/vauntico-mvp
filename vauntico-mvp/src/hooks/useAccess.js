/**
 * React Hooks for Access Control
 * Section 2A: Pricing Logic Binding - React Integration
 */

import { useState, useEffect } from 'react'
import {
  hasCreatorPass,
  hasWorkshopKit,
  getUserSubscriptionStatus,
  canAccessWorkshopKit,
  canAccessAuditService,
  canAccessAddon,
  canAccessAutomation,
  canAccessBrandBuilder
} from '../utils/pricing'

/**
 * Hook to check if user has Creator Pass
 * @returns {Object} { hasPass, isLoading }
 */
export const useCreatorPass = () => {
  const [hasPass, setHasPass] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAccess = () => {
      setHasPass(hasCreatorPass())
      setIsLoading(false)
    }

    checkAccess()

    // Listen for access changes (useful for dev/testing)
    const handleAccessChange = () => checkAccess()
    window.addEventListener('vauntico_access_changed', handleAccessChange)

    return () => {
      window.removeEventListener('vauntico_access_changed', handleAccessChange)
    }
  }, [])

  return { hasPass, isLoading }
}

/**
 * Hook to check Workshop Kit access
 * @returns {Object} { hasAccess, reason, message, price, isLoading }
 */
export const useWorkshopKitAccess = () => {
  const [accessStatus, setAccessStatus] = useState({
    hasAccess: false,
    reason: 'loading',
    message: 'Checking access...',
    isLoading: true
  })

  useEffect(() => {
    const checkAccess = () => {
      const status = canAccessWorkshopKit()
      setAccessStatus({ ...status, isLoading: false })
    }

    checkAccess()

    const handleAccessChange = () => checkAccess()
    window.addEventListener('vauntico_access_changed', handleAccessChange)

    return () => {
      window.removeEventListener('vauntico_access_changed', handleAccessChange)
    }
  }, [])

  return accessStatus
}

/**
 * Hook to check Audit Service access
 * @returns {Object} { hasAccess, reason, message, plan, isLoading }
 */
export const useAuditServiceAccess = () => {
  const [accessStatus, setAccessStatus] = useState({
    hasAccess: false,
    reason: 'loading',
    message: 'Checking access...',
    isLoading: true
  })

  useEffect(() => {
    const checkAccess = () => {
      const status = canAccessAuditService()
      setAccessStatus({ ...status, isLoading: false })
    }

    checkAccess()

    const handleAccessChange = () => checkAccess()
    window.addEventListener('vauntico_access_changed', handleAccessChange)

    return () => {
      window.removeEventListener('vauntico_access_changed', handleAccessChange)
    }
  }, [])

  return accessStatus
}

/**
 * Hook to check addon access with discount info
 * @param {string} addonId - The addon identifier
 * @returns {Object} { hasAccess, hasDiscount, discountPercentage, reason, isLoading }
 */
export const useAddonAccess = (addonId) => {
  const [accessStatus, setAccessStatus] = useState({
    hasAccess: false,
    hasDiscount: false,
    discountPercentage: 0,
    reason: 'loading',
    isLoading: true
  })

  useEffect(() => {
    const checkAccess = () => {
      const status = canAccessAddon(addonId)
      setAccessStatus({ ...status, isLoading: false })
    }

    checkAccess()

    const handleAccessChange = () => checkAccess()
    window.addEventListener('vauntico_access_changed', handleAccessChange)

    return () => {
      window.removeEventListener('vauntico_access_changed', handleAccessChange)
    }
  }, [addonId])

  return accessStatus
}

/**
 * Hook to get subscription status
 * @returns {Object} { status, plan, isActive, isLoading }
 */
export const useSubscriptionStatus = () => {
  const [subscription, setSubscription] = useState({
    status: null,
    plan: null,
    isActive: false,
    isLoading: true
  })

  useEffect(() => {
    const checkSubscription = () => {
      const status = getUserSubscriptionStatus()
      setSubscription({ ...status, isLoading: false })
    }

    checkSubscription()

    const handleAccessChange = () => checkSubscription()
    window.addEventListener('vauntico_access_changed', handleAccessChange)

    return () => {
      window.removeEventListener('vauntico_access_changed', handleAccessChange)
    }
  }, [])

  return subscription
}

/**
 * Hook to check automation features access
 * @returns {Object} { hasAccess, reason, message, isLoading }
 */
export const useAutomationAccess = () => {
  const [accessStatus, setAccessStatus] = useState({
    hasAccess: false,
    reason: 'loading',
    message: 'Checking access...',
    isLoading: true
  })

  useEffect(() => {
    const checkAccess = () => {
      const status = canAccessAutomation()
      setAccessStatus({ ...status, isLoading: false })
    }

    checkAccess()

    const handleAccessChange = () => checkAccess()
    window.addEventListener('vauntico_access_changed', handleAccessChange)

    return () => {
      window.removeEventListener('vauntico_access_changed', handleAccessChange)
    }
  }, [])

  return accessStatus
}

/**
 * Hook to check brand builder access
 * @returns {Object} { hasAccess, reason, message, isLoading }
 */
export const useBrandBuilderAccess = () => {
  const [accessStatus, setAccessStatus] = useState({
    hasAccess: false,
    reason: 'loading',
    message: 'Checking access...',
    isLoading: true
  })

  useEffect(() => {
    const checkAccess = () => {
      const status = canAccessBrandBuilder()
      setAccessStatus({ ...status, isLoading: false })
    }

    checkAccess()

    const handleAccessChange = () => checkAccess()
    window.addEventListener('vauntico_access_changed', handleAccessChange)

    return () => {
      window.removeEventListener('vauntico_access_changed', handleAccessChange)
    }
  }, [])

  return accessStatus
}

/**
 * Comprehensive access hook - checks all premium features
 * @returns {Object} All access statuses
 */
export const usePremiumAccess = () => {
  const creatorPass = useCreatorPass()
  const workshopKit = useWorkshopKitAccess()
  const auditService = useAuditServiceAccess()
  const automation = useAutomationAccess()
  const brandBuilder = useBrandBuilderAccess()

  return {
    creatorPass: creatorPass.hasPass,
    workshopKit: workshopKit.hasAccess,
    auditService: auditService.hasAccess,
    automation: automation.hasAccess,
    brandBuilder: brandBuilder.hasAccess,
    isLoading: 
      creatorPass.isLoading ||
      workshopKit.isLoading ||
      auditService.isLoading ||
      automation.isLoading ||
      brandBuilder.isLoading
  }
}
