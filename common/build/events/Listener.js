"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
var Listener = /** @class */ (function () {
    function Listener(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    Listener.prototype.subscriptionOptions = function () {
        return this.client.subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.QueueGroup);
    };
    Listener.prototype.listen = function () {
        var _this = this;
        var subscription = this.client.subscribe(this.subject, this.QueueGroup, this.subscriptionOptions());
        subscription.on('message', function (msg) {
            var data = msg.getData();
            if (typeof data === 'string') {
                _this.onMessage(JSON.parse(data), msg);
            }
            else {
                _this.onMessage(JSON.parse(data.toString('utf-8')), msg);
            }
        });
    };
    return Listener;
}());
exports.Listener = Listener;
