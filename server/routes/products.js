const express = require('express');
const router = express.Router();
const fs = require('fs');
const pool = require('../pool');
const moment = require('moment');

// multer上传图片相关设置
const multer  = require('multer');
const dest = 'public/img/products';
let upload = multer() // 文件储存路径

// 商品筛选条件
router.get('/select/filter', (req, res) => {
    // 品牌、价格、屏幕尺寸、处理器、内存容量、硬盘容量、厚度、系统
    let sql = 'SELECT brandId, screenSize, cpu, memory, disk, thickness, systems FROM dm_products';
    pool.query(sql, null, (err, data) => {
        if(err) throw err;
        let obj = {
            brandId: [],
            screenSize: [],
            cpu: [],
            memory: [],
            disk: [],
            thickness: [],
            systems: []
        };
        data.forEach(item => {
            for(let d in item){
                obj[d].push(item[d]);
            }
        })
        for(let o in obj){
            obj[o] = [...new Set(obj[o])];
        }
        res.send({
            code: 200,
            data: [obj],
            msg: 'ok'
        });
    })
});

// 查询所有商品 / 符合当前筛选条件的商品
router.post('/select', (req, res) => {
    let { current=1, pageSize, onLine, filterList } = req.body || {};
    if( !current ){
        res.status(400).send({
            code: 1,
            msg: 'current不能为空，且大于0'
        })
        return;
    }

    let sql;
    if( filterList && Object.keys(filterList).length ){
        sql = `SELECT * FROM dm_products WHERE onLine=100 AND`;
        for(let p in filterList){
            if( p == 'price' ){
                if( filterList[p].includes('-') ){
                    let [a, b] = filterList[p].split('-');
                    sql += ` ${p}>=${a} AND ${p}<=${b} AND`
                }else{
                    sql += ` ${p}>=${parseInt(filterList[p])} AND`
                }
            }else{
                sql += ` ${p}='${filterList[p]}' AND`
            }
        }
        sql = sql.slice(0, sql.lastIndexOf(' AND'));
    }else{        
        if( onLine ){
            sql = `SELECT * FROM dm_products WHERE onLine=${onLine}`;
        }else{
            sql = `SELECT * FROM dm_products`;
        }
    }
    pool.query(sql, null, (err, data) => {
        if( err ){
            res.status(503).send({
                code: 2,
                msg: err
            })
        }else{
            let result = {
                // current - 当前页
                current: current - 1,
                // 一页多少条数据
                pageSize: pageSize ? parseInt(pageSize) : data.length,
                // 数据总数
                total: data.length
            };           
            
            result.products = data.slice(result.current * result.pageSize, result.current * result.pageSize + result.pageSize);
            result.current = result.current + 1;
            res.send({
                code: 200,
                data: result,
                msg: 'ok'
            });
        }
    })
});

// 删除商品
router.get('/delete', (req, res) => {
    let { id, mainPicture, pictures, detailsPic, bannerPic } = req.query || {};
    let pics = [];
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空'
        })
        return;
    }
    if( !mainPicture ){
        res.status(400).send({
            code: 2,
            msg: 'mainPicture不能为空'
        })
        return;
    }
    if( !detailsPic ){
        res.status(400).send({
            code: 3,
            msg: 'detailsPic不能为空'
        })
        return;
    }
    if( !bannerPic ){
        res.status(400).send({
            code: 4,
            msg: 'bannerPic不能为空'
        })
        return;
    }
    pics.push( mainPicture );
    pictures = pictures ? pictures.split('|') : [];
    detailsPic = detailsPic ? detailsPic.split('|') : [];
    pics = [...pics, ...pictures, ...detailsPic, bannerPic];
    let sql = "DELETE FROM dm_products WHERE id=?";
    pool.query(sql, [id], (err, data) => {
        if( err ) throw err;
        if( data.affectedRows ){
            pics.forEach(item => {
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
                msg: '删除商品成功'
            })
        }else{
            res.send({
                code: 5,
                msg: '删除商品失败'
            })
        }
    })
})

// 修改商品
router.post('/update', upload.any(), (req, res) => {
    let { id, inputData, delList=[], delDetailsList=[], delBannerList=[] } = req.body || {};
    inputData = JSON.parse(inputData);
    delList = JSON.parse(delList);
    delDetailsList = JSON.parse(delDetailsList);
    delBannerList = JSON.parse(delBannerList);
    let delArr = [...delList, ...delDetailsList, ...delBannerList];
    const files = req.files || [];
    const rbody = req.body || {};

    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空'
        })
        return;
    }

    (async () => {
        let picList = [], picDetailsList = [], bannerList = [];
        // 存储商品图片的文件夹路径
        let dirPath;
        let dirPath02;
        const timer = Date.now();
        for(let r in rbody){
            r.startsWith('pImg') && picList.push(rbody[r]);
            r.startsWith('pDetailsImg') && picDetailsList.push(rbody[r]);
            r.startsWith('bannerImg') && bannerList.push(rbody[r]);
        }
        await new Promise((resolve, reject) => {
            if( files.length ){
                files.forEach((item, index) => {
                    let { buffer, fieldname } = item;
                    const encryptionName = require('crypto').createHash('md5').update(`productImg-${timer+index}`).digest('hex');
                    if( buffer ){
                        if( fieldname.startsWith('pDetailsImg') ){
                            dirPath = `${dest}/details`
                            dirPath02 = `img/products/details`;
                        }else if( fieldname.startsWith('pImg') ){
                            dirPath = `${dest}/imgs`
                            dirPath02 = `img/products/imgs`;
                        }else if( fieldname.startsWith('bannerImg') ){
                            dirPath = `${dest}/banners`
                            dirPath02 = `img/products/banners`;
                        }
                        fs.writeFile(`${ dirPath }/${ encryptionName }.jpg`, buffer, err => {
                            if( err ){
                                throw err;
                            }else{
                                resolve();
                            }
                        })
                        if( fieldname.startsWith('pDetailsImg') ){
                            picDetailsList.push(`${dirPath02}/${ encryptionName }.jpg`);
                        }else if( fieldname.startsWith('pImg') ){
                            picList.push(`${dirPath02}/${ encryptionName }.jpg`);
                        }else if( fieldname.startsWith('bannerImg') ){
                            bannerList.push(`${dirPath02}/${ encryptionName }.jpg`);
                        }
                    }
                })
            }else{
                resolve();
            }
        })

        let [ mainPicture, ...pictures ] = picList;
        pictures = pictures.join('|');
        let detailsPic = picDetailsList.join('|');
        let [ bannerPic ] = bannerList;

        let { 
            brandId, productName, description, copywriting, price, spec, weight, placeOfOrigin, systems, cpu, thickness, disk, standbyTime, series, bareWeight, screenSize, gpu, characteristic, memory, gpuCapacity, bodyMaterial, hot, single, banner
        } = inputData;
    
        let params = [
            brandId, productName, description, copywriting, price, spec, weight, placeOfOrigin, systems, cpu, thickness, disk, standbyTime, series, bareWeight, screenSize, gpu, characteristic, memory, gpuCapacity, bodyMaterial, mainPicture, pictures, detailsPic, hot, single, banner, bannerPic, id
        ];
        let keys = [
            'brandId', 'productName', 'description', 'copywriting', 'price', 'spec', 'weight', 'placeOfOrigin', 'systems', 'cpu', 'thickness', 'disk', 'standbyTime', 'series', 'bareWeight', 'screenSize', 'gpu', 'characteristic', 'memory', 'gpuCapacity', 'bodyMaterial', 'mainPicture', 'pictures', 'detailsPic', 'hot', 'single', 'banner', 'bannerPic'
        ];
    
        let sql = 'UPDATE dm_products SET ';
        for(let p=0; p<keys.length; p++){
            if( p == keys.length -1 ){
                sql += `${keys[p]}=?`;
            }else{
                sql += `${keys[p]}=?, `; 
            }
        }
        sql += ' WHERE id=?';
        await new Promise((resolve, reject) => {
            pool.query(sql, params, (err, data) => {
                if( err ){
                    throw err;
                }else{
                    if( data.affectedRows ){
                        delArr.forEach(item => {
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
                            msg: '修改商品成功'
                        })
                    }else{
                        res.send({
                            code: 2,
                            msg: '修改商品失败'
                        })
                    }
                }
            })
        })
    })()
})

// 添加商品
router.post('/add', upload.any(), (req, res) => {
    let { inputData } = req.body || {};
    inputData = JSON.parse(inputData);
    const files = req.files || [];
    let paths = [`${dest}/details`, `${dest}/imgs`, `${dest}/banners`];

    if( !Object.keys(inputData).length ){
        res.status(400).send({
            code: 1,
            msg: 'inputData不能为空'
        })
        return;
    }

    for(let p of paths){
        fs.exists(p, exists => {
            if( !exists ){
                fs.mkdir(p, err => {
                    if( err ) throw err;
                })
            }
        })
    }
    
    (async () => {
        let mainPicture, pictures='', detailsPic='', bannerPic='';
        // 存储商品图片的文件夹路径
        let dirPath;
        let dirPath02;
        const timer = Date.now();
        await new Promise((resolve, reject) => {
            files.forEach((item, index) => {
                let { buffer, fieldname } = item;
                const encryptionName = require('crypto').createHash('md5').update(`productImg-${timer+index}`).digest('hex');
                if( fieldname.startsWith('pDetailsImg') ){
                    dirPath = `${dest}/details`
                    dirPath02 = `img/products/details`;
                    detailsPic = `${ dirPath02 }/${ encryptionName }.jpg`;
                }else if( fieldname.startsWith('pImg') ){
                    dirPath = `${dest}/imgs`
                    dirPath02 = `img/products/imgs`;
                    if( index == 0 ){
                        mainPicture = `${ dirPath02 }/${ encryptionName }.jpg`;
                    }else{
                        pictures += `${ dirPath02 }/${ encryptionName }.jpg`;
                        if( index == files.length -1 ){
                            pictures +=  '';
                        }else{
                            pictures +=  '|';
                        }
                    }
                }else if( fieldname.startsWith('bannerImg') ){
                    dirPath = `${dest}/banners`
                    dirPath02 = `img/products/banners`;
                    bannerPic = `${ dirPath02 }/${ encryptionName }.jpg`;
                }
                if( buffer ){
                    fs.writeFile(`${ dirPath }/${ encryptionName }.jpg`, buffer, err => {
                        if( err ){
                            throw err;
                        }else{
                            resolve();
                        }
                    })
                }
            })
        })

        let { 
            brandId, productName, description, copywriting, price, spec, weight, placeOfOrigin, systems, cpu, thickness, disk, standbyTime, series, bareWeight, screenSize, gpu, characteristic, memory, gpuCapacity, bodyMaterial, onLine=10, hot, single, banner
        } = inputData;

        let params = [
            brandId, productName, description, copywriting, price, spec, weight, placeOfOrigin, systems, cpu, thickness, disk, standbyTime, series, bareWeight, screenSize, gpu, characteristic, memory, gpuCapacity, bodyMaterial, mainPicture, pictures, detailsPic, onLine, hot, single, banner, bannerPic
        ];

        let sql = 'INSERT INTO dm_products VALUES (NULL, ';
        for(let p=0; p<params.length; p++){
            if( p == params.length -1 ){
                sql += `?)`;
            }else{
                sql += `?, `; 
            }
        }

        await new Promise((resolve, reject) => {
            pool.query(sql, params, (err, data) => {
                if( err ){
                    throw err;
                }else{
                    if( data.affectedRows ){
                        res.send({
                            code: 200,
                            data: null,
                            msg: '添加商品成功'
                        })
                    }else{
                        res.send({
                            code: 3,
                            msg: '添加商品失败'
                        })
                    }
                }
            })
        })
    })()
})

// 下载商品图片
router.get('/download', (req, res) => {
    let { url } = req.query || {};
    if( !url ){
        res.status(400).send({
          code: 1,
          msg: 'url不能为空！'
        })
        return;
    }
    const imgPath = `public/${url}`;
    fs.exists(imgPath, exists => {
        if( exists ){ 
            exists && res.download( imgPath );          
        }else{
            res.send({
              code: 2,
              msg: '服务器没有存储当前图片，下载失败！'
            })
        }
    });
})

// 上架 / 下架
router.get('/push', (req, res) => {
    const { id, code } = req.query || {};
    if( !id ){
        res.status(400).send({
            code: 1,
            msg: 'id不能为空！'
        })
        return;
    }
    if( !code ){
        res.status(400).send({
            code: 2,
            msg: 'code不能为空！'
        })
        return;
    }
    let msg01, msg02, params=null;
    if( code == 100 ){
        msg01 = '下架成功！';
        msg02 = '下架失败！';
        params = [10, null, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), id];
    }else if( code == 10 ){
        msg01 = '上架成功！';
        msg02 = '上架失败！';
        params = [100, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), null, id];
    }
    let sql = 'UPDATE dm_products SET onLine=?, startTime=?, endTime=? WHERE id=?';
    pool.query(sql, params, (err, data) => {
        if( err ){
            throw err;
        }else{
            if( data.affectedRows ){
                res.send({
                    code: 200,
                    data: null,
                    msg: msg01
                })
            }else{
                res.send({
                    code: 3,
                    msg: msg02
                })
            }
        }
    })
})

module.exports = router;