var finderStyle = function(feature, resolution){
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  var color = feature.getCountAtLocation() > 1 ? 'rgba(255,0,0,0.5)' : 'rgba(0,0,255,0.5)'
  finderStyle.cache[zoom] = finderStyle.cache[zoom] || {};
  if (!finderStyle.cache[zoom][color]){
    var radius = 4;
    if (zoom > 11) radius = 8;
    if (zoom > 14) radius = 12;
    finderStyle.cache[zoom][color] = new ol.style.Style({
      image: new ol.style.Circle({
        radius: radius,
        fill: new ol.style.Fill({
          color: color
        }),
        stroke: new ol.style.Stroke({
          color: '#0000ff',
          width: 1
        })
      })
    });
  }
  return finderStyle.cache[zoom][color];
};

finderStyle.cache = {};
