$(document).ready(function(){

  var map = new nyc.ol.Basemap({target: $('#map').get(0)});

  var finderSource = new nyc.ol.source.FilteringAndSorting(
    {loader: new nyc.ol.source.CsvPointFeatureLoader({
      url: 'data/facility.csv',
      projection: 'EPSG:2263',
      xCol: 'X',
      yCol: 'Y'
    })}, [finderDecorations],
    {nativeProjection: 'EPSG:2263', projection: 'EPSG:3857'}
  );

  map.addLayer(new ol.layer.Vector({
    source: finderSource,
    style: finderStyle
  }));

  /* See README.md for getting your GeoClient App Id and App Key */
  var geocoder = new nyc.Geoclient(
    'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example'
  );

  var locationMgr = new nyc.LocationMgr({
    controls: new nyc.ol.control.ZoomSearch(map),
    locate: new nyc.ol.Locate(geocoder),
    locator: new nyc.ol.Locator({map: map})
  });

  new nyc.FinderApp({
    map: map,
    finderSource: finderSource,
    locationMgr: locationMgr,
    filterControls: filterControls,
    directionsUrl: 'https://maps.googleapis.com/maps/api/js?sensor=false&libraries=visualization'
  });

  new nyc.lang.Goog({
    target: '#map-page',
    languages: {
        en: {val: 'English', desc: 'English', hint: 'Translate'},
        ar: {val: 'Arabic', desc: '&#x627;&#x644;&#x639;&#x631;&#x628;&#x64A;&#x629;', hint: '&#x62A;&#x631;&#x62C;&#x645;'},
        bn: {val: 'Bengali', desc: '&#x9AC;&#x9BE;&#x999;&#x9BE;&#x9B2;&#x9BF;', hint: '&#x985;&#x9A8;&#x9C1;&#x9AC;&#x9BE;&#x9A6; &#x995;&#x9B0;&#x9BE;'},
        'zh-CN': {val: 'Chinese (Simplified)', desc: '&#x4E2D;&#x56FD;', hint: '&#x7FFB;&#x8BD1;'},
        fr: {val: 'French', desc: 'Fran&#231;ais', hint: 'Traduire'},
        ht: {val: 'Haitian Creole', desc: 'Krey&#242;l Ayisyen', hint: 'Tradui'},
        ko: {val: 'Korean', desc: '&#xD55C;&#xAD6D;&#xC758;', hint: '&#xBC88;&#xC5ED;'},
        ru: {val: 'Russian', desc: 'P&#x443;&#x441;&#x441;&#x43A;&#x438;&#x439;', hint: '&#x43F;&#x435;&#x440;&#x435;&#x432;&#x435;&#x441;&#x442;&#x438;'},
        es: {val: 'Spanish', desc: 'Espa&#241;ol', hint: 'Traducir'},
        ur: {val: 'Urdu', desc: '&#x627;&#x631;&#x62F;&#x648;', hint: '&#x62A;&#x631;&#x62C;&#x645;&#x6C1; &#x6A9;&#x631;&#x6CC;&#x6BA;'}
    },
    isButton: true
  });

  $('#map-page').append($('#cvs-call-btn, #cvs-email-btn, .splash'));

  function showContact(what){
    $('#contact .msg .email, #contact .msg .call').hide();
    $('#contact .msg .' + what).show();
    $('#contact').css({opacity: 0, display: 'flex'})
      .animate({opacity: 1});
  };
  $('#cvs-call-btn').click(function(){
    showContact('call');
  });
  $('#cvs-email-btn').click(function(){
    showContact('email');
  });

});
