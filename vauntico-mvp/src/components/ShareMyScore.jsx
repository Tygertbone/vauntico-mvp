import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTrustScore } from '../hooks/useTrustScore';

export default function ShareMyScore({ score, scoreLevel = 'Growing Creator', compact = false }) {
  const { user } = useAuth();
  const { fetchTrustScoreHistory } = useTrustScore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateShareableUrl = async () => {
    try {
      setIsGenerating(true);

      // Get recent score history for context
      const history = await fetchTrustScoreHistory(3); // Last 3 scores

      // Create a shareable profile URL (in production, this would be a public route)
      const params = new URLSearchParams({
        uid: user?.id?.toString() || 'demo',
        score: score.toString(),
        level: encodeURIComponent(scoreLevel),
        history: JSON.stringify(history.slice(0, 3))
      });

      const url = `${window.location.origin}/share/${params.toString()}`;
      setShareUrl(url);

    } catch (error) {
      console.error('Failed to generate share URL:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    const text = `I just calculated my Creator Trust Score: ${score}/100 (${scoreLevel})! Check out your analytics-backed creator rating at @VaunticoApp #CreatorTrustScore`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const text = `My Creator Trust Score is ${score}/100 - an analytics-backed rating of my content performance. Calculate yours at`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`My Creator Trust Score: ${score}/100`)}&summary=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const getScoreColorClass = (score) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 55) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getScoreDescription = (score) => {
    if (score >= 85) return 'Elite creator with proven track record';
    if (score >= 70) return 'Rising star showing consistent growth';
    if (score >= 55) return 'Growing creator building momentum';
    return 'Creator developing their analytic foundation';
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={generateShareableUrl}
          disabled={isGenerating}
          className="flex items-center space-x-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm text-blue-700 transition-colors disabled:opacity-50"
        >
          <span>🔗</span>
          <span>Share Score</span>
        </button>
        {shareUrl && (
          <>
            <button
              onClick={copyToClipboard}
              className="p-1 hover:bg-gray-100 rounded text-gray-600"
              title="Copy link"
            >
              {copied ? '✅' : '📋'}
            </button>
            <button
              onClick={shareToTwitter}
              className="p-1 hover:bg-gray-100 rounded text-blue-500"
              title="Share on Twitter"
            >
              🐦
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          🚀 Share Your Success
        </h2>
        <p className="text-gray-600">Celebrate your creator achievements and help others discover their potential</p>
      </div>

      {/* Score Preview Card */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 border-2 border-purple-200">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-white text-2xl font-bold mb-4 ${getScoreColorClass(score)}`}>
              {score}
            </div>
            <div className="mb-2">
              <div className="text-sm text-gray-600">Trust Score</div>
              <div className="font-semibold text-lg">{scoreLevel}</div>
            </div>
            <div className="text-sm text-gray-600 max-w-xs mx-auto">
              {getScoreDescription(score)}
            </div>
          </div>
        </div>
      </div>

      {/* Share Actions */}
      {!shareUrl ? (
        <div className="text-center mb-6">
          <button
            onClick={generateShareableUrl}
            disabled={isGenerating}
            className="btn-primary"
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating Share Link...</span>
              </div>
            ) : (
              '🎯 Create Shareable Profile'
            )}
          </button>
          <div className="text-sm text-gray-500 mt-2">
            Generate a shareable link with your achievements
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Copy Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-vault-purple"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 border-l-0 rounded-r-lg transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Share on Social Media
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={shareToTwitter}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <span>🐦</span>
                <span>Twitter</span>
              </button>

              <button
                onClick={shareToLinkedIn}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </button>

              <button
                onClick={shareToFacebook}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <span>📘</span>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Viral Growth Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg border border-orange-200">
        <div className="flex items-start space-x-3">
          <div className="text-orange-500 text-xl">🔥</div>
          <div>
            <div className="font-semibold text-orange-900 mb-1">Help Other Creators Grow</div>
            <div className="text-sm text-orange-700">
              Sharing your Trust Score not only celebrates your success but also
              introduces other creators to analytics-driven growth. When others
              see YOUR results, they're more likely to try Vauntico too!
              <br />
              <strong className="text-orange-800">Your success inspires others 💪</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Impact Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">2,500+</div>
          <div className="text-xs text-gray-600">Active Creators</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">10K+</div>
          <div className="text-xs text-gray-600">Shares This Month</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">95%</div>
          <div className="text-xs text-gray-600">Viral Conversion</div>
        </div>
      </div>

      {/* Call-to-Action */}
      {shareUrl && (
        <div className="mt-6 text-center">
          <div className="text-purple-600 font-semibold">
            Ready to help more creators succeed?
          </div>
          <div className="text-sm text-gray-600">
            Share your journey and be part of the creator economy revolution!
          </div>
        </div>
      )}
    </div>
  );
}
