import mongoose from 'mongoose';
import {config as configDotenv} from 'dotenv'

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! ðŸ’¥ Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './app'

configDotenv({ path: './.env' });

const PASSWORD = process.env['DATABASE_PASSWORD']?.toString();
const DBSTRING = process.env['DATABASE']?.toString()

//if(DBSTRING&&PASSWORD)
const DB = DBSTRING.replace('<PASSWORD>', PASSWORD);
//}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

  
const port = process.env["PORT"] || 3000;

console.log(process.env["PORT"]);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! ðŸ’¥ Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});