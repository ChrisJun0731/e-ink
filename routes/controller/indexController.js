/**
 * Created by Administrator on 2017/7/26.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;