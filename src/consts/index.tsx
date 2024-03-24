export enum Network {
  livenet = 'livenet',
  Testnet = 'testnet',
}

// testet
// export const PROJECT_ADDRESS =
//   'tb1pu2ytptdcvsns335x0t3mpcm4mknz27pp5rm4vh4lrq39k09sj6zqlnfhsr';

// 用这个地址测试BTC的流程
export const PROJECT_ADDRESS = 'tb1pu2ytptdcvsns335x0t3mpcm4mknz27pp5rm4vh4lrq39k09sj6zqlnfhsr';
export const MINT_PROJECT_ADDRESS = 'tb1pu2ytptdcvsns335x0t3mpcm4mknz27pp5rm4vh4lrq39k09sj6zqlnfhsr';
export const TOKEN_ID = 'NbUoqJHV5Jbudgj5jVBXx';

export const MINT_AMOUNT = 1;

// tb1pu2ytptdcvsns335x0t3mpcm4mknz27pp5rm4vh4lrq39k09sj6zqlnfhsr。
// 用这个地址tb1pfwa730683xrruaprfmhl67a4edx09dr27lev4eqshyzrvgkmvhjqg42lv9测试fair mint zkt的。

// 前端调mint之前还是要调用一下sign接口，需要加多一个类型跟之前的区分，不分也行，不过还是一定要先调sign接口

// http://142.171.239.146:9000/swagger

// @keene10 http://142.171.239.146:9000/swagger, token信息的接口id用NbUoqJHV5Jbudgj5jVBXx，正式环境也用这个
