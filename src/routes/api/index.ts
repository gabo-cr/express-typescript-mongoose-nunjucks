import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const apis = [
			'/api/'
		];
	
		res.json({ apis_disponibles: apis });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
