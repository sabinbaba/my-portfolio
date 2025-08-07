'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Zap, Activity, TrendingUp, X, Gauge, Bell, Shield } from 'lucide-react';

export default function OverloadAlertDemo() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentLoad, setCurrentLoad] = useState(45);
  const [voltage, setVoltage] = useState(220);
  const [current, setCurrent] = useState(2.1);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<any>(null);

  const maxLoad = 100;
  const warningThreshold = 80;
  const criticalThreshold = 95;

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate realistic electrical load patterns
        setCurrentLoad(prev => {
          const variation = (Math.random() - 0.5) * 10;
          const newLoad = Math.max(20, Math.min(110, prev + variation));
          
          // Simulate voltage drop under high load
          setVoltage(220 - (newLoad > 80 ? (newLoad - 80) * 0.5 : 0));
          setCurrent(newLoad * 0.045 + Math.random() * 0.2);
          
          // Generate alerts for high loads
          if (newLoad > criticalThreshold && prev <= criticalThreshold) {
            const newAlert = {
              id: Date.now(),
              type: 'critical',
              message: 'CRITICAL: System overload detected!',
              timestamp: new Date().toLocaleTimeString(),
              load: newLoad,
              action: 'Load shedding initiated'
            };
            setAlerts(prevAlerts => [newAlert, ...prevAlerts.slice(0, 4)]);
          } else if (newLoad > warningThreshold && prev <= warningThreshold) {
            const newAlert = {
              id: Date.now(),
              type: 'warning',
              message: 'WARNING: High load detected',
              timestamp: new Date().toLocaleTimeString(),
              load: newLoad,
              action: 'Monitoring increased'
            };
            setAlerts(prevAlerts => [newAlert, ...prevAlerts.slice(0, 4)]);
          }

          // ML Prediction simulation
          if (newLoad > 70) {
            setPrediction({
              overloadProbability: Math.min(95, (newLoad - 70) * 3),
              timeToOverload: Math.max(1, Math.floor((100 - newLoad) / 5)),
              recommendedAction: newLoad > 90 ? 'Immediate load reduction' : 'Monitor closely'
            });
          } else {
            setPrediction(null);
          }
          
          return newLoad;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const startMonitoring = () => {
    setIsMonitoring(true);
    setAlerts([]);
    setPrediction(null);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const resetDemo = () => {
    setIsMonitoring(false);
    setCurrentLoad(45);
    setVoltage(220);
    setCurrent(2.1);
    setAlerts([]);
    setPrediction(null);
  };

  const getLoadColor = () => {
    if (currentLoad >= criticalThreshold) return 'text-red-400';
    if (currentLoad >= warningThreshold) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getLoadBgColor = () => {
    if (currentLoad >= criticalThreshold) return 'bg-red-400';
    if (currentLoad >= warningThreshold) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Electrical Overload Alert System</h3>
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Real-time Monitoring Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Current Load</p>
                <p className={`text-3xl font-bold ${getLoadColor()}`}>
                  {currentLoad.toFixed(1)}%
                </p>
              </div>
              <Gauge className={`w-8 h-8 ${getLoadColor()}`} />
            </div>
            <div className="mt-4 w-full bg-slate-700 rounded-full h-3">
              <motion.div
                className={`h-3 rounded-full ${getLoadBgColor()} ${
                  currentLoad >= criticalThreshold ? 'alert-pulse' : ''
                }`}
                animate={{ width: `${Math.min(100, currentLoad)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>0%</span>
              <span className="text-yellow-400">Warning: {warningThreshold}%</span>
              <span className="text-red-400">Critical: {criticalThreshold}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Voltage</p>
                <p className="text-3xl font-bold text-blue-400">
                  {voltage.toFixed(1)}V
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Nominal: 220V</span>
                <span className={voltage < 210 ? 'text-yellow-400' : 'text-green-400'}>
                  {voltage < 210 ? 'Low' : 'Normal'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Current</p>
                <p className="text-3xl font-bold text-orange-400">
                  {current.toFixed(2)}A
                </p>
              </div>
              <Activity className="w-8 h-8 text-orange-400" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Max: 5.0A</span>
                <span className={current > 4.5 ? 'text-red-400' : 'text-green-400'}>
                  {current > 4.5 ? 'High' : 'Normal'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              System Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Controls */}
            <div className="flex gap-3">
              <Button
                onClick={startMonitoring}
                disabled={isMonitoring}
                className="flex-1 bg-purple-500 hover:bg-purple-400 text-white"
              >
                {isMonitoring ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Monitoring...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4 mr-2" />
                    Start Monitoring
                  </>
                )}
              </Button>
              <Button
                onClick={stopMonitoring}
                disabled={!isMonitoring}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Stop
              </Button>
              <Button
                onClick={resetDemo}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                Reset
              </Button>
            </div>

            {/* ML Prediction */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-purple-400">ML Prediction</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Overload Probability:</span>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                      {prediction.overloadProbability}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Time to Overload:</span>
                    <span className="text-slate-300">{prediction.timeToOverload} min</span>
                  </div>
                  <div className="mt-2 p-2 bg-slate-900 rounded text-xs">
                    <span className="text-slate-400">Recommendation: </span>
                    <span className="text-purple-300">{prediction.recommendedAction}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* System Status */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-300">System Status</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monitoring:</span>
                  <Badge variant={isMonitoring ? "secondary" : "outline"} 
                         className={isMonitoring ? "bg-green-500/20 text-green-400" : ""}>
                    {isMonitoring ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Alerts:</span>
                  <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                    {alerts.filter(a => a.type === 'critical').length}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert Log */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Alert Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <AnimatePresence>
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`p-3 rounded-lg border ${
                      alert.type === 'critical' 
                        ? 'bg-red-500/10 border-red-500/20' 
                        : 'bg-yellow-500/10 border-yellow-500/20'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                        alert.type === 'critical' ? 'text-red-400' : 'text-yellow-400'
                      }`} />
                      <div className="flex-1">
                        <p className={`font-medium text-sm ${
                          alert.type === 'critical' ? 'text-red-300' : 'text-yellow-300'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Load: {alert.load.toFixed(1)}% • {alert.timestamp}
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          Action: {alert.action}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {alerts.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No alerts generated</p>
                  <p className="text-sm mt-1">System operating normally</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Implementation */}
      <Card className="mt-6 bg-slate-800/30 border-slate-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Sensors & Hardware</h4>
              <ul className="text-slate-400 space-y-2">
                <li>• Current Transformers (CT)</li>
                <li>• Voltage Transformers (VT)</li>
                <li>• Arduino/ESP32 Controllers</li>
                <li>• Real-time Data Acquisition</li>
                <li>• Wireless Communication</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Machine Learning</h4>
              <ul className="text-slate-400 space-y-2">
                <li>• Time Series Forecasting</li>
                <li>• Anomaly Detection Models</li>
                <li>• Pattern Recognition</li>
                <li>• Predictive Analytics</li>
                <li>• Real-time Inference</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Safety Features</h4>
              <ul className="text-slate-400 space-y-2">
                <li>• Automatic Load Shedding</li>
                <li>• Multi-level Alert System</li>
                <li>• Emergency Shutdown</li>
                <li>• Historical Data Logging</li>
                <li>• Remote Monitoring</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
