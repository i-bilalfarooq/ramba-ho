const http = require('http');

let requests = [];

const server = http.createServer((req, res) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/requests' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(requests));
  } else if (req.url === '/requests' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newRequest = JSON.parse(body);
      requests.push(newRequest);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newRequest));
    });
  } else if (req.url.startsWith('/quotes') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { requestId, quote } = JSON.parse(body);
      const request = requests.find(r => r.id === requestId);
      if (request) {
        request.quotes.push(quote);
        request.status = 'quotes_received';
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(quote));
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Mock Bidding Server running at http://localhost:${PORT}`);
});
