import { useState, useEffect } from 'react'

export function useAccess() {
  const [hasPass, setHasPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulate checking if user has creator pass
    const checkCreatorPass = async () => {
      // In a real app, this would check localStorage or API
      const hasStoredPass = localStorage.getItem('creator_pass') === 'true'
      setHasPass(hasStoredPass)
      setIsLoading(false)
    }

    // Simulate async check
    setIsLoading(true)
    setTimeout(checkCreatorPass, 1000)
  }, [])

  return { hasPass, isLoading }
}
