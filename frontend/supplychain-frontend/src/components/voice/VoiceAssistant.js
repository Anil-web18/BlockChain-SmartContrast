import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicrophoneIcon, SpeakerWaveIcon, StopIcon } from '@heroicons/react/24/outline';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const commands = [
    { phrase: 'track shipment', response: 'Tracking shipment SC-2024-001. Current location: Dallas, TX. ETA: 2 hours.' },
    { phrase: 'check temperature', response: 'Current temperature readings: Warehouse A: 22°C, Truck #247: 18°C.' },
    { phrase: 'risk status', response: 'Overall risk level: Medium. 2 high-priority alerts detected.' },
    { phrase: 'carbon footprint', response: 'Today\'s CO2 emissions: 156.8 kg. 12% below target.' },
    { phrase: 'route optimization', response: 'Route C optimized. Potential savings: $160 monthly, 35% CO2 reduction.' },
    { phrase: 'inventory status', response: 'Current inventory: 2,450 items. Low stock alerts: 12 products need restocking.' },
    { phrase: 'delivery schedule', response: 'Next deliveries: 3 shipments today, 7 tomorrow. All on schedule.' },
    { phrase: 'fuel consumption', response: 'Fleet fuel usage: 245L today. 8% improvement from last week.' },
    { phrase: 'supplier status', response: '15 active suppliers. 2 pending approvals, 1 quality review needed.' },
    { phrase: 'blockchain verify', response: 'Product authenticity verified. Block hash confirmed on network.' }
  ];

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');
    
    // Simulate voice recognition
    setTimeout(() => {
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setTranscript(`"${randomCommand.phrase}"`);
      setIsListening(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setResponse(randomCommand.response);
        setIsProcessing(false);
        
        // Simulate text-to-speech
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(randomCommand.response);
          utterance.rate = 0.8;
          speechSynthesis.speak(utterance);
        }
      }, 1500);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <MicrophoneIcon className="w-8 h-8 text-purple-400" />
          Voice Assistant
        </h2>
        <p className="text-gray-300">Hands-free supply chain management with voice commands</p>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
          className={`w-32 h-32 rounded-full flex items-center justify-center text-white font-semibold transition-all ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : isProcessing
              ? 'bg-yellow-500 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600'
          }`}
        >
          {isListening ? (
            <div className="text-center">
              <StopIcon className="w-8 h-8 mx-auto mb-1" />
              <div className="text-sm">Listening...</div>
            </div>
          ) : isProcessing ? (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-1"
              />
              <div className="text-sm">Processing...</div>
            </div>
          ) : (
            <div className="text-center">
              <MicrophoneIcon className="w-8 h-8 mx-auto mb-1" />
              <div className="text-sm">Tap to Speak</div>
            </div>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center"
          >
            <h3 className="text-blue-300 font-semibold mb-2">You said:</h3>
            <p className="text-white text-lg">{transcript}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <SpeakerWaveIcon className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <h3 className="text-green-300 font-semibold mb-2">Assistant Response:</h3>
                <p className="text-white">{response}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Voice Commands</h3>
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
            {commands.map((cmd, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded hover:bg-white/10 transition-colors">
                <MicrophoneIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">"{cmd.phrase}"</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="text-lg">🎤</div>
              <div>
                <div className="text-white font-medium">Voice Recognition</div>
                <div className="text-gray-300 text-sm">Natural language processing</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-lg">🔊</div>
              <div>
                <div className="text-white font-medium">Text-to-Speech</div>
                <div className="text-gray-300 text-sm">Audio response system</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-lg">🌐</div>
              <div>
                <div className="text-white font-medium">Multi-Language</div>
                <div className="text-gray-300 text-sm">English, Spanish, French</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-lg">📱</div>
              <div>
                <div className="text-white font-medium">Hands-Free</div>
                <div className="text-gray-300 text-sm">Perfect for drivers & operators</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Usage Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">1,247</div>
            <div className="text-gray-300 text-sm">Voice Commands</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">96%</div>
            <div className="text-gray-300 text-sm">Recognition Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">2.3s</div>
            <div className="text-gray-300 text-sm">Avg Response Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">89%</div>
            <div className="text-gray-300 text-sm">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;