const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiUserProfileRouter = require('./routes/apiUserProfile');
const ratingsRouter = require('./routes/ratings');
const favsRouter = require('./routes/favs');
const recommendationsRouter = require('./routes/recommendations');

const {engine} = require('express-handlebars');

const app = express();

// view engine setup
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    //app.use('/userProfile', userProfileRouter);
    app.use('/ratings', ratingsRouter)
    app.use('/favs', favsRouter);
    app.use('/recommendations', recommendationsRouter);
    app.use('/api/userProfile', apiUserProfileRouter);

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// --- Swagger setup ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Anime Data Aggregator - Main Server',
            version: '1.0.0',
            description: 'Main server API (aggregates results from satellites).'
        },
        servers: [
            { url: 'http://localhost:3001' }
        ],
    },
    apis: [path.join(__dirname, 'routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
