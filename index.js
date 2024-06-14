const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

const dataPaths = [
  '/examples/data/asset/data/life-expectancy-table.json',
  '/examples/data/asset/data/stock-DJI.json',
  '/examples/data/asset/data/wind-barb-hobart.json',
  '/examples/data/asset/data/les-miserables.json',
  '/examples/data/asset/data/lines-bus.json',
  '/examples/data/asset/data/nutrients.json',
  '/examples/data/asset/data/energy.json',
  '/examples/data/asset/data/flare.json',
  '/examples/data/asset/data/echarts-package-size.json',
  '/examples/data/asset/geo/Beef_cuts_France.svg',
];

// Generic route handler for JSON and SVG data paths
dataPaths.forEach((path) => {
  app.get(path, async (req, res) => {
    try {
      const response = await fetch(`https://echarts.apache.org${path}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${path}`);
      }

      if (path.endsWith('.svg')) {
        const data = await response.text();
        res.header('Content-Type', 'image/svg+xml');
        res.send(data);
      } else {
        const data = await response.json();
        res.json(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
