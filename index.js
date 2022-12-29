const express = require('express');
const app = express();
const ejs = require('ejs');
const {sequelize, User_info} = require('./DB/database.js');

sequelize.sync().then((res)=>{
    console.log('DB 연결 완료!!');
})

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', async (req,res)=>{
    const user_info = await User_info.findAll();
    res.render('index.ejs', {user_info})
})

app.post('/create', async(req,res)=>{
    const names = req.body.name;
    const ages = req.body.age;
    const sexs = req.body.sex;
    const contacts = req.body.contact;
    await User_info.create({
        name: names,
        age : ages,
        sex: sexs,
        contact : contacts
    });
    res.redirect('/');
})

app.post('/find', async (req,res)=>{
    const findEl = req.body.finding;
    console.log(findEl);
    const user_info= await User_info.findAll({ where: {
        name: findEl
    }});
    console.log(user_info)
    res.render('index.ejs', {user_info})
})

app.post('/delete/:id', async(req,res)=>{
    const ids = req.params.id;
    await User_info.destroy({where:{
        id: ids
    }});
    res.redirect('/');
})

app.listen(3005, (req,res)=>{
    console.log('3005번 서버열림');
})