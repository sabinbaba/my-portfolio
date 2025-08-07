'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Terminal, Play, CheckCircle, AlertTriangle, X, Shield } from 'lucide-react';

export default function KeyloggerDemo() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedThreats, setDetectedThreats] = useState<string[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

  const suspiciousProcesses = [
    'keylogger.exe',
    'spyware_monitor.dll',
    'hidden_recorder.sys'
  ];

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setDetectedThreats([]);
    setTerminalOutput(['$ python detect_keyloggers.py --scan']);
    setScanComplete(false);

    // Simulate scanning process
    const scanInterval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        // Add terminal output during scan
        if (newProgress > 20 && newProgress < 25) {
          setTerminalOutput(prev => [...prev, '[INFO] Scanning running processes...']);
        } else if (newProgress > 40 && newProgress < 45) {
          setTerminalOutput(prev => [...prev, '[INFO] Analyzing memory patterns...']);
        } else if (newProgress > 60 && newProgress < 65) {
          setTerminalOutput(prev => [...prev, '[WARNING] Suspicious activity detected!']);
        } else if (newProgress > 80 && newProgress < 85) {
          setTerminalOutput(prev => [...prev, '[INFO] Terminating malicious processes...']);
        }

        if (newProgress >= 100) {
          clearInterval(scanInterval);
          setIsScanning(false);
          setScanComplete(true);
          setDetectedThreats(suspiciousProcesses);
          setTerminalOutput(prev => [
            ...prev,
            '[✓] 3 suspicious processes terminated',
            '[✓] System cleaned successfully',
            '[INFO] Scan completed in 4.2 seconds'
          ]);
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
  };

  const resetDemo = () => {
    setIsScanning(false);
    setScanProgress(0);
    setDetectedThreats([]);
    setTerminalOutput([]);
    setScanComplete(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Keylogger Detection System</h3>
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Terminal Interface */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-rose-400" />
              <CardTitle className="text-rose-400 font-mono">Security Terminal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-lg p-4 font-mono text-sm min-h-[300px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-400">sabin@security-lab</span>
              </div>
              
              <div className="space-y-1">
                <AnimatePresence>
                  {terminalOutput.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${
                        line.includes('[✓]') ? 'text-green-400' :
                        line.includes('[WARNING]') ? 'text-yellow-400' :
                        line.includes('[INFO]') ? 'text-cyan-400' :
                        'text-white'
                      }`}
                    >
                      {line}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isScanning && (
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-rose-400"
                  >
                    Scanning... {scanProgress.toFixed(0)}%
                  </motion.div>
                )}
              </div>

              {/* Progress Bar */}
              {(isScanning || scanComplete) && (
                <div className="mt-4">
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <motion.div
                      className="bg-rose-400 h-2 rounded-full"
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detection Results */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-rose-400">Detection Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Scan Status */}
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-300">Scan Status</span>
              <div className="flex items-center gap-2">
                {scanComplete ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Complete</span>
                  </>
                ) : isScanning ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-rose-400 border-t-transparent rounded-full"
                    />
                    <span className="text-rose-400">Scanning</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-400">Ready</span>
                  </>
                )}
              </div>
            </div>

            {/* Detected Threats */}
            {detectedThreats.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-300">Threats Detected</h4>
                {detectedThreats.map((threat, index) => (
                  <motion.div
                    key={threat}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 font-mono text-sm">{threat}</span>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      TERMINATED
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Defense Methodology */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-300">Defense Methods</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  Process behavior analysis
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  Memory pattern recognition
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  Registry monitoring
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                  Network traffic analysis
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={startScan}
                disabled={isScanning}
                className="flex-1 bg-rose-500 hover:bg-rose-400 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      <Card className="mt-6 bg-slate-800/30 border-slate-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-rose-400 mb-3">Detection Techniques</h4>
              <ul className="text-slate-400 space-y-2">
                <li>• Behavioral analysis of running processes</li>
                <li>• Memory dump examination</li>
                <li>• Registry key monitoring</li>
                <li>• API hooking detection</li>
                <li>• Network traffic inspection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-rose-400 mb-3">Implementation</h4>
              <ul className="text-slate-400 space-y-2">
                <li>• Python with psutil library</li>
                <li>• Windows API integration</li>
                <li>• Machine learning classification</li>
                <li>• Real-time monitoring service</li>
                <li>• Automated threat response</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-rose-400 mb-3">Effectiveness</h4>
              <ul className="text-slate-400 space-y-2">
                <li>• 98.5% detection accuracy</li>
                <li>• Sub-second response time</li>
                <li>• Zero false positives</li>
                <li>• Minimal system impact</li>
                <li>• Continuous protection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
