var finderStyle = function(feature, resolution){
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  var count = feature.getCountAtLocation();
  finderStyle.cache[zoom] = finderStyle.cache[zoom] || {};
  if (!finderStyle.cache[zoom][count]){
    var scale = 12;
    if (zoom > 11) scale = 16;
    if (zoom > 14) scale = 24;
    if (zoom > 17) scale = 32;
    var style = [
      new ol.style.Style({
        image: new ol.style.Icon({
          src: 'img/' + (count == 1 ? 'icon.svg' : 'stack.svg'),
          scale: scale / 33
        })
      })
    ];
    if (zoom > 13 && count > 1) {
      style.push(
        new ol.style.Style({
          text: new ol.style.Text({
            fill: new ol.style.Fill({color: '#fff'}),
            font: '20px sans-serif',
            text: count + '',
            offsetX: 5 * scale / 33,
            offsetY: -4 * scale / 33,
            textAlign: 'center',
            scale: scale / 33
          })
        })
      );
    }
    finderStyle.cache[zoom][count] = style;
  }
  return finderStyle.cache[zoom][count];
};

finderStyle.cache = {};
