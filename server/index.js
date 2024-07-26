
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.post('/speak', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send('ERROR: The text is not specified!');
  }

  try {
    const response = await axios.get('https://api.voicerss.org/', {
      params: {
        key: 'd2de3ee308124bcd993db867f3ed5249',
        src: text,
        hl: 'en-us',
        r: '0',
        c: 'mp3',
        f: '44khz_16bit_stereo'
      },
      responseType: 'arraybuffer'
    });

    res.set('Content-Type', 'audio/mpeg');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching text-to-speech data:', error);
    res.status(500).send('Error fetching text-to-speech data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
