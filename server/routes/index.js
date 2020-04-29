const express = require('express');
const router = express.Router();
const pool = require('../pool');

// 热门推荐
router.get('/hot', (req, res) => {
	let sql = 'SELECT id, mainPicture, price, productName, description FROM dm_products WHERE hot=101';				
	pool.query(sql, null, (err, data) => {
        if(err) throw err;
        res.send({
            code: 200,
            data,
            
        });
	});
});

// 单品推广
router.get('/onepush', (req, res) => {
	let sql = 'SELECT id, mainPicture, spec, productName, description FROM dm_products WHERE single=102';				
	pool.query(sql, null, (err, data) => {
        if(err) throw err;
        res.send({
            code: 200,
            data,
            
        });
	});
});

// banner
router.get('/banner', (req, res) => {
    let sql = 'SELECT id, bannerPic, description FROM dm_products WHERE banner=103';
    pool.query(sql, null, (err, data) => {
        if(err) throw err;
        res.send({
            code: 200,
            data,
            
        });
    });
});

// 关键字搜索
router.get('/kw', (req,res) => {
    const { kws } = req.query || {};
    let sql = "SELECT * FROM dm_products WHERE description LIKE ?";
    let ks = `%${kws}%`;
    pool.query(sql, [ks], (err, data) => {
        if(err) throw err;
        res.send({
            code: 200,
            data,
            
        })
    });
});

module.exports = router;