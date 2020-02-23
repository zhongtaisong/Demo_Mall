const express = require('express');
const router = express.Router();
const pool = require('../pool');

// 查字典
router.get('/selectDic', (req, res) => {
    let tableDic = {};
	let sql = "SELECT * FROM dm_brands";
	pool.query(sql, [], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 1,
                msg: err
            })
        }else{
            tableDic['BRAND_LIST'] = {}
            for(const [key, value] of Object.entries(data)){
                tableDic['BRAND_LIST'] = {...tableDic['BRAND_LIST'], [value['id']]: value.brandName}
            }
            res.send({
                code: 200,
                data: tableDic,
                msg: 'ok'
            })
        }
	});
});

module.exports = router;