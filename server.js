const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve the HTML file

// Simulated IPs and messages
const ips = ['203.0.113.','198.51.100.','192.0.2.','10.20.30.','172.16.5.','45.33.32.'];
const msgs = [
  'Multiple failed auth attempts detected',
  'Credential stuffing pattern identified',
  'Distributed brute force from botnet',
  'Password spray across 50 accounts',
  'Dictionary attack — wordlist match',
  'Anomalous login velocity detected',
  'Geo-dispersed attack cluster found'
];
const statuses = ['blocked','blocked','alert','alert','blocked','alert','safe'];

let currentThreat = 20;

// Central Simulation Loop
setInterval(() => {
  // Broadcasst threat level
  currentThreat += (Math.random() - 0.5) * 15;
  currentThreat = Math.max(5, Math.min(95, currentThreat));
  io.emit('threat_level', { level: Math.round(currentThreat) });
}, 3000);

setInterval(() => {
  // Broadcast chart data
  io.emit('chart_data', { val: Math.floor(Math.random() * 80) });
}, 1000);

setInterval(() => {
  // Broadcast live attack log
  const ip = ips[Math.floor(Math.random()*ips.length)] + Math.floor(Math.random()*254+1);
  const msg = msgs[Math.floor(Math.random()*msgs.length)];
  const statusIdx = Math.floor(Math.random()*statuses.length);
  const status = statuses[statusIdx];
  const time = new Date().toTimeString().split(' ')[0];
  
  io.emit('attack_log', {
    time, ip, msg, status
  });
}, 1800);

const attackTypes = ['Brute Force','Dictionary Attack','Password Spraying','Credential Stuffing'];
const targets = ['/api/login','/admin','/wp-login.php','/auth/token','/signin'];
const severities = [
  {label:'CRITICAL',cls:'critical'},
  {label:'HIGH',cls:'high'},
  {label:'MEDIUM',cls:'medium'}
];
const actions = ['IP BLOCKED','CAPTCHA','RATE LIMITED','MONITORED'];

setInterval(() => {
    // Broadcast alerts table
    const time = new Date().toTimeString().split(' ')[0];
    const ip = ips[Math.floor(Math.random()*ips.length)] + Math.floor(Math.random()*254+1);
    const type = attackTypes[Math.floor(Math.random()*attackTypes.length)];
    const target = targets[Math.floor(Math.random()*targets.length)];
    const attempts = Math.floor(Math.random()*5000+100);
    const sev = severities[Math.floor(Math.random()*severities.length)];
    const action = actions[Math.floor(Math.random()*actions.length)];

    io.emit('alert_table', {
        time, ip, type, target, attempts, sev, action
    });
}, 4000);


// API Endpoint for the Simulator
app.post('/api/simulate', (req, res) => {
  const { ip, attempts, numIPs, pattern, geo } = req.body;
  
  let score = 0;
  let reasons = [];
  const patternNames = {brute:'Brute Force',dict:'Dictionary Attack',spray:'Password Spraying',cred:'Credential Stuffing',hybrid:'Hybrid Attack'};
  const patternName = patternNames[pattern] || pattern;

  if (attempts > 60) { score += 40; reasons.push('High request rate'); }
  else if (attempts > 20) { score += 20; reasons.push('Elevated request rate'); }
  else { score += 5; }

  if (numIPs > 50) { score += 35; reasons.push('Large botnet detected'); }
  else if (numIPs > 10) { score += 20; reasons.push('Distributed attack'); }
  else if (numIPs > 1) { score += 10; reasons.push('Multiple source IPs'); }

  if (geo === 'global') { score += 25; reasons.push('Global geo-dispersion'); }
  else if (geo === 'multi') { score += 10; reasons.push('Multi-country origin'); }

  if (pattern === 'spray') { score -= 5; reasons.push('Low-velocity evasion pattern'); }
  if (pattern === 'cred') { score += 10; reasons.push('Credential stuffing indicators'); }
  if (pattern === 'hybrid') { score += 15; reasons.push('Hybrid attack complexity'); }

  score = Math.min(100, Math.max(0, score));
  const blocked = score > 60;
  const suspicious = score > 30 && score <= 60;
  
  const geoLabels = {single:'Single Country',multi:'Multi-Country',global:'Global Distributed'};
  const geoLabel = geoLabels[geo] || geo;

  const result = {
      ip, attempts, numIPs, patternName, geoLabel, score,
      reasons,
      confidence: Math.floor(75 + Math.random()*20),
      blocked,
      suspicious
  };

  // Simulate network delay
  setTimeout(() => {
    res.json(result);
  }, 1200);
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'distributed-password-attack-detection.html'));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
