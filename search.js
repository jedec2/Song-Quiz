export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const response = await fetch(
    `https://api.genius.com/search?q=${encodeURIComponent(q)}`,
    { headers: { Authorization: `Bearer ${process.env.GENIUS_TOKEN}` } }
  );

  const data = await response.json();
  res.status(200).json(data);
}