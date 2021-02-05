# PHP config file watcher
Watches php config files, parses syntax on change, and sends errors to google chat room.

## Install
- run `npm i`
- copy and rename sample.env -> .env
- enter webhook url

## Run
`node index.js`

## Test
- add/edit `./config/*.php` file with syntax error, and save file
- message will be sent to your google chat room
