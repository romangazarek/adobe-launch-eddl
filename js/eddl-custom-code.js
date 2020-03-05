// Initialize Data Layer
window.dataLayer = window.dataLayer || [];
window.dataLayer.computedState = {};

// Helper that copies data into computed state
// - based on code published by Jan Exner (https://webanalyticsfordevelopers.com/2019/10/15/launch-events-and-eddl-aka-jim-changed-my-mind/)
window.dataLayer.computeState = function (target, source) {
    for (var i in source) {
        if (null !== source[i] && "object" === typeof source[i] && !Array.isArray(source[i])) {
            target[i] = target[i] || {};
            target[i] = this.computeState(target[i], source[i]);
        } else {
            target[i] = source[i];
        }
    }
    return target;
};

// Create a push method that
// - pushes to dataLayer
// - updates computed state
// - logs pushed object to console (_satellite.logger.info)
// - sends a custom event - Direct Call (_satellite.track)
window.dataLayer.push = function () {
    Array.prototype.push.apply(this, arguments);
    this.computedState = this.computeState(this.computedState, arguments[0]);
    _satellite.logger.info("dataLayer.push() called:\n" + JSON.stringify(arguments[0], null, 4) + "\n==============================\n", this);
    if (arguments[0].hasOwnProperty("event")) {
        _satellite.track(arguments[0].event, arguments[0]);
    }
};

// Compute state for all previous data in dataLayer (extremely useful when using asynchronous Adobe Launch code)
if (window.dataLayer.length > 0) {
    for (var i = 0; i < window.dataLayer.length; i++) {
        window.dataLayer.computeState(window.dataLayer.computedState, window.dataLayer[i]);
        if (window.dataLayer[i].hasOwnProperty("event")) { // Direct call for all events
            _satellite.track(window.dataLayer[i].event, window.dataLayer[i]);
        }
    }
}