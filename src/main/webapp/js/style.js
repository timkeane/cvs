var finderStyle = function(feature, resolution){
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  var many = feature.getCountAtLocation() > 1;
  finderStyle.cache[zoom] = finderStyle.cache[zoom] || {};
  if (!finderStyle.cache[zoom][many]){
    var radius = 4;
    if (zoom > 11) radius = 8;
    if (zoom > 14) radius = 12;
    finderStyle.cache[zoom][many] = new ol.style.Style({
      image: finderStyle.getImage(many, radius)
    });
  }
  return finderStyle.cache[zoom][many];
};

finderStyle.getImage = function(many, radius){
  if (many){
    return new ol.style.Icon({
      scale: 4.5 * radius / 90,
      src: 'img/stack.svg'
    });
  }else{
    return new ol.style.Circle({
      radius: radius,
      fill: new ol.style.Fill({
        color: '#38c'
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 1.5
      })
    });
  }
};

finderStyle.cache = {};
