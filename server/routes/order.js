const express = require("express");
const router = express.Router();
const pool = require("../pool");
const moment = require('moment');

// 删除订单
router.get('/delete', (req, res) => {
    const { id } = req.query || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空'
        });
        return;
    }
    let sql = "DELETE FROM dm_order WHERE id=?";
    pool.query(sql, [id], (err, data) => {
        if(err) throw err;
        if( data.affectedRows ){
            res.send({
                code: 200,
                data: null,
                msg: '删除订单成功'
            })
        }else{
            res.send({
                code: 3,
                msg: '删除订单失败'
            })
        }
    })
})

// 订单详情
router.get('/detail', (req, res) => {
    const { id } = req.query || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空'
        });
        return;
    }

    (async () => {
        let sql;
        let result = {};
        const params01 = await new Promise((resolve, reject) => {
            sql = "SELECT ordernum, aid, pid, submitTime, num, totalprice, nums FROM dm_order WHERE id=?";
            pool.query(sql, [id], (err, data) => {
                if(err) throw err;
                if( data.length ){
                    result['orderInfo'] = {
                        ordernum: data[0].ordernum,
                        submitTime: data[0].submitTime,
                        num: data[0].num,
                        totalprice: data[0].totalprice
                    };
                    resolve(data[0]);
                }else{
                    result['orderInfo'] = {};
                    resolve({});
                }
            })
        });
        
        await new Promise((resolve, reject) => {
            sql = "SELECT name, region, detail, phone FROM dm_address WHERE id=?";
            pool.query(sql, [params01.aid], (err, data) => {
                if(err) throw err;
                if( data.length ){
                    result['address'] = data[0];
                }else{
                    result['address'] = {};
                }
                resolve();
            })
        });
        
        await new Promise((resolve, reject) => {
            sql = `SELECT mainPicture, description, spec, price, id FROM dm_products WHERE id IN (${params01.pid})`;
            pool.query(sql, null, (err, data) => {
                if(err) throw err;
                params01.nums = params01.nums.split(',');
                if( data.length ){
                    data.map((item, index) => item['num'] = Number(params01.nums[index]));
                }
                result['productsInfo'] = data;
                resolve();
            })
        });

        res.send({
            code: 200,
            data: result,
            
        })

    })()
})

// 添加商品订单
router.post('/add', (req, res) => {
    let { uname, aid, pid, num, totalprice, nums } = req.body || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    if( !aid ){
        res.status(400).send({
            code: 2,
            msg: 'aid不能为空！'
        })
        return;
    }
    if( !pid.length ){
        res.status(400).send({
            code: 3,
            msg: 'pid不能为空，且为数组！'
        })
        return;
    }else{
        pid = pid.join(',');
    }
    if( !num ){
        res.status(400).send({
            code: 4,
            msg: 'num不能为空！'
        })
        return;
    }
    if( !totalprice ){
        res.status(400).send({
            code: 5,
            msg: 'totalprice不能为空！'
        })
        return;
    }
    if( !nums ){
        res.status(400).send({
            code: 6,
            msg: 'nums不能为空！'
        })
        return;
    }
    let ordernum = moment(Date.now()).format('YYYYMMDDHHmmss');
    let submitTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let sql = 'INSERT INTO dm_order VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    pool.query(sql, [uname, ordernum, 100, aid, pid, submitTime, num, totalprice, nums], (err, data) => {
        if(err) throw err;
        if( data.affectedRows ){
            // 提交订单成功后，删除购物车表被结算成功的数据
            sql = `DELETE FROM dm_cart WHERE pid IN (${pid})`;
            pool.query(sql, null, (err, result) => {
                if(err) throw err;
                res.send({
                    code: 200,
                    data: data.insertId,
                    msg: '提交订单成功'
                })
            })
        }else{
            res.send({
                code: 7,
                msg: '提交订单失败'
            })
        }
    })
})

// 查询结算页，收货地址，商品详情
router.post('/select/settlement', (req,res) => {
    let { uname, id, type } = req.body || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    if( !type ){
        res.status(400).send({
            code: 2,
            msg: 'type不能为空！'
        })
        return;
    }
    if( type == 'cart' ){
        if( !id.length ){
            res.status(400).send({
                code: 3,
                msg: 'id不能为空，且是个id数组！'
            })
            return;
        }
    }else if( type == 'detail ' ){
        if( !id ){
            res.status(400).send({
                code: 4,
                msg: 'id不能为空！'
            })
            return;
        }
    }

    (async () => {
        let result = {};
        await new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM dm_address WHERE uname=?';
            pool.query(sql, [uname], (err, data)=>{
                if(err) throw err;
                result['address'] = data;
                resolve();
            })
        })
        await new Promise((resolve, reject) => {
            let sql, params=null;
            if( type == 'detail' ){
                sql = 'SELECT id, mainPicture, description, spec, price FROM dm_products WHERE id=?';
                params = [id];
            }else if( type == 'cart' ){
                sql = 'SELECT c.*, p.mainPicture, p.description, p.spec, p.price FROM dm_cart c, dm_products p WHERE c.pid=p.id AND c.uname=? AND p.id IN (?) AND collection=0';
                params = [uname, id];
            }
            pool.query(sql, params, (err, data)=>{
                if(err) throw err;
                result['productsInfo'] = data;
                resolve();
            })
        })
        res.send({
            code: 200,
            data: result,
            
        })
    })()
})

// 查询全部订单 / 查询指定用户订单
router.get('/select', (req, res) => {
	let { current=1, pageSize, uname } = req.query || {};
    if( !current ){
        res.status(400).send({
            code: 1,
            msg: 'current不能为空,且大于0'
        })
        return;
    }

    (async () => {
        let sql, params=null;
        let result = {
            // current - 当前页
            current: current - 1
        };
        if( !uname ){
            await new Promise((resolve, reject) => {
                sql = "SELECT id, uname, ordernum, submitTime, num, totalprice FROM dm_order ORDER BY submitTime DESC";
                pool.query(sql, null, (err, data) => {
                    if(err) throw err;
                    // 一页多少条数据
                    result['pageSize'] = pageSize ? parseInt(pageSize) : (data.length ? data.length : current);
                    // 数据总数
                    result['total'] = data.length;
                    // 结果
                    result.products = data.slice(result.current * result.pageSize, result.current * result.pageSize + result.pageSize);
                    resolve();
                })
            })
        }else{
            const orders = await new Promise((resolve, reject) => {
                sql = "SELECT * FROM dm_order WHERE uname=? ORDER BY submitTime DESC";
                params = [uname];
                pool.query(sql, params, (err, data) => {
                    if(err) throw err;
                    resolve(data);
                })
            })

            const arr = await new Promise((resolve, reject) => {
                let result = [];
                if(orders.length) {
                  orders.map((item, index) => {
                      sql = `SELECT id, mainPicture, description, spec, price FROM dm_products WHERE id IN (${item.pid})`;
                      pool.query(sql, null, (err, data) => {
                          if(err) throw err;
                          let nums = item.nums ? item.nums.split(',') : [];
                          data.map((d, i) => {
                              d['ordernum'] = item.ordernum;
                              d['num'] = Number(nums[i]);
                              d['totalprice'] = d['num'] * d['price'];
                              d['orderId'] = item.id;
                          });
                          result.push(data);
                          result.length == orders.length && resolve(result);
                      })
                  })
                }else{
                  resolve(result);
                }
            })

            let obj = [];
            orders.forEach((o, n) => {
                arr.forEach((a, i) => {
                    if(o.ordernum == a[0].ordernum){
                        obj.push({
                            id: o.id,
                            ordernum: o.ordernum,
                            submitTime: o.submitTime,
                            nums: o.nums,
                            pid: o.pid,
                            content: arr[i]
                        })
                    }
                })
            })
            // 一页多少条数据
            result['pageSize'] = pageSize ? parseInt(pageSize) : (obj.length ? obj.length : current);
            // 数据总数
            result['total'] = obj.length;
            // 结果
            result.products = obj.slice(result.current * result.pageSize, result.current * result.pageSize + result.pageSize);
        }    

        result.current = result.current + 1;
        res.send({
            code: 200,
            data: result,
            
        });
    })()
})

module.exports=router;