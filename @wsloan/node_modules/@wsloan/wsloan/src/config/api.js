var config = require('./base');

var path = require("./path");

var api = {
    RedBagApi: path.HOST + '/centerApi-new/RedBag.ashx',
    PersonalCenterApi: path.HOST + '/centerApi-new/PersonalCenter.ashx',
    InvestManageApi: path.HOST + '/centerApi-new/InvestManage.ashx',
    BidProcessApi: path.HOST + '/centerApi-new/BiaoProcess.ashx',
    MoneyRecordApi: path.HOST + '/centerApi-new/MoneyRecord.ashx',
    BiaoDetailApi: path.HOST + '/centerApi-new/BiaoDetail.ashx',
    MakeBidApi: path.HOST + '/centerApi-new/Toub.ashx',
    CMakeBidApi: path.HOST + '/centerApi-new/CToub.ashx',
    ZMakeBidApi: path.HOST + '/centerApi-new/ZToub.ashx',
    SecuritySettingsApi: path.HOST + '/centerApi-new/SecuritySettings.ashx',

    GetRewardUserRestApi: path.HOST + '/centerApi-new/Reward.ashx?t=getZhye',

    MakeCustodyBidApi: path.HOST + '/gzBank/Gateway.aspx',
    CustodyBankListApi: path.HOST + '/gzBank/User.ashx?t=GetBankType&PayType=qp',
    CustodyProvinceListApi: path.HOST + '/gzBank/User.ashx?t=GetShen',
    CustodyCityListApi: path.HOST + '/gzBank/User.ashx?t=GetShi',
    CustodySMSApi: path.HOST + '/gzBank/User.ashx?t=BindCardSms',

    PhoneChangeApi: path.HOST + '/gzBank/User.ashx?t=ChangeMpSms',
    CustodyTransApi: path.HOST + '/centerApi-new/zrfb.ashx',
    CustodyTransInvestApi: path.HOST + '/gzBank/Gateway.aspx?t=CreditAssign',

    TgRecordApi: path.HOST + '/centerApi-new/TgRecord.ashx',
    CoinRecordApi: path.HOST + '/centerApi-new/CoinRecord.ashx',
    ZnxApi: path.HOST + '/centerApi-new/Znx.ashx',
    mallApi: path.HOST + '/appApi/mall.ashx',
    cbdbApi: path.HOST + '/appApi/cbdbapi.ashx',
    ExpGoldRecordApi: path.HOST + '/centerApi-new/TyjRecord.ashx',
    Reward: path.HOST + '/centerApi-new/Reward.ashx',
    GetHomeBanners: path.HOST + '/ajaxapi-new/index.ashx?t=getbanner',
    GetHomeSigns: path.HOST + '/ajaxapi-new/index.ashx?t=newstatus',
    IndexApi: path.HOST + '/ajaxapi-new/index.ashx',
    NewsApi: path.HOST + '/ajaxapi-new/news.ashx',
    InvestApi: path.HOST + '/ajaxapi-new/invest.ashx',
    BankCardApi: path.HOST + 'ajaxapi/yhksv.ashx',
    WapApi: path.HOST + '/appapi/wap.ashx',
    AppApi: path.HOST + '/APPapi/api.ashx',
    InvestRewardListApi: path.HOST + '/APPapi/jiangli.ashx',
    ActiveApi: path.HOST + '/ActiveApi/',
    CusTody: path.HOST + '/gzBank/User.ashx',
    TopMenuJson: path.HOST + '/WS.PC/json/' + (config.isTest ? 'top-menu.js' : 'top-menu.online.js'),
    InvestMenuConfigJson: path.HOST + '/WS.PC/json/invest-menu-config.js',
    MembLeftMenuJson: path.HOST + '/WS.PC/json/memb-sidebar.js',
    HelpItemJson: path.HOST + '/WS.PC/json/help-item.js',
    BankListJson: path.HOST + '/WS.PC/json/bank-list.js',
    Rules: path.HOST + '/WS.PC/json/rules.js',
    FeData: path.Fe + '/data'
};
config.mix(config, {
    API: api
});

module.exports = api;