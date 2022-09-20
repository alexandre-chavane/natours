const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log(`Database Connection successful!`);
  })
  .catch((err) => console.log(err));

  
// const port = process.env.PORT || 3000;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
