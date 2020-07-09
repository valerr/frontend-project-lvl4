import { combineReducers } from 'redux';
import messages, { actions as messagesActions, sendMessage } from './messages';
import channels, {
  actions as channelsActions, addChannel, removeChannel, renameChannel,
} from './channels';
import currentChannelId, { actions as currentChannelAction } from './currentChannel';

export default combineReducers({
  messages, channels, currentChannelId,
});

export const actions = {
  ...messagesActions,
  ...channelsActions,
  ...currentChannelAction,
  addChannel,
  renameChannel,
  removeChannel,
  sendMessage,
};
