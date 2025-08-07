'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, AlertTriangle, CheckCircle, Thermometer, Droplets, Zap, X } from 'lucide-react';

export default function BiogasDemo() {
  const [gasFlow, setGasFlow] = useState(65);
  const [temperature, setTemperature] = useState(38);
  const [pressure, setPressure] = useState(1.2);
  const [ph, setPh] = useState(7.2);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data
      setGasFlow(prev => prev + (Math.random() - 0.5) * 5);
      setTemperature(prev => prev + (Math.random() - 0.5) * 2);
      setPressure(prev => Math.max(0.8, prev + (Math.random() - 0.5) * 0.1));
      setPh(prev => Math.max(6.5, Math.min(8.0, prev + (Math.random() - 0.5) * 0.2)));

      // Generate alerts
      const newAlerts: string[] = [];
      if (gasFlow < 50) newAlerts.push('Low gas production detected');
      if (temperature > 45) newAlerts.push('High temperature warning');
      if (pressure < 1.0) newAlerts.push('Pressure maintenance required');
      
      setAlerts(newAlerts);
    }, 2000);

    return () => clearInterval(interval);
  }, [gasFlow, temperature, pressure]);

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value < min || value > max) return 'text-red-400';
    if (value < min * 1.1 || value > max * 0.9) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Biogas Monitoring Dashboard</h3>
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Gas Flow</p>
                <p className={`text-2xl font-bold ${getStatusColor(gasFlow, 50, 100)}`}>
                  {gasFlow.toFixed(1)}
                </p>
                <p className="text-xs text-slate-500">m³/hour</p>
              </div>
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-cyan-400 h-2 rounded-full"
                animate={{ width: `${Math.min(100, gasFlow)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Temperature</p>
                <p className={`text-2xl font-bold ${getStatusColor(temperature, 35, 45)}`}>
                  {temperature.toFixed(1)}
                </p>
                <p className="text-xs text-slate-500">°C</p>
              </div>
              <Thermometer className="w-8 h-8 text-orange-400" />
            </div>
            <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-orange-400 h-2 rounded-full"
                animate={{ width: `${(temperature / 50) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pressure</p>
                <p className={`text-2xl font-bold ${getStatusColor(pressure, 1.0, 1.5)}`}>
                  {pressure.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500">bar</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-yellow-400 h-2 rounded-full"
                animate={{ width: `${(pressure / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">pH Level</p>
                <p className={`text-2xl font-bold ${getStatusColor(ph, 6.8, 7.5)}`}>
                  {ph.toFixed(1)}
                </p>
                <p className="text-xs text-slate-500">pH</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-400" />
            </div>
            <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-blue-400 h-2 rounded-full"
                animate={{ width: `${((ph - 6) / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gas Flow Animation */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Gas Flow Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
              {/* Pipes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-32 bg-slate-600 rounded-full relative">
                  {/* Animated gas bubbles */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-cyan-400 rounded-full opacity-70"
                      animate={{
                        y: [120, -20],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "linear"
                      }}
                      style={{ left: '2px' }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Flow indicator */}
              <div className="absolute bottom-4 left-4 text-sm text-slate-400">
                Flow Rate: {gasFlow.toFixed(1)} m³/h
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Maintenance */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* System Health */}
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
              <span className="text-slate-300">System Health</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">Operational</span>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-300">Active Alerts</h4>
              {alerts.length === 0 ? (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">All systems normal</span>
                  </div>
                </div>
              ) : (
                alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm">{alert}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Maintenance Schedule */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-300">Maintenance</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Next Service</span>
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                    In 5 days
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Filter Replacement</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    Complete
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Sensor Calibration</span>
                  <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400">
                    Scheduled
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      <Card className="mt-6 bg-slate-800/30 border-slate-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3">Hardware Stack</h4>
              <ul className="text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Raspberry Pi 4B
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  MQ-4 Methane Sensor
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  DS18B20 Temperature
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  BMP280 Pressure
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  pH Probe Module
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3">Software Stack</h4>
              <ul className="text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Python Data Collection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  MQTT Protocol
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  InfluxDB Storage
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Grafana Dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  Node-RED Automation
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3">Key Features</h4>
              <ul className="text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Real-time Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Predictive Analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Alert System
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Remote Access
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Data Logging
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
