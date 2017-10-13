var finderDecorations = {
  services: [
    'CASE_MANAGEMENT',
    'CRISIS_INTERVENTION',
    'LEGAL_SERVICES',
    'SAFETY_PLANNING',
    'IMMIGRATION_SERVICES',
    'EMERGENCY_OR_TRANSITIONAL_SHELTER',
    'PERMANENT_HOUSING',
    'HEALTH_CARE',
    'MENTAL_HEALTH_COUNSELING',
    'DRUG_ADDICTION_SCREENING_AND_TREATMENT',
    'LANGUAGE_INTERPRETATION',
    'PUBLIC_BENEFITS',
    'JOB_TRAINING_AND_ECONOMIC_EMPOWERMENT',
    'RESTORATIVE_JUSTICE'
  ],
  languages: [
    'SPANISH',
    'ARABIC',
    'BENGALI',
    'CHINESE',
    'FRENCH',
    'HAITIAN-CREOLE',
    'ITALIAN',
    'KOREAN',
    'POLISH',
    'RUSSIAN',
    'URDU',
    'YIDDISH'
  ],
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
      .append(this.directionsHtml())
      .append(this.detailHtml());
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
      return $('<a class="web" data-role="button" target="blank">Website</a>').attr('href', web);
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
  detailHtml: function(){
    return new nyc.Collapsible({
      target: $('<div class="detail"></div>'),
      title: 'Details',
      content: this.detailContent()
    }).container;
  },
  detailContent: function(){
    var div = $('<div></div>');
    return div.append(this.hoursHtml())
      .append(this.eligibilityHtml())
      .append(this.servicesHtml())
      .append(this.languagesHtml())
      .append(this.culturalHtml());

  },
  hoursHtml: function(){
    var hrs = $('<div class="hours"></div>');
    hrs.append('<div class="name">Hours of operation:</div>')
      .append('<div>' + this.get('MAIN_HOURS_OF_OPERATION') + '<div>');
    var wkend = this.get('WEEKEND_HOURS_OF_OPERATION');
    if (wkend){
      hrs.append(' (' + wkend + ')');
    }
    return hrs;
  },
  eligibilityHtml: function(){
    var eligibility = this.get('ELIGIBILITY_CRITERIA');
    if (eligibility){
      return $('<div class="eligibility"></div>')
        .append('<div class="name">Eligibility criteria:</div>')
        .append(eligibility);
    }
  },
  servicesHtml: function(){
    var div = $('<div class="services"><div class="name">Services offered:</div></div>');
    return div.append(this.makeList(this.services, this.get('OTHER_SERVICE')));
  },
  languagesHtml: function(){
    var ul = this.makeList(this.languages, this.get('OTHER_LANGUAGE'));
    if (ul.children().length){
      var dif = $('<div class="languages"><div class="name">Languages offered:</div></div>');
      if (ul.children().length == this.languages.length && this.get('INTERPRETATION_SERVICE_OFFERED')){
        return div.append('<div>Interpretation service offered</div>');
      }else{
        return div.append(ul);
      }
    }
  },
  culturalHtml: function(){
    var cultural = this.get('CULTURAL_COMPETENCIES_SPECIALIZATIONS');
    if (cultural){
      return $('<div class="cultural"><div class="name">Cultural competency specializations:</div></div>')
        .append('<div>' + cultural + '</div>');
    }
  },
  makeList: function(list, other){
    var me = this, ul = $('<ul></ul>');
    $.each(list, function(){
      if (me.get(this)){
        var li = $('<li></li>').html(this.toLowerCase().replace(/_/g, ' ').replace(/-/g, ' '));
        ul.append(li);
      }
    });
    if (other){
      ul.append('<li>' + other + '</li>');
    }
    return ul;
  },
  getAddress: function(){
    return this.get('ADDRESS_1') + ', ' + this.get('ADDRESS_2');
  },
  getName: function(){
    return this.get('ORGANIZATION_NAME');
  }
};

finderDecorations.countByLocation = {};
