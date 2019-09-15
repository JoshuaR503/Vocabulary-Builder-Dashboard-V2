const history = require('connect-history-api-fallback');
const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();
const dist = path.join(__dirname + '/dist/');
const dashboard = path.join(__dirname + '/dist/index.html');
const static = express.static(dist);

app.use(static);
app.use(compression());
app.use(history({
    disableDotRule: true,
    verbose: true,
}));

app.get('/', (request, response) => response.render(dashboard));
app.listen(process.env.PORT || 8900, () => {
    console.log('server running');
});