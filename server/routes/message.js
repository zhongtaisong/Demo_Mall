const express = require('express');
const router = express.Router();
const pool = require('../pool');
const moment = require('moment');

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

    let sql = 'UPDATE dm_message SET agree=?, disagree=? WHERE id=?';
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

// 发表留言
router.post('/add', (req, res) => {
    const { uname, content } = req.body || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
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
            msg: '留言内容不能超过300个字！'
        })
        return;
    }

    let timer = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let sql = "INSERT INTO dm_message VALUES (NULL, ?, ?, ?, ?, ?)";
    pool.query(sql, [uname, content, timer, 0, 0], (err, data) => {
        if(err) throw err;
        if( data.affectedRows ){
            res.send({
                code: 200,
                data: null,
                msg: '留言成功'
            })
        }else{
            res.send({
                code: 7,
                msg: '留言失败'
            })
        }
    });
});

// 删除用户留言
router.get('/delete/:id', (req, res) => {
    const { id } = req.params || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空！'
        })
        return;
    }
    let sql = "DELETE FROM dm_message WHERE id=?";
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
                    msg: '删除用户留言成功'
                })
            }else{
                res.send({
                    code: 3,
                    msg: '删除用户留言失败'
                })
            }
        }
    });
});

// 查询所有用户留言
router.get('/select', (req, res) => {

    (async () => {
        let sql, avatarArr=[];
        const arr = await new Promise((resolve, reject) => {
            sql = "SELECT * FROM dm_message ORDER BY submitTime DESC";
            pool.query(sql, null, (err, data) => {
                if(err) throw err;
                resolve(data);
            });
        })

        if( arr.length ){
            await new Promise((resolve, reject) => {
                arr.forEach((item, index) => {
                    sql = `SELECT uname, avatar FROM dm_user WHERE uname='${item.uname}'`;
                    pool.query(sql, null, (err, data) => {
                        if(err) throw err;
                        data && data.length && data[0] && avatarArr.push(data[0]);
                        avatarArr.length == arr.length && resolve();
                    });
                })
            })
        }

        arr.map(c => {
            avatarArr.forEach(a => {
                if( c.uname == a.uname ){
                    c['avatar'] = a.avatar;
                }
            })
        })

        res.send({
            code: 200,
            data: arr,
            msg: 'ok'
        });
        
    })()
});

module.exports = router;