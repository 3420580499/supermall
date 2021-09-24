import {request} from './request'
export function getDetail(iid) {
   return request({
     url:'/detail',
     params: {
       iid
     }
   })
}
//将有用的数据整合成一个对象
//商品基本信息
export class Goods {
  constructor(itemInfo, columns, shopInfo) {
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.lowNowPrice = itemInfo.lowNowPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.columns = columns;
    this.services = shopInfo.services;
  }
}
//店铺的基本信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
//商品的参数信息(尺码)
export class GoodsParam {
  constructor(info, rule) {
    //注：images可能没有值
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
