import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import helmet from 'helmet';
import nunjucks from 'nunjucks';
import mongoDB from './config/database';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;
const database = {
	name: process.env.DATABASE_NAME || 'my-project-database'
};

/**
 * View engine setup
 */
nunjucks.configure('src/views', {
	autoescape: true,
	express: app
});
app.set('view engine', 'njk');

/**
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(helmet());

/**
 * Routes of API
 */
app.use('/api', require('./routes/api/index'));

/**
 * Routes of the Website
 */
app.use('/', require('./routes/index'));

// Catch 404 and forward to the Error handler
app.use((req: Request, res: Response, next: NextFunction) => {
	next(createError(404));
});

/**
 * Error handler
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	// Validation errors
	if (err.array) {
		const errInfo = err.array({ })[0];
		console.log(errInfo);
		err.message = `Not valid - ${errInfo.type} ${errInfo.path} in ${errInfo.location} ${errInfo.msg}`;
		err.status = 422;
	}
  
	res.status(err.status || 500);
  
	// if the error is in the API, send the response in JSON format
	if (req.originalUrl.startsWith('/api/')) {
		res.json({ error: err.message });
		return;
	}
  
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	// render the error page
	res.render('error');
});

/**
 * Connect to Database
 */
mongoDB.startConnection(database.name);

/**
 * Start app
 */
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
