# pixelpola

A simple [ImageMagick](http://www.imagemagick.org/) wrapper for [RingoJS](http://ringojs.org/).

Example:

    var pp = require("pixelpola");
    pp.getSize(src); // [ 3855, 2565 ]
    pp.getColorspace(src); // 'RGB'
    pp.getDepth(src); // 8
    pp.getCompression(src); // 'JPEG'
    pp.getQuality(src); // '99'
    pp.getIPTC(src);    // { Title: 'Photo of PX Color Shade film', Keywords: 'polaroid;film;impossible', By-Line: 'Philipp Naderer', 'Copyright Notice': 'Philipp Naderer' }
    pp.getEXIF(src);    // { ApertureValue: '2/1', CFAPattern: '2, 0, 2, 0, 0, 1, 1, 2', .... ISOSpeedRatings: '400', Model: 'NIKON D700'}
    
## License (MIT)

Copyright (c) 2011 Philipp Naderer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
