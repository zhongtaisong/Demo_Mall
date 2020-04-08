const express=require("express");
const router=express.Router();
const pool=require("../pool");

// 删除购物车 - 指定商品 / 全部商品
router.post('/delete', (req, res) => {
    const { ids, uname } = req.body || {};
    if( !ids || !ids.length || !Array.isArray(ids) ){
        res.status(400).send({
            code: 1,
            msg: 'ids不能为空，且是一个数组！'
        })
        return;
    }
    if( !uname ){
        res.status(400).send({
            code: 2,
            msg: 'uname不能为空！'
        })
        return;
    }
    let sql = "DELETE FROM dm_cart WHERE id IN(?) AND uname = ?";
    pool.query(sql, [ids, uname], (err, result) => {
        if(err) throw err;
        if( result.affectedRows ){
            res.send({
                code: 200,
                data: null,
                msg: '删除成功'
            })
        }else{
            res.send({
                code: 3,
                msg: '删除失败'
            })
        }
    })
})

// 商品数量更新
router.post('/update/num', (req,res) => {
    const { uname, id, num, totalprice } = req.body || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    if( !id ){
        res.status(400).send({
            code: 2,
            msg: 'id不能为空！'
        })
        return;
    }
    if( !num ){
        res.status(400).send({
            code: 3,
            msg: 'num不能为空！'
        })
        return;
    }
    if( !totalprice ){
        res.status(400).send({
            code: 4,
            msg: 'totalprice不能为空！'
        })
        return;
    }

    let sql = "UPDATE dm_cart SET num=?, totalprice=? WHERE id=? AND uname=?";
    pool.query(sql, [ num, totalprice, id, uname ], (err, result) => {
        if( err ) throw err;
        if( result.affectedRows ){
            res.send({
                code: 200,
                data: null,
                msg: '商品数量更新成功'
            })
        }else{
            res.send({
                code: 5,
                msg: '商品数量更新失败'
            })
        }
    })
})

// 查询购物车 / 查询收藏
router.get('/select', (req, res) => {
    const { uname, collection } = req.query || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    if( collection || (collection == 0 && typeof collection != 'boolean') ){
        if( collection != 0 && collection != 1 ){
            res.status(400).send({
                code: 2,
                msg: 'collection只能传0 或 1'
            })
            return;
        }
    }else{
        res.status(400).send({
            code: 3,
            msg: 'collection不能为空！'
        })
        return;
    }
    let sql = 'SELECT c.*, p.productName, p.mainPicture, p.description, p.spec, p.price FROM dm_cart c, dm_products p WHERE c.pid=p.id AND c.uname=? AND c.collection=?';
    pool.query(sql, [uname, collection], (err, data) => {
        if( err ) throw err;
        res.send({
            code: 200,
            data,
            msg: 'ok'
        })
    })
})

// 加入购物车
router.post('/add', (req,res) => {
    let { uname, list } = req.body || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }    
    if( !list.length ){
        res.status(400).send({
            code: 2,
            msg: 'list不能为空！'
        })
        return;
    }

    list.forEach(item => {
        let sql = 'SELECT num, totalprice FROM dm_cart WHERE pid=?';
        pool.query(sql, [item.pid], (err, data) => {
            if(err) throw err;
            if( data.length ){
                let num = data[0].num ? data[0].num+item.num : data[0].num;
                let totalprice = data[0].totalprice ? data[0].totalprice+item.totalprice : data[0].totalprice;
                sql = 'UPDATE dm_cart SET num=?, totalprice=? WHERE pid=?';
                pool.query(sql, [num, totalprice, item.pid], (err, data) => {
                    if(err) throw err;
                    if( data.affectedRows ){
                        res.send({
                            code: 200,
                            data: null,
                            msg: '加入购物车成功'
                        })
                    }else{
                        res.send({
                            code: 3,
                            msg: '加入购物车失败'
                        })
                    }
                })                        
            }else{
                sql = 'INSERT INTO dm_cart VALUES (NULL, ?, ?, ?, ?, ?)';
                pool.query(sql, [uname, item.pid, item.num, item.totalprice, 0], (err, data) => {
                    if(err) throw err;
                    if( data.affectedRows ){
                        res.send({
                            code: 200,
                            data: null,
                            msg: '加入购物车成功'
                        })
                    }else{
                        res.send({
                            code: 4,
                            msg: '加入购物车失败'
                        })
                    }
                })
            }
        })
    })
})

// 查询购物车商品数量
router.get('/select/num', (req, res) => {
    const { uname } = req.query || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    let sql = 'SELECT num FROM dm_cart WHERE uname=? AND collection=0';
    pool.query(sql, [uname], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 2,
                msg: err
            })
        }else{
            if( data.length ){
                let total = data.reduce((total, item, index, arr) => {
                    return total + item.num;
                }, 0)
                res.send({
                    code: 200,
                    data: total,
                    msg: 'ok'
                })
            }else{                
                res.send({
                    code: 200,
                    data: 0,
                    msg: 'ok'
                })
            }
        }
    })
})

// webApp - 查当前商品下所有规格
router.get('/select/spec', (req, res) => {
    const { pid } = req.query || {};
    if( !pid ){
        res.status(400).send({
            code: 1,
            msg: 'pid不能为空！'
        })
        return;
    }

    let sql = 'SELECT id, spec, price FROM dm_products WHERE brandId=(SELECT brandId FROM dm_products WHERE id=?)';
    pool.query(sql, [pid], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 2,
                msg: err
            })
        }else{
            res.send({
                code: 200,
                data,
                msg: 'ok'
            })
        }
    })

})

// webApp - 更改规格
router.post('/update/spec', (req, res) => {
    const { id, pid, num, price } = req.body || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空！'
        })
        return;
    }
    if( !pid ){
        res.status(400).send({
            code: 2,
            msg: 'pid不能为空！'
        })
        return;
    }
    if( !num ){
        res.status(400).send({
            code: 3,
            msg: 'num不能为空！'
        })
        return;
    }
    if( !price ){
        res.status(400).send({
            code: 4,
            msg: 'price不能为空！'
        })
        return;
    }
    const totalprice = Number(price) * Number(num);
    let sql = 'UPDATE dm_cart SET pid=?, totalprice=? WHERE id=?';
    pool.query(sql, [pid, totalprice, id], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 5,
                msg: err
            })
        }else{
            if( data.affectedRows ){
                res.send({
                    code: 200,
                    data: null,
                    msg: '更改规格成功'
                })
            }else{
                res.send({
                    code: 6,
                    msg: '更改规格失败'
                })
            }
        }
    })
})

// webApp - 当前用户默认收货地址
router.get('/select/address', (req, res) => {
    const { uname } = req.query || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    
    let sql = "SELECT region, detail FROM dm_address WHERE uname=? AND isDefault=1";
    pool.query(sql, [uname], (err, data) => {
        if(err) throw err;
        res.send({
            code: 200,
            data: data[0] || {},
            msg: 'ok'
        })
    });

})

module.exports=router;