const express = require('express');
const app = express();

app.use(express.json());

app.use('/studios', require('./routes/studios'));
app.use('/actors', require('./routes/actors'));
app.use('/reviewers', require('./routes/reviewers'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
