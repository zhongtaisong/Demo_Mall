const express = require('express');
const router = express.Router();
const pool = require('../pool');
const moment = require('moment');

// 查询用户名 和 商品编号
router.get('/select/getUnameAndPid', (req, res) => {
    (async () => {
        // 返回结果
        let result = {};
        await new Promise((resolve, reject) => {
            // 查 - 用户名
            let sql = 'SELECT uname FROM dm_user';
            pool.query(sql, null, (err, data) => {
                if(err){                    
                    res.status(503).send({
                        code: 1,
                        msg: err
                    })
                }else{
                    result['uname'] = data;
                    resolve();
                }
            });
        })
        await new Promise((resolve, reject) => {
            // 查 - 商品编号
            let sql = 'SELECT id FROM dm_products';
            pool.query(sql, null, (err, data) => {
                if(err){                    
                    res.status(503).send({
                        code: 2,
                        msg: err
                    })
                }else{
                    result['id'] = data;
                    resolve();
                }
            });
        })
        res.send({
            code: 200,
            data: result,
            
        });
    })()
});

// 喜欢 / 不喜欢
router.post('/update/agree', (req, res) => {
    const { id, type, agreeNum, disagreeNum } = req.body || {};
    if(!id){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空！'
        })
    }
    if(!type){
        res.status(400).send({
            code: 2,
            msg: 'type不能为空！'
        })
    }

    let sql = 'UPDATE dm_comment SET agree=?, disagree=? WHERE id=?';
    let msg = type == 'agree' ? '喜欢' : '不喜欢';
    pool.query(sql, [agreeNum, disagreeNum, id], (err, data) => {
        if(err) throw err;
        if(data.affectedRows){
            res.send({
                code: 200,
                data: null,
                msg: `${msg}`
            })
        }else{
            res.status(404).send({
                code: 3,
                msg: `${msg}失败！`
            })
        }
    })
})

// 查询指定商品评价
router.get('/select/pid', (req, res) => {
	let { pid } = req.query || {};
    if( !pid ){
        res.status(400).send({
            code: 1,
            msg: 'pid不能为空'
        })
        return;
    }

    (async () => {
        let sql, avatarArr=[];
        const commentArr = await new Promise((resolve, reject) => {
            sql = "SELECT * FROM dm_comment WHERE pid=?";
            pool.query(sql, [pid], (err, data) => {
                if(err) throw err;
                resolve(data);
            });
        })

        if( commentArr.length ){
            await new Promise((resolve, reject) => {
                commentArr.forEach((item, index) => {
                    sql = `SELECT uname, avatar FROM dm_user WHERE uname='${item.uname}'`;
                    pool.query(sql, null, (err, data) => {
                        if(err) throw err;
                        data && data.length && data[0] && avatarArr.push(data[0]);
                        avatarArr.length == commentArr.length && resolve();
                    });
                })
            })
        }

        commentArr.map(c => {
            avatarArr.forEach(a => {
                if( c.uname == a.uname ){
                    c['avatar'] = a.avatar;
                }
            })
        })

        res.send({
            code: 200,
            data: commentArr,
            
        });
        
    })()
});

// 查询商品
router.get('/select/products', (req, res) => {
	let { id } = req.query || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空'
        })
        return;
    }
    let sql = "SELECT id, mainPicture, description, price, spec FROM dm_products WHERE id=?";
    pool.query(sql, [id], (err, data) => {
        if(err) throw err;
        res.send({
            code: 200,
            data: data.length ? data[0] : {},
            
        });
    });
});

// 添加评价
router.post('/add', (req, res) => {
    const { uname, pid, content } = req.body || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
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
    if( !content ){
        res.status(400).send({
            code: 3,
            msg: 'content不能为空！'
        })
        return;
    }else if( content.length > 300 ){
        res.status(400).send({
            code: 4,
            msg: '评价内容不能超过300个字！'
        })
        return;
    }

    let commentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let sql = "INSERT INTO dm_comment VALUES (NULL, ?, ?, ?, ?, ?, ?)";
    pool.query(sql, [uname, pid, content, commentTime, 0, 0], (err, data) => {
        if(err) throw err;
        if( data.affectedRows ){
            res.send({
                code: 200,
                data: null,
                msg: '评价成功'
            })
        }else{
            res.send({
                code: 7,
                msg: '评价失败'
            })
        }
    });
});

// 删除用户评价
router.get('/delete/:id', (req, res) => {
    const { id } = req.params || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空！'
        })
        return;
    }
    let sql = "DELETE FROM dm_comment WHERE id=?";
    pool.query(sql, [id], (err, data) => {
        if( err ){
            res.status(503).send({
              code: 2,
              msg: err
            })
        }else{
            if( data.affectedRows ){
                res.send({
                    code: 200,
                    data: null,
                    msg: '删除用户评价成功'
                })
            }else{
                res.send({
                    code: 3,
                    msg: '删除用户评价失败'
                })
            }
        }
    });
});

// 修改评价
router.post('/update', (req, res) => {
    const { content, id } = req.body || {};
    if( !content ){
        res.status(400).send({
            code: 1,
            msg: 'contents不能为空！'
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

    let commentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let sql01 = "UPDATE dm_comment SET content=?, commentTime=? WHERE id = ?";
    pool.query(sql01, [content, commentTime, id], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 4,
                msg: err
            })
        }else{
            if( data.affectedRows ){
                res.send({
                  code: 200,
                  data: null,
                  msg: '修改评价成功！'
                })
            }else{
                res.send({
                  code: 5,
                  msg: '修改评价失败！'
                })
            }
        }
    });
});


// 查询所有用户评价
router.get('/select', (req, res) => {
	let { current, pageSize } = req.query || {};
    if( !current ){
        res.status(400).send({
            code: 1,
            msg: 'current不能为空,且大于0'
        })
        return;
    }
    if( !pageSize ){
        res.status(400).send({
            code: 2,
            msg: 'pageSize不能为空'
        })
        return;
    }

    let sql = "SELECT * FROM dm_comment";
    pool.query(sql, null, (err, data) => {
        if(err) throw err;
        let result = {
            // current - 当前页
            current: current - 1,
            // 一页多少条数据
            pageSize: parseInt(pageSize),
            // 数据总数
            total: data.length
        };           
        
        result.products = data.reverse().slice(result.current * result.pageSize, result.current * result.pageSize + result.pageSize);
        result.current = result.current + 1;
        res.send({
            code: 200,
            data: result,
            
        });
    });
});

module.exports = router;