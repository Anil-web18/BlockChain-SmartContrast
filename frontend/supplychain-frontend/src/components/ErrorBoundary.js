import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-8 max-w-md w-full text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              Don't worry, our blockchain network is still secure. This is just a temporary glitch.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto hover:shadow-lg transition-all"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Reload Application
            </motion.button>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-white">
                  Technical Details
                </summary>
                <pre className="text-xs text-red-300 mt-2 p-3 bg-red-900/20 rounded overflow-auto">
                  {this.state.error && this.state.error.toString()}
                </pre>
              </details>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;