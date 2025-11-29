import { useState } from 'react';
import { useTrustScore, useTrustScoreColor, useScoreInterpretation } from '../hooks/useTrustScore';
import LoadingSpinner from './LoadingSpinner';

export default function TrustScoreCard({ showControls = true, compact = false }) {
  const { trustScore, isLoading, error, calculateTrustScore } = useTrustScore();
  const [isCalculating, setIsCalculating] = useState(false);

  const scoreColor = useTrustScoreColor(trustScore?.overallScore);
  const interpretation = useScoreInterpretation(trustScore?.overallScore);

  const handleCalculateScore = async () => {
    setIsCalculating(true);
    try {
      await calculateTrustScore();
    } catch (err) {
      console.error('Failed to calculate score:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  if (isLoading && !trustScore) {
    return (
      <div className={`card ${compact ? 'p-4' : ''}`}>
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="md" />
          <span className="ml-2 text-gray-600">Loading Trust Score...</span>
        </div>
      </div>
    );
  }

  if (error && !trustScore) {
    return (
      <div className={`card ${compact ? 'p-4' : ''}`}>
        <div className="text-center py-8">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-gray-600 mb-4">Unable to load Trust Score</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!trustScore) {
    return (
      <div className={`card ${compact ? 'p-4' : ''}`}>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No Trust Score available yet</p>
          {showControls && (
            <button
              onClick={handleCalculateScore}
              disabled={isCalculating}
              className="btn-primary"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Trust Score'}
            </button>
          )}
        </div>
      </div>
    );
  }

  const { overallScore, components, calculatedAt, scoreVersion } = trustScore;

  return (
    <div className={`card ${compact ? 'p-4' : ''}`}>
      {!compact && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Trust Score</h2>
          <div className="text-sm text-gray-500">
            Version {scoreVersion}
          </div>
        </div>
      )}

      {/* Main Score Display */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${scoreColor} mb-4`}>
          <div className="text-4xl font-bold">{Math.round(overallScore)}</div>
        </div>

        {interpretation && (
          <>
            <h3 className="text-lg font-semibold mb-1">{interpretation.level}</h3>
            <p className="text-gray-600 text-sm">{interpretation.description}</p>
          </>
        )}
      </div>

      {/* Component Breakdown */}
      {!compact && (
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Score Breakdown:</h4>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Consistency</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(components.consistency / 20) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{components.consistency}/20</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Engagement</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(components.engagement / 30) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{components.engagement}/30</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Revenue</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(components.revenue / 15) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{components.revenue}/15</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Platform Health</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${(components.platformHealth / 20) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{components.platformHealth}/20</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">Legacy</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(components.legacy / 15) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{components.legacy}/15</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last Calculated */}
      <div className="text-center text-xs text-gray-500 mb-4">
        Last calculated: {new Date(calculatedAt).toLocaleDateString()}
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={handleCalculateScore}
            disabled={isCalculating}
            className="btn-secondary text-sm flex items-center"
          >
            {isCalculating ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">Calculating...</span>
              </>
            ) : (
              'Recalculate'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
