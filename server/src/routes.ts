import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    

    const data = {
        name: "Gabriel",
        event: "Next Level Week",
        type: 'omnistack',
        version: 3
    }

    console.log('[Debugging...] Test');
    return response.status(200).json(data);
});

export default routes;