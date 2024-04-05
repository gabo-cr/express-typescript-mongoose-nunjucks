import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	const title = 'My Project!!!';

	const context = {
		title: title
	};

	res.render('index', context);
});

module.exports = router;
