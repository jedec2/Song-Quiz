const http = require('http');
const https = require('https');
const url = require('url');

const GENIUS_TOKEN = '4ns7H2OCOdWATUjo4MDUS03atzrcl2GhSlog4R0C6vlTB-rx3w6SeprVjV5nBZ5t';

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url.startsWith('/search')) {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query.q;
    
    if (!query) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Missing query parameter' }));
      return;
    }

    const geniusUrl = `https://api.genius.com/search?q=${encodeURIComponent(query)}`;
    
    https.get(geniusUrl, {
      headers: {
        'Authorization': `Bearer ${GENIUS_TOKEN}`
      }
    }, (geniusRes) => {
      let data = '';
      
      geniusRes.on('data', chunk => {
        data += chunk;
      });
      
      geniusRes.on('end', () => {
        res.writeHead(geniusRes.statusCode);
        res.end(data);
      });
    }).on('error', (error) => {
      console.error('Error:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: error.message }));
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3001, () => {
  console.log('Genius API proxy running on http://localhost:3001');
});
