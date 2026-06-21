const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/AnudeepVytla/AnudeepVytla/master/images/spiderman.png'; // A known spiderman hanging image on github? No.

// Let's use the DuckDuckGo Image Search API indirectly, or just grab a known good image URL.
const knownUrl = 'https://i.pinimg.com/originals/30/ee/65/30ee65dfa4066c0fcbd509de5da12480.png'; // Pinterest might 403.

// Let's just use an image placeholder API with a custom URL? No, they want Spiderman.
