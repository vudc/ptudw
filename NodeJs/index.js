var express = require('express');
var exphbs = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');
var path = require('path');
var CategoryController = require('./controllers/CategoryController');
var app = express();

app.engine('hbs', exphbs({
    defaultLayout: '_LayoutPublic',
    layoutsDir: 'Views/Layout/',
    helpers: {
        section: express_handlebars_sections()
    }
}));

app.set('view engine', 'hbs');
app.set("views","./Views");
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/category', CategoryController);
app.get('/', (req, res) => {
	res.render('about');
});
app.get('/about', (req, res) => {
	res.render('about');
});
app.listen(3000, () => {
    console.log('Site running on port 3000');
});