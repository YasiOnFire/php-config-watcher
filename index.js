require('dotenv/config');
const chokidar = require('chokidar');
const engine = require('php-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const webhookURL = process.env.WH;
const dirToWatch = './config';

const parser = new engine({
  parser: {
    extractDoc: true,
    php7: false
  }
});

chokidar.watch(dirToWatch).on('all', (event, path) => {
  console.log(event, path);

  if (path.indexOf('.php') > -1 && (event === 'add' || event === 'change')) {
    fs.readFile(path, (err, data) => {
      try {
        parser.parseCode(data.toString());
      } catch (error) {
        console.error(error);
        fetch(webhookURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            'text': `File: ${path}, Error: ${error}, ${JSON.stringify(error)}`
          }),
        }).then(() => {
          console.log('Warning sent');
        });
      }
    });
  }
});
