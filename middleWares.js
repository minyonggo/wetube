import routes from './routes';

const locals = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    next();
}

export default locals;