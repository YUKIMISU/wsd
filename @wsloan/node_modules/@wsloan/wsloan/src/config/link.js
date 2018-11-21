// 这里放置 PC wap 以及 APP 对应的链接表
var config = require('./base');
var path = require('./path.js');


function cleanPath(l) {
  return (path.dirname + l).replace(/\/\//g, '/');
}

var random = Math.random();
var appLinkPC = path.HOST + '/appshow/index.aspx?v=' + random;
var appLinkWAP = path.HOST + '/m/old/appshow.html?v=' + random;

var mobile_mode = 'hash';

function generateMobileLink(path_name,param) {
  var mode = (mobile_mode === 'hash' ? '#/' : '/');
  // if (location.host.indexOf('localhost') > -1) {
  //   return mode + path_name;
  // }
  return path.MOBILE + mode + path_name + ((param && typeof param === 'string') ? '?' + param : '');

  
}
var link = {
  // 首页
  home: [
    path.HOST + cleanPath('/'),
    path.HOST + '/m/',
    'gotohome&index=1'
  ],
  // 标的列表 投资
  invest: [
    path.HOST + cleanPath('/invest/index.html'),
    // path.HOST + '/m/#/licai/5',
    generateMobileLink('invest'),
    'gotohome&index=1&type=$0'
  ],
  // 登录
  login: [
    path.HOST + '/login.aspx',
    // path.MOBILE + '/#/login',
    generateMobileLink('login','$param'),
    'openlogin'
  ],
  // 充值
  recharge: [
    path.HOST + cleanPath('/memb/#recharge'), // /zxcz.aspx
    generateMobileLink('recharge'), //path.HOST + '/m/#/cz',
    'openrecharge'
  ],
  // 添加银行卡 绑卡
  addbankcard: [
    path.HOST + cleanPath('/memb/#safe'), // / yhkset.aspx
    generateMobileLink('memb/card/add'), //path.HOST + '/m/#/banklist',
    'openaddbankcard'
  ],
  //安全中心
  safe: [
    path.HOST + cleanPath('/memb/#safe'), // /jbxx.aspx
    path.HOST + '/m/#/banklist',
    'openaddbankcard'
  ],
  // 社区首页
  bbshome: [
    path.BBS_HOST,
    path.BBS_HOST_OLD,
    'openbbshome'
  ],
  // 发帖
  sendbbs: [
    path.BBS_HOST,
    path.BBS_HOST_OLD + '/write',
    'opensendbbs'
  ],
  // 帖子详情
  bbsdetail: [
    path.BBS_HOST + '/PostsDetail/$0',
    path.BBS_HOST_OLD + '/article-detail/$0',
    'openarticledetail&articleid=$0'
  ],
  // 个人资料编辑页
  memb: [
    path.HOST + cleanPath('/memb/#safe'), // memb.aspx
    // path.HOST + '/m/newsWeb/memb.html',
    generateMobileLink('memb'),
    'openuserinfo'
  ],
  // 我的
  my: [
    path.HOST + cleanPath('/memb/#index'), //memb.aspx
    // path.HOST + '/m/newsWeb/memb.html',
    generateMobileLink('memb'),
    'gotohome&index=4'
  ],
  // 体验金主页面
  exp: [
    path.HOST + cleanPath('/memb/#my-exp-gold'), // my_tyj2.aspx
    // path.HOST + '/m/newsWeb/tiyanjin.html',
    generateMobileLink('memb/exp'),
    'openexperience'
  ],
  // 设置交易密码页面
  setJymm: [
    path.HOST + cleanPath('/memb/#safe'), //jbxx.aspx
    generateMobileLink('setPayPass'), //path.HOST + '/m/#/jymm',
    'opensettradepassword'
  ],
  // 通过交易密码更改交易密码
  setJymmByJymm: [
    path.HOST + cleanPath('/memb/#safe?act=changeZfmmByZfmm'), //   /jbxx.aspx?flag=changeJymm
    generateMobileLink('setPayPass'), //path.HOST + '/m/#/jymm',
    'openchangetradepassword'
  ],
  // 通过身份证更改交易密码
  changetradepasswordByID: [
    path.HOST + cleanPath('/memb/#safe?act=changeZfmmByCard'), //jbxx.aspx?flag=cz
    generateMobileLink('setPayPass'), //path.HOST + '/m/#/jymm',
    'openidchangetradepassword'
  ],
  // 资金记录
  propertyrecord: [
    path.HOST + cleanPath('/memb/#fund-record'), // zjjl.aspx
    path.MOBILE + '#/memb/fund-record',
    'openpropertyrecord'
  ],
  // 投资记录
  investrecord: [
    path.HOST + cleanPath('/memb/#invest-record'), ///zztb.aspx
    path.MOBILE + '#/invest/record',
    'openinvestrecord'
  ],
  // 债权转让记录
  investrtransecord: [
    path.HOST + cleanPath('/memb/#invest-trans-record'), ///zztb.aspx
    path.MOBILE + '#/invest/record',
    'openinvestrecord'
  ],
  // 投资记录 交易所
  investExchangeRecord: [
    path.HOST + cleanPath('/memb/#invest-record-exchange'), // zztb_jys.aspx
    path.MOBILE + '#/invest/record',
    'openinvestrecord'
  ],
  investBenefitRecord: [
    path.HOST + cleanPath('/memb/#invest-record-benefit'), // zztb_jys.aspx
    path.MOBILE + '#/invest/record',
    'openinvestrecord'
  ],
  //财智投资记录
  investCaizhiRecord: [
    path.HOST + cleanPath('/memb/#invest-caizhi-record'), ///  lc_jl2.aspx
    path.MOBILE + '#/invest/record',
    'openinvestrecord'
  ],
  // 红包
  redpackets: [
    path.HOST + cleanPath('/memb/#my-redpacket'), // hbjl1.aspx
    generateMobileLink('red-packets'),
    'openinvestredbag'
  ],
  // 自动投标
  autoInvest: [
    path.HOST + cleanPath('/memb/#auto-invest-set'), //zdtbsz.aspx
    path.HOST + '/m/#/zdtb',
    'openautobid'
  ],
  // 提现
  drawCash: [
    path.HOST + cleanPath('/memb/#draw-cash'), // zhtx.aspx
    path.MOBILE + '#/draw-cash',
    // APP 方法 暂无
    ''
  ],
  //开户
  accountSet: [
    path.HOST + '/account-set', // zhtx.aspx
    path.MOBILE + '#/memb/card/add',
    'openkh'
  ],
  openbox:[
    path.HOST + cleanPath('/memb/#my-redpacket'), 
    path.MOBILE + '#/chest',
    'openbox'
  ]
};
// gotohome&index=2       跳转发现
// opensingleshare        调用分享窗口, 内容自定
// gotoback       调用后退
// opennewwindow&url=xxx&showNavigationBar=1        打开新窗口
// closepopgesture        关闭UINavigationcController的右滑手
// openpopgesture       开启UINavigationcController的右滑手势
// reloadProperty       刷新用户资产

// opencustomservice;   调用客服
// shareurl2person&url=xxx&picurl=xxx&title=xxx,  调用分享给朋友

// 仅仅只有app上才有的链接
var linkOnlyInApp = [
  // 添加好友
  'addfriend',
  // 红包雨
  'redpacketrain',
  // 评价APP
  'showFeedBackAlert'
];
// app 默认 跳转链接
// app://interface?method=xxxxx
// 将绑定link 绑定到link 上
for (var i = 0, length = linkOnlyInApp.length; i < length; i++) {
  link[linkOnlyInApp[i]] = [
    appLinkPC,
    appLinkWAP,
    linkOnlyInApp[i]
  ];
}
config.mix(config, {
  link: link
});
module.exports = link;

// 财币记录
// CaiBiRecord