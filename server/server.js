const express = require('express');
const apiRouter = require('./routes')
let app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static('client'));


app.use('/api', apiRouter)






app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));