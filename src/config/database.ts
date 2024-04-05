import { connection, connect } from "mongoose";

connection.on('error', err => {
  console.log('Error de conexión', err);
});

connection.once('open', () => {
  console.log('Conectado a MongoDB en', connection.name);
});

const startConnection = (database: string) => {
	connect(`mongodb://127.0.0.1:27017/${database}`);
}

export default { startConnection };
