var finderDecorations = {
  extendFeature: function(){
    var locationKey = this.get('LONGITUDE') + '@' + this.get('LATITUDE');
    var count = finderDecorations.countByLocation[locationKey] || 0;
    finderDecorations.countByLocation[locationKey] = count + 1;
    this.locationKey = locationKey;
    this.locationIdx = count;
  },
  getCountAtLocation: function(){
    return finderDecorations.countByLocation[this.locationKey];
  },
  html: function(){
    return $('<div class="info"></div>')
      .append(this.distanceHtml())
      .append(this.nameHtml())
      .append(this.locationHtml())
      .append(this.addressHtml())
      .append(this.phoneHtml())
      .append(this.webHtml())
      .append(this.mapHtml())
      .append(this.directionsHtml());
  },
  distanceHtml: function(){
    var distance = this.get('distance');
    if (!(distance === undefined)){
      var div = $('<div class="distance"></div>');
      return div.html('&bull; ' + (distance / 5280).toFixed(2) + ' mi &bull;');
    }
  },
  nameHtml: function(){
    var div = $('<div class="name"></div>');
    return div.html(this.get('ORGANIZATION_NAME'));
  },
  locationHtml: function(){
    var div = $('<div class="location"></div>');
    return div.html(this.get('LOCATION_NAME'));
  },
  addressHtml: function(){
    var div = $('<div class="address"></div>');
    return div.append('<div>' + this.get('ADDRESS_1') + '</div>')
      .append('<div>' + this.get('ADDRESS_2') + '</div>');
  },
  phoneHtml: function(){
    var phone = this.get('PHONE').split(' ')[0].trim();
    if (phone){
      var ext = this.get('EXT');
      var readable = ext ? ' ext. ' + ext : '';
      ext = ext ? ',' + ext : '';
      return $('<a class="phone" data-role="button"></a>')
        .html(phone + readable).attr('href', 'tel:' + phone + ext);
    }
  },
  webHtml: function(){
    var web = this.get('WEBSITE');
    if (web){
      return $('<a class="web" data-role="button"></a>').html(web).attr('href', web);
    }
  },
  mapHtml: function(){
    var a = $('<a class="map" data-role="button" onclick="nyc.finder.zoomTo(event);">Map</a>');
    return a.data('feature', this);
  },
  directionsHtml: function(){
    var a = $('<a class="directions" data-role="button" onclick="nyc.finder.directionsTo(event);">Directions</a>');
    return a.data('feature', this);
  },
  getAddress: function(){
    return this.get('ADDRESS_1') + ', ' + this.get('ADDRESS_2');
  },
  getName: function(){
    return this.get('ORGANIZATION_NAME');
  }
};

finderDecorations.countByLocation = {};
