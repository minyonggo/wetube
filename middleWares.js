import routes from './routes';

const locals = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 5,
    }
    next();
}

export default locals;