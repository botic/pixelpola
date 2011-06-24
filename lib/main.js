/**
* @fileoverview Wrapper for ImageMagick. Tested with ImageMagick 6.6.7-1 2011-01-29 Q16 – http://www.imagemagick.org
*/
var subprocess = require("ringo/subprocess");

export("resize",
       "resizeToPercent",
       "resizePixelAreaCountLimit",
       "getIPTC",
       "getEXIF",
       "getSize",
       "getColorspace",
       "getDepth",
       "getCompression",
       "getQuality");

/* IPTC Records */
var _iptcRecords = [
   /* Envelope Record */
   ["1:00", "Model Version"],
   ["1:05", "Destination"],
   ["1:20", "File Format"],
   ["1:22", "File Format Version"],
   ["1:30", "Service Identifier"],
   ["1:40", "Envelope Number"],
   ["1:50", "Product ID"],
   ["1:60", "Envelope Priority"],
   ["1:70", "Date Sent"],
   ["1:80", "Time Sent"],
   ["1:90", "Coded Character Set"],
   ["1:100", "UNO"],
   ["1:120", "ARM Identifier"],
   ["1:122", "ARM Version"],
   /* Application Record */
   ["2:00", "Record Version"],
   ["2:03", "Object Type Reference"],
   ["2:05", "Title"],
   ["2:07", "Edit Status"],
   ["2:08", "Editorial Update"],
   ["2:10", "Urgency"],
   ["2:12", "Subject Reference"],
   ["2:15", "Category"],
   ["2:20", "Supplemental Category"],
   ["2:22", "Fixture Identifier"],
   ["2:25", "Keywords"],
   ["2:26", "Content Location Code"],
   ["2:27", "Content Location Name"],
   ["2:30", "Release Date"],
   ["2:35", "Release Time"],
   ["2:37", "Expiration Date"],
   ["2:35", "Expiration Time"],
   ["2:40", "Special Instructions"],
   ["2:42", "Action Advised"],
   ["2:45", "Reference Service"],
   ["2:47", "Reference Date"],
   ["2:50", "Reference Number"],
   ["2:55", "Date Created"],
   ["2:60", "Time Created"],
   ["2:62", "Digital Creation Date"],
   ["2:63", "Digital Creation Time"],
   ["2:65", "Originating Program"],
   ["2:70", "Program Version"],
   ["2:75", "Object Cycle"],
   ["2:80", "By-Line"],
   ["2:85", "By-Line Title"],
   ["2:90", "City"],
   ["2:92", "Sub-Location"],
   ["2:95", "Province/State"],
   ["2:100", "Country/Primary Location Code"],
   ["2:101", "Country/Primary Location Name"],
   ["2:103", "Original Transmission Reference"],
   ["2:105", "Headline"],
   ["2:110", "Credit"],
   ["2:115", "Source"],
   ["2:116", "Copyright Notice"],
   ["2:118", "Contact"],
   ["2:120", "Caption/Abstract"],
   ["2:122", "Caption Writer/Editor"],
   ["2:125", "Rasterized Caption"],
   ["2:130", "Image Type"],
   ["2:131", "Image Orientation"],
   ["2:135", "Language Identifier"],
   ["2:150", "Audio Type"],
   ["2:151", "Audio Sampling Rate"],
   ["2:152", "Audio Sampling Resolution"],
   ["2:153", "Audio Duration"],
   ["2:154", "Audio Outcue"],
   ["2:200", "ObjectData Preview File Format"],
   ["2:201", "ObjectData Preview File Format Version"],
   ["2:202", "ObjectData Preview Data"],
   /* Pre-ObjectData Descriptor Record */
   ["7:10", "Size Mode"],
   ["7:20", "Max Subfile Size"],
   ["7:90", "ObjectData Size Announced"],
   ["7:95", "Maximum ObjectData Size"],
   /* ObjectData Record */
   ["8:10", "Subfile"],
   /* Post ObjectData Descriptor Record */
   ["9:10", "Confirmed ObjectData Size"]
];

var _iptcFormatString = (_iptcRecords.map(function(item) {
   return "%[IPTC:" + item[0] + "]";
})).join("\\n");

var _pp_resize = function(src, dest, params) {
   var cmd = ["convert"];
   
   cmd.push(src);
   cmd.push("-resize");
   cmd.push(params);
   cmd.push(dest)
      
   return subprocess.command(cmd.join(" "));
};

/**
 * Resizes the image to the given size.
 * @param {String} src path to the source file
 * @param {String} dest path to the destination file
 * @param {Number} width destination file's boundary width
 * @param {Number} height destination file's boundary height
 * @param {String} flag ImageMagick flag: '!' Ignore Aspect Ratio, '&gt;' Only Shrink Larger,
 *    '&lt;' Only Enlarge Smaller, '^' Fill Given Area
 * @returns {String} ImageMagick output, default is none.
 */
var resize = function(src, dest, width, height, flag) {
   return _pp_resize(src, dest, width + "x" + height + (flag || ""));
};

/**
 * Resizes the image by the given percentage.
 * @param {String} src path to the source file
 * @param {String} dest path to the destination file
 * @param {Number} percentage amount to scale to
 * @returns {String} ImageMagick output, default is none.
 */
var resizeToPercent = function(src, dest, percentage) {
   return _pp_resize(src, dest, percentage + "%");
};

/**
 * Resizes an image to contain at most the the given number of pixels.
 * @param {String} src path to the source file
 * @param {String} dest path to the destination file
 * @param {Number} pixelCount amount of pixels at most in the resulting image.
 * @returns {String} ImageMagick output, default is none.
 */
var resizePixelAreaCountLimit = function(src, dest, pixelCount) {
   return _pp_resize(src, dest, pixelCount + "@");
};

/**
 * Extracts the IPTC records out of an image.
 * @param {String} src path to the source file
 * @returns {Object} an object containing all IPTC fields of an image.
 */
var getIPTC = function(src) {   
   var info = (subprocess.command("identify -format " + _iptcFormatString + " " + src)).split("\n");
   var iptcData = {};
   info.forEach(function(item, index) {
      if (item) {
        iptcData[_iptcRecords[index][1]] = item;
      }
   });

   return iptcData;
};

/**
 * Extracts the EXIF records out of an image.
 * @param {String} src path to the source file
 * @returns {Object} an object containing all EXIF fields of an image.
 */
var getEXIF = function(src) {   
   var info = (subprocess.command("identify -format %[EXIF:*] " + src)).split("\n");
   var exifData = {};
   info.forEach(function(item, index) {
      if (item) {
        var keyVal = item.substr(5).split("=");
        exifData[keyVal[0]] = keyVal[1];
      }
   });

   return exifData;
};

/**
 * Retrieves the size of the image.
 * @param {String} src path to the source file
 * @returns {Array} array containing the width and the height
 */
var getSize = function(src) {
   return (subprocess.command("identify -format %G " + src)).split("x");
};

/**
 * Retrieves the colorspace of the image.
 * @param {String} src path to the source file
 * @returns {String} the colorspace's name
 */
var getColorspace = function(src) {
   return subprocess.command("identify -format %[colorspace] " + src);
};

/**
 * Retrieves the depth of the image.
 * @param {String} src path to the source file
 * @returns {Number} the depth of the image
 */
var getDepth = function(src) {
   return parseInt(subprocess.command("identify -format %[depth] " + src), 10);
};

/**
 * Retrieves the compression algorithm used to encode the image.
 * @param {String} src path to the source file
 * @returns {String} the compression algorithm's name
 */
var getCompression = function(src) {
   return subprocess.command("identify -format %C " + src);
};

/**
 * Retrieves the encoding quality of the image.
 * @param {String} src path to the source file
 * @returns {String} the quality string
 */
var getQuality = function(src) {
   return subprocess.command("identify -format %Q " + src);
};