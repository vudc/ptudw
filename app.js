require('dotenv').config();
var express = require('express');
var session = require('express-session');
var multer  =   require('multer');
var crypto = require('crypto');
var MySQLStore = require('express-mysql-session')(session);
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var handleLayoutMDW = require('./middle-wares/handleLayout');
var http = require('http');
var storage = multer.diskStorage({
    //folder upload -> public/upload
    destination: './public/upload/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
        cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
      })
    }
  })
var
    AccountController = require('./controllers/AccountController'),
    BlogController = require('./controllers/BlogController');
    HomeController = require('./controllers/HomeController'),
    CartController = require('./controllers/CartController');
var admin_Upload = require('./admin/controller/FileController')
var admin_blogController = require('./admin/controller/BlogController');
var admin_blogCategoryController = require('./admin/controller/BlogCategoryController');
var admin_UserController = require('./admin/controller/UserController');
var admin_OrderController = require('./admin/controller/OrderController');
var admin_ProductController = require('./admin/controller/ProductController');
var admin_ProducerController = require('./admin/controller/ProducerController');
var admin_CategoryController = require('./admin/controller/CategoryController');
var admin_FileController = require('./admin/controller/FileController');
var app = express();
app.engine('hbs', exphbs({
    defaultLayout: '_LayoutPublic',
    layoutsDir: 'Views/Layout/',
    partialsDir: 'Views/partials/',
    helpers: {
        section: express_handlebars_sections(),
        compareStatus: function (v1, v2, option) {
            if (v1 === v2) {
                return option.fn(this);
            }
            return option.inverse(this);
        }
    }
}));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, 'Views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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
app.use('/blog',BlogController);
app.use('/test', admin_Upload);
app.use('/account', AccountController);
app.use('/admin/order', admin_OrderController);
app.use('/admin/user', admin_UserController);
app.use('/admin/product', admin_ProductController);
app.use('/admin/blog',admin_blogController);
app.use('/admin/blog_category',admin_blogCategoryController);
app.use('/admin/category', admin_CategoryController);
app.use('/admin/producer', admin_ProducerController);
app.use('/cart', CartController);
app.use('/home', HomeController);
app.get('/', (req, res) => {
    res.redirect('/home');
});
app.get('/test',(req,res)=>{
    res.render('test');
})
app.use('/admin/file',admin_FileController);
app.get('/admin', (req, res) => {
    res.redirect('/admin/order');
})
// http.createServer(app).listen(process.env.PORT);
console.log('Starting app with config:', process.env)
app.listen(process.env.PORT, () => {
  console.log('Site running on port ' + process.env.PORT);
});
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
//   }).listen(13370, '0.0.0.0');
//   console.log('Server running at http://0.0.0.0:13370/');