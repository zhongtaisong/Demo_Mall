const express = require('express');
const router = express.Router();
const pool = require('../pool');

// 添加收货地址 / 修改收货地址
router.post('/edit', (req, res) => {
    let { id, uname, name, region, detail, phone, isDefault } = req.body || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    if( !name ){
        res.status(400).send({
            code: 2,
            msg: 'name不能为空！'
        })
        return;
    }
    if( !region ){
        res.status(400).send({
            code: 3,
            msg: 'region不能为空！'
        })
        return;
    }
    if( !detail ){
        res.status(400).send({
            code: 4,
            msg: 'detail不能为空！'
        })
        return;
    }
    if( !phone ){
        res.status(400).send({
            code: 5,
            msg: 'phone不能为空！'
        })
        return;
    }

    (async () => {
        let sql=null, params=null, msg=null;
        if( isDefault ){
            await new Promise((resolve, reject) => {
                sql = "UPDATE dm_address SET isDefault=? WHERE uname=?";
                pool.query(sql, [0, uname], (err, data) => {
                    if(err) throw err;
                    resolve();
                });
            })
        }

        await new Promise((resolve, reject) => {
            if( !id ){
                sql = "INSERT INTO dm_address VALUES(NULL, ?, ?, ?, ?, ?, ?)";
                params = [uname, name, region, detail, phone, isDefault ? 1 : 0];
                msg = '添加';
            }else{
                sql = "UPDATE dm_address SET name=?, region=?, detail=?, phone=?, isDefault=? WHERE uname=? AND id=?";
                params = [name, region, detail, phone, isDefault ? 1 : 0, uname, id];
                msg = '修改';
            }
            pool.query(sql, params, (err, data) => {
                if(err) throw err;
                if( data.affectedRows ){
                    res.send({
                        code: 200,
                        data: null,
                        msg: `收货地址${msg}成功`
                    })
                }else{
                    res.send({
                        code: 6,
                        msg: `收货地址${msg}失败`
                    })
                }
            });
        })
    })()
})

// 查询收货地址
router.get('/select', (req, res) => {
    const { uname } = req.query || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    
    let sql = "SELECT * FROM dm_address WHERE uname=?";
    pool.query(sql, [uname], (err, data) => {
        if(err) throw err;
        res.send({
            code: 200,
            data,
            msg: 'ok'
        })
    });
})

// 删除收货地址
router.get('/delete', (req, res) => {
    const { id } = req.query || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空！'
        })
        return;
    }
    
    let sql = "DELETE FROM dm_address WHERE id=?";
    pool.query(sql, [id], (err, data) => {
        if(err) throw err;
        if( data.affectedRows ){    
            res.send({
                code: 200,
                data: null,
                msg: '删除收货地址成功'
            });
        }else{
            res.send({
                code: 2,
                msg: '删除收货地址失败' 
            });
        }
    });
})

module.exports = router;