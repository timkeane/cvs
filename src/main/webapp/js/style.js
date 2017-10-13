var finderStyle = function(feature, resolution){
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  var idx = feature.locationIdx;
  finderStyle.cache[zoom] = finderStyle.cache[zoom] || {};
  if (!finderStyle.cache[zoom][idx]){
    var scale = 12;
    if (zoom > 11) scale = 16;
    if (zoom > 14) scale = 24;
    if (zoom > 17) scale = 32;
    finderStyle.cache[zoom][idx] = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'img/icon.svg',
        anchor: [.5 + (-.12 * idx), .5 + (.12 * idx)],
        scale: scale / 24
      })
    });
  }
  return finderStyle.cache[zoom][idx];
};

finderStyle.cache = {};
