const express = require('express');
const router = express.Router();
const pool = require('../pool');
const moment = require('moment');
const fs = require('fs');

// multer上传图片相关设置
const multer  = require('multer');
const dest = 'public/img';
let upload = multer() // 文件储存路径

// 查询菜单 和 按钮权限
router.get('/select/uname', (req, res) => {
	let { uname } = req.query || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    let sql = 'SELECT * FROM dm_admin WHERE uname=?';
    pool.query(sql, [uname], (err, data) => {
        if(err){
            res.status(503).send({
                code: 2,
                msg: err
            })
        };
        res.send({
            code: 200,
            data: data[0] || {},
            
        });
    });
});

// 查询权限管理列表数据
router.get('/select', (req, res) => {
	let { current=1, pageSize } = req.query || {};
    if( !current ){
        res.status(400).send({
            code: 1,
            msg: 'current不能为空,且大于0'
        })
        return;
    }

    (async () => {
        pageSize = pageSize ? parseInt(pageSize) : 6;
        current = current - 1;
        let total = await new Promise((resolve, reject) => {
            let sql = 'SELECT COUNT(*) as total FROM dm_admin';
            pool.query(sql, null, (err, data) => {
                if(err){
                    res.status(503).send({
                        code: 2,
                        msg: err
                    })
                    return;
                };
                resolve(data.length ? (data[0] ? data[0].total : 0) : 0);
            });
        })

        let result = await new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM dm_admin LIMIT ?, ?';
            pool.query(sql, [current * pageSize, pageSize], (err, data) => {
                if(err){
                    res.status(503).send({
                        code: 3,
                        msg: err
                    })
                    return;
                };
                resolve(data);
            });
        })

        res.send({
            code: 200,
            data: {
                current: current + 1,
                pageSize,
                total,
                data: result
            },
            
        });
    })()
});

// 添加用户权限/ 修改用户权限
router.post('/edit', (req, res) => {
    let { id, uname, role, operator, ...rest } = req.body || {};
    let body = req.body || {};
    if( !role ){
        res.status(400).send({
            code: 1,
            msg: 'role不能为空！'
        })
        return;
    }
    if( !operator ){
        res.status(400).send({
            code: 2,
            msg: 'operator不能为空！'
        })
        return;
    }
    if( !uname ){
        res.status(400).send({
            code: 3,
            msg: 'uname不能为空！'
        })
        return;
    }

    for(let r in rest){
        if( Array.isArray(rest[r]) ){
            rest[r] = JSON.stringify( rest[r] );
        }
    }
    rest['operator'] = operator;
    rest['handleTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
    // console.log('1111111111', body);
    let sql=null, params=[], msg='';
    if( id ){
        sql = `UPDATE dm_admin SET `;
        for(let rt in rest){
            sql += `${rt}=?, `;
            params.push(rest[rt] );
        }
        sql = sql.slice(0, sql.lastIndexOf(','));
        sql += ` WHERE uname=? AND id=?`;
        params = [...params, uname, id];
        msg = '修改用户权限';
    }else{
        sql = `INSERT INTO dm_admin VALUES (NULL, `;
        body['handleTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
        delete body.id;
        for(let bd in body){
            sql += `?, `;
            if( bd.includes('Menu') ){
                params.push(body[bd] ? 1 : 0);
            }else{                
                if( Array.isArray(body[bd]) ){
                    params.push(JSON.stringify( body[bd] ));
                }else{
                    params.push(body[bd]);
                }
            }
        }
        sql = sql.slice(0, sql.lastIndexOf(','));
        sql += `)`;
        msg = '添加用户权限';
        
    }
    pool.query(sql, params, (err, data) => {
        if(err){
            res.status(503).send({
                code: 4,
                msg: err
            })
        };
        if( data.affectedRows ){
            if( !id ){
                let sql = 'UPDATE dm_user SET admin=? WHERE uname=?';
                pool.query(sql, [1, uname], (err, result) => {
                    if(err){
                        res.status(503).send({
                            code: 6,
                            msg: err
                        })
                    };
                    if( result.affectedRows ){
                        res.send({
                            code: 200,
                            data: null,
                            msg: `${msg}成功`
                        })
                    }else{
                        res.send({
                            code: 7,
                            msg: `${msg}失败`
                        })
                    }
                });
            }
        }else{
            res.send({
                code: 5,
                msg: `${msg}失败`
            })
        }
    });
})

// 查询所有用户
router.get('/select', (req, res) => {
	let { current=1, pageSize } = req.query || {};
    if( !current ){
        res.status(400).send({
            code: 1,
            msg: 'current不能为空,且大于0'
        })
        return;
    }

    let sql = "SELECT * FROM dm_user";
    pool.query(sql, null, (err, data) => {
        if( err ){
            res.status(503).send({
                code: 1,
                msg: err
            })
        }else{
            data.forEach(item => {
                delete item.upwd;
            })
            let result = {
                // current - 当前页
                current: current - 1,
                // 一页多少条数据
                pageSize: pageSize ? parseInt(pageSize) : data.length,
                // 数据总数
                total: data.length
            };           
            
            result.products = data.reverse().slice(result.current * result.pageSize, result.current * result.pageSize + result.pageSize);
            result.current = result.current + 1;
            res.send({
                code: 200,
                data: result,
                
            });
        }
    });
});

// 删除用户权限
router.get('/delete', (req, res) => {
    let { id, uname } = req.query || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空'
        });
        return;
    }
    if( !uname ){
        res.status(400).send({
            code: 2,
            msg: 'uname不能为空'
        });
        return;
    }

    let sql = "DELETE FROM dm_admin WHERE id=?";
    pool.query(sql, [id], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 3,
                msg: err
            })
        }else{
            if( data.affectedRows ){
                let sql = 'UPDATE dm_user SET admin=? WHERE uname=?';
                pool.query(sql, [0, uname], (err, result) => {
                    if(err){
                        res.status(503).send({
                            code: 5,
                            msg: err
                        })
                    };
                    if( result.affectedRows ){
                        res.send({
                            code: 200,
                            data: null,
                            msg: '删除用户权限成功'
                        })
                    }else{
                        res.send({
                            code: 6,
                            msg: '删除用户权限失败'
                        })
                    }
                });
            }else{
                res.send({
                    code: 4,
                    msg: '删除用户权限失败'
                })
            }
        }
    })
});

module.exports = router;