const express = require('express');
const router = express.Router();
const pool = require('../pool');
const moment = require('moment');
const fs = require('fs');

// multer上传图片相关设置
const multer  = require('multer');
const dest = 'public/img';
let upload = multer() // 文件储存路径

// 查询指定用户
router.get('/select/uname', (req, res) => {
    const { uname } = req.query || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空'
        })
        return;
    }
    let sql = "SELECT uname, phone, avatar, gender, birthday, nickName FROM dm_user WHERE uname=?";
    pool.query(sql, [uname], (err, data) => {
        if(err) throw err;
        if(data.length && data[0]){
            data[0]['nickName'] =  !data[0]['nickName'] && data[0]['uname'] ? data[0]['uname'] : data[0]['nickName'];
        }
        res.send({
            code: 200,
            data: data ? data[0] : {},
            msg: 'ok'
        });
    });
});

// 修改用户
router.post('/update', upload.any(), (req, res) => {
    let { delList=[], userInfo, uname } = req.body || {};
    userInfo = JSON.parse( userInfo );
    const files = req.files || [];
    delList = JSON.parse( delList );
    const rbody = req.body || {};

    (async () => {
        let avatarList = [];
        // 存储商品图片的文件夹路径
        let dirPath;
        let dirPath02;
        const timer = Date.now();
        for(let r in rbody){
            r.startsWith('avatar') && avatarList.push(rbody[r]);
        }
        if( !avatarList.length ){
            await new Promise((resolve, reject) => {
                if( files.length ){
                    files.forEach((item, index) => {
                        let { buffer } = item;
                        const encryptionName = require('crypto').createHash('md5').update(`avatar-${timer+index}`).digest('hex');
                        if( buffer ){
                            dirPath = `${dest}/avatar`
                            dirPath02 = `img/avatar`;
                            fs.writeFile(`${ dirPath }/${ encryptionName }.jpg`, buffer, err => {
                                if( err ){
                                    throw err;
                                }else{
                                    resolve();
                                }
                            })
                            avatarList.push(`${dirPath02}/${ encryptionName }.jpg`);
                        }
                    })
                }else{
                    resolve();
                }
            })
        }
    
        const { phone, gender, birthday, nickName } = userInfo;
        let sql = 'UPDATE dm_user SET phone=?, avatar=?, gender=?, birthday=?, nickName=? WHERE uname=?';
        await new Promise((resolve, reject) => {
            pool.query(sql, [phone, avatarList.toString(), gender, birthday, nickName, uname], (err, data) => {
                if(err) throw err;
                if( data.affectedRows ){
                    delList.forEach(item => {
                        fs.exists(`public/${item}`, exists => {
                            if( exists ){
                                fs.unlink(`public/${item}`, (err) => {
                                    if( err ) throw err;
                                });
                            }
                        });
                    })
                    res.send({
                        code: 200,
                        data: null,
                        msg: '修改用户成功'
                    })
                }else{
                    res.send({
                        code: 2,
                        msg: '修改用户失败'
                    })
                }
            })
        })
    })()
})

// 添加用户
router.post('/add', upload.any(), (req, res) => {
    let { userInfo } = req.body || {};
    // 随机key值
    const pwdKey = Math.random().toString().slice(2);
    userInfo = JSON.parse( userInfo );
    const files = req.files;
    
    if( !Object.keys(userInfo).length ){
        res.status(400).send({
            code: 1,
            msg: 'usersInfo不能为空'
        })
        return;
    }
    // if( !(files && files.length) ){
    //     res.status(400).send({
    //       code: 2,
    //       msg: 'files不能为空！'
    //     })
    //     return;
    // }

    const timer = Date.now();
    const encryptionName = require('crypto').createHash('md5').update(`productImg-${timer}`).digest('hex');
    files.forEach(item => {
        let { buffer, fieldname } = item;
        const imgPath = `${dest + '/' + fieldname + '/' + encryptionName}.jpg`;
        fs.writeFile(imgPath, buffer, err => {
            if( err ){
                res.status(400).send({
                    code: 6,
                    msg: err
                })
                return;
            }
        })
        userInfo = {...userInfo, [fieldname]: imgPath.slice(imgPath.indexOf('/')+1) };
    })

    let { 
        uname, upwd, email, phone, avatar, gender, birthday, nickName
    } = userInfo;
    if( upwd ){
        upwd = require('crypto').createHash('md5').update( upwd + pwdKey ).digest('hex');
    }

    // 用户名是否已被注册？
    let sql01 = "SELECT uname FROM dm_user WHERE uname = ?";
    pool.query(sql01, [uname], (err, result01) => {
        if( err ){
            res.status(503).send({
                code: 3,
                msg: err
            })
        }else{
            if( result01.length ){
                res.send({
                    code: 201,
                    msg: '此用户名已被注册！'
                });
            }else{
                let sql02 = "INSERT INTO dm_user VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                pool.query(sql02, [
                    uname, upwd, email, phone, avatar, pwdKey, gender, birthday, nickName, 0
                ], (err, data) => {
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
                                msg: '添加用户成功'
                            })
                        }else{
                            res.send({
                                code: 5,
                                msg: '添加用户失败'
                            })
                        }
                    }
                })
            }
        }
    });
})

// 重置用户密码
router.post('/resetUpwd', (req, res) => {
    let { id, upwd, ukey } = req.body || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'uid不能为空'
        });
        return;
    }
    if( !upwd ){
        res.status(400).send({
            code: 2,
            msg: 'upwd不能为空'
        });
        return;
    }
    if( !ukey ){
        res.status(400).send({
            code: 3,
            msg: 'ukey不能为空'
        });
        return;
    }
    // 加密密码
    upwd = require('crypto').createHash('md5').update( upwd + ukey ).digest('hex');
    let sql = "UPDATE dm_user SET upwd=? WHERE id=?";    
    pool.query(sql, [upwd, id], (err, data) => {
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
                    msg: '重置用户密码成功'
                })
            }else{
                res.send({
                    code: 5,
                    msg: '重置用户密码失败'
                })
            }
        }
    })
});

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
                msg: 'ok'
            });
        }
    });
});

// 删除用户
router.get('/delete', (req, res) => {
    let { id, avatar } = req.query || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'uid不能为空'
        });
        return;
    }
    let sql = "DELETE FROM dm_user WHERE id=?";
    pool.query(sql, [id], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 2,
                msg: err
            })
        }else{
            avatar && fs.exists(`public/${avatar}`, exists => {
                if( exists ){
                    fs.unlink(`public/${avatar}`, (err) => {
                        if( err ) throw err;
                    });
                }
            });
            if( data.affectedRows ){
                res.send({
                    code: 200,
                    data: null,
                    msg: '删除用户成功'
                })
            }else{
                res.send({
                    code: 3,
                    msg: '删除用户失败'
                })
            }
        }
    })
});

// 注册
router.post('/reg', (req, res) => {
    // 随机key值
    const pwdKey = Math.random().toString().slice(2);
    let { uname, upwd, email, phone } = req.body || {};
    if( !uname ){
        res.status(400).send({
          code: 1,
          msg: '用户名不能为空！'
        })
        return;
    }
    if( !upwd ){
        res.status(400).send({
          code: 2,
          msg: '密码不能为空！'
        })
        return;
    }else{
        upwd = require('crypto').createHash('md5').update( upwd + pwdKey ).digest('hex');
    }
    if( !email ){
        res.status(400).send({
          code: 3,
          msg: '邮箱不能为空！'
        })
        return;
    }
    if( !phone ){
        res.status(400).send({
          code: 4,
          msg: '手机号码不能为空！'
        })
        return;
    }
    // 用户名是否已被注册？
    let sql01 = "SELECT uname FROM dm_user WHERE uname = ?";
    pool.query(sql01, [uname], (err, result01) => {
        if( err ){
            res.status(503).send({
                code: 5,
                msg: err
            })
        }else{
            if( result01.length ){
                res.send({
                    code: 201,
                    msg: '此用户名已被注册！'
                });
            }else{
                let sql02 = "INSERT INTO dm_user VALUES(NULL, ?, ?, ?, ?, NULL, ?, ?, ?, ?, ?)";
                let time = moment( Date.now() ).format('YYYY-MM-DD HH:mm:ss');
                pool.query(sql02, [uname, upwd, email, phone, pwdKey, 2, time, uname, 0], (err, result02) => {
                    if( err ){
                      res.status(503).send({
                        code: 6,
                        msg: err
                      })
                    }else{
                        if( result02.affectedRows ){
                            res.send({
                                code: 200,
                                data: uname,
                                msg: '恭喜你，注册成功！'
                            });
                        }else{
                            res.status(404).send({
                                code: 7,
                                msg: '很遗憾，注册失败！'
                            })
                        }
                    }
                });
            }
        }
    });
});

// 登录
router.post('/log', (req, res) => {
    let { uname, upwd, isUser, isRemember } = req.body || {};
    // isUser 用户中心 - 登录密码
    if( !uname ){
        res.status(400).send({
          code: 1,
          msg: '用户名不能为空！'
        })
        return;
    }
    if( !upwd ){
        res.status(400).send({
          code: 2,
          msg: '密码不能为空！'
        })
        return;
    }

    let sql01 = "SELECT ukey FROM dm_user WHERE uname = ?";
    pool.query(sql01, [ uname ], (err, data01) => {
        if( err ){
            res.status(503).send({
                code: 3,
                msg: err
            })
        }else{
          if( !data01.length ){
            res.status(404).send({
                code: 4,
                msg: '用户名不存在！'
            })
          }else{
            upwd = require('crypto').createHash('md5').update( upwd + data01[0].ukey ).digest('hex');
            let sql02 = "SELECT uname, upwd FROM dm_user WHERE uname = ? AND upwd = ?";
            pool.query(sql02, [uname, upwd], (err, data02) => {
                if( err ){
                  res.status(503).send({
                    code: 5,
                    msg: err
                  })
                }else{
                    if( data02.length ){
                        if( !isUser ){
                            let time = 1000 * 60 * 60;
                            // 0表示不记住密码， 1表示记住密码
                            if( isRemember ){
                                data02[0].upwd && res.cookie('token', data02[0].upwd);
                            }else{
                                data02[0].upwd && res.cookie('token', data02[0].upwd, { maxAge: time, httpOnly: true });
                            }
                            res.send({
                                code: 200,
                                data: {
                                    uname: data02[0].uname,
                                    token: data02[0].upwd
                                },
                                msg: '恭喜你，登录成功！'
                            });
                        }else{
                            res.send({
                                code: 200,
                                data: null,
                                msg: 'ok'
                            });
                        }
                    }else{
                        res.status(404).send({
                            code: 6,
                            msg: '密码错误！'
                        })
                    }
                }
            });
          }
        }
    });
});

// token认证
router.post('/oauth', (req, res) => {
    let { token } = req.cookies || {};
    if( !token ){
        res.send({
            code: 401,
            msg: '认证token不存在，重新登录！'
        })
        return;
    }

    let sql = "SELECT uname, upwd, admin FROM dm_user WHERE upwd = ?";
    pool.query(sql, [ token ], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 2,
                msg: err
            })
        }else{
            if( data.length ){
                res.send({
                    code: 200,
                    data: {
                        uname: data[0].uname,
                        token: data[0].upwd,
                        admin: data[0].admin
                    },
                    msg: '认证通过'
                })
            }else{
                res.send({
                    code: 401,
                    msg: '认证token不存在，重新登录！'
                })
            }
        }
    });
});

// 退出登录
router.post('/logout', async (req, res) => {
    res.clearCookie('token');
    res.send({
        code: 200,
        data: '',
        msg: '退出登录成功'
    })
});

// 忘记密码 - 信息验证
router.post('/vali/forgetPwd', (req, res) => {
    const { email, uname, phone } = req.body || {};
    if( !email ){
        res.status(400).send({
            code: 1,
            msg: 'email不能为空！'
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
    if( !phone ){
        res.status(400).send({
            code: 3,
            msg: 'phone不能为空！'
        })
        return;
    }    
    let sql = "SELECT email, phone, uname FROM dm_user WHERE uname=?";
    pool.query(sql, [uname], (err, data) => {
        if( err ){
            res.status(503).send({
                code: 4,
                msg: err
            })
        }else{
            if( data.length ){
                if( data[0].email != email ){
                    res.status(404).send({
                        code: 6,
                        msg: '邮箱不存在'
                    })
                }else if( data[0].phone != phone ){
                    res.status(404).send({
                        code: 7,
                        msg: '手机号码不存在'
                    })
                }else{
                    res.send({
                        code: 200,
                        data: data[0].uname,
                        msg: '验证通过'
                    });
                }
            }else{
                res.status(404).send({
                    code: 5,
                    msg: '用户名不存在'
                })
            }
        }
    }); 
})

// 修改登录密码
router.post('/update/upwd', (req, res) => {
    let { uname, oldUpwd, newUpwd } = req.body || {};
    if( !uname ){
        res.status(400).send({
            code: 1,
            msg: 'uname不能为空！'
        })
        return;
    }
    if( !oldUpwd ){
        res.status(400).send({
            code: 2,
            msg: 'oldUpwd不能为空！'
        })
        return;
    }
    if( !newUpwd ){
        res.status(400).send({
            code: 3,
            msg: 'newUpwd不能为空！'
        })
        return;
    }

    (async () => {
        const ukey = await new Promise((resolve, reject) => {
            let sql = "SELECT ukey FROM dm_user WHERE uname=?";
            pool.query(sql, [uname], (err, data) => {
                if(err) throw err;
                if( !data.length ){
                    res.status(404).send({
                        code: 4,
                        msg: '用户名不存在！'
                    })
                }else{
                    data[0] && data[0].ukey && resolve(data[0].ukey);
                }
            });
        })
        
        await new Promise((resolve, reject) => {
            oldUpwd = require('crypto').createHash('md5').update(oldUpwd + ukey).digest('hex');
            let sql = "SELECT uname FROM dm_user WHERE uname=? AND upwd=?";
            pool.query(sql, [uname, oldUpwd], (err, data) => {
                if(err) throw err;
                if( !data.length ){
                    res.status(404).send({
                        code: 5,
                        msg: '旧密码错误！'
                    })
                }else{
                    newUpwd = require('crypto').createHash('md5').update(newUpwd + ukey).digest('hex');
                    sql = "UPDATE dm_user SET upwd=? WHERE uname=?";
                    pool.query(sql, [newUpwd, uname], (err, data) => {
                        if(err) throw err;
                        if( data.affectedRows ){
                            // 清除token
                            res.clearCookie('token');
                            res.send({
                                code: 200,
                                data: null,
                                msg: '登录密码修改成功'
                            })
                        }else{
                                res.send({
                                code: 6,
                                msg: '登录密码修改失败'
                            })
                        }
                    });
                }
            })
        })

    })()
})

module.exports = router;