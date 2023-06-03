var express = require('express');
var router = express.Router();
var register = require('../models/register')

/* GET home page. */




router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});





router.post('/', async function (req, res, next) {
  // console.log(req.body.name);

  try {
    data = await register.create(req.body)
    req.flash('message', 'Success!!');
    res.redirect('/show')
    // res.end()
  }
  catch {
    console.log('error');
    res.redirect('/')
  }
})

// show data
router.get('/show', async function (req, res, next) {
  try {
    data = await register.find()
    res.render('show', {
      alldata: data
    })
  }
  catch {
    res.status(401).json({
      status: 'alert',
      data
    })
  }
})

// edit data


router.get('/edit/:id', async function (req, res, next) {
  console.log(req.params.id);

  try{

    data = await register.findById(req.params.id)
    console.log(data);
    res.render('edit' , {
      editdata : data
    })
  }
  catch{
      console.log('error edit page routing');
  }

})

router.post('/edit/:id' , async function(req,res ,next){
  try{
        data = await register.findByIdAndUpdate(req.params.id , req.body)
        console.log(data);
        res.redirect('/show')
  }
  catch{
      res.status(401).json({
        message:'error please try again'  
      })
  }
})

router.get('/delete/:id', async function (req, res, next) {
  console.log(req.params.id);

  try {
    data = await register.findByIdAndDelete(req.params.id)
    res.redirect('/show')
  }
  catch {
    console.log('error');
  }
})

module.exports = router;
