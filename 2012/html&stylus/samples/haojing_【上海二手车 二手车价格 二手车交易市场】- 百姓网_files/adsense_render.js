var adsense_render = adsense_render || {
    options:{
        size : [1, 1]
    }
    , container : []

    , display:function (ads) {
        var container = this.container
            , size  = this.options.size;
        for (var i in container) {
            this.initContainer(container[i]);
            while (size[i]-- && ads.length) {
                this.addAdsenseRow(container[i], ads.shift())
            }
        }
    }

    , initContainer: function(container) {
        container.className = 'adsense';
        container.style.display = 'block';
        container.style.borderBottom = '2px solid #cef12a';
    }

    , addAdsenseRow: function(container, ad) {
        var elt = document.createElement('li');
        elt.innerHTML = '<span style="display:inline-block; width:85px;">赞助商链接</span>';
        elt.innerHTML += this._renderRow(ad);
        container.appendChild(elt);
    }

    , _renderRow:function (ad) {
        var a = '<a target="_blank" href="' + ad.url + '"'
            + ' onmouseover="window.status=\'http://' + ad.visible_url + '\'"'
            + ' onmouseout="window.status=\'\'">';

        return a + ad.line1 + ' <small>' + ad.visible_url + '</small></a>'
            + '<em>'
            + ad.line2 + (ad.line3 ? ad.line3 : '') + '</em>';
    }
}
