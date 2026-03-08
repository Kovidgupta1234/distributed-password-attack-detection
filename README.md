# DPADS: Distributed Password Attack Detection System

![DPADS Dashboard](https://img.shields.io/badge/Status-Operational-00ff99?style=for-the-badge) ![Tech](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs) ![Sockets](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socketdotio)

DPADS is a real-time web-based monitoring dashboard and detection engine for identifying and mitigating distributed password attacks. It features a stunning sci-fi dashboard interface and a simulated interactive detection engine connecting a live frontend with a Node.js backend.

## Features

- **Live Threat Dashboard**: Displays real-time threat scores, active alerts, and an interactive network node map.
- **Real-Time Data Streaming**: Powered by Socket.IO to instantly push simulated network attack events to the dashboard without refreshing.
- **Attack Simulator Engine**: An interactive form that allows you to calculate threat levels based on custom parameters (IP addresses, attempt rate, attack pattern, geo-dispersion).
- **Interactive Animations**: Sleek canvas-based particle animations, scanlines, rotating threat rings, and moving network packets for an immersive cyber-security feel.

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Grid/Flexbox UI), Vanilla JavaScript, HTML5 Canvas, Socket.IO Client.
- **Backend**: Node.js, Express.js, Socket.IO.

## Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

You will need **Node.js** installed on your system.
- Download it here: [Node.js Official Website](https://nodejs.org/)
- Verify installation by opening your terminal and typing `node -v` and `npm -v`.

### Installation

1. Clone this repository (or download the ZIP file).
   ```bash
   git clone https://github.com/your-username/dpads.git
   ```
2. Navigate into the project directory.
   ```bash
   cd dpads
   ```
3. Install the required Node dependencies (`express`, `socket.io`, `cors`).
   ```bash
   npm install
   ```

### Running the App

1. Start the backend server.
   ```bash
   node server.js
   ```
   *(You should see `Server running on http://localhost:3000` in the terminal).*

2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```
   
## Project Structure

```text
├── distributed-password-attack-detection.html  # Main Frontend UI
├── server.js                                   # Node.js backend & Socket.IO emitter
├── package.json                                # Project dependencies
└── README.md                                   # This documentation file
```

## How It Works

- **`server.js`** handles data generation. It uses `setInterval` to act as a mock central log aggregator, broadcasting simulated `threat_level`, `chart_data`, and `attack_log` events via sockets.
- The **Frontend** establishes a WebSocket connection upon loading and uses `socket.on()` listeners to dynamically update the UI elements (tables, charts, and threat meters) whenever new data arrives from the server.
- The **Attack Simulator** form at the bottom of the page makes a `POST` request to the backend `/api/simulate` endpoint. The backend processes the variables, applies a scoring algorithm, and returns a JSON verdict of "Attack", "Suspicious", or "Legit", which the UI then formats and displays.

## Future Plans

- Replace simulated interval data with real parsing of local server logs (e.g., Auth.log or Nginx access logs).
- Integrate actual database storage for long-term attack analysis.

## License
MIT License - Educational / Open Source Use
