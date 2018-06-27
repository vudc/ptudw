var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var handleLayoutMDW = require('./middle-wares/handleLayout');
var upload_file = require("froala-editor");
var
    AccountController = require('./controllers/AccountController'),
    ProductController = require('./controllers/ProductController'),
    HomeController = require('./controllers/HomeController'),
    CartController = require('./controllers/CartController');
var admin_Upload = require('./admin/controller/FileController')
var admin_ProducerController = require('./admin/controller/ProducerController');
var admin_CategoryController = require('./admin/controller/CategoryController');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: '_LayoutPublic',
    layoutsDir: 'Views/Layout/',
    partialsDir: 'Views/partials/',
    helpers: {
        section: express_handlebars_sections()
    }
}));

app.set('view engine', 'hbs');
app.set("views", "./Views");
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Congvu307',
    database: 'duyenmay',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

///
//pass value to layout
app.use(handleLayoutMDW);
app.use('/test',admin_Upload);
app.use('/account', AccountController);
app.use('/admin/product', ProductController);
app.use('/admin/category', admin_CategoryController);
app.use('/admin/producer', admin_ProducerController);
app.use('/cart', CartController);
app.use('/home', HomeController);
app.get('/', (req, res) => {
    res.redirect('/home');
});
app.listen(3000, () => {
    console.log('Site running on port 3000');
});