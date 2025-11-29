import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useTrustScore } from '../hooks/useTrustScore';
import { useAuth } from '../context/AuthContext';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function ScoreHistoryChart({ period = '30d', showComponents = false }) {
  const { fetchTrustScoreHistory } = useTrustScore();
  const { user } = useAuth();
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState(showComponents ? 'components' : 'overall'); // 'overall' or 'components'

  useEffect(() => {
    loadHistoryData();
  }, [period]);

  const loadHistoryData = async () => {
    try {
      setIsLoading(true);
      const limit = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      const data = await fetchTrustScoreHistory(limit);
      if (data) {
        setHistoryData(data);
      }
    } catch (error) {
      console.error('Failed to load score history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreHistoryData = () => {
    if (!historyData || historyData.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    };

    const labels = historyData.map(score => formatDate(score.calculatedAt));

    if (viewMode === 'overall') {
      return {
        labels,
        datasets: [
          {
            label: 'Overall Trust Score',
            data: historyData.map(score => Math.round(score.overallScore)),
            borderColor: '#8B5CF6', // Purple
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.3,
            pointBackgroundColor: '#8B5CF6',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
          }
        ]
      };
    }

    // Component breakdown mode
    return {
      labels,
      datasets: [
        {
          label: 'Consistency',
          data: historyData.map(score => Math.round(score.components.consistency)),
          borderColor: '#6B7280', // Gray
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          tension: 0.3,
          pointRadius: 2,
        },
        {
          label: 'Engagement',
          data: historyData.map(score => Math.round(score.components.engagement)),
          borderColor: '#059669', // Green
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          tension: 0.3,
          pointRadius: 2,
        },
        {
          label: 'Revenue',
          data: historyData.map(score => Math.round(score.components.revenue)),
          borderColor: '#0891B2', // Cyan
          backgroundColor: 'rgba(8, 145, 178, 0.1)',
          tension: 0.3,
          pointRadius: 2,
        },
        {
          label: 'Platform Health',
          data: historyData.map(score => Math.round(score.components.platformHealth)),
          borderColor: '#D97706', // Amber
          backgroundColor: 'rgba(217, 119, 6, 0.1)',
          tension: 0.3,
          pointRadius: 2,
        },
        {
          label: 'Legacy',
          data: historyData.map(score => Math.round(score.components.legacy)),
          borderColor: '#7C3AED', // Violet
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          tension: 0.3,
          pointRadius: 2,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: viewMode === 'components',
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: function(context) {
            if (viewMode === 'overall') {
              return `${context.dataset.label}: ${context.parsed.y}/100`;
            } else {
              const componentNames = {
                'Consistency': '/20',
                'Engagement': '/30',
                'Revenue': '/15',
                'Platform Health': '/20',
                'Legacy': '/15'
              };
              const suffix = componentNames[context.dataset.label] || '';
              return `${context.dataset.label}: ${context.parsed.y}${suffix}`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: viewMode === 'overall' ? 105 : 35,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value) {
            if (viewMode === 'overall') {
              return value + '/100';
            }
            return value;
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: period === '7d' ? 7 : period === '30d' ? 10 : 15
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 6,
      }
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vault-purple"></div>
          <span className="ml-2 text-gray-600">Loading score history...</span>
        </div>
      </div>
    );
  }

  if (!historyData || historyData.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📈</div>
          <h3 className="text-xl font-semibold mb-2">Score History Coming Soon</h3>
          <p className="text-gray-600 mb-4">
            Connect your platforms and wait a few days to see your Trust Score trends over time.
          </p>
          <div className="text-sm text-gray-500">
            Once you have multiple score calculations, you'll see beautiful charts showing your progress! ✨
          </div>
        </div>
      </div>
    );
  }

  const currentScore = historyData[historyData.length - 1]?.overallScore || 0;
  const firstScore = historyData[0]?.overallScore || currentScore;
  const change = currentScore - firstScore;
  const changeDirection = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            📊 Score Trends
            {user?.displayName && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                for {user.displayName}
              </span>
            )}
          </h2>
          <p className="text-gray-600">Track your Trust Score progress over time</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Period selector */}
          <select
            value={period}
            onChange={(e) => {/* Trigger parent state update */}}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-vault-purple"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
          </select>

          {/* View mode toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('overall')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                viewMode === 'overall'
                  ? 'bg-white text-vault-purple shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Overall
            </button>
            <button
              onClick={() => setViewMode('components')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                viewMode === 'components'
                  ? 'bg-white text-vault-purple shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Components
            </button>
          </div>
        </div>
      </div>

      {historyData.length > 1 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-900 font-medium">
              Current Score: {Math.round(currentScore)}/100
            </span>
            {change !== 0 && (
              <span className={`font-medium ${
                changeDirection === 'up' ? 'text-green-600' :
                changeDirection === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {changeDirection === 'up' ? '↗️' : changeDirection === 'down' ? '↘️' : '→'}
                {Math.abs(change).toFixed(1)} points
                {changeDirection === 'up' ? ' increase' : changeDirection === 'down' ? ' decrease' : ' change'}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="h-80">
        <Line data={getScoreHistoryData()} options={chartOptions} />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-xl">📈</div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">Understanding Your Trends</div>
            <div className="text-sm text-gray-700">
              {viewMode === 'overall'
                ? "Your overall Trust Score reflects long-term creator health. Consistent upward trends indicate sustainable growth and improved creator practices."
                : "Score components show different aspects of your creator success. Focus education efforts on areas with the most room for improvement."
              }
              <br />
              <strong className="text-blue-600">Tip:</strong> More platform connections = more accurate scoring = better trend insights.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
