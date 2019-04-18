import ObservableStore from 'obs-store';
import { MSG_STATUSES } from '../constants';
import uuid from 'uuid/v4';
import log from 'loglevel';
import EventEmitter from 'events'
import { ERRORS } from '../lib/KeeperError';


export class NotificationsController extends EventEmitter {

    /**
     * @param options
     * @param options.initState
     * @param {[]} options.initState.notifications
     * @param {function} options.getMessagesConfig
     * @param {function} options.canShowNotification
     * @param options
     */
    constructor(options) {
        super();
        const defaults = {
            notifications: []
        };
        this.store = new ObservableStore(Object.assign({}, defaults, options.initState));
        this.getMessagesConfig = options.getMessagesConfig;
        this.canShowNotification = options.canShowNotification;
        this.setNotificationPermissions = options.setNotificationPermissions;

        this.deleteAllByTime();
    }

    /**
     * @title New notification
     * @param data
     * @param {string} data.message
     * @param {string} data.title
     * @param {string} data.origin
     * @param {string} data.type
     * @param {string} data.timestamp
     * @param {string} data.address
     * @param {string} data.status
     * @return {Promise<{ id }>}
     */
    newNotification(data) {
        log.debug(`New notification ${data.type}: ${JSON.stringify(data)}`);

        if (!data || !data.origin || !data.title) {
            throw ERRORS.NOTIFICATION_DATA_ERROR();
        }

        this.canShowNotification(data.origin);

        const notification = this._generateMessage(data);

        let notifications = this.store.getState().notifications;

        this._deleteNotificationsByLimit(notifications, this.getMessagesConfig().max_messages);

        log.debug(`Generated notification ${JSON.stringify(notification)}`);

        notifications.push(notification);
        this._updateStore(notifications);
        this.setNotificationPermissions(data.origin, true, Date.now());
        return { id: notification.id };
    }

    /**
     * @param {Array<string>} ids
     */
    deleteNotifications(ids) {
        this._deleteMessages(ids);
    }

    /**
     * @param {object} account
     * @return {T[]}
     */
    getNotificationsByAccount(account) {
        if (!account || !account.address) {
            return [];
        }
        return this.store.getState().notifications.filter(notification => notification.address === account.address);
    }

    /**
     * @param account
     * @return {Array}
     */
    getGroupNotificationsByAccount(account) {
        const notifications = this.getNotificationsByAccount(account);
        return [...notifications].reverse().reduce((acc, item) => {
            if (!acc.hash[item.origin]) {
                acc.hash[item.origin] = [];
                acc.items.push(acc.hash[item.origin]);
            }

            acc.hash[item.origin].push(item);

            return acc;
        }, { items: [], hash: {} }).items;
    }

    /**
     * @return {void}
     */
    deleteAllByTime() {
        const { message_expiration_ms } = this.getMessagesConfig();
        const time = Date.now();
        const { notifications } = this.store.getState();
        const toDelete = [];
        notifications.forEach(({ id, timestamp, status }) => {
            if ((time - timestamp) > message_expiration_ms) {
                toDelete.push(id);
            }
        });

        this._deleteMessages(toDelete);
        this._updateMessagesByTimeout();
    }

    /**
     * @param {string} id
     * @param {"showed_notify" | "new_notify"} status
     */
    setMessageStatus(id, status) {
        const { notifications } = this.store.getState();
        const index = notifications.findIndex(msg => msg.id === id);
        if (index > -1) {
            notifications.splice(index, 1, { ...notifications[index], status });
            this._updateStore(notifications);
        }
    }

    /**
     * @param {string} id
     */
    deleteMsg(id) {
        this._deleteMessages([id]);
    }

    /**
     * @param data
     * @param {string} data.message
     * @param {string} data.title
     * @param {string} data.origin
     * @param {string} data.type
     * @param {string} data.timestamp
     * @param {string} data.address
     * @return {any}
     * @private
     */
    _generateMessage({ address, origin, title, type, timestamp, message }) {
        return {
            type,
            title,
            origin,
            address,
            message,
            id: uuid(),
            timestamp: timestamp || Date.now(),
            status: MSG_STATUSES.NEW_NOTIFICATION,
        };
    }

    /**
     * @param {string} {[]} ids
     * @private
     */
    _deleteMessages(ids) {
        const { notifications } = this.store.getState();
        const newNotifications = notifications.filter(({ id }) => !ids.includes(id));
        if (newNotifications.length !== notifications.length) {
            this._updateStore(newNotifications);
        }
    }

    _deleteNotificationsByLimit(notifications, limit) {
        const toDelete = [];

        while (notifications.length > limit) {
            const oldest = notifications.sort((a, b) => a.timestamp - b.timestamp)[0];
            if (oldest) {
                toDelete.push(oldest.id);
            } else {
                break;
            }
        }

        this._deleteMessages(toDelete);
    }

    /**
     * @param {[]} notifications
     * @private
     */
    _updateStore(notifications) {
        this.store.updateState({ notifications });
    }

    /**
     * @return {void}
     * @private
     */
    _updateMessagesByTimeout() {
        clearTimeout(this._updateTimer);
        const { update_messages_ms } = this.getMessagesConfig();
        this._updateTimer = setTimeout(() => this.deleteAllByTime(), update_messages_ms)
    }
}
