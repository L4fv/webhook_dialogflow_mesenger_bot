/**
 * @author https://jsfiddle.net/yasumodev/5gwm6kup/
 */
const ObjKeyRename = (src, map) => {
  var dst = {};
  for (var key in src) {
    if (key.trim() in map) {
      // rename key
      // console.log(src[key] instanceof Array);
      if (src[key] instanceof Array) {
        dst[map[key.trim()]] = src[key].map(i => ObjKeyRename(i, map));
      } else {
        dst[map[key.trim()]] = src[key];
      }
    } else {
      // same key
      dst[key] = src[key];
    }
  }
  return dst;
};

module.exports = {
  ObjKeyRename
};
