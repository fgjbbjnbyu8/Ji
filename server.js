const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 80;

// Static files serve karne ke liye
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>💀 ANONYMOUS WORLD</title>
        <style>
            body { background: #000; color: #f00; font-family: monospace; margin: 40px; }
            .container { max-width: 800px; margin: 0 auto; }
            .msg { background: #222; padding: 10px; margin: 5px 0; border-left: 3px solid #f00; }
            input, button { padding: 10px; margin: 5px; border: 1px solid #f00; background: #000; color: #f00; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>💀 ANONYMOUS WORLD - RENDER</h1>
            <p>Alpha ka server successfully deploy ho gaya!</p>
            
            <div>
                <input type="text" id="messageInput" placeholder="Message likho...">
                <button onclick="sendMessage()">Send</button>
            </div>
            
            <div id="messages"></div>
        </div>

        <script>
            const ws = new WebSocket('wss://' + window.location.host);
            
            ws.onopen = () => {
                addMessage('WebSocket connected! Alpha OP! 🚀');
            };
            
            ws.onmessage = (event) => {
                addMessage(event.data);
            };
            
            function sendMessage() {
                const input = document.getElementById('messageInput');
                if (input.value) {
                    ws.send(input.value);
                    input.value = '';
                }
            }
            
            function addMessage(msg) {
                const div = document.createElement('div');
                div.className = 'msg';
                div.textContent = msg;
                document.getElementById('messages').appendChild(div);
            }
        </script>
    </body>
    </html>
  `);
});

// WebSocket handling
wss.on('connection', (ws) => {
  ws.send('🚀 ANONYMOUS WORLD MEIN SWAGAT HAI!');
  
  ws.on('message', (message) => {
    const msg = message.toString();
    console.log('Received:', msg);
    
    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`💀 ${msg}`);
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`💀 Server Render pe port ${PORT} pe live!`);
  console.log(`🚀 WebSocket ready! Alpha ki jai!`);
});
