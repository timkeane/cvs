var finderStyle = function(feature, resolution){
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  var count = feature.getCountAtLocation();
  finderStyle.cache[zoom] = finderStyle.cache[zoom] || {};
  if (!finderStyle.cache[zoom][count]){
    var size = 12;
    if (zoom > 11) size = 16;
    if (zoom > 13) size = 24;
    if (zoom > 15) size = 32;
    if (zoom > 17) size = 40;
    var style = [
      new ol.style.Style({
        image: new ol.style.Icon({
          src: 'img/' + (count == 1 ? 'icon.svg' : 'stack.svg'),
          scale: size / 33,
          imgSize: [33, 33]
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
            offsetX: 5 * size / 33,
            offsetY: -4 * size / 33,
            textAlign: 'center',
            scale: size / 33
          })
        })
      );
    }
    finderStyle.cache[zoom][count] = style;
  }
  return finderStyle.cache[zoom][count];
};

finderStyle.cache = {};
