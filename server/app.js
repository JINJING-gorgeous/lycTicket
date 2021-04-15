// 加载Express模块
const express = require('express');


// 加载MySQL模块
const mysql = require('mysql');

// 加载bodyParser模块
const bodyParser = require('body-parser');

// 加载MD5模块
const md5 = require('md5');

// 创建MySQL连接池
const pool = mysql.createPool({
  // host: '127.0.0.1',   //MySQL服务器地址
  // port: 3306,          //MySQL服务器端口号
  // user: 'root',        //数据库用户的用户名
  // password: '',        //数据库用户密码
  // database: 'lyc',    //数据库名称
  // connectionLimit: 20, //最大连接数
  // charset: 'utf8'      //数据库服务器的编码方式

  //新浪云上的配置参数
  host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME,
  connectionLimit: 5
});

// 创建服务器对象
const server = express();

server.use(bodyParser.urlencoded({
  extended: false
}));


// 加载CORS模块
const cors = require('cors');
// 使用CORS中间件
server.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://127.0.0.1:8081', 'http://localhost:8081']
}));


//根据tkid获取对应票务
server.post('/ticketsByTkid', (req, res) => {
  let tkid = req.body.tkid;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT * from lyc_tickets where tkid=?';
  // 执行SQL语句
  pool.query(sql,[tkid],(error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results });
    }
    else
      res.send({ message: 'error', code: 201 });
  });
});

//根据类型获取订票
server.post('/allTicketsByTypeId', (req, res) => {
  console.log(req.body.typeId)
  let typeId = req.body.typeId;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT * from lyc_tickets where typeId=?';
  // 执行SQL语句
  pool.query(sql,[typeId],(error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results });
    }
    else
      res.send({ message: 'error', code: 201 });
  });
});


//获取所有订票
server.get('/allTickets', (req, res) => {
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT * from lyc_tickets';
  // 执行SQL语句
  pool.query(sql,(error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results });
    }
    else
      res.send({ message: 'error', code: 201 });
  });
});





//点赞
server.post('/addThumbUp', (req, res) => {
  let atid = req.body.atid;
  let orid = req.body.orid;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT thumbs_up from lyc_articles where atid=?';
  // 执行SQL语句
  pool.query(sql, [atid], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      console.log(results)
      console.log(results[0].thumbs_up)
      let ThumbUp = results[0].thumbs_up;
      ThumbUp++;
      console.log(ThumbUp)
      sql = 'update lyc_articles set thumbs_up=? where atid=?';
      pool.query(sql, [ThumbUp, atid], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {

          //在点赞表新增数据[文章atid，用户orid]
          sql = 'insert into lyc_thumbs values(null,?,?)';
          pool.query(sql, [atid, orid], (error, results) => {
            if (error) throw error;
            if (results.affectedRows > 0) {
              res.send({ message: 'ok', code: 200, });
            }
            else
              res.send({ message: 'error', code: 201 });
          });

        }
        else
          res.send({ message: 'error', code: 201 });
      });





    }
    else {
      res.send({ message: 'error', code: 201 });
    }

  });
});
//踩
server.post('/addThumbDown', (req, res) => {
  let atid = req.body.atid;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT thumbs_down from lyc_articles where atid=?';
  // 执行SQL语句
  pool.query(sql, [atid], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      console.log(results)
      console.log(results[0].thumbs_down)
      let ThumbDown = results[0].thumbs_down;
      ThumbDown++;
      console.log(ThumbDown)
      sql = 'update lyc_articles set thumbs_down=? where atid=?';
      pool.query(sql, [ThumbDown, atid], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          res.send({ message: 'ok', code: 200, });
        }
        else
          res.send({ message: 'error', code: 201 });
      });
    }
    else {
      res.send({ message: 'error', code: 201 });
    }

  });
});
//收藏
server.post('/addCollection', (req, res) => {
  let atid = req.body.atid;
  let orid = req.body.orid;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT ar_collection from lyc_articles where atid=?';
  // 执行SQL语句
  pool.query(sql, [atid], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      console.log(results)
      console.log(results[0].ar_collection)
      let ar_collection = results[0].ar_collection;
      ar_collection++;
      console.log(ar_collection)
      sql = 'update lyc_articles set ar_collection=? where atid=?';
      pool.query(sql, [ar_collection, atid], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {

          //在点赞表新增数据[文章atid，用户orid]
          sql = 'insert into lyc_collection values(null,?,?)'
          pool.query(sql, [atid, orid], (error, results) => {
            if (error) throw error;
            if (results.affectedRows > 0) {
              res.send({ message: 'ok', code: 200, });
            }
            else
              res.send({ message: 'error', code: 201 });
          });

        }
        else
          res.send({ message: 'error', code: 201 });
      });





    }
    else {
      res.send({ message: 'error', code: 201 });
    }

  });
});


//获取用户收藏的所有文章
server.post('/collectionArticles', (req, res) => {
  let orid = req.body.orid;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT * from lyc_collection,lyc_user,lyc_articles where lyc_collection.user_id= lyc_user.orid and  lyc_collection.art_id=lyc_articles.atid and user_id=?';
  // 执行SQL语句
  pool.query(sql, [orid], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results });
    }
    else
      res.send({ message: 'error', code: 201 });
  });
});

//充值VIP
server.post('/chongzhiVIP', (req, res) => {
  let orid = req.body.orid;
  let start_time = req.body.start_time;
  console.log(start_time)
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'select vip_id from lyc_user where orid=?';
  // 执行SQL语句
  pool.query(sql, [orid], (error, results) => {
    if (error) throw error;
    //用户是vip
    if (results[0].vip_id == 1) {
      //拿到该VIP用户的start_time,加上一个月时间，更新到end_time上
      sql = 'select end_time from lyc_user where orid=?';
      pool.query(sql, [orid], (error, results) => {
        if (error) throw error;
        console.log(results[0])
        //加上一个月时间
        let new_Etime = parseInt(results[0].end_time) + 2678400;
        sql = 'update lyc_user set end_time=? where orid=?';

        pool.query(sql, [new_Etime, orid], (error, results) => {
          if (error) throw error;
          if (results.affectedRows > 0) {
            res.send({ message: 'ok', code: 200 });
          }
          else
            res.send({ message: 'error', code: 201 });
        });
      });

    }
    //用户不是vip
    else if (results[0].vip_id == 0) {
      console.log("enter notVip")
      //将当前时间存入start_time,增加一个月后的时间存入end_time,vip_id改为1
      console.log(start_time)

      let new_Etime = parseInt(start_time) + 2764800;
      //vip_id修改为1，start_time为当前时间，end_time添加一年
      sql = 'update lyc_user set vip_id="1" , start_time=? , end_time=? where orid=?';
      pool.query(sql, [start_time, new_Etime, orid], (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
          res.send({ message: 'ok', code: 200 });
        }
        else
          res.send({ message: 'error', code: 201 });
      });
    }
    //服务器错误
    else {
      res.send({ message: 'error', code: 201 });
    }
  });
});


//查询充值码
server.post('/findCZM', (req, res) => {
  let czcode = req.body.czcode;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT * from lyc_chongzhi where cz_code=?';
  // 执行SQL语句
  pool.query(sql, [czcode], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results.length });
    }
    else
      res.send({ message: 'error', code: 201 });
  });
});

//获取用户点赞个数
server.post('/thumbsCount', (req, res) => {
  let orid = req.body.orid;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT * from lyc_thumbs where user_id=?';
  // 执行SQL语句
  pool.query(sql, [orid], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results.length });
    }
    else
      res.send({ message: 'error', code: 201 });
  });
});

//获取用户收藏个数
server.post('/collectionCount', (req, res) => {
  let orid = req.body.orid;
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT * from lyc_collection where user_id=?';
  // 执行SQL语句
  pool.query(sql, [orid], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results.length });
    }
    else
      res.send({ message: 'error', code: 201 });
  });
});




//获取所有文章
server.get('/articles', (req, res) => {
  // SQL语句以获取文章分类表的数据(图片，标题，作者名字，作者头像，文章类型)
  let sql = 'SELECT atid,ar_image,title,author_name,author_image,vip_id FROM lyc_articles ORDER BY ar_created';
  // 执行SQL语句
  pool.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results });
    }

    else
      res.send({ message: 'error', code: 201 });
  });
});

//根据atid获取对应文章
server.post('/articlesByAtid', (req, res) => {
  // SQL语句以获取文章分类表的数据
  let atid = req.body.atid;
  let sql = 'select * from lyc_articles where atid=?';
  // 执行SQL语句
  pool.query(sql, [atid], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {

      res.send({ message: 'ok', code: 200, results: results[0] });
    }
    else
      res.send({ message: 'error', code: 201 });

  });
});

//根据一级分类获取对应所有文章
server.post('/articlesByType1', (req, res) => {
  // SQL语句以获取文章分类表的数据
  let type1 = req.body.tyid;
  let sql = 'select * from lyc_articles where category1_id=?';
  // 执行SQL语句
  pool.query(sql, [type1], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {

      res.send({ message: 'ok', code: 200, results: results });
    }
    else
      res.send({ message: 'error', code: 201 });

  });
});

//根据二级分类获取对应所有文章
server.post('/articlesByType2', (req, res) => {
  // SQL语句以获取文章分类表的数据
  let type1 = req.body.tyid;
  let sql = 'select * from lyc_articles where category2_id=?';
  // 执行SQL语句
  pool.query(sql, [type1], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {

      res.send({ message: 'ok', code: 200, results: results });
    }
    else
      res.send({ message: 'error', code: 201 });

  });
});

//根据一级分类获取对应所有二级类型
server.post('/category2', (req, res) => {
  // SQL语句以获取文章分类表的数据
  let type1 = req.body.tyid;
  let sql = 'select * from lyc_type2 where type_id=?';
  // 执行SQL语句
  pool.query(sql, [type1], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {

      res.send({ message: 'ok', code: 200, results: results });
    }
    else
      res.send({ message: 'error', code: 201 });

  });
});

//获取所有类型
server.get('/category', (req, res) => {
  // SQL语句以获取文章分类表的数据
  let sql = 'SELECT ty1id,type_name FROM lyc_type1 ORDER BY ty1id';
  // 执行SQL语句
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send({ message: 'ok', code: 200, results: results });
  });
});

//获取用户所有信息
server.post('/getUserInfos', (req, res) => {
  let orid = req.body.orid;

  let sql = 'select * from lyc_user where orid=?';
  pool.query(sql, [orid], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.send({ message: 'ok', code: 200, results: results });

    } else {
      res.send({ message: 'user not exists', code: 201 });
    }
  });
});



//删除用户
server.post('/deleteUser', (req, res) => {
  let uname = req.body.uname;
  let sql = 'delete from lyc_user where uname=?';
  pool.query(sql, [uname], (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0)
      res.send({ message: 'ok', code: 200 });
    else
      res.send({ message: 'error', code: 201 });

  });
});


//获取所有文章
server.get('/allArticles', (req, res) => {
  let sql = 'select * from lyc_articles,lyc_picture where lyc_articles.pic_id=lyc_picture.type_id';
  pool.query(sql, (error, results) => {
    if (error) throw error;
  });
});


//修改密码接口
server.post('/revisepwd', (req, res) => {
  // 获取用户名和联系方式和新密码信息
  let uname = req.body.uname;
  let phone = req.body.phone;
  let upassword = req.body.upassword;
  //以username和phone为条件进行查找操作，以保证用户名的唯一性
  let sql = 'select * from lyc_user where uname=? and phone=?';
  pool.query(sql, [uname, phone], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      // 将用户的相关信息插入到数据表
      sql = 'update lyc_user set upassword=? where uname=?';
      pool.query(sql, [upassword, uname], (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0)
          res.send({ message: 'ok', code: 200 });
      })
    } else {
      res.send({ message: 'user not exists', code: 201 });
    }
  });
});




//用户注册接口
server.post('/register', (req, res) => {
  //console.log(md5('12345678'));
  // 获取用户名和密码信息
  let uname = req.body.uname;
  let upassword = req.body.upassword;
  let email = req.body.email;
  let phone = req.body.phone;
  let provice = req.body.provice;
  let city = req.body.city;
  if (provice == '' && city == '') {
    console.log("kong")
    provice = '广东省';
    city = '深圳市';
  }
  //以username为条件进行查找操作，以保证用户名的唯一性
  let sql = 'SELECT COUNT(orid) AS count FROM lyc_user WHERE uname=?';
  pool.query(sql, [uname], (error, results) => {
    if (error) throw error;
    let count = results[0].count;
    if (count == 0) {
      // 将用户的相关信息插入到数据表
      sql = 'insert into lyc_user values(null,?,?,?,?,?,?)';
      pool.query(sql, [uname, upassword, email, phone, provice, city], (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0)
          res.send({ message: 'ok', code: 200 });
      })
    } else {
      res.send({ message: 'user exists', code: 201 });
    }
  });
});

// 用户登录接口(已测试，没问题)
server.post('/login', (req, res) => {
  //获取用户名和密码信息
  let username = req.body.uname;
  let password = req.body.upassword;
  // SQL语句
  let sql = 'select * from lyc_user where uname=? and upassword=?';
  pool.query(sql, [username, password], (error, results) => {
    if (error) throw error;
    if (results.length > 0) { //登录成功
      res.set('Access-Control-Allow-Origin', "*")
      res.send({ message: 'ok', code: 200, result: results[0] });
    } else {                 //登录失败
      res.send({ message: 'login failed', code: 201 });
    }
  });

});

// 指定服务器对象监听的端口号
server.listen(3000, () => {
  console.log('server is running...');
});