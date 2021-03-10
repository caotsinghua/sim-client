import websdk from 'easemob-websdk';
import config from './WebIMConfig';
// init DOMParser / document for strophe and sdk
const WebIM = window.WebIM || {};

WebIM.config = config;

const options = {
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  isDebug: WebIM.config.isDebug,
  https: WebIM.config.https,
  isAutoLogin: false,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  delivery: WebIM.config.delivery,
  appKey: WebIM.config.appkey,
  useOwnUploadFun: WebIM.config.useOwnUploadFun,
  deviceId: WebIM.config.deviceId,
  // 公有云 isHttpDNS 默认配置为true
  isHttpDNS: WebIM.config.isHttpDNS,
};

// 内部沙箱测试环境
// TODO

websdk.debug(true);
// eslint-disable-next-line new-cap
WebIM.conn = new websdk.connection(options);
export default WebIM;
