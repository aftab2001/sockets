import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors'; // Import cors middleware

// open the database file
const db = await open({
  filename: 'chat.db',
  driver: sqlite3.Database
});

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
  );
`);

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // Use cors middleware

const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:5173"
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connect', (socket) => {
  console.log('user connected')
  socket.on('create-something', async (data) => {
    let result;
    console.log('creating something')
    try {
      // store the message in the database
      result = await db.run('INSERT INTO messages (content) VALUES (?)', data);
      console.log(`Message stored in database with ID: ${result.lastID}`);
    io.emit('foo', data, result.lastID);

    } catch (e) {
      // handle the failure
      console.error(`Failed to store message: ${e.message}`);
      return;
    }
    // include the offset with the message
  });
});

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});
