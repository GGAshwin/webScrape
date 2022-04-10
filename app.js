const express=require('express');
const app=express();
const cheerio=require('cheerio');
const rp=require('request-promise');

var url='';
var data={
    headline:'',
    summary:'',
    url:'',
    img:'',
    date:''
}

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }))
// app.use(express.)

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/info',(req,res)=>{
    url=req.body.url;
    res.redirect('/info')
})

app.get('/info',(req,res)=>{
    rp(url)
.then(async function(html){
    // console.log('html',html);

    const $=cheerio.load(html);
    // console.log($('.title-post>h1>span').text());
    data.headline=$('.title-post>h1>span').text();

    
    // console.log($('#Desc').text());
    data.summary=$('#Desc').text();
    data.img=($('.innerPage-post-content span > p > img ').attr('src'));
    await console.log(data)
    await res.render('info',{data:data})
})
.catch(function(err){
    console.log(err);
})
})

app.listen(3000)