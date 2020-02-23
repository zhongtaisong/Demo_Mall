const express=require("express");
const router=express.Router();
const pool=require("../pool");

// 商品详情
router.get("/select", (req, res) => {
    let { id } = req.query;
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空！'
        })
        return;
    }

    (async () => {
        let obj = {}
        // 查询当前商品id下的数据
        await new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM dm_products WHERE id=?';
            pool.query(sql, [id], (err, data) => {
                if(err) throw err;
                if( data.length ){
                    const { id, brandId, mainPicture, pictures, productName, description, copywriting, price, detailsPic, ...rest } = data[0] || {};
                    obj = {                        
                        imgList: [mainPicture, ...(pictures ? pictures.split('|') : [])],
                        basicInfo: { id, brandId, productName, description, copywriting, price },
                        params: {id, brandId, productName, ...rest},
                        detailsPic: [ ...(detailsPic ? detailsPic.split('|') : []) ]
                    }
                    resolve();
                }else{
                    res.send({
                        code: 2,
                        msg: '当前商品数据不存在！'
                    })
                }
            })  
        })
        // 查询同一品牌的商品规格
        await new Promise((resolve, reject) => {
            const { basicInfo } = obj || {};
            let sql = 'SELECT id, spec FROM dm_products WHERE brandId=?';
            pool.query(sql, [basicInfo.brandId], (err, data) => {
                if(err) throw err;
                if( data.length ){
                    obj = { ...obj,                        
                        specs: data
                    }
                    resolve();
                }else{
                    res.send({
                        code: 2,
                        msg: '当前商品规格不存在！'
                    })
                }
            })  
        })
        res.send({
            code: 200,
            data: obj,
            msg: 'ok'
        })
    })()
})

module.exports=router;