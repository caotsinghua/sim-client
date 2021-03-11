import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import userReducer from './modules/user';
import WebIM from '../webim/WebIM';
import I18n from '../utils/I18n';
import history from '../utils/history';

window.WebIM = WebIM;
// --- init store ---
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

// ---- init webim listener ---
WebIM.conn.listen({
  onOpened(message: unknown) {
    console.log('链接成功', message);
  }, // 连接成功回调
  onClosed(message: unknown) {
    console.log('onClosed', message);
  }, // 连接关闭回调
  onTextMessage(message: unknown) {
    console.log('onTextMessage', message);
  }, // 收到文本消息
  onEmojiMessage(message: unknown) {
    console.log('onEmojiMessage', message);
  }, // 收到表情消息
  onPictureMessage(message: unknown) {
    console.log('onPictureMessage', message);
  }, // 收到图片消息
  onCmdMessage(message: unknown) {
    console.log('onCmdMessage', message);
  }, // 收到命令消息
  onAudioMessage(message: unknown) {
    console.log('onAudioMessage', message);
  }, // 收到音频消息
  onLocationMessage(message: unknown) {
    console.log('onLocationMessage', message);
  }, // 收到位置消息
  onFileMessage(message: unknown) {
    console.log('onFileMessage', message);
  }, // 收到文件消息
  onVideoMessage(message: unknown) {
    console.log('视频消息', message);
    // const node = document.getElementById('privateVideo');
    // const option = {
    //   url: message.url,
    //   headers: {
    //     Accept: 'audio/mp4',
    //   },
    //   onFileDownloadComplete(response) {
    //     const objectURL = WebIM.utils.parseDownloadResponse.call(
    //       conn,
    //       response
    //     );
    //     node.src = objectURL;
    //   },
    //   onFileDownloadError() {
    //     console.log('File down load error.');
    //   },
    // };
    // WebIM.utils.download.call(conn, option);
  }, // 收到视频消息
  onPresence(message: unknown) {
    console.log('onPresence');
    console.log(message);
  }, // 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
  onRoster(message: unknown) {
    console.log('onRoster');
    console.log(message);
  }, // 处理好友申请
  onInviteMessage(message: unknown) {
    console.log('onInviteMessage');
    console.log(message);
  }, // 处理群组邀请
  onOnline() {
    console.log('onOnline');
  }, // 本机网络连接成功
  onOffline() {
    console.log('onOffline');
  }, // 本机网络掉线
  onError(error: any) {
    console.log('失败', error);
    console.log('error', error);
    // 16: server-side close the websocket connection
    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
      console.log(
        'WEBIM_CONNCTION_DISCONNECTED',
        WebIM.conn.autoReconnectNumTotal,
        WebIM.conn.autoReconnectNumMax
      );
      if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
        return;
      }
      message.error(`${I18n('serverSideCloseWebsocketConnection')}`);
      history.push('/login');
      return;
    }
    // 2: login by token failed
    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
      message.error(`${I18n('webIMConnectionAuthError')}`);
      return;
    }
    // 7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_SERVER_CLOSE_ERROR) {
      console.log('WEBIM_CONNCTION_SERVER_CLOSE_ERROR');
      // TODO: need add judgement first: should not display err message while logout
      message.error('client-side network offline');

      return;
    }
    // 8: offline by multi login
    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
      message.error(`${I18n('offlineByMultiLogin')}`);
      history.push('/login');
      return;
    }
    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_REMOVED) {
      message.error('用户下线');
      history.push('/login');
      return;
    }
    if (
      error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE
    ) {
      message.error('账户在另外一台设备登录');
      history.push('/login');
      return;
    }
    if (
      error.type ===
      WebIM.statusCode.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD
    ) {
      message.error('用户修改密码');
      history.push('/login');
      return;
    }
    if (
      error.type ===
      WebIM.statusCode.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE
    ) {
      message.error('用户被其他设备踢掉');
      history.push('/login');
      return;
    }
    if (error.type === 1) {
      const data = error.data ? JSON.parse(error.data.data) : '';

      if (data) {
        if (data.error_description === 'user not found') {
          message.error('用户名不存在！');
        } else if (data.error_description === 'invalid password') {
          message.error('密码错误!');
        } else if (data.error_description === 'user not activated') {
          message.error('用户已被封禁！');
        }
      }
      // store.dispatch(LoginActions.loginFailure(error));
    }
  }, // 失败回调
  onBlacklistUpdate(list: unknown) {
    // 黑名单变动
    // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
    console.log('黑名单更新');
    console.log(list);
  },
  onRecallMessage(message: unknown) {}, // 收到撤回消息回调
  onReceivedMessage(message: unknown) {}, // 收到消息送达服务器回执
  onDeliveredMessage(message: unknown) {}, // 收到消息送达客户端回执
  onReadMessage(message: unknown) {}, // 收到消息已读回执
  onCreateGroup(message: unknown) {}, // 创建群组成功回执（需调用createGroupNew）
  onMutedMessage(message: unknown) {}, // 如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
  onChannelMessage(message: unknown) {}, // 收到整个会话已读的回执，在对方发送channel ack时会在这个回调里收到消息
});
