function MobileStickyCTA() {
  return (
    <div className="fixed bottom-6 left-0 right-0 md:hidden z-50 p-4">
      <div className="bg-vault-purple text-white rounded-lg px-6 py-3 text-center font-semibold shadow-lg">
        <a href="/signup" className="block text-white hover:text-gray-200 transition-colors">
          Get Started Free
        </a>
      </div>
    </div>
  )
}

export default MobileStickyCTA
