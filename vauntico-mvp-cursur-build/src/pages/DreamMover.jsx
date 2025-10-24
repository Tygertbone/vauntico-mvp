import { useState } from 'react'

function DreamMover() {
  const [prompt, setPrompt] = useState('')
  const [selectedType, setSelectedType] = useState('text')
  const [isGenerating, setIsGenerating] = useState(false)

  const contentTypes = [
    { id: 'text', label: 'Text Content', icon: '📝', description: 'Blog posts, articles, copy' },
    { id: 'image', label: 'Images', icon: '🖼️', description: 'AI-generated visuals' },
    { id: 'video', label: 'Video Scripts', icon: '🎬', description: 'Video content outlines' },
    { id: 'social', label: 'Social Posts', icon: '📱', description: 'Social media content' },
  ]

  const recentGenerations = [
    { id: 1, type: 'Blog Post', title: 'The Future of AI in Content Creation', time: '10 min ago' },
    { id: 2, type: 'Social Post', title: 'LinkedIn engagement strategy', time: '1 hour ago' },
    { id: 3, type: 'Article', title: 'Marketing trends 2024', time: '3 hours ago' },
  ]

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block vault-gradient text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          DREAM MOVER AI
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Transform Ideas into <span className="text-gradient">Reality</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Powered by advanced AI models to generate high-quality content in seconds
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Generation Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Type Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Choose Content Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedType === type.id
                      ? 'border-vault-purple bg-vault-purple/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="font-semibold text-sm">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Describe Your Vision</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create... Be as detailed as possible for best results."
              className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-vault-purple focus:border-transparent resize-none"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-vault-purple focus:border-transparent">
                  <option>Standard Quality</option>
                  <option>High Quality</option>
                  <option>Premium Quality</option>
                </select>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-vault-purple focus:border-transparent">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className={`btn-primary px-8 py-3 ${
                  (!prompt || isGenerating) && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  '🚀 Generate Content'
                )}
              </button>
            </div>
          </div>

          {/* Output Area */}
          <div className="card min-h-[300px]">
            <h2 className="text-xl font-semibold mb-4">Generated Content</h2>
            {isGenerating ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🎨</div>
                  <p className="text-gray-600">Creating your content...</p>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <p>Your generated content will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tips Card */}
          <div className="card bg-gradient-to-br from-vault-purple/10 to-vault-blue/10">
            <h3 className="font-semibold text-lg mb-3">💡 Pro Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Be specific about tone and style</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Include target audience details</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Mention desired length or format</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Add keywords for SEO optimization</span>
              </li>
            </ul>
          </div>

          {/* Recent Generations */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Recent Generations</h3>
            <div className="space-y-3">
              {recentGenerations.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs text-vault-purple font-semibold">{item.type}</span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-vault-purple hover:text-vault-purple/80 font-medium text-sm">
              View All →
            </button>
          </div>

          {/* Usage Stats */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-4">Usage This Month</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Generations</span>
                  <span className="font-semibold">48 / 100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-vault-purple h-2 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-semibold">2.4 GB / 10 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-vault-blue h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 btn-outline text-sm py-2">
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DreamMover
