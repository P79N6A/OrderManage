const userService = require('../service/user');
const query =require('./../mysql/connect')
class UserController {
  async dashboard(ctx) {
    const toYearSum=await query("select sum(payment) as val from mmall_order where `status` >20 and YEAR(create_time)=YEAR(NOW())");
    const lastSum=await query("select sum(payment) as val from mmall_order where `status` >20 and YEAR(create_time)=YEAR(NOW())-1")
    const toYearOrderNum=await query("select count(*) as val from mmall_order where  YEAR(create_time)=YEAR(NOW())")
    const lastYearOrderNum=await query("select count(*) as val from mmall_order where  YEAR(create_time)=YEAR(NOW())-1")
    const toYearNoPayOrderNum=await query("select count(*) as val from mmall_order where `status`<=20 and YEAR(create_time)=YEAR(NOW())");
    const lastYearNoPayOrderNum=await query("select count(*) as val from mmall_order where `status`<=20 and YEAR(create_time)=YEAR(NOW())-1");
    const monthSaleInfos=await query("select count(*) as num,date_format(create_time,'%Y-%m')  as val from mmall_order  GROUP BY date_format(create_time,'%Y-%m')  ")
    // const selectYearMonthOrderNum=await query("select count(*) as val from mmall_order where date_format(create_time,'%Y')=2018 and date_format(create_time,'%m')=10")
    const aLiPayNum=await query("select count(*) as val from mmall_order where payment_type=1")
    const toMonthNewUser=await query("select count(*) as val from mmall_user where date_format(create_time,'%Y')=date_format(now(),'%Y') and date_format(create_time,'%m')=date_format(now(),'%m')")
    const newOrder=await query("select o.id,product_image,product_name,o.user_id,quantity,total_price,i.create_time,o.`status`  from mmall_order_item i,mmall_order o where i.order_no=o.order_no ORDER BY i.create_time desc  limit 0,9")
    const historyTop9=await query("SELECT count(quantity) as num,p.`name`,category_id,main_image,c.`name` as cateName from mmall_product p ,mmall_order_item o,mmall_category c where o.product_id=p.id and p.category_id=c.id  GROUP BY o.product_id ORDER BY num DESC limit 0,9")
    const toYearEveryMonth=await query("select sum(payment),date_format(create_time,'%m') as mon from mmall_order where date_format(create_time,'%Y')=date_format(now(),'%Y')  GROUP BY date_format(create_time,'%m')")
    const categorySaleDate=await query("select sum(o.quantity)as total,o.id, product_name,c.`name` from mmall_order_item o,mmall_category c,mmall_product p  where o. product_id=p.id and p.category_id=c.id  GROUP BY c.id")
    const lastYearEveryMonth=await query("select sum(payment) as s,date_format(create_time,'%m') as mon from mmall_order where date_format(create_time,'%Y')=date_format(now(),'%Y')-1  GROUP BY date_format(create_time,'%m')")
    const everyMonthSale=await query("select sum(payment) as amount,date_format(create_time,'%Y-%m') as month from mmall_order   GROUP BY date_format(create_time,'%Y-%m')")
    //todo 组装工作台数据
    ctx.body = {
      toYearSum,
      lastSum,
      toYearOrderNum,
      lastYearOrderNum,
      toYearNoPayOrderNum,
      lastYearNoPayOrderNum,
      monthSaleInfos,
      aLiPayNum,
      toMonthNewUser,
      newOrder,
      historyTop9,
      toYearEveryMonth,
      categorySaleDate,
      lastYearEveryMonth,
      everyMonthSale
    };
  }

  async login(ctx) {
    const { username, password } = ctx.query;

    if (username === 'admin' && password === 'admin') {
      ctx.body = {
        status: 200,
        statusText: 'ok',
        currentAuthority: 'admin',
      };
    } else if (username === 'user' && password === 'user') {
      ctx.body = {
        status: 200,
        statusText: 'ok',
        currentAuthority: 'user',
      };
    } else {
      ctx.body = {
        status: 401,
        statusText: 'unauthorized',
        currentAuthority: 'guest',
      };
    }
  }

  async register(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'user',
    };
  }

  async logout(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }
}

module.exports = new UserController();
