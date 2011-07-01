var assert = require("assert");
var pixelpola = require("../lib/main.js");

include("ringo/term");

exports.testGetIPTC = function() {
   var iptc = pixelpola.getIPTC("./rene-burri.jpg");
   
   assert.strictEqual(iptc["Title"], "Rene Burri");
   assert.strictEqual(iptc["Keywords"], "kunsthauswien;magnum;magnumphotos;reneburri;vienna;wien");
   assert.strictEqual(iptc["City"], "Vienna");
   assert.strictEqual(iptc["Country/Primary Location Name"], "Austria");
   assert.strictEqual(iptc["By-Line"], "Philipp Naderer");
   assert.strictEqual(iptc["Headline"], "Rene Burri inside the Kunsthaus in Vienna");
   assert.strictEqual(iptc["Copyright Notice"], "Philipp Naderer");
   
};

exports.testGetEXIF = function() {
   var exif = pixelpola.getEXIF("./rene-burri.jpg");
   
   assert.strictEqual(exif["Artist"], "Philipp Naderer");
   assert.strictEqual(exif["Copyright"], "Philipp Naderer");
   assert.strictEqual(exif["FocalLengthIn35mmFilm"], "45");
   assert.strictEqual(exif["ExifImageLength"], "531");
   assert.strictEqual(exif["ExifImageWidth"], "800");
   assert.strictEqual(exif["Make"], "NIKON CORPORATION");
   assert.strictEqual(exif["Model"], "NIKON D300");
   assert.strictEqual(exif["ShutterSpeedValue"], "5321928/1000000");
   assert.strictEqual(exif["SubjectDistance"], "282/100");
   assert.strictEqual(exif["Compression"], "6");
   
};

exports.testGetSize = function() {
   assert.strictEqual(pixelpola.getSize("./rene-burri.jpg")[0], 800);
   assert.strictEqual(pixelpola.getSize("./rene-burri.jpg")[1], 531);
   assert.strictEqual(pixelpola.getSize("./magnum.png")[0], 180);
   assert.strictEqual(pixelpola.getSize("./magnum.png")[1], 180);
};

exports.testGetColorspace = function() {
   assert.strictEqual(pixelpola.getColorspace("./rene-burri.jpg"), "RGB");
   assert.strictEqual(pixelpola.getColorspace("./magnum.png"), "Gray");
};

exports.testGetDepth = function() {
   assert.strictEqual(pixelpola.getDepth("./rene-burri.jpg"), 8);
};

exports.testGetCompression = function() {
   assert.strictEqual(pixelpola.getCompression("./rene-burri.jpg"), "JPEG");
   assert.strictEqual(pixelpola.getCompression("./magnum.png"), "Zip");
};

exports.testGetQuality = function() {
   assert.strictEqual(pixelpola.getQuality("./rene-burri.jpg"), 93);
   assert.strictEqual(pixelpola.getQuality("./magnum.png"), 0);
};

if (require.main == module) {
    require("test").run(exports);
}