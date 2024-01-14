import { chatsModel } from '../../models/messages.model.js';
import BasicManager from './basicManager.js';

class ChatsManager extends BasicManager {

    constructor() {
        super(chatsModel);
    }

}

export const chatsManager = new chatsManager();