'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, Target, X } from 'lucide-react';

export default function WheelchairDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [wheelchairPos, setWheelchairPos] = useState({ x: 200, y: 200 });
  const [targetPos, setTargetPos] = useState({ x: 350, y: 150 });
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw obstacles
    ctx.fillStyle = 'rgba(244, 63, 94, 0.3)';
    ctx.fillRect(150, 100, 40, 40);
    ctx.fillRect(300, 250, 60, 30);

    // Draw path if navigating
    if (isNavigating) {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(wheelchairPos.x, wheelchairPos.y);
      ctx.lineTo(targetPos.x, targetPos.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw wheelchair
    ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
    ctx.beginPath();
    ctx.arc(wheelchairPos.x, wheelchairPos.y, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Draw target
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(targetPos.x, targetPos.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(targetPos.x - 5, targetPos.y);
    ctx.lineTo(targetPos.x + 5, targetPos.y);
    ctx.moveTo(targetPos.x, targetPos.y - 5);
    ctx.lineTo(targetPos.x, targetPos.y + 5);
    ctx.stroke();
  }, [wheelchairPos, targetPos, isNavigating]);

  const handleJoystickMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 40;
    
    if (distance <= maxDistance) {
      setJoystickPos({ x, y });
      // Move wheelchair based on joystick
      setWheelchairPos(prev => ({
        x: Math.max(15, Math.min(485, prev.x + x * 0.1)),
        y: Math.max(15, Math.min(285, prev.y + y * 0.1))
      }));
    }
  };

  const startNavigation = () => {
    setIsNavigating(true);
    // Simulate autonomous navigation
    const interval = setInterval(() => {
      setWheelchairPos(prev => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 20) {
          setIsNavigating(false);
          clearInterval(interval);
          return prev;
        }
        
        return {
          x: prev.x + (dx / distance) * 2,
          y: prev.y + (dy / distance) * 2
        };
      });
    }, 50);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Smart Wheelchair Navigation</h3>
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Path Planning Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Path Planning Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <canvas
                ref={canvasRef}
                width={500}
                height={300}
                className="w-full border border-slate-600 rounded-lg bg-slate-900"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) * (500 / rect.width);
                  const y = (e.clientY - rect.top) * (300 / rect.height);
                  setTargetPos({ x, y });
                }}
              />
              <p className="text-sm text-slate-400 mt-2">
                Click to set target destination. Red areas are obstacles.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Joystick */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Manual Control</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div
                className="w-24 h-24 bg-slate-700 rounded-full relative cursor-pointer border-2 border-slate-600"
                onMouseMove={handleJoystickMove}
                onMouseLeave={() => setJoystickPos({ x: 0, y: 0 })}
              >
                <motion.div
                  className="w-6 h-6 bg-cyan-400 rounded-full absolute top-1/2 left-1/2"
                  animate={{
                    x: joystickPos.x - 12,
                    y: joystickPos.y - 12
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">
                Move cursor over joystick to control
              </p>
            </CardContent>
          </Card>

          {/* Autonomous Navigation */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Autonomous Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={startNavigation}
                disabled={isNavigating}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {isNavigating ? 'Navigating...' : 'Start Navigation'}
              </Button>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className={isNavigating ? 'text-cyan-400' : 'text-slate-300'}>
                    {isNavigating ? 'Active' : 'Standby'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Position:</span>
                  <span className="text-slate-300">
                    ({Math.round(wheelchairPos.x)}, {Math.round(wheelchairPos.y)})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target:</span>
                  <span className="text-slate-300">
                    ({Math.round(targetPos.x)}, {Math.round(targetPos.y)})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Specifications */}
      <Card className="mt-6 bg-slate-800/30 border-slate-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Sensors</h4>
              <ul className="text-slate-400 space-y-1">
                <li>• LiDAR Scanner</li>
                <li>• IMU Sensor</li>
                <li>• Wheel Encoders</li>
                <li>• Ultrasonic Sensors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Navigation</h4>
              <ul className="text-slate-400 space-y-1">
                <li>• ROS Navigation Stack</li>
                <li>• SLAM Mapping</li>
                <li>• A* Path Planning</li>
                <li>• Dynamic Obstacles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Control</h4>
              <ul className="text-slate-400 space-y-1">
                <li>• Joystick Interface</li>
                <li>• Voice Commands</li>
                <li>• Mobile App</li>
                <li>• Emergency Stop</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">Performance</h4>
              <ul className="text-slate-400 space-y-1">
                <li>• 8 hour battery</li>
                <li>• 5 km/h max speed</li>
                <li>• 150kg capacity</li>
                <li>• IP54 rating</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
