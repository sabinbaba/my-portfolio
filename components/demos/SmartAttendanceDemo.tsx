'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Users, CheckCircle, AlertTriangle, X, Eye, Brain, Clock } from 'lucide-react';

export default function SmartAttendanceDemo() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState<any[]>([]);
  const [attendanceLog, setAttendanceLog] = useState<any[]>([]);
  const [confidence, setConfidence] = useState(0);

  const mockStudents = [
    { id: 1, name: 'John Doe', studentId: 'ST001', status: 'present' },
    { id: 2, name: 'Jane Smith', studentId: 'ST002', status: 'present' },
    { id: 3, name: 'Mike Johnson', studentId: 'ST003', status: 'absent' },
    { id: 4, name: 'Sarah Wilson', studentId: 'ST004', status: 'present' },
    { id: 5, name: 'David Brown', studentId: 'ST005', status: 'late' },
  ];

  const startScanning = () => {
    setIsScanning(true);
    setDetectedFaces([]);
    setAttendanceLog([]);
    setConfidence(0);

    // Simulate face detection process
    const scanInterval = setInterval(() => {
      setConfidence(prev => {
        const newConfidence = Math.min(prev + Math.random() * 15, 100);
        
        // Add detected faces progressively
        if (newConfidence > 25 && detectedFaces.length === 0) {
          setDetectedFaces([mockStudents[0]]);
          setAttendanceLog(prev => [...prev, {
            ...mockStudents[0],
            timestamp: new Date().toLocaleTimeString(),
            confidence: 95
          }]);
        } else if (newConfidence > 50 && detectedFaces.length === 1) {
          setDetectedFaces([mockStudents[0], mockStudents[1]]);
          setAttendanceLog(prev => [...prev, {
            ...mockStudents[1],
            timestamp: new Date().toLocaleTimeString(),
            confidence: 92
          }]);
        } else if (newConfidence > 75 && detectedFaces.length === 2) {
          setDetectedFaces([mockStudents[0], mockStudents[1], mockStudents[3]]);
          setAttendanceLog(prev => [...prev, {
            ...mockStudents[3],
            timestamp: new Date().toLocaleTimeString(),
            confidence: 88
          }]);
        }

        if (newConfidence >= 100) {
          clearInterval(scanInterval);
          setIsScanning(false);
        }
        
        return newConfidence;
      });
    }, 200);
  };

  const resetDemo = () => {
    setIsScanning(false);
    setDetectedFaces([]);
    setAttendanceLog([]);
    setConfidence(0);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Smart Attendance System</h3>
        <Button variant="ghost" size="sm" onClick={() => {}}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed Simulation */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Live Camera Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-slate-900 rounded-lg h-64 overflow-hidden">
              {/* Simulated camera view */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                {isScanning ? (
                  <div className="relative w-full h-full">
                    {/* Face detection boxes */}
                    <AnimatePresence>
                      {detectedFaces.map((student, index) => (
                        <motion.div
                          key={student.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute border-2 border-green-400 rounded-lg face-detection"
                          style={{
                            left: `${20 + index * 25}%`,
                            top: `${30 + index * 10}%`,
                            width: '80px',
                            height: '100px',
                          }}
                        >
                          <div className="absolute -top-6 left-0 bg-green-400 text-slate-900 px-2 py-1 rounded text-xs font-semibold">
                            {student.name}
                          </div>
                          <div className="absolute -bottom-6 left-0 bg-slate-800 text-green-400 px-2 py-1 rounded text-xs">
                            {Math.floor(85 + Math.random() * 10)}%
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Scanning overlay */}
                    <motion.div
                      className="absolute inset-0 border-2 border-purple-400 rounded-lg"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    {/* Scanning line */}
                    <motion.div
                      className="absolute w-full h-0.5 bg-purple-400"
                      animate={{ y: [0, 256] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                ) : (
                  <div className="text-center text-slate-400">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Camera Ready</p>
                    <p className="text-sm mt-2">Click "Start Scanning" to begin</p>
                  </div>
                )}
              </div>

              {/* Confidence meter */}
              {isScanning && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Detection Confidence</span>
                    <span>{Math.round(confidence)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-purple-400 h-2 rounded-full"
                      animate={{ width: `${confidence}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-4 flex gap-3">
              <Button
                onClick={startScanning}
                disabled={isScanning}
                className="flex-1 bg-purple-500 hover:bg-purple-400 text-white"
              >
                {isScanning ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Start Scanning
                  </>
                )}
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

        {/* Attendance Results */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Attendance Log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Real-time log */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {attendanceLog.map((entry, index) => (
                  <motion.div
                    key={`${entry.id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-slate-900 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <div>
                        <p className="text-white font-medium">{entry.name}</p>
                        <p className="text-xs text-slate-400">{entry.studentId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 mb-1">
                        {entry.confidence}%
                      </Badge>
                      <p className="text-xs text-slate-400">{entry.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {attendanceLog.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No attendance recorded yet</p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="pt-4 border-t border-slate-700">
              <h4 className="font-semibold text-slate-300 mb-3">Class Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{attendanceLog.length}</div>
                  <div className="text-xs text-slate-400">Present</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">
                    {mockStudents.filter(s => s.status === 'absent').length}
                  </div>
                  <div className="text-xs text-slate-400">Absent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {mockStudents.filter(s => s.status === 'late').length}
                  </div>
                  <div className="text-xs text-slate-400">Late</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Implementation */}
      <Card className="mt-6 bg-slate-800/30 border-slate-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Computer Vision</h4>
              <ul className="text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <Brain className="w-3 h-3 text-purple-400" />
                  OpenCV Face Detection
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-3 h-3 text-purple-400" />
                  Deep Learning Models
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-3 h-3 text-purple-400" />
                  Real-time Processing
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="w-3 h-3 text-purple-400" />
                  Face Recognition API
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">Machine Learning</h4>
              <ul className="text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <Eye className="w-3 h-3 text-purple-400" />
                  TensorFlow/PyTorch
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="w-3 h-3 text-purple-400" />
                  Facial Embeddings
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="w-3 h-3 text-purple-400" />
                  Similarity Matching
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="w-3 h-3 text-purple-400" />
                  Confidence Scoring
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-3">System Features</h4>
              <ul className="text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-purple-400" />
                  Real-time Detection
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-purple-400" />
                  Automated Logging
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-purple-400" />
                  Anti-spoofing
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-purple-400" />
                  Report Generation
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
