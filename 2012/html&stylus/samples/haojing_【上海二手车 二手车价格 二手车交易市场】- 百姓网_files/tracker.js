var tracker = tracker || {
    city : null,
    category : null,
    pagetype : null,
    trackid : null,
    adid : null,
    visitorid : null,
    userid : '',
    pv : function (customData) {
        _taq.push(['gary', customData]);
    },
    ic : function (name, uniqueType) {
        _taq.push(['ic', name, uniqueType ? 'uv' : 'pv']);
    },
    evt : function (eventName, customData) {
        _taq.push(['evt', eventName, customData]);
    },
    ga : function (name, action, label, value) {
        _taq.push(['ga', name, action, label, value]);
    },
    setCategory : function (category) {this.category = category},
    setCity : function (city) {this.city = city},
    setPagetype : function (pagetype) {this.pagetype = pagetype},
    setTrackId : function (trackid) {this.trackid = trackid},
    setAdId : function (adid) {this.adid = adid},
    setVisitorId : function (visitorid) {this.visitorid = visitorid},
    setUserId : function (userid) {this.userid = userid}
};