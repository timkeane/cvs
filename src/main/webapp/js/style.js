var finderStyle = function(feature, resolution){
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  if (!finderStyle.cache[zoom]){
    var radius = 4;
    if (zoom > 11) radius = 8;
    if (zoom > 14) radius = 12;
    finderStyle.cache[zoom] = new ol.style.Style({
      image: new ol.style.Circle({
        radius: radius,
        fill: new ol.style.Fill({
          color: 'rgba(0,0,255,0.5)'
        }),
        stroke: new ol.style.Stroke({
          color: '#0000ff',
          width: 1
        })
      })
    });
  }
  return finderStyle.cache[zoom];
};

finderStyle.cache = {};
