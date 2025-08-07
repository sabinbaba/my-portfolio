'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function SmartEarDemo() {
  const [isListening, setIsListening] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  const simulateAlert = () => {
    setIsListening(true);
    setTimeout(() => {
      setAlertTriggered(true);
      setIsListening(false);
    }, 3000);
  };

  const reset = () => {
    setIsListening(false);
    setAlertTriggered(false);
    setAudioLevel(0);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Smart Ear Device Demo</h3>
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3D Device Visualization */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Device Visualization</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <motion.div
              animate={{ 
                rotateY: isListening ? 360 : 0,
                scale: alertTriggered ? 1.2 : 1
              }}
              transition={{ 
                rotateY: { duration: 2, repeat: isListening ? Infinity : 0 },
                scale: { duration: 0.3 }
              }}
              className={`w-32 h-32 rounded-full border-4 flex items-center justify-center ${
                alertTriggered ? 'border-red-500 bg-red-500/20' : 'border-cyan-400 bg-cyan-500/20'
              }`}
            >
              <Volume2 className={`w-16 h-16 ${alertTriggered ? 'text-red-400' : 'text-cyan-400'}`} />
            </motion.div>
          </CardContent>
        </Card>

        {/* Audio Analysis */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Audio Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Soundwave Visualization */}
            <div className="h-20 bg-slate-900 rounded-lg p-2 flex items-end justify-center gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-cyan-400 rounded-t"
                  animate={{ 
                    height: isListening ? `${Math.random() * 60 + 10}px` : '4px' 
                  }}
                  transition={{ duration: 0.1, repeat: isListening ? Infinity : 0 }}
                />
              ))}
            </div>

            {/* Audio Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Audio Level</span>
                <span>{Math.round(audioLevel)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className="bg-cyan-400 h-2 rounded-full"
                  animate={{ width: `${audioLevel}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              {alertTriggered ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">Crosswalk Detected!</span>
                </>
              ) : isListening ? (
                <>
                  <Volume2 className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-400">Listening...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400">Ready</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4 justify-center">
        <Button
          onClick={simulateAlert}
          disabled={isListening}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900"
        >
          {isListening ? 'Processing...' : 'Simulate Alert'}
        </Button>
        <Button
          onClick={reset}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          Reset
        </Button>
      </div>

      {/* Tech Details */}
      <Card className="mt-6 bg-slate-800/30 border-slate-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Hardware</h4>
              <ul className="text-slate-400 space-y-1">
                <li>• Arduino Nano 33 BLE</li>
                <li>• MEMS Microphone</li>
                <li>• Vibration Motor</li>
                <li>• Li-Po Battery</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Software</h4>
              <ul className="text-slate-400 space-y-1">
                <li>• TensorFlow Lite</li>
                <li>• Audio Processing</li>
                <li>• Pattern Recognition</li>
                <li>• Real-time Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Features</h4>
              <ul className="text-slate-400 space-y-1">
                <li>• 95% Accuracy</li>
                <li>• Low Power Mode</li>
                <li>• Haptic Feedback</li>
                <li>• Noise Filtering</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
