/**
*
* jquery.sparkline.js
*
* v2.1.2
* (c) Splunk, Inc
* Contact: Gareth Watts (gareth@splunk.com)
* http://omnipotent.net/jquery.sparkline/
*
* Generates inline sparkline charts from data supplied either to the method
* or inline in HTML
*
* Compatible with Internet Explorer 6.0+ and modern browsers equipped with the canvas tag
* (Firefox 2.0+, Safari, Opera, etc)
*
* License: New BSD License
*
* Copyright (c) 2012, Splunk Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright notice,
*       this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright notice,
*       this list of conditions and the following disclaimer in the documentation
*       and/or other materials provided with the distribution.
*     * Neither the name of Splunk Inc nor the names of its contributors may
*       be used to endorse or promote products derived from this software without
*       specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
* SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
* OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
*
* Usage:
*  $(selector).sparkline(values, options)
*
* If values is undefined or set to 'html' then the data values are read from the specified tag:
*   <p>Sparkline: <span class="sparkline">1,4,6,6,8,5,3,5</span></p>
*   $('.sparkline').sparkline();
* There must be no spaces in the enclosed data set
*
* Otherwise values must be an array of numbers or null values
*    <p>Sparkline: <span id="sparkline1">This text replaced if the browser is compatible</span></p>
*    $('#sparkline1').sparkline([1,4,6,6,8,5,3,5])
*    $('#sparkline2').sparkline([1,4,6,null,null,5,3,5])
*
* Values can also be specified in an HTML comment, or as a values attribute:
*    <p>Sparkline: <span class="sparkline"><!--1,4,6,6,8,5,3,5 --></span></p>
*    <p>Sparkline: <span class="sparkline" values="1,4,6,6,8,5,3,5"></span></p>
*    $('.sparkline').sparkline();
*
* For line charts, x values can also be specified:
*   <p>Sparkline: <span class="sparkline">1:1,2.7:4,3.4:6,5:6,6:8,8.7:5,9:3,10:5</span></p>
*    $('#sparkline1').sparkline([ [1,1], [2.7,4], [3.4,6], [5,6], [6,8], [8.7,5], [9,3], [10,5] ])
*
* By default, options should be passed in as teh second argument to the sparkline function:
*   $('.sparkline').sparkline([1,2,3,4], {type: 'bar'})
*
* Options can also be set by passing them on the tag itself.  This feature is disabled by default though
* as there's a slight performance overhead:
*   $('.sparkline').sparkline([1,2,3,4], {enableTagOptions: true})
*   <p>Sparkline: <span class="sparkline" sparkType="bar" sparkBarColor="red">loading</span></p>
* Prefix all options supplied as tag attribute with "spark" (configurable by setting tagOptionPrefix)
*
* Supported options:
*   lineColor - Color of the line used for the chart
*   fillColor - Color used to fill in the chart - Set to '' or false for a transparent chart
*   width - Width of the chart - Defaults to 3 times the number of values in pixels
*   height - Height of the chart - Defaults to the height of the containing element
*   chartRangeMin - Specify the minimum value to use for the Y range of the chart - Defaults to the minimum value supplied
*   chartRangeMax - Specify the maximum value to use for the Y range of the chart - Defaults to the maximum value supplied
*   chartRangeClip - Clip out of range values to the max/min specified by chartRangeMin and chartRangeMax
*   chartRangeMinX - Specify the minimum value to use for the X range of the chart - Defaults to the minimum value supplied
*   chartRangeMaxX - Specify the maximum value to use for the X range of the chart - Defaults to the maximum value supplied
*   composite - If true then don't erase any existing chart attached to the tag, but draw
*           another chart over the top - Note that width and height are ignored if an
*           existing chart is detected.
*   tagValuesAttribute - Name of tag attribute to check for data values - Defaults to 'values'
*   enableTagOptions - Whether to check tags for sparkline options
*   tagOptionPrefix - Prefix used for options supplied as tag attributes - Defaults to 'spark'
*   disableHiddenCheck - If set to true, then the plugin will assume that charts will never be drawn into a
*           hidden dom element, avoding a browser reflow
*   disableInteraction - If set to true then all mouseover/click interaction behaviour will be disabled,
*       making the plugin perform much like it did in 1.x
*   disableTooltips - If set to true then tooltips will be disabled - Defaults to false (tooltips enabled)
*   disableHighlight - If set to true then highlighting of selected chart elements on mouseover will be disabled
*       defaults to false (highlights enabled)
*   highlightLighten - Factor to lighten/darken highlighted chart values by - Defaults to 1.4 for a 40% increase
*   tooltipContainer - Specify which DOM element the tooltip should be rendered into - defaults to document.body
*   tooltipClassname - Optional CSS classname to apply to tooltips - If not specified then a default style will be applied
*   tooltipOffsetX - How many pixels away from the mouse pointer to render the tooltip on the X axis
*   tooltipOffsetY - How many pixels away from the mouse pointer to render the tooltip on the r axis
*   tooltipFormatter  - Optional callback that allows you to override the HTML displayed in the tooltip
*       callback is given arguments of (sparkline, options, fields)
*   tooltipChartTitle - If specified then the tooltip uses the string specified by this setting as a title
*   tooltipFormat - A format string or SPFormat object  (or an array thereof for multiple entries)
*       to control the format of the tooltip
*   tooltipPrefix - A string to prepend to each field displayed in a tooltip
*   tooltipSuffix - A string to append to each field displayed in a tooltip
*   tooltipSkipNull - If true then null values will not have a tooltip displayed (defaults to true)
*   tooltipValueLookups - An object or range map to map field values to tooltip strings
*       (eg. to map -1 to "Lost", 0 to "Draw", and 1 to "Win")
*   numberFormatter - Optional callback for formatting numbers in tooltips
*   numberDigitGroupSep - Character to use for group separator in numbers "1,234" - Defaults to ","
*   numberDecimalMark - Character to use for the decimal point when formatting numbers - Defaults to "."
*   numberDigitGroupCount - Number of digits between group separator - Defaults to 3
*
* There are 7 types of sparkline, selected by supplying a "type" option of 'line' (default),
* 'bar', 'tristate', 'bullet', 'discrete', 'pie' or 'box'
*    line - Line chart.  Options:
*       spotColor - Set to '' to not end each line in a circular spot
*       minSpotColor - If set, color of spot at minimum value
*       maxSpotColor - If set, color of spot at maximum value
*       spotRadius - Radius in pixels
*       lineWidth - Width of line in pixels
*       normalRangeMin
*       normalRangeMax - If set draws a filled horizontal bar between these two values marking the "normal"
*                      or expected range of values
*       normalRangeColor - Color to use for the above bar
*       drawNormalOnTop - Draw the normal range above the chart fill color if true
*       defaultPixelsPerValue - Defaults to 3 pixels of width for each value in the chart
*       highlightSpotColor - The color to use for drawing a highlight spot on mouseover - Set to null to disable
*       highlightLineColor - The color to use for drawing a highlight line on mouseover - Set to null to disable
*       valueSpots - Specify which points to draw spots on, and in which color.  Accepts a range map
*
*   bar - Bar chart.  Options:
*       barColor - Color of bars for postive values
*       negBarColor - Color of bars for negative values
*       zeroColor - Color of bars with zero values
*       nullColor - Color of bars with null values - Defaults to omitting the bar entirely
*       barWidth - Width of bars in pixels
*       colorMap - Optional mappnig of values to colors to override the *BarColor values above
*                  can be an Array of values to control the color of individual bars or a range map
*                  to specify colors for individual ranges of values
*       barSpacing - Gap between bars in pixels
*       zeroAxis - Centers the y-axis around zero if true
*
*   tristate - Charts values of win (>0), lose (<0) or draw (=0)
*       posBarColor - Color of win values
*       negBarColor - Color of lose values
*       zeroBarColor - Color of draw values
*       barWidth - Width of bars in pixels
*       barSpacing - Gap between bars in pixels
*       colorMap - Optional mappnig of values to colors to override the *BarColor values above
*                  can be an Array of values to control the color of individual bars or a range map
*                  to specify colors for individual ranges of values
*
*   discrete - Options:
*       lineHeight - Height of each line in pixels - Defaults to 30% of the graph height
*       thesholdValue - Values less than this value will be drawn using thresholdColor instead of lineColor
*       thresholdColor
*
*   bullet - Values for bullet graphs msut be in the order: target, performance, range1, range2, range3, ...
*       options:
*       targetColor - The color of the vertical target marker
*       targetWidth - The width of the target marker in pixels
*       performanceColor - The color of the performance measure horizontal bar
*       rangeColors - Colors to use for each qualitative range background color
*
*   pie - Pie chart. Options:
*       sliceColors - An array of colors to use for pie slices
*       offset - Angle in degrees to offset the first slice - Try -90 or +90
*       borderWidth - Width of border to draw around the pie chart, in pixels - Defaults to 0 (no border)
*       borderColor - Color to use for the pie chart border - Defaults to #000
*
*   box - Box plot. Options:
*       raw - Set to true to supply pre-computed plot points as values
*             values should be: low_outlier, low_whisker, q1, median, q3, high_whisker, high_outlier
*             When set to false you can supply any number of values and the box plot will
*             be computed for you.  Default is false.
*       showOutliers - Set to true (default) to display outliers as circles
*       outlierIQR - Interquartile range used to determine outliers.  Default 1.5
*       boxLineColor - Outline color of the box
*       boxFillColor - Fill color for the box
*       whiskerColor - Line color used for whiskers
*       outlierLineColor - Outline color of outlier circles
*       outlierFillColor - Fill color of the outlier circles
*       spotRadius - Radius of outlier circles
*       medianColor - Line color of the median line
*       target - Draw a target cross hair at the supplied value (default undefined)
*
*
*
*   Examples:
*   $('#sparkline1').sparkline(myvalues, { lineColor: '#f00', fillColor: false });
*   $('.barsparks').sparkline('html', { type:'bar', height:'40px', barWidth:5 });
*   $('#tristate').sparkline([1,1,-1,1,0,0,-1], { type:'tristate' }):
*   $('#discrete').sparkline([1,3,4,5,5,3,4,5], { type:'discrete' });
*   $('#bullet').sparkline([10,12,12,9,7], { type:'bullet' });
*   $('#pie').sparkline([1,1,2], { type:'pie' });
*/

/*jslint regexp: true, browser: true, jquery: true, white: true, nomen: false, plusplus: false, maxerr: 500, indent: 4 */

(function(document, Math, undefined) { // performance/minified-size optimization
(function(factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (jQuery && !jQuery.fn.sparkline) {
        factory(jQuery);
    }
}
(function($) {
    'use strict';

    var UNSET_OPTION = {},
        getDefaults, createClass, SPFormat, clipval, quartile, normalizeValue, normalizeValues,
        remove, isNumber, all, sum, addCSS, ensureArray, formatNumber, RangeMap,
        MouseHandler, Tooltip, barHighlightMixin,
        line, bar, tristate, discrete, bullet, pie, box, defaultStyles, initStyles,
        VShape, VCanvas_base, VCanvas_canvas, VCanvas_vml, pending, shapeCount = 0;

    /**
     * Default configuration settings
     */
    getDefaults = function () {
        return {
            // Settings common to most/all chart types
            common: {
                type: 'line',
                lineColor: '#00f',
                fillColor: '#cdf',
                defaultPixelsPerValue: 3,
                width: 'auto',
                height: 'auto',
                composite: false,
                tagValuesAttribute: 'values',
                tagOptionsPrefix: 'spark',
                enableTagOptions: false,
                enableHighlight: true,
                highlightLighten: 1.4,
                tooltipSkipNull: true,
                tooltipPrefix: '',
                tooltipSuffix: '',
                disableHiddenCheck: false,
                numberFormatter: false,
                numberDigitGroupCount: 3,
                numberDigitGroupSep: ',',
                numberDecimalMark: '.',
                disableTooltips: false,
                disableInteraction: false
            },
            // Defaults for line charts
            line: {
                spotColor: '#f80',
                highlightSpotColor: '#5f5',
                highlightLineColor: '#f22',
                spotRadius: 1.5,
                minSpotColor: '#f80',
                maxSpotColor: '#f80',
                lineWidth: 1,
                normalRangeMin: undefined,
                normalRangeMax: undefined,
                normalRangeColor: '#ccc',
                drawNormalOnTop: false,
                chartRangeMin: undefined,
                chartRangeMax: undefined,
                chartRangeMinX: undefined,
                chartRangeMaxX: undefined,
                tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
            },
            // Defaults for bar charts
            bar: {
                barColor: '#3366cc',
                negBarColor: '#f44',
                stackedBarColor: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#66aa00',
                    '#dd4477', '#0099c6', '#990099'],
                zeroColor: undefined,
                nullColor: undefined,
                zeroAxis: true,
                barWidth: 4,
                barSpacing: 1,
                chartRangeMax: undefined,
                chartRangeMin: undefined,
                chartRangeClip: false,
                colorMap: undefined,
                tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
            },
            // Defaults for tristate charts
            tristate: {
                barWidth: 4,
                barSpacing: 1,
                posBarColor: '#6f6',
                negBarColor: '#f44',
                zeroBarColor: '#999',
                colorMap: {},
                tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
                tooltipValueLookups: { map: { '-1': 'Loss', '0': 'Draw', '1': 'Win' } }
            },
            // Defaults for discrete charts
            discrete: {
                lineHeight: 'auto',
                thresholdColor: undefined,
                thresholdValue: 0,
                chartRangeMax: undefined,
                chartRangeMin: undefined,
                chartRangeClip: false,
                tooltipFormat: new SPFormat('{{prefix}}{{value}}{{suffix}}')
            },
            // Defaults for bullet charts
            bullet: {
                targetColor: '#f33',
                targetWidth: 3, // width of the target bar in pixels
                performanceColor: '#33f',
                rangeColors: ['#d3dafe', '#a8b6ff', '#7f94ff'],
                base: undefined, // set this to a number to change the base start number
                tooltipFormat: new SPFormat('{{fieldkey:fields}} - {{value}}'),
                tooltipValueLookups: { fields: {r: 'Range', p: 'Performance', t: 'Target'} }
            },
            // Defaults for pie charts
            pie: {
                offset: 0,
                sliceColors: ['#3366cc', '#dc3912', '#ff9900', '#109618', '#66aa00',
                    '#dd4477', '#0099c6', '#990099'],
                borderWidth: 0,
                borderColor: '#000',
                tooltipFormat: new SPFormat('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
            },
            // Defaults for box plots
            box: {
                raw: false,
                boxLineColor: '#000',
                boxFillColor: '#cdf',
                whiskerColor: '#000',
                outlierLineColor: '#333',
                outlierFillColor: '#fff',
                medianColor: '#f00',
                showOutliers: true,
                outlierIQR: 1.5,
                spotRadius: 1.5,
                target: undefined,
                targetColor: '#4a2',
                chartRangeMax: undefined,
                chartRangeMin: undefined,
                tooltipFormat: new SPFormat('{{field:fields}}: {{value}}'),
                tooltipFormatFieldlistKey: 'field',
                tooltipValueLookups: { fields: { lq: 'Lower Quartile', med: 'Median',
                    uq: 'Upper Quartile', lo: 'Left Outlier', ro: 'Right Outlier',
                    lw: 'Left Whisker', rw: 'Right Whisker'} }
            }
        };
    };

    // You can have tooltips use a css class other than jqstooltip by specifying tooltipClassname
    defaultStyles = '.jqstooltip { ' +
            'position: absolute;' +
            'left: 0px;' +
            'top: 0px;' +
            'visibility: hidden;' +
            'background: rgb(0, 0, 0) transparent;' +
            'background-color: rgba(0,0,0,0.6);' +
            'filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);' +
            '-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";' +
            'color: white;' +
            'font: 10px arial, san serif;' +
            'text-align: left;' +
            'white-space: nowrap;' +
            'padding: 5px;' +
            'border: 1px solid white;' +
            'z-index: 10000;' +
            '}' +
            '.jqsfield { ' +
            'color: white;' +
            'font: 10px arial, san serif;' +
            'text-align: left;' +
            '}';

    /**
     * Utilities
     */

    createClass = function (/* [baseclass, [mixin, ...]], definition */) {
        var Class, args;
        Class = function () {
            this.init.apply(this, arguments);
        };
        if (arguments.length > 1) {
            if (arguments[0]) {
                Class.prototype = $.extend(new arguments[0](), arguments[arguments.length - 1]);
                Class._super = arguments[0].prototype;
            } else {
                Class.prototype = arguments[arguments.length - 1];
            }
            if (arguments.length > 2) {
                args = Array.prototype.slice.call(arguments, 1, -1);
                args.unshift(Class.prototype);
                $.extend.apply($, args);
            }
        } else {
            Class.prototype = arguments[0];
        }
        Class.prototype.cls = Class;
        return Class;
    };

    /**
     * Wraps a format string for tooltips
     * {{x}}
     * {{x.2}
     * {{x:months}}
     */
    $.SPFormatClass = SPFormat = createClass({
        fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
        precre: /(\w+)\.(\d+)/,

        init: function (format, fclass) {
            this.format = format;
            this.fclass = fclass;
        },

        render: function (fieldset, lookups, options) {
            var self = this,
                fields = fieldset,
                match, token, lookupkey, fieldvalue, prec;
            return this.format.replace(this.fre, function () {
                var lookup;
                token = arguments[1];
                lookupkey = arguments[3];
                match = self.precre.exec(token);
                if (match) {
                    prec = match[2];
                    token = match[1];
                } else {
                    prec = false;
                }
                fieldvalue = fields[token];
                if (fieldvalue === undefined) {
                    return '';
                }
                if (lookupkey && lookups && lookups[lookupkey]) {
                    lookup = lookups[lookupkey];
                    if (lookup.get) { // RangeMap
                        return lookups[lookupkey].get(fieldvalue) || fieldvalue;
                    } else {
                        return lookups[lookupkey][fieldvalue] || fieldvalue;
                    }
                }
                if (isNumber(fieldvalue)) {
                    if (options.get('numberFormatter')) {
                        fieldvalue = options.get('numberFormatter')(fieldvalue);
                    } else {
                        fieldvalue = formatNumber(fieldvalue, prec,
                            options.get('numberDigitGroupCount'),
                            options.get('numberDigitGroupSep'),
                            options.get('numberDecimalMark'));
                    }
                }
                return fieldvalue;
            });
        }
    });

    // convience method to avoid needing the new operator
    $.spformat = function(format, fclass) {
        return new SPFormat(format, fclass);
    };

    clipval = function (val, min, max) {
        if (val < min) {
            return min;
        }
        if (val > max) {
            return max;
        }
        return val;
    };

    quartile = function (values, q) {
        var vl;
        if (q === 2) {
            vl = Math.floor(values.length / 2);
            return values.length % 2 ? values[vl] : (values[vl-1] + values[vl]) / 2;
        } else {
            if (values.length % 2 ) { // odd
                vl = (values.length * q + q) / 4;
                return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 : values[vl-1];
            } else { //even
                vl = (values.length * q + 2) / 4;
                return vl % 1 ? (values[Math.floor(vl)] + values[Math.floor(vl) - 1]) / 2 :  values[vl-1];

            }
        }
    };

    normalizeValue = function (val) {
        var nf;
        switch (val) {
            case 'undefined':
                val = undefined;
                break;
            case 'null':
                val = null;
                break;
            case 'true':
                val = true;
                break;
            case 'false':
                val = false;
                break;
            default:
                nf = parseFloat(val);
                if (val == nf) {
                    val = nf;
                }
        }
        return val;
    };

    normalizeValues = function (vals) {
        var i, result = [];
        for (i = vals.length; i--;) {
            result[i] = normalizeValue(vals[i]);
        }
        return result;
    };

    remove = function (vals, filter) {
        var i, vl, result = [];
        for (i = 0, vl = vals.length; i < vl; i++) {
            if (vals[i] !== filter) {
                result.push(vals[i]);
            }
        }
        return result;
    };

    isNumber = function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    };

    formatNumber = function (num, prec, groupsize, groupsep, decsep) {
        var p, i;
        num = (prec === false ? parseFloat(num).toString() : num.toFixed(prec)).split('');
        p = (p = $.inArray('.', num)) < 0 ? num.length : p;
        if (p < num.length) {
            num[p] = decsep;
        }
        for (i = p - groupsize; i > 0; i -= groupsize) {
            num.splice(i, 0, groupsep);
        }
        return num.join('');
    };

    // determine if all values of an array match a value
    // returns true if the array is empty
    all = function (val, arr, ignoreNull) {
        var i;
        for (i = arr.length; i--; ) {
            if (ignoreNull && arr[i] === null) continue;
            if (arr[i] !== val) {
                return false;
            }
        }
        return true;
    };

    // sums the numeric values in an array, ignoring other values
    sum = function (vals) {
        var total = 0, i;
        for (i = vals.length; i--;) {
            total += typeof vals[i] === 'number' ? vals[i] : 0;
        }
        return total;
    };

    ensureArray = function (val) {
        return $.isArray(val) ? val : [val];
    };

    // http://paulirish.com/2008/bookmarklet-inject-new-css-rules/
    addCSS = function(css) {
        var tag;
        //if ('\v' == 'v') /* ie only */ {
        if (document.createStyleSheet) {
            document.createStyleSheet().cssText = css;
        } else {
            tag = document.createElement('style');
            tag.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(tag);
            tag[(typeof document.body.style.WebkitAppearance == 'string') /* webkit only */ ? 'innerText' : 'innerHTML'] = css;
        }
    };

    // Provide a cross-browser interface to a few simple drawing primitives
    $.fn.simpledraw = function (width, height, useExisting, interact) {
        var target, mhandler;
        if (useExisting && (target = this.data('_jqs_vcanvas'))) {
            return target;
        }

        if ($.fn.sparkline.canvas === false) {
            // We've already determined that neither Canvas nor VML are available
            return false;

        } else if ($.fn.sparkline.canvas === undefined) {
            // No function defined yet -- need to see if we support Canvas or VML
            var el = document.createElement('canvas');
            if (!!(el.getContext && el.getContext('2d'))) {
                // Canvas is available
                $.fn.sparkline.canvas = function(width, height, target, interact) {
                    return new VCanvas_canvas(width, height, target, interact);
                };
            } else if (document.namespaces && !document.namespaces.v) {
                // VML is available
                document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
                $.fn.sparkline.canvas = function(width, height, target, interact) {
                    return new VCanvas_vml(width, height, target);
                };
            } else {
                // Neither Canvas nor VML are available
                $.fn.sparkline.canvas = false;
                return false;
            }
        }

        if (width === undefined) {
            width = $(this).innerWidth();
        }
        if (height === undefined) {
            height = $(this).innerHeight();
        }

        target = $.fn.sparkline.canvas(width, height, this, interact);

        mhandler = $(this).data('_jqs_mhandler');
        if (mhandler) {
            mhandler.registerCanvas(target);
        }
        return target;
    };

    $.fn.cleardraw = function () {
        var target = this.data('_jqs_vcanvas');
        if (target) {
            target.reset();
        }
    };

    $.RangeMapClass = RangeMap = createClass({
        init: function (map) {
            var key, range, rangelist = [];
            for (key in map) {
                if (map.hasOwnProperty(key) && typeof key === 'string' && key.indexOf(':') > -1) {
                    range = key.split(':');
                    range[0] = range[0].length === 0 ? -Infinity : parseFloat(range[0]);
                    range[1] = range[1].length === 0 ? Infinity : parseFloat(range[1]);
                    range[2] = map[key];
                    rangelist.push(range);
                }
            }
            this.map = map;
            this.rangelist = rangelist || false;
        },

        get: function (value) {
            var rangelist = this.rangelist,
                i, range, result;
            if ((result = this.map[value]) !== undefined) {
                return result;
            }
            if (rangelist) {
                for (i = rangelist.length; i--;) {
                    range = rangelist[i];
                    if (range[0] <= value && range[1] >= value) {
                        return range[2];
                    }
                }
            }
            return undefined;
        }
    });

    // Convenience function
    $.range_map = function(map) {
        return new RangeMap(map);
    };

    MouseHandler = createClass({
        init: function (el, options) {
            var $el = $(el);
            this.$el = $el;
            this.options = options;
            this.currentPageX = 0;
            this.currentPageY = 0;
            this.el = el;
            this.splist = [];
            this.tooltip = null;
            this.over = false;
            this.displayTooltips = !options.get('disableTooltips');
            this.highlightEnabled = !options.get('disableHighlight');
        },

        registerSparkline: function (sp) {
            this.splist.push(sp);
            if (this.over) {
                this.updateDisplay();
            }
        },

        registerCanvas: function (canvas) {
            var $canvas = $(canvas.canvas);
            this.canvas = canvas;
            this.$canvas = $canvas;
            $canvas.mouseenter($.proxy(this.mouseenter, this));
            $canvas.mouseleave($.proxy(this.mouseleave, this));
            $canvas.click($.proxy(this.mouseclick, this));
        },

        reset: function (removeTooltip) {
            this.splist = [];
            if (this.tooltip && removeTooltip) {
                this.tooltip.remove();
                this.tooltip = undefined;
            }
        },

        mouseclick: function (e) {
            var clickEvent = $.Event('sparklineClick');
            clickEvent.originalEvent = e;
            clickEvent.sparklines = this.splist;
            this.$el.trigger(clickEvent);
        },

        mouseenter: function (e) {
            $(document.body).unbind('mousemove.jqs');
            $(document.body).bind('mousemove.jqs', $.proxy(this.mousemove, this));
            this.over = true;
            this.currentPageX = e.pageX;
            this.currentPageY = e.pageY;
            this.currentEl = e.target;
            if (!this.tooltip && this.displayTooltips) {
                this.tooltip = new Tooltip(this.options);
                this.tooltip.updatePosition(e.pageX, e.pageY);
            }
            this.updateDisplay();
        },

        mouseleave: function () {
            $(document.body).unbind('mousemove.jqs');
            var splist = this.splist,
                 spcount = splist.length,
                 needsRefresh = false,
                 sp, i;
            this.over = false;
            this.currentEl = null;

            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }

            for (i = 0; i < spcount; i++) {
                sp = splist[i];
                if (sp.clearRegionHighlight()) {
                    needsRefresh = true;
                }
            }

            if (needsRefresh) {
                this.canvas.render();
            }
        },

        mousemove: function (e) {
            this.currentPageX = e.pageX;
            this.currentPageY = e.pageY;
            this.currentEl = e.target;
            if (this.tooltip) {
                this.tooltip.updatePosition(e.pageX, e.pageY);
            }
            this.updateDisplay();
        },

        updateDisplay: function () {
            var splist = this.splist,
                 spcount = splist.length,
                 needsRefresh = false,
                 offset = this.$canvas.offset(),
                 localX = this.currentPageX - offset.left,
                 localY = this.currentPageY - offset.top,
                 tooltiphtml, sp, i, result, changeEvent;
            if (!this.over) {
                return;
            }
            for (i = 0; i < spcount; i++) {
                sp = splist[i];
                result = sp.setRegionHighlight(this.currentEl, localX, localY);
                if (result) {
                    needsRefresh = true;
                }
            }
            if (needsRefresh) {
                changeEvent = $.Event('sparklineRegionChange');
                changeEvent.sparklines = this.splist;
                this.$el.trigger(changeEvent);
                if (this.tooltip) {
                    tooltiphtml = '';
                    for (i = 0; i < spcount; i++) {
                        sp = splist[i];
                        tooltiphtml += sp.getCurrentRegionTooltip();
                    }
                    this.tooltip.setContent(tooltiphtml);
                }
                if (!this.disableHighlight) {
                    this.canvas.render();
                }
            }
            if (result === null) {
                this.mouseleave();
            }
        }
    });


    Tooltip = createClass({
        sizeStyle: 'position: static !important;' +
            'display: block !important;' +
            'visibility: hidden !important;' +
            'float: left !important;',

        init: function (options) {
            var tooltipClassname = options.get('tooltipClassname', 'jqstooltip'),
                sizetipStyle = this.sizeStyle,
                offset;
            this.container = options.get('tooltipContainer') || document.body;
            this.tooltipOffsetX = options.get('tooltipOffsetX', 10);
            this.tooltipOffsetY = options.get('tooltipOffsetY', 12);
            // remove any previous lingering tooltip
            $('#jqssizetip').remove();
            $('#jqstooltip').remove();
            this.sizetip = $('<div/>', {
                id: 'jqssizetip',
                style: sizetipStyle,
                'class': tooltipClassname
            });
            this.tooltip = $('<div/>', {
                id: 'jqstooltip',
                'class': tooltipClassname
            }).appendTo(this.container);
            // account for the container's location
            offset = this.tooltip.offset();
            this.offsetLeft = offset.left;
            this.offsetTop = offset.top;
            this.hidden = true;
            $(window).unbind('resize.jqs scroll.jqs');
            $(window).bind('resize.jqs scroll.jqs', $.proxy(this.updateWindowDims, this));
            this.updateWindowDims();
        },

        updateWindowDims: function () {
            this.scrollTop = $(window).scrollTop();
            this.scrollLeft = $(window).scrollLeft();
            this.scrollRight = this.scrollLeft + $(window).width();
            this.updatePosition();
        },

        getSize: function (content) {
            this.sizetip.html(content).appendTo(this.container);
            this.width = this.sizetip.width() + 1;
            this.height = this.sizetip.height();
            this.sizetip.remove();
        },

        setContent: function (content) {
            if (!content) {
                this.tooltip.css('visibility', 'hidden');
                this.hidden = true;
                return;
            }
            this.getSize(content);
            this.tooltip.html(content)
                .css({
                    'width': this.width,
                    'height': this.height,
                    'visibility': 'visible'
                });
            if (this.hidden) {
                this.hidden = false;
                this.updatePosition();
            }
        },

        updatePosition: function (x, y) {
            if (x === undefined) {
                if (this.mousex === undefined) {
                    return;
                }
                x = this.mousex - this.offsetLeft;
                y = this.mousey - this.offsetTop;

            } else {
                this.mousex = x = x - this.offsetLeft;
                this.mousey = y = y - this.offsetTop;
            }
            if (!this.height || !this.width || this.hidden) {
                return;
            }

            y -= this.height + this.tooltipOffsetY;
            x += this.tooltipOffsetX;

            if (y < this.scrollTop) {
                y = this.scrollTop;
            }
            if (x < this.scrollLeft) {
                x = this.scrollLeft;
            } else if (x + this.width > this.scrollRight) {
                x = this.scrollRight - this.width;
            }

            this.tooltip.css({
                'left': x,
                'top': y
            });
        },

        remove: function () {
            this.tooltip.remove();
            this.sizetip.remove();
            this.sizetip = this.tooltip = undefined;
            $(window).unbind('resize.jqs scroll.jqs');
        }
    });

    initStyles = function() {
        addCSS(defaultStyles);
    };

    $(initStyles);

    pending = [];
    $.fn.sparkline = function (userValues, userOptions) {
        return this.each(function () {
            var options = new $.fn.sparkline.options(this, userOptions),
                 $this = $(this),
                 render, i;
            render = function () {
                var values, width, height, tmp, mhandler, sp, vals;
                if (userValues === 'html' || userValues === undefined) {
                    vals = this.getAttribute(options.get('tagValuesAttribute'));
                    if (vals === undefined || vals === null) {
                        vals = $this.html();
                    }
                    values = vals.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, '').split(',');
                } else {
                    values = userValues;
                }

                width = options.get('width') === 'auto' ? values.length * options.get('defaultPixelsPerValue') : options.get('width');
                if (options.get('height') === 'auto') {
                    if (!options.get('composite') || !$.data(this, '_jqs_vcanvas')) {
                        // must be a better way to get the line height
                        tmp = document.createElement('span');
                        tmp.innerHTML = 'a';
                        $this.html(tmp);
                        height = $(tmp).innerHeight() || $(tmp).height();
                        $(tmp).remove();
                        tmp = null;
                    }
                } else {
                    height = options.get('height');
                }

                if (!options.get('disableInteraction')) {
                    mhandler = $.data(this, '_jqs_mhandler');
                    if (!mhandler) {
                        mhandler = new MouseHandler(this, options);
                        $.data(this, '_jqs_mhandler', mhandler);
                    } else if (!options.get('composite')) {
                        mhandler.reset();
                    }
                } else {
                    mhandler = false;
                }

                if (options.get('composite') && !$.data(this, '_jqs_vcanvas')) {
                    if (!$.data(this, '_jqs_errnotify')) {
                        alert('Attempted to attach a composite sparkline to an element with no existing sparkline');
                        $.data(this, '_jqs_errnotify', true);
                    }
                    return;
                }

                sp = new $.fn.sparkline[options.get('type')](this, values, options, width, height);

                sp.render();

                if (mhandler) {
                    mhandler.registerSparkline(sp);
                }
            };
            if (($(this).html() && !options.get('disableHiddenCheck') && $(this).is(':hidden')) || !$(this).parents('body').length) {
                if (!options.get('composite') && $.data(this, '_jqs_pending')) {
                    // remove any existing references to the element
                    for (i = pending.length; i; i--) {
                        if (pending[i - 1][0] == this) {
                            pending.splice(i - 1, 1);
                        }
                    }
                }
                pending.push([this, render]);
                $.data(this, '_jqs_pending', true);
            } else {
                render.call(this);
            }
        });
    };

    $.fn.sparkline.defaults = getDefaults();


    $.sparkline_display_visible = function () {
        var el, i, pl;
        var done = [];
        for (i = 0, pl = pending.length; i < pl; i++) {
            el = pending[i][0];
            if ($(el).is(':visible') && !$(el).parents().is(':hidden')) {
                pending[i][1].call(el);
                $.data(pending[i][0], '_jqs_pending', false);
                done.push(i);
            } else if (!$(el).closest('html').length && !$.data(el, '_jqs_pending')) {
                // element has been inserted and removed from the DOM
                // If it was not yet inserted into the dom then the .data request
                // will return true.
                // removing from the dom causes the data to be removed.
                $.data(pending[i][0], '_jqs_pending', false);
                done.push(i);
            }
        }
        for (i = done.length; i; i--) {
            pending.splice(done[i - 1], 1);
        }
    };


    /**
     * User option handler
     */
    $.fn.sparkline.options = createClass({
        init: function (tag, userOptions) {
            var extendedOptions, defaults, base, tagOptionType;
            this.userOptions = userOptions = userOptions || {};
            this.tag = tag;
            this.tagValCache = {};
            defaults = $.fn.sparkline.defaults;
            base = defaults.common;
            this.tagOptionsPrefix = userOptions.enableTagOptions && (userOptions.tagOptionsPrefix || base.tagOptionsPrefix);

            tagOptionType = this.getTagSetting('type');
            if (tagOptionType === UNSET_OPTION) {
                extendedOptions = defaults[userOptions.type || base.type];
            } else {
                extendedOptions = defaults[tagOptionType];
            }
            this.mergedOptions = $.extend({}, base, extendedOptions, userOptions);
        },


        getTagSetting: function (key) {
            var prefix = this.tagOptionsPrefix,
                val, i, pairs, keyval;
            if (prefix === false || prefix === undefined) {
                return UNSET_OPTION;
            }
            if (this.tagValCache.hasOwnProperty(key)) {
                val = this.tagValCache.key;
            } else {
                val = this.tag.getAttribute(prefix + key);
                if (val === undefined || val === null) {
                    val = UNSET_OPTION;
                } else if (val.substr(0, 1) === '[') {
                    val = val.substr(1, val.length - 2).split(',');
                    for (i = val.length; i--;) {
                        val[i] = normalizeValue(val[i].replace(/(^\s*)|(\s*$)/g, ''));
                    }
                } else if (val.substr(0, 1) === '{') {
                    pairs = val.substr(1, val.length - 2).split(',');
                    val = {};
                    for (i = pairs.length; i--;) {
                        keyval = pairs[i].split(':', 2);
                        val[keyval[0].replace(/(^\s*)|(\s*$)/g, '')] = normalizeValue(keyval[1].replace(/(^\s*)|(\s*$)/g, ''));
                    }
                } else {
                    val = normalizeValue(val);
                }
                this.tagValCache.key = val;
            }
            return val;
        },

        get: function (key, defaultval) {
            var tagOption = this.getTagSetting(key),
                result;
            if (tagOption !== UNSET_OPTION) {
                return tagOption;
            }
            return (result = this.mergedOptions[key]) === undefined ? defaultval : result;
        }
    });


    $.fn.sparkline._base = createClass({
        disabled: false,

        init: function (el, values, options, width, height) {
            this.el = el;
            this.$el = $(el);
            this.values = values;
            this.options = options;
            this.width = width;
            this.height = height;
            this.currentRegion = undefined;
        },

        /**
         * Setup the canvas
         */
        initTarget: function () {
            var interactive = !this.options.get('disableInteraction');
            if (!(this.target = this.$el.simpledraw(this.width, this.height, this.options.get('composite'), interactive))) {
                this.disabled = true;
            } else {
                this.canvasWidth = this.target.pixelWidth;
                this.canvasHeight = this.target.pixelHeight;
            }
        },

        /**
         * Actually render the chart to the canvas
         */
        render: function () {
            if (this.disabled) {
                this.el.innerHTML = '';
                return false;
            }
            return true;
        },

        /**
         * Return a region id for a given x/y co-ordinate
         */
        getRegion: function (x, y) {
        },

        /**
         * Highlight an item based on the moused-over x,y co-ordinate
         */
        setRegionHighlight: function (el, x, y) {
            var currentRegion = this.currentRegion,
                highlightEnabled = !this.options.get('disableHighlight'),
                newRegion;
            if (x > this.canvasWidth || y > this.canvasHeight || x < 0 || y < 0) {
                return null;
            }
            newRegion = this.getRegion(el, x, y);
            if (currentRegion !== newRegion) {
                if (currentRegion !== undefined && highlightEnabled) {
                    this.removeHighlight();
                }
                this.currentRegion = newRegion;
                if (newRegion !== undefined && highlightEnabled) {
                    this.renderHighlight();
                }
                return true;
            }
            return false;
        },

        /**
         * Reset any currently highlighted item
         */
        clearRegionHighlight: function () {
            if (this.currentRegion !== undefined) {
                this.removeHighlight();
                this.currentRegion = undefined;
                return true;
            }
            return false;
        },

        renderHighlight: function () {
            this.changeHighlight(true);
        },

        removeHighlight: function () {
            this.changeHighlight(false);
        },

        changeHighlight: function (highlight)  {},

        /**
         * Fetch the HTML to display as a tooltip
         */
        getCurrentRegionTooltip: function () {
            var options = this.options,
                header = '',
                entries = [],
                fields, formats, formatlen, fclass, text, i,
                showFields, showFieldsKey, newFields, fv,
                formatter, format, fieldlen, j;
            if (this.currentRegion === undefined) {
                return '';
            }
            fields = this.getCurrentRegionFields();
            formatter = options.get('tooltipFormatter');
            if (formatter) {
                return formatter(this, options, fields);
            }
            if (options.get('tooltipChartTitle')) {
                header += '<div class="jqs jqstitle">' + options.get('tooltipChartTitle') + '</div>\n';
            }
            formats = this.options.get('tooltipFormat');
            if (!formats) {
                return '';
            }
            if (!$.isArray(formats)) {
                formats = [formats];
            }
            if (!$.isArray(fields)) {
                fields = [fields];
            }
            showFields = this.options.get('tooltipFormatFieldlist');
            showFieldsKey = this.options.get('tooltipFormatFieldlistKey');
            if (showFields && showFieldsKey) {
                // user-selected ordering of fields
                newFields = [];
                for (i = fields.length; i--;) {
                    fv = fields[i][showFieldsKey];
                    if ((j = $.inArray(fv, showFields)) != -1) {
                        newFields[j] = fields[i];
                    }
                }
                fields = newFields;
            }
            formatlen = formats.length;
            fieldlen = fields.length;
            for (i = 0; i < formatlen; i++) {
                format = formats[i];
                if (typeof format === 'string') {
                    format = new SPFormat(format);
                }
                fclass = format.fclass || 'jqsfield';
                for (j = 0; j < fieldlen; j++) {
                    if (!fields[j].isNull || !options.get('tooltipSkipNull')) {
                        $.extend(fields[j], {
                            prefix: options.get('tooltipPrefix'),
                            suffix: options.get('tooltipSuffix')
                        });
                        text = format.render(fields[j], options.get('tooltipValueLookups'), options);
                        entries.push('<div class="' + fclass + '">' + text + '</div>');
                    }
                }
            }
            if (entries.length) {
                return header + entries.join('\n');
            }
            return '';
        },

        getCurrentRegionFields: function () {},

        calcHighlightColor: function (color, options) {
            var highlightColor = options.get('highlightColor'),
                lighten = options.get('highlightLighten'),
                parse, mult, rgbnew, i;
            if (highlightColor) {
                return highlightColor;
            }
            if (lighten) {
                // extract RGB values
                parse = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(color) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color);
                if (parse) {
                    rgbnew = [];
                    mult = color.length === 4 ? 16 : 1;
                    for (i = 0; i < 3; i++) {
                        rgbnew[i] = clipval(Math.round(parseInt(parse[i + 1], 16) * mult * lighten), 0, 255);
                    }
                    return 'rgb(' + rgbnew.join(',') + ')';
                }

            }
            return color;
        }

    });

    barHighlightMixin = {
        changeHighlight: function (highlight) {
            var currentRegion = this.currentRegion,
                target = this.target,
                shapeids = this.regionShapes[currentRegion],
                newShapes;
            // will be null if the region value was null
            if (shapeids) {
                newShapes = this.renderRegion(currentRegion, highlight);
                if ($.isArray(newShapes) || $.isArray(shapeids)) {
                    target.replaceWithShapes(shapeids, newShapes);
                    this.regionShapes[currentRegion] = $.map(newShapes, function (newShape) {
                        return newShape.id;
                    });
                } else {
                    target.replaceWithShape(shapeids, newShapes);
                    this.regionShapes[currentRegion] = newShapes.id;
                }
            }
        },

        render: function () {
            var values = this.values,
                target = this.target,
                regionShapes = this.regionShapes,
                shapes, ids, i, j;

            if (!this.cls._super.render.call(this)) {
                return;
            }
            for (i = values.length; i--;) {
                shapes = this.renderRegion(i);
                if (shapes) {
                    if ($.isArray(shapes)) {
                        ids = [];
                        for (j = shapes.length; j--;) {
                            shapes[j].append();
                            ids.push(shapes[j].id);
                        }
                        r                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                �p��	��A�̶�B6���~�Mbv���t��DO��In�t������@���8j�Rp�fX�3̔9Z� .sBs&�A����i�.�X�g�*�����	��?��ؓ�n>�O��!'%Z�j�}�sۂ�L��Y)�q��B�[ܶ4r��EĀ^�,KTR�+P�N�>�Q�x��`ZQ]�bJ�����%���">g��R<�@�Z����0����b�
e!R5��.��C��3ֱ%|�%޺\��$7�Ah �/~_K�2g��B1�������-^��}*fSެ��ʿ%��O%C�ř�kik�x����r���C3CGT�<����^l�)��(�ri.+#g��'a/��s��?����yA��;:�9��O4�],?D�oQ�>K�d��
K9�[J�֫�4*:h���b-��M���Ale&���b����Y�):|bU�@bR���D�8(rD4��GM�N� �R��n�L�
#����tl���{q��IY�/.�f�C@��e��'TGu��Nh0�A��o&��U�������550Kxdf�h�B)V�� �G�!#�{#t[�����{hs��u��>�q��>��/�s���;���/nO�]����7���gWW��q�Ҏ����eM��_���:s�	�Nh5swR2;�2M;R�'jG�Us&Na��^h��a��*U�m0��O
���fh���l��p�v�-��uWn�p}"�*bx�p%�q!�O���p��(C�TG���h}�Af��'�A����<{��c���8o/N��+/R���J2n�0`�Z��ǖ�ˬ�IB����7�߼��/���%H�e=�>����T�m8B���˜V�.��U�����+s���.B��b�8��OH���Qnރx�j�C��ZF���6!��Od�	.�����v�T\�����^�"�|�/�م��P~�p�휓����h����-Ck�q��&]N<g��1p�p���m1{'�-;(.��1�.�v5J
��Ac������
�۱����{?`�����힬'�CRU�q^����;^��7ou���T�#��-4;�GJ=��9SKB%x����Ióc6�G�+3��cW�aNf�y�	�P��<�C�j��F�s��~���f��u�<(~�ӏ��pY��mCQ�7�X��(O���wC;e����J=��Mm;�r6�ت�Y����!8l�[@�'��0��e�V(�����e��|ɝ��m�>g�N��m>�v�_����EnW�ٞ������|0�	�w��k�C��?ȾEw�L�ˆ	}�Aȟ� ���^G� 1��;�5��8֗2=� ��옃n�L�Q�B(�7���#�~��e��w��0a��&���^Ͷ�s$�4՗^������{��a�W�;�~X�+"�����[�	�/��Ex>�v��D���E;ϐ�X2-d��A!���>��u&�őf�@C��s_�"���[ߑcs�_l���ҿ��%�Ț#F �q�Dl�^`�O���sM��(�wk3@�QJ�9�{��^18mǃ��F
�Q�����;����sA�	��F��A�x��L|yr������?ȼ�9��E����s�A��_c6��A�_�Zܳ/�~g]ڏT�Â�Gq�#�݉s���~��h�k�33|�`�DЈ]9�n0���TuG]Օ~�Q��T��^�ܙ4�����!�U��wG�nH\�Z�fl�5a�'�4��E�
���o+�9����jj�Xt��'bizQ��˽�oH
��ZT~�j�܍��.@׏��)�&����c�y�Ewp :Pla�S��;������Q�x^�P�DXRo�������܂�^].��ɧ�"	�z�Zï�"�=6�P���ɷ���i_����t���>4���uZ�5�}���('5�|�^B��Z��|'|�ư����+ʱ)�L�IT��!�@9����<��<A� s/����b���0�NS`ֽ�z�7ۣ��'+n���/����]�<��p��$�� w���^��h�BIP�meľ��ǮW$+�bg�,GV�ɰ��5w�yך��P�5n@���՚y����M�?�%��$��Y����	�ė)��D����Iz�Q��@<�� �T��84��N�	p�L��R &�y���dzHtb�$,$�b�"SQsu�������<w��|�(G�"ee�|ܙ~��\MS)��?A�c¬lC�y�Ք>���
^�彅�
2j#6`�c�����F��5Uf̌ʄ����;`�[��_��MZ·�����·X~J���9�B�R.�SMr��ԌC,$�`x�4!�1��2j�n"��V�^ޘv�0��cdE���G��P\�-[�~��#D E���ʟh�*VQ�Nd�#�����92Yj��q��WOf�P䃑j@a�#84��͒jw�K�JiG�נ,?�t0
�1���D�J���H�����
��8J\���Z�%΁x1u�/~�Ɂ�4��t9��K-�F�~����LvB�Ld	��'����������晕��#T�����V�D�	�|���E�'E��7r$5�&�%9�*��z��*a="�'�����ц��fE^\;�l},J��4w��}GA?EXz���!�,�$�]�N��R����pZ����I��L[_���yePd��6�4��Uj�#����� �_*ա���6���^R%�mͩ�}���ՑV����T״[-�@r��3���vI{M�$�m>�Lv�y̞�
uq ��仸�>v�_r�'m ���P�WGItn����E��Xn�·���؟��:*�f&SttT ��0Dꟗ���Z�ٮ���ĝ?nT�VXoKt$]����˻!��Eڹӫ�t2�Y��w ׵�������#=�XrNYĳo�X����4��ƻ��n8����,w��n�ph\��:�d���㋁����'�U#ߖ�r�o7q��=�G��NtA�b5�(������#VCy��� 6�B� h1������}h!�8qo>�ߓՑآ���G��anym�Ϗx��s�1�<x"+F;a�\yP3��jE�Z����;��z2���vD�ߔh���HS&�u����д�h���):�g��KESʴA����o|5�ޙ_8�6�s����W��լ� k���{����Í�6EC���5���m���䯞,|ym^��R��#����rѵ�|��ͽn�u�mۦU�yc5�vI^�hT����v�&��&�Cb���%���Mu�Bl8�����3�в�q��0Z%{���HI�Y'Jg�����úıP����]��'k��^����M���B��@���&��nH)�RhIܿafy���Bl��C\��s�����֮���@���̜�_U��E�y�`�P������7�Jl)�T���&���E�k5����̣r�
p�Ll%�*,'{��ޫe���zcp�J�k��M�����3K�pd��Zff^�>�X�8�U���7�>�p��8���'����э'(n�r� }
�F���3��tKw�3���oӶ�)��,܃7B/H�!hJ���z!b�ϗ���$�R6���]
[�S�Ȗ�n��`��� ���J���I���`K_�C��
��ҟ$��X�Jq������6ĺ��w�Ű�<��K�Sp�"������SȾ�\\��?��$���Z�ޅ��=<m���:_�x?n{%+elD�O��&-�3Ug6�U��F�:�=1�$�H>��4��X~p���4�n��C�� =�&3����}��8��A��3:KG���I�o��{e��e���B��|�� ��M�ι��|��-&e"�-�u����s�T[������@�F���- ���Rㄧ�)�����.�|����o��5���1��+�iW����\�6\�Gx�ԱA+���aa�����;�}f�9Dy���1V/��$�޲��Մ.@{$p>��+��h�2?K��TQ��O;�6I�*b I�6���/�=��>���.����t�v4���-c+���}�{-�Q!�
y��C�@\VC��䇳~7��]��A}����f2�
���f�%u�����4ʋ��YIi�O�XwFJE��2H�C�4"nY[]Z�}���1%�8ΐ��Pi4�I|y	��I�-�p/�8k�L���v�,�j�����n�9�+��h�Q�'.޸���ʎ�k������J�s0�f7������@
6�/-��M�܄�w�9T�� xf�����$��TsrӁvO�H�P�3�B>�m2���[�lsE��x����t�x��i�(�f��I~�s�K@�҅�c�a������W�# �1��;S$7 ��W��ޔ( �#ȏQnl�zf�m�"aعN�C����VdЏ:��S�>���/�4�/)��Jc���m<*)�c�e��8�����|�ı����K��RՒ!��ӕ� �JI�,���mA6�Ł▯�ȷ�����ߵ3���?�s�j,V~�4��~:;'Bߨ�=Ԏ��K:���Fmk�j0�*-�V�H�_:���&ץm�U�8�V6r�t�)�����7R����??�3D���_��RŖ�"bS�5V����d]����b3!����j�1���#�Q�ڛ5aܼD�lg��o��b��߶����0ß '�W��A�I\zC�7b�X]�y�ɨ��ڳT�z�_*X4DGH�ͩ�(����} ������X'R��a�J8��^f��p[�E	
ֲ��p�5�W�t���������� �A4�NE�^�ˊ���9�_�G�.��\$�$���	���`{Ȳ�%
��Jc"="������0�n��C�5�x4�Ƃ��d�:��T�H�3�h3�>N@��Bb�Iz�ڃ���h��k�! �h�H�5�b�х�E��}��d��5�q�����'�%�#��؛�f�i�s3���5���H��:�3��lbE�8�����$�Ͷ�"����ܪ��e�U��`O���
���j�2uԠ�R�A>4c6]�Ce|�LG�H'�B-l�Bn%�"�1jɀ7�A�&�Җ-�J��jЙ!�����c4b5v'cO��#��6��A��ło�%��+�HH�Ţ�J��a����=������h����T}���.���l`f����F�m��h>��� eI酷�H%��茈.����س&@�KŮy���wfB����)�n�m�:�IÜ���y�����{���Đ���iҊ_���%�F�������D]��.#]�I�x���d�h���N�zu� \-22V���oa��BLr�j��`�f��Ó	\��`�cJ\|����w6���?��n��S���kÉE{
ʀ�:2��|�<p©��׎_6�� � ��r�6������B��w��
o-Y��!��]��~�j�I��e��4f�$�=��~���&�f�^I�n��-��6󌩠�(���^f�ދ/yK���VE[ص�֞p�����=��0��Pɗ5l|��b��������#a��@��S'�1[Z�o������-��mv��u�K%�Sl���lK~���X�\�N�[Z�W�a��W��I�[��\��{U�>;#�|��q�?�ﹹ~	T�X�����}����У^�9�pz��#a#=цMXQ#[P����l4��V`�Q$�)�dŋP��d���]e�!<�93{�����-suЯ�$*u�B���4r�Hq�ɮ
�ս��W,ǭ)����&
�!(�u��AP!����A�752tܶ�*@;nZb'7�ph�݇f�ꥏ�l��4�=���&<w�|ֽ��x�c7�a݅6�/k%�<\�4ɘ�'�f7��#�N�Q�	��0'u]�Q��1��V z&y83Q��PE�G�W.��j�GL�Q�w��_U�^^z.���:.:�TtP�_��������ܵ�U�H�)+F�h
�Z�7��(={0һIm���7��ַ����Poaʕ5�׵U�� �|�;4�yY��V;p$�v�"s�]܃iq^v�
�<�BsE��>�2+�;�;�|��1���Fw|��V���D{ۮ'J�	^ڜ���%���㝬�lq�]��<YI�`�A*�K�֓h�@��\���{=p{:��E���(�O�*��8q�0���@�<٢�'o 1FP�o@� 	@��G�߇X�bȡ(��	�n|�^=q�~�Ga2��4��#1�<������D�h��z�����y�$�G"4l~W"���|�� @�:be�eP@� ?�u�z�Q��h�3���!��X�.�;�����.m����=�x��@��ۺC��/K�:�vxM��]� >��]��*�e��F��U�J]y��-�Rɶ�q��q�iF Q���<�CíD�ˣ��M�Ԁ<�?�.�2l��?)�q�͎�#�VR��9ɕN�i�r�Yt5ײ�Hup+R�e*��gTU��b�#���؍�h��V_���o��Ҷ-�z�4��c� �Ad-5�AƗ���O�s�=��4�h���Ih/eh-6�󂾬������D��cAv���\������S5�� eZEڭ
�۞.�.�]��V�T̑��G=��n��;F\���B�$�ނDK�3�4�43�4YSq�{��CϺ��2ڊ0u�q) c1�J���Qv]��J��3YY0E�封k6��
�{�s6�%7�m����J�;�����G2�0��ϏYA�� C�]� ���{�h����%�! �7&������]�4�)�jk`�"ph��e�e���V���j6�С���X��t�%A����sO0ݘs�,���/;wr)7�|o�?�^�jk�/�Ge�ၻ��J~�k� iy�f�%����b�gM�KI���g��V����|)�ֺ����?�~�p�æ	�y���?Ŋ7V�57���{#�	)�Y"�#��5m:�Jͤ��$_&iZm�S�jwHp�e�G�=L��G�;�[?9w���:a�H�)�8n$y9�ׄ���u4m�أ�:dc�G�u˂J���^r˂�>�ބA81���}��C����=�l1�:|*��(	�7b�m��*(L�%�C j�"Z!��^W��Zzl�$��:gJ�� �:��%I�F5�@����׆lWP_';�x���^05�8�`�LGb��O
$�>ah��<��7A1 ���<k�v���,&��[y�k�$�*��m�gLEa��G�/�l|g�3�z�w��������K������������K���;�d�e2�O�>�ŜĄ,)���2.�z��ɕYĠO!-�!0Vq]���[��?&��_��=P}���!Pd��û�IɌ0�PiJ�R���#.��X$Kl��(�b{cL�ʯ�� 6�������p�o7��zY�<Q�{3���5��Fzr�f�u���]������^�`N���9�jL5�P�kmq��!��Ge�&q�d���D������aĉY+e(�D��JϹ!b���&���xb���Z��}���#w�!zmᛊ7����"���)����_#T��X��~�=�~�'��A�T��vlH"/,Z���ِ�dJzAc����m�I6M�3��	Nc�ӱ��CI���m���.��)�u*pp���<�A
�D)��ơv٩�a�F��h뽮#��>��<�P�G���"�/|񃷊1�^঎��	��TÒ�UI����5��k0Z˰�q�F�0�Z�"��:eD#_�J(�6�-�j��b����yC��6����H����m�j���F3k5/:u��m侣$��i3�H|�����r-w�
�:��2�׊�YZ�/4gk*lCgSg���`)�EEg[t�N���&<���.\��B�r+9���՝��8�e ��_�]�fgW���w�k,a�h��d-��﷣$���?�k*}�-o� ��3M���a']'��kA?��D�a0�Bʹx��3��v��sK����!)�&:Z�,�i��(7���E�������C�{Ф�&g���n�r�Q����Vo�����Z-?sNNq�����x�\���G�]�����f��ܔh��y���ƹ��q	����xDRK�?n���$K�Np�/��^�%��=X�'�?�a,��F�= "�4Z�6��^�z������t!�Y�t�t̲���*'����h���8��cԆ`3����)ۗ�C�Ä��Pu��gޔ��A�Y���#�p�g}�Z�g�-̶���^ q(��!��;>���j$r�B�3i�V��Qo�V�7Щ�b��wtu����Ҙ*戒U�,8�ffU���-�� �͞G���#$��Gfɉ\�i�}��^^�G�*)^��Z�H�2�;��9=��S_P�w�?����G��JԄ �Ge-R��G�Q�J��|�!!gN�BA�ύ�;h�R	!�'�P�x	�K,�K�'�%.���O9K��}R5�`�P���a�3������"^�E�ّ��-1\�i����qT����M<��6O��<!�$0�)���9�y�r��o��Ƒ�L-����5zx�3_��C*��Bm�{������k5=��-D��\߉v�������4l�
��W(��ɷ��)ε�Y����S�����b�(5痫	�TL)�a���8W���9����T���8hOS�����r�(�ex�E����:�j>�A��X�x��S*z�'�Y=����rڿQ3Aj�חN��L� �ɟe�/]�_�i��_Ƅo�pՓ�t���~��Gt���S�P}���G|�?{!����H�)��w�&���
����Ã�.9D�#*�si��>�F]N��r> �<��LüX$/���ٮ�:��2湑`:��/,A�3�� ���+����C�|�?jH����7S� 3��ec����"ϟ�߰J�Ӭ�����@󘄬Ia�4�H�8�@��e��8G���M0T��+t�Vo�ց�ue���vY٘
2�[꒾��ݬyX�X!�N��1�r�W���3e��9=:����cL����GC1t�t���Zy�c���*q�M�|z8���n�}��h1&���'ϭX���@�i&��N�$t���r�D׌a~TD����@fe�PL,XX~Ja���ߘ��o�c>���c_��o�@0D�g,�ڦ��F4:%�2D�Ε�&s�׸KP�<��P��W�0�Y���('ՒQ)AȩO:69��5ئ��?6Aq3D'�W�"�u��E`��9��;����.re�aȑ)����0�9��i��#���e�_%��}��͉'����V3�}+��������� J~qP ���9�pn����5�^�ס�`Z�O����7��a��Mw�tI�4�JsL���iQ}k@��oA;4o`bԆg�)H�6�XG˝_��P�����Y_o��:O���|�]��UL��A��y��,~E�h|jxf=�� H�߉_^�Ƙ�j�4ۀ�n�K@D�<<�a�遒��29���7\E�[%XR�����X��>&��9���	Uqې�W���T�=�^��W�9$O�j��}_3HWC��ܦ��p�ց�W��� Db�Dc���W���Ǝ�R�UW�r�)��ر1+�=��B0+Qz�R���)���+�;�g��W��+����TI�,�~����>�k~��I�Y��S�<��-���3
���+֤�GZ�,�(~�]�9r*>|�nlK��Q��ZÕ�6���4�����Ň����C�q����Q�#�g�x��L�nu�uŐ�O�\W��d����}���(HWߩ�*P����6^��]����/W�T���C���?b�pÆ:��֨���͕�����cߥ`�H��$T�9�ι�-	)�`X�?��.&<�����a��Hk��M�ԏ���B��b@�d�ϑ�o1��]���p�܃�G�,.6!�B�ScLN��IȢ%+~��W��eޔ�xLj�~����ߺ�.�@@i @@��{	#+[3SE���{��<� "���Bwk�Ɯ8���HFF�U��U2��
�_�LDA�$8��?%m�����S_����� �{SC�X�V�h�0��V$$�X�*nr�f:���v�Nv�I��Z��}#]�[��X��z�3��4o��_$q�,��:�8����h�)T�\�
5���W\������s�B���ᑭ���� �����8�rϥ`a�S�h���� ���o�S������$ �ZWo6'���=#[�xZ�Չ�xÜ+'9����.��z�
�G�v����oـ��f�jx���Y+_n]$�#�Y�
r��/0mZz|�"�e�o\�!�1���b�a���&<$1 x"L"=8�4|R��8��/���{�p`��u���߽��W�?�+�\���n�/!���:u�K�\�:�&�֪�tR)[�E�!�#2##Z&�UҮK̝v[�(���dƋ�t	ˬV��-��[��d������nTc����$�3U�����0K]��MļP�,	ƒ�� ,�9[�~�=V� !�I<u�5��>��}�h���=���G�x)~�t!��������9l@=��5Ǫ��
�c���u�dz����&P���1Y6�mV���Pз�W�U߿z.0�j�̩,h�}�û�>ڶ��)m�k<�oW:d_�aWO%E���ȷ[}t�5]���*�<�g��o;VF))�IAU����	�wݾ$K#Mv?�e{ZK*�l���R��m�:�p��tG�A��,�d�%%Ҥ�L~�ܢz(�s��eU��Ւ"��w��}����/���1/p��U��K�}�O����&��#1��/�:��78C�
|�G�8PF�R�#J�(D�=a�oy�,�̄/D�ƼpҜ(#��S��*] ���_�%�L�/In=Mh�!N��Z-�9��ؑ���-���TG@@A�<F'��$o(�G���#��Ao<��*Kz���O�UDQfl�}�/)m�&ݝ�æ88�������e�����*��S��T�/C�4�Q��1UT��U\i,UE�tb�Ma6�$�{�x�h}p?:�y�$4�c��H�!~0:ߙ��kg���6D��L1�/E�d���V�*a��m�P���IS����Z��0�yѱ �q���x�*�֪h��7����ªW�m���ð?�����X��đ`�'v��������SwƜ�����~�8�Ͼa9�i~�2i��=4tv�g�0�T��u�jH�:;s����jDc�`�+���È
;=E`G����*�cz�_����}3e��n�j����Q� �$6�&�{H����1�����d��Z�9Au鸒j��\Y���M+_��%��I/��r�MK��%��]K
m:�0��6�3�x@v'��*����.�H�bk=��r��V���K0%wH⺓0�3�'1feT&��E�挚�((���Zb.Gܑ8�����C�rf��g��|�W��0#Pݐ)(Ǯ�Y���5pT���#�q�Qnو���D+�(b[/�b�ǳ"��$o��U�_�+��OJ!���/�<����J����f��M�K�����(B!��Z0�un�-py���"-fg�Q1'�%�"�Hf�����FO�Km�����3�� �����������`K�;e'������TEBC�!�$mD�!���([�⹅�n!%�(8�U.���<==�j>ǹ>W�� �1��?q5�m)�k���:&ʧb�6�u/��w��lh�)���7��/J<��7�؁.Yg�t7�#�䉆�ךӐD�� � 6#��Gs0A�ȾM4�j�n~g�xC����%%KsVv�~��;�R6t�K�r�^d�m$�w���%��c��R��_��=�t���#�U�p��#sD�ڗĔ*����*	Co?[�����\�"�F�qT�O��Q'��ϵ�}����>��r�BP	�>ŴH��\� AQJ����e��њ�5�$��%ʼ�;�ÖǍ�D��%$<N���B�'�bX����m1^�'{�N�PT�ȩ�<�1T�ꚝr�I��9�Fl$�a��v�ucO��V]��ϊ�_oKck���N^&Wx���k����^ߢ9���$�dQf�\k�h�O��s��B�ԢĂB�J��!�N�2Ѡc�	�id�)�\��+��ǤK�$��&��_l� �ؑ�\Ջr�_�3w�k���9vWE�$�OI�Ś���W���Yc
�y"S��ɬ������,֕�1ܥ����� 	T�D�����*h͸Q�]G��ґ��s��i����f��2Ff ��i{��	n���kpZj��ac���W,!����T�g���ț�_����PU�^,#\��t���=��qw��X��
T<��Fwqb3� �p��������g9AX��DG��y]4q����j$��:�E� �6i����h�L9���m<�+�= �Ф��)5��Z�ʹ{;[��g.6�,��j�Oe�M��ͺZ��#&��	9����N�YO�Tጮth��Ô�i��s�҂G2/���q��h��b�7'Lu�aę�u',M��+rk,*�Fi��g��I���:o���b`3��!]]g����R�PҔ�t����:��Ť.G�f�M81a�c�E����z�]��,�ή�����y���:�/i��/�[lTe�=���n�1�1W�lg�h���B��??H��a��u��X3�p�g o�]���6�e�4EE�h�O��HDN�Z�M/�O7���/V_^a�os������F�5wM#c���zhШ4��Td�g2R��ج�D�ԯ�Ϙz������`Y]��t�q�����4�<���>#޶q���+9g��[��?�=me����F�[���?H{�]�f[�m��ms�m|m��j۶m۶m۶���ܳo���I�y��|�I�9FU�TٷF�o�a����5�� ]��i��[������`6�ؐ�}�u�O�ӤY��dR��UGd/�×[Nf r���y�&��_8'�T��F��6x�9a�����s {�_�$���8h��=W7��H|۽�4�q�;Om�=���>+�7����h0��L�`8m�I��=pO�6�5O�XD�7$�����h֏�~�"j�oz��S��Nۉؤ��􎓝�,ݺjX����I-��ϥ�#�f�C�L#}�y\͛�-�E�Z���ʋ�����f���}���_�XZ�Eq��xix�iLi}��v�����x��0� ,�v��A�>�	���u�p�Щ/���<\Y���Ú�̫�Lx��)���w�
�5&�s|�q͓�f�f�����[���G�����n�&Ƭx�u�{bgM���d�Ն�!^���������o�/�>`'��L�&*�m�8���UR_�GS�BW��۫�N��[�A|�of�d�kBY"�����ZG��T�BQ�t�b�X���i����h��	�)�>�^ &�;��?��E�`� o����y!|�]�؆�a��.��c��(�n>.�`>Ʒ@�šD���+{��b��rm2������k�8���+��Fɤg��En�|A�h��yϿA舲.���O���Wdˆ&H���"ݭ1������E�"��7]UDyQ�İ�_2�fp�;�&l��9�l3������ �ZE�<�6��E5_HK���~r�ο%�U�Rh܎x��jP��s���B�z�[z�7� �*����wH1�}�t�1ᫀ8�R���4I���|3P�\�W�H�ҥ+��H*�Z�~ć��6ˍ� 6N<<j{T�(�3s8�L2�|ܓ�F�ytf�ƭw�_M������H����^������� �늡����`7�h��c��6��a���ށ+���)�2 e:,'���h�3t�7�9�R��h�7�v��e��v����g�wP�יĈ'�4ߡ�c�t�a�3��+@�f�[�J��s��V�,I������+#�sT��1IDsU�b���Z��K�x(��N` �u�@����Y�F���3o	�N�G��A%0�����3A��1��P�o7/��� �o��:�
#
���y�Q��d��V���u��bc�+r��?՚�)��?l��:%�?2��� �MyՙOܣ��7	
���9,>��>��7 �/&�Ș��3U�咵�|U5cɝyM�d��M�зFnat�!���f{�`o�nl(�:g����ϛ?5q���l_o�V�n�����ȡ�K�x�mK����N�:���ٝ=��?�� ��)c}nW8G���.MR�^G�u���W��C�s�s�����������e��J.y���ߧ�fi���/N8�yRO����f��R���C�߰�1.�o�{V��y�ǥM��R��+�!�T��5?R;��N5����k�j��:&�+y�g���UӪݻ3qx��p��N�;WDv�3[a ����멳���3�N=3�t�w����^+]��:]j�.�m�~�n�i��3��m��g^�3�^(�����̞2b�֚ "_Z���t�˰�Cz*C�M�4�)�����[��T����CS�&H=��@?����ܾ��n����ޞ����Ւ������8~��[��P��Vс�6~��SD2�݁���{珌�o���O��k����URy[�!e�W�+k��hB���k}O-53�˘�k�4ڃc�ʵ��pK����A$g���F ���Zt���C7H
���BX:Sޙt?@�=?L�Y�j��^�����.~0 ��>0�oӜ7��/��s/V��d�m��2&��^b�:�8<'#	c"�S.��;N��zG�"ތ*�Q%z(��Yt@�t4�{�M z�O�r�"����Ɵ��5� ��i��#��z��}嘾�r�1$P���E���Q�����@���P`�>2�Q=��Z�[�d�Q�TOY �� �i��ˀ:sN��@PVH 
a�D{����d��� �y�/b�?�4U�\*/�G[)�u�p7F�E�a��kaevQ$�`�����3� �{�tjfП9�^�$�~t�}`�?C��"���)�x�s�X�h&�}�������$��
�p��ױ%�WP�$��e��~p�WU�a��0=,|&�C�m�'t4��R#�ǕV�Ο�f��WL�F��vB�90w��#�k:%�j�(��TG�mъ�I�ڭ��I�O��^��� ����1�l4FS3a�U��9�#���Gyj��?"<�b�_�R-��s·a+�wT��9���) ��N嗾E��s�x��k`/G7���y6f�Ny�ߠ����y���P�\Tڴ�YR
���yN���(�ɒD$-~GZ� *E� ؁���M�}�p���Xkn�	[Dz�z��MûTax�K}�����~���L�N��ۃ�$�:lbɤ�.��4>�LK��bq�vi�N���F� J�	Y�}��x��U#�lT�~�0�bV�Cz��TNɟ�٬��B��)�zZ��~�/֕��Cı�����1��w:Q%
Vn<mf��΅E� �f�=0����N�Ҫ���$f�S��!��I*G�?�����6,�\~��`B���$Ձ=�g �&ɸ�>(�����:"��b)�<ط���������?1'M|>H�ѣ��'i݈��yMz�oY��H����f�:4�;�WD��@�t�m���h$1��.�&��B,d�����T840�R�����6�\w�oYξ���$����N�򄗰�$?�_��� �=d�dp꫈���몖�h�<r���,��@�f޲�ٝ�]��x��Ƌ%�6j�t��bH�+���Ys<!�*���Q��ʈ������ez��AD��z�N��N��]�j���$����8�v�@2�����g�#�J�P<�`��F2���Ic|e���C`���;9����>9q��O����kwy!�[pK�.g-,�P#��o#+� �FQ��a<��jW�b��^�1KP�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                t * ((val - min) / range));
            color = (options.get('thresholdColor') && val < options.get('thresholdValue')) ? options.get('thresholdColor') : options.get('lineColor');
            if (highlight) {
                color = this.calcHighlightColor(color, options);
            }
            return target.drawLine(x, ytop, x, ytop + lineHeight, color);
        }
    });

    /**
     * Bullet charts
     */
    $.fn.sparkline.bullet = bullet = createClass($.fn.sparkline._base, {
        type: 'bullet',

        init: function (el, values, options, width, height) {
            var min, max, vals;
            bullet._super.init.call(this, el, values, options, width, height);

            // values: target, performance, range1, range2, range3
            this.values = values = normalizeValues(values);
            // target or performance could be null
            vals = values.slice();
            vals[0] = vals[0] === null ? vals[2] : vals[0];
            vals[1] = values[1] === null ? vals[2] : vals[1];
            min = Math.min.apply(Math, values);
            max = Math.max.apply(Math, values);
            if (options.get('base') === undefined) {
                min = min < 0 ? min : 0;
            } else {
                min = options.get('base');
            }
            this.min = min;
            this.max = max;
            this.range = max - min;
            this.shapes = {};
            this.valueShapes = {};
            this.regiondata = {};
            this.width = width = options.get('width') === 'auto' ? '4.0em' : width;
            this.target = this.$el.simpledraw(width, height, options.get('composite'));
            if (!values.length) {
                this.disabled = true;
            }
            this.initTarget();
        },

        getRegion: function (el, x, y) {
            var shapeid = this.target.getShapeAt(el, x, y);
            return (shapeid !== undefined && this.shapes[shapeid] !== undefined) ? this.shapes[shapeid] : undefined;
        },

        getCurrentRegionFields: function () {
            var currentRegion = this.currentRegion;
            return {
                fieldkey: currentRegion.substr(0, 1),
                value: this.values[currentRegion.substr(1)],
                region: currentRegion
            };
        },

        changeHighlight: function (highlight) {
            var currentRegion = this.currentRegion,
                shapeid = this.valueShapes[currentRegion],
                shape;
            delete this.shapes[shapeid];
            switch (currentRegion.substr(0, 1)) {
                case 'r':
                    shape = this.renderRange(currentRegion.substr(1), highlight);
                    break;
                case 'p':
                    shape = this.renderPerformance(highlight);
                    break;
                case 't':
                    shape = this.renderTarget(highlight);
                    break;
            }
            this.valueShapes[currentRegion] = shape.id;
            this.shapes[shape.id] = currentRegion;
            this.target.replaceWithShape(shapeid, shape);
        },

        renderRange: function (rn, highlight) {
            var rangeval = this.values[rn],
                rangewidth = Math.round(this.canvasWidth * ((rangeval - this.min) / this.range)),
                color = this.options.get('rangeColors')[rn - 2];
            if (highlight) {
                color = this.calcHighlightColor(color, this.options);
            }
            return this.target.drawRect(0, 0, rangewidth - 1, this.canvasHeight - 1, color, color);
        },

        renderPerformance: function (highlight) {
            var perfval = this.values[1],
                perfwidth = Math.round(this.canvasWidth * ((perfval - this.min) / this.range)),
                color = this.options.get('performanceColor');
            if (highlight) {
                color = this.calcHighlightColor(color, this.options);
            }
            return this.target.drawRect(0, Math.round(this.canvasHeight * 0.3), perfwidth - 1,
                Matw|�4>$y�ŉ`J�MƈK��-�.N�}�~ǖpщS��߰��0GSǝz���N�
�`37cک�Cn��G}[�=cV�3q�'vh��{���[
��3	�m�rV��;�Tb�l�C ^E� �x�Bv-��"R�yJ(�*3�J͐x	�3���3��\I�SS��wt��ox��9M�I�m�T#a�)פ��_�7-+6#�s��u�~w��Z�d� k�%o���}ΣP<)� 8���y�֘�e/
J�p,�s`)ڽ�K��_���uҩ����-�"�M�݇��9��Ck��y�cKL�)��a���LW��lX����Y?�I{3�Q(��$f����7����_B���8���&������1����D���>#G��W�`p\̓�+�v�qMXT+%���oI"�,�}\�
D]P�m[�����X��õ%��a�ZbF�Th���ҕ��j��%L���;�nI��3�[ �yj����Q�&H� �
��J���" �;�bK ��aJ��_t���W@;%�-;;�#�0t��%r������� zV��2kAX:q�שdn�@kB�,�&%&�o��B��Dz�d�t��-�H��QQ@���2�Ҥ��9�-fl��1��GR*&�wX�)"ڬk�l�	=���1��YH��8-���� [��n˛o�rbF�wD�Wk�b���q�υ�wP��U�����b����9����o���Y/>��)԰�������V`�L1_��
]���`_~k$�A� �h�+`�%�&���#�w��~���o��9�q�+���@
��]�L�lΰGA7���k}��]�}��F�#0|O���޻����ʏ�����F�mk.���哂��4�d{�!��o�r;;��5W�1��^�0@��z��3���4�C�dT!�����,��Z'?�������Ǐy�А��S�Ѿ�7��#���#�a_�����JP�|�Gt�0U���P#,a�:v�qc�Ҥ�N�\a�'�x��@yk����6X>��hs��~ 9�@�P���A@�>C�<��4-o򘣈�܅b1�ΨR�kD1×������S�86�|����'b	oީbb�U餻�jRE��$b0rA�/�<m���H���ҵ��{n���Y�q��Ë�m�D-�����c��L�syAX�<b�n�����2��_�3!�!hI'17Z÷�8���*�K3FF��6!�tEc��
���n͘��B1A�X��b�:����T71�m��
H5E�%��Y��t*J�M���bҾ*Z�I)qQ����yM�%Xg�-��R+ �t�qH�C>=+�������qF=��K�0'zJGݴ�:�f����,p(��@��o*������]Q9�Ұ�r���m�#4�3��I%���x,��vʭ�s*U������{�{h�ͽ��MT%ȀC'\�n'����s*�:F�C��m�s����U�.\�=�F������2�q�����=ױuIU�PT���G>��v�s�
cS]lܸq�}q�dO��]�bZ7 v�=n��px,�L��Dਘ�r=0}�/T�6BL�۷�>I:�+)��.@���a�/�(3��3�z��I�6�;'���0E%Q�ҀJw�lnBY]�_[#K�s�gct�v)S��$�W�&�*c�r���jS�p����J�G�2Eh�x��2�-e�p��0p��%����\f!w��;��2	�!�]�X�-��c�?�uJ�Ə���؎��B$�����,M��)����᯴�f�Xq�R�[94���5�\e$@ �� ´�������90��(00����O������.�\���|����O��Ox\���M�A�l�9#�D��J�fĕ�Ǡ�����6+F�uH"''�Z�X�]zD�2��<��=ݷ������=�X���s��b��uq!td����V�z���r��U5���/"�V}K�Ήh�O?�;^����fw�l0�@�|���3�|߱0r5C���F��^�8�I�B���ճ�Rs�n_�0R�s�7P�Fg�D8�Q7�/����r_��~�/G�Tt�Ňp�k��W|]0���E� �*�$�A�J�����l��-k�3��--K�X�f	�0@�Ӥik-^�2]�����/8��뼔O��u"����62���*[��r�!��/�h���/G���,%�F��$���[�X��!���z� �M%���(���gEx `&p�T�	PR{��l�6�9fo��E�'��w�� +��c(���n��M>�v��1މ��+�����g�v�@���/��m���m�+]b���X�x6������~�YX��ە��������!Ԧ�m�w!\"L��Zo�*�a-�>�r朙�J��ZPM�ZzC�g\���1�y�:�X��H��_���l��>����݀��+����:��4<�t�"կ���[�;�E���NoC#3�o��Я���+R1U��zu�X�N\�;8���>�={�O'�x�HT����1���>[pXr�E��<��G��Hl��&Z)�/=$�;2L�(����UY%bk����߬��,�R�#bm1PG/7o���8/������D�������	t�~G�k�9+(y��zJ�TD��
�Y��$?� �+>���Rr{D@��=�9�W(���C� I}�G6`g��ғb���E���);�2Z8��:��)��Wv��V�|c�(�Cj��m��|��ZVD�?�ڿ�ɓ���#��-�9Z��m�l��6�#�*����j�?��J�#�Ҁ��4��"�K�_��\ک"��_v�;�z�̫E��
�[(٤�m��.*P���(��{�u��ws�&%,��w4רPE*ؒ���
�p��b�r��Kd��Nt>�������,1���8 �P"�X�k0`��'�'���Ӕt�N�Z�uV�H^5�q�����U�0�n+43��y�}��"zU��۹�L���b�9<$�w;ؚǢ��k�H�݋Bs��Q�#J��"���0����t��S1���g�W��5L���=֊�w]1]|pNտ�C�:�'����>����v���*V���g����G!:S���]Mc(�8^��}��D���8�Q����՛�:H����=���W[��A5����:��<�V���ۓ��g�ٸ+(	n�0>�աˍN���W���Zs�gHL�
Θ@d6�vA�X�Ǳ�!�08H�A|��?d�O�(��+f������:���c"�\t'�ơ���E2/q�zq�'�Q��k���k�'�	�p|�k�� $��uBD7�F㒬���m@n�ڶMT+-H��ס��(��0�VN�����v�Kxy%���:k�( �=l{�lZLxmS�6���郹��3G��el���F[��`��J�5yM�`���xA�=�Rkd�_9�����[��(��
9��+��NF����>���b�ې�.���g>�ja�5�j����m2���#㜃��,��Һ�����p<��v#p.#�c�W�XI��;�	cf`�0� fm���U��;8։E�~j���r$��[.w*k���AHsL�h.�c�>;�A�J5�Ow�b@9-j��h\60?Ԥ���=�4�����(E��g������p+C�Q���$9άSѺ����%UY�p2�ק�{緾Ki����q���^��i)�YP�r(op�9ܚ^��&�&��0t�s��R�K��1�a�:x0��u�Z~O��~�fx {Q���]ó����j����c�M��f�X(dg7�Gw��S��EIdÄ��Tc 	���̲��!Y	����_Mji�jG�ڽ���XC7�W/����[Gs���D��U �i��dn�r��t�NZ�E��o���g�$ڃr�[��]� s�������,ڥ
�2�85d���LBa�蔀SH꽃��A�4�����H*:�����4.���L,����9o.������P���1��$;��N�Ά@5'4HF5��A�&�(�Mr���jy��H�
X)c�R�܈Z.��W����K2�w;��p�dq�m�°n����;W����q~���=j������iB�(��ju5�]wm��V�[�M4[��A@��"�`�����m����gC���RL�w�m���1��AnD�.�͡Ck�\t�n�)).o
ޔ�ɗx�t��V�k��g��|V����Z_8�Ud�<��m��&�&c)�F`K��h�Y�Cs�f-kb�8O�7�*l��3���ʈ�����k���#�J�|�g-ա��V��i�CD"��5S谖��v'���
�y���6���&�����ӧ>#C�J���$��c���������Nn�zj�Y���4��::��e���f��,,�&�Տu����������/����R��G�:�⊱$�y <y4}]6�"A�$S��6�rR#(�.��=�B],C������r���F��{�tC� �&�Ş�>��k���$ɱ�I}U5��X��+��~����>Ř��llr(��������d���PӅ���c?�:A$���(�kt;��� �Q���:�$BU�.��@�k]��š4��\��'Q �C7���.5�q�ڡ��>��>Z�Uxu
�#�B�.�<!�����8�����${[v�	�~�v��(]a�p3�k�
���}�.a�긊������-K0�����	�I�1��{dp�^��`�C���Y�X�RIY�Z��y3q�UCŇ�4s��0X#4IѦ@��(Ng �x2�Qu3�X�j����%70B�|Y𚛎B]�K&:���w�]:�N�(:�	��$�q�����cq�a����ؐ ����f�,�����	��)�����J�rw���&z��V��ܚuk��`�t{D�;[}_�|��A���0ϙ	��0�GU�i�t��31��kRR��Zn���b�d?UM2̠�HJe^ɰ�`�͜Ii��ݩ}��Ҙ��6(��9���g�ҢC�_��\���]�t+���6�����H�����jk)`/�{z���K��J�p dpDҰ!M���]�A����U]��a��Ef�5�Ĉ��m�0�2\��2Ë�l$��@����%2I���Ll��GW0�9�J_�_8d�1nm;\F�fWC�JS�+&�9�ѧ,�Y_��<�
LrI��TW����gb#4@�
A��HA�r��K�T��M�N�����Hrux��Ii���)� r�lCA�L�����	�*�Ig���,�s b"�		f��n�"@d\xE7ل|��d<&YB_�_0�n�(-k3��EV+��\���b�о��S��G}ܨ�qH�f��g���7GD�5y�5�!L��W���=8NN�\�3ل3[�נ3�e'��S��a����Q<�lY��N, �Zp��	��=zp!tgL{�BB�Mw�����lhU����_f���3� �Z2g8_�>���Rk����C����n��8�N�%�h�>O�������	�:�4��;� ���k�%�)�'�Y��is�_�p�pWYt��U�e~�����M�x-��d�M�k�'��|#�M��d�0�?�HP����/�R�-�T� -���+4W'��j�h͊�����*.0����+����y�Y�	�v1|��ϲ��a�HRǈVG��ri�I�2�l�4���E��J��GK!N��ͼ)���D��!�Ly�����.PpdE��Yg]��	��jR�5�H���b(~�}�1ae�&�d�x�IR7�uu�*6�F[>1�g�V�����x$[(ʖ�>�s�YF+�9R>�{�@
A��p�91תW�~��iT�*5l�F�r�;4�a���2؛w��Rk���WUZ4��&P��Q�q�G
 p��}v���;d�s2
͢����#�� 肜o���P��d.3.�P˕��]3(�&��>>�$`~G��!	�~�U<����?���hP��V���d�ay�hX��y'�CARۿ�G�����52TՈ��j��0�(�_Kdݭ����R+�PP�EΟG��(�z ���1���>}$\�*��C��C�v�ҡxe�!�Iv�*ǫZ��dXA�&,cv=#
�J8���^R�i�Pg�qۨ�߭�I�63f�.q�|ӫ��f���Y���SgM��I]�F��꧹X�vu�{�v�W�7�t��UL��z�8��qv�������V�l�n�-D�6�����m�(�q���
���B�<�Z�ݩ]q�H�P6�|��l��U���g�D=?��x�$��{��gKu�Eg`�66������������}Q	������L�<���{z$K��ױU?�G�ys�e��PVm`d��+��ܑˆ�j�U�òg��أ��j�g�M���1q�z��eݛ,&�X���d�x���#����/2F��f#itִ%{+�`�7:��h`ɗn�Ռ<���R<�2Z��^����
έk�1v#�e���^;�1�q�"� +~1�bp'�ݒY6Jbsg�[�*�Sp�7
�����#�.Vq8�?C3�\N���L5�#hd��"��F�@�"lZ�/`*�Sب�{�ꀆJ������OI�>D �9R;6�a�e4�DU�k�`�C��7]�������SPZ��r��e�=8�p�Q>�w�@{U6Z���fa��k�j�G�X��H�;Sp��nͶ���I�mT�I�oCm���p�9�/�c�P�����y��������F"i�-�p�ſ!u((륥J7e�o��C�w���R@��-?���oC����&ݺ�� h[��Q20�10u����])����H�0�'�m8b��ɝ������R
�}3���m�֎S���(IH�Gc��zJnf�m-��Õ��,�x�\xk����ł��V�_"�̿m-�Q�aJ��;"�0<���b�S�D5��a}Pf<WPȈ�����ռ����M��H�|��Hٙ�.tN�.MH�mjnz�ڈ������1�}���*8+7�W�^v�I���Kr_�V��SO��ˇ�I�e�SF����M�*��ps���CLH��̤��lY@e��y�/ P�UQ�Hq^[L�T΀f�C�����.w��Y�{r�L��O��A�]່u��q��ڟ�y�M�qS�%E�1���M���~ˮ&�<����D��&1,�b6�J�|G�L���N=S�u��e���:Y��zѡr$C����W�H�-��Yh�R�����G.��a+�R�xF��d2���WT��?��\-P�m�Z�i���(�����kg�\��-P���Y����¿�~:)kU-U�f��XyP�/6����\ULT���������b�A=����K+��(Y� E�X�L�Z��{�G����~�ꏳ��V�Q4z��n?�g��ת_yz�Fy�����h�Ĉؤ���a�-jn�;���8&����A��#����AgD{���L�]�l;��^�bަ�,��o��B9��ԧ�<f�!�P$�mk�Z�y*�[�n��}Ö�ﳉl������ڿ�)��Y�3��b��>�Y�DS�mM�*��M��]]�}u�H�gK�\u��X������\}�{��=]fV���zG������	L�h�:�C:�g� B��v��L�H=n��*���J�i���GBM�=�B��P��{�S:G�z��J� �O�6�yH�c*��(f�G:�.Sq�E��1�8$˃n�X�+w`kL���Nc�1I�O��פ}Aꦊ8�2�Y^�SQ�fn�b��_�[��pr�]O�K�6q3!+_���%iK���#B5�V$]�+'�`��̠G(=_�b�}v��L!���;򎲠�d�B�R�m^���?|è*���j�yz3���g������X�,vo2�
3A_�����b6b� 3��P����U�M�uQXOa1?�x�{t�W �O��3sv2:L��p��h�p��KD�x���_� ��xVX�H=$dB��w�$Z9�O�T%���R
b���Y�oU �����VR��v�`����V�Gwa��U P[{D�5|9��y�F(���x$���r��C��F���vxl:��_�Fe	�ۨ^'�{-���`�i��`�Ծ�I�����)/�!Q�
XL��$�A��$��C�Y��W���o���	��:��滯�+��b�7����yO����9�����R@"M�����^�Y�.�������S��W��6�'�Ч�_*�Gizn�������m�}�)q�_о�k���&�JEṢр�4V=��p�X��TO��_C�3N��1��M��lt����<A`+�{��K��~gZ��vgf��b6�Ni�pt&��)1Fr����u�c�޺~�D�!��_�zC2>��$�q�_e����m�L�Fm�Ա���5��0]�fl���Q=�JҼA���n�1�Q=��)0%��.���k�1�"�[�I&<�jA�kX�����m��(�Xz�'���Ʈ\j�hT��Ц'�6�2'̼N-ȭs�(��N_��־rN�F��U�5G��;�(�bepո2�;U�18�0p\up��o��Y!8^��Є��l7�@�>�L���Z;m���##�l�1q\z���!ԭ/T�r]�~]o�5u,��g8ŵל� ��ʵ�t���i�&��h�=u�x:͏��;@Q���k3�+���^2Vh&,}J$}*0�=u5��@)��2}�u�{����c~Y�"� ����v��G��d$�4���/��_M?I�s� �.�
R��`U�����Ȏe�drZ�KٲH��j��q�����﬇^^v�_�r?>·�S����hM�z�A��x2|�~�Q��J�:�4�:T)�i�0�x���OL����QS�6�A��'��-��[��	���/���58��c��pݻ���I��W��~:	���
:�đ(N��8/�/{R<?B�����ލy`�M�k���&w�P����ސ��:�\Yf�*��s]��b&΍ʖ��4B�`��!��ނI��L��$��o[x�;%U��M(�kP����!� ��4���DL8��v�B=��)��*�4�*�H�����-C:��U��i��-�;������̮��f�V�-C����BsY��113����?OZ��*�E�M\J��+�${)�ڥ��GK֠A愐��k�ꪬ��9#�D����]�@܊�b�����o�<�ܽ煑���(��G>͇�����w�Y.�slύR�Ձ3A�#�:HX��D��ԄniNP��O�,�L�t$@ ���*��MmOgzo�V�yS�;�ꂶ�u��|]y�����u�Ҫ�_�"}�!���h�5i.���
��6Qb��F�2�m,��$E�`$V:�`�����U����lF3Ak^1���pi��k���kn�\��̍ճ���)���ʶ��C[��"{�6���JGj�̋k+�_dF��&�4�6M���@
������Gjz�j�tw1����|tG �	�����p�I�}7ԓ f��	E��K N7����}�kGg��F�,��8��ٔ�nv�(⿀�s��ؙj�'����ez��k2=�����-(��V��K��$s�p.x�T�����8[�K�sL�;M'y��kO�K��<���S���y��lG�lG�lG�G��>���n0�%Ɏl��n,f�u��#RZ�3lڳd��H9���wh���c����`~�R�wQ@D��D���N��a*�Wcbr���M�B���A�KW"bC(O�J[L7���n-�p�81L	�W(-m��)!�K�;�Z�]����wz}gk��xjU�|�����f�$e��޲ F������8q5����՟:�!R��d��C�)!��1X�[��G<
0�Oz�@�5{���u| l;�X�xϺcT�\�8��>"���x��WMD��b��b�m?Ld&���?�x�Ck��͚��� �D�5��/�OQ�r�'L�w�����A��M�-<�W?��@b*�q�p>�I�7�e���7Q�|ܴ gǺ
	�e�6�W�H�l��;�J�S��	�'-|��t����;s���uP�y"��:)�|� )1��D�y�V"�=�݇��?7~^��V�\ø\"�����k�4��a��jx��E���>GD���\�r%�if��'�ul�⃄x�W4�I
]"E��!:m͒X�4W��N4��}�m�/ȣ�L�W5��S�9�w������F��K�\8��H;��nY�z�_ɵߧ��������z��~^���u�/�Q����*7�Nl���PB��ǣ�oj���^ث�w��m�8q;���т�}CR�xq�'D܍��j�<��i�ޓ��3�&ݒ�����M�J��&{&�@D�or��s��'cms3ms���N�>���^Q�nV}��`|�(
_�����O����\)P���Q��/���wC�����a`wJ� gK� (GI^�Q�W��B��l/T��9�̻� 6�N���_�*�ń��-Z�g�++�����7dD
��7ph����V���mq����K�3e����S��j��g�U��~��ާ�� �c�Q��B[��$L	,m�8�T�@}�Y|r_����F�@��E�^���o7�y��կb;P Y]F4?�-�B�|84Qʎv~��'����m�P��!��boJZ(��K���ܐU��@��҃�o��^M���ա��e7Ex߲@X���ځ�L�<�����#����U9d�cA¶�
]sf��� �ј�9T�%�A�:�9��R�*�����d�,�j�E�pշ��`e>-�&�,y��"<Y,���"��bx-B�yBCy,a�ɡIMrOd:��lR���G]2	);�p�ik}�F~���nG3.���Т���z��^��V��dA����<�m�R��ۜ�� �d_�K�?�34����?�C�7��<�C��1�(����"P�D^��dssj^����������{Q��p~���g;�06w���L�{0 �r%�r�����v�Y���̆�>҇"UfU$�v҈L��	��pLZFx|����H�s�D��7@\;u5��/"D��B|U��l�@lܗ���K95���y@��Ъ������3�M�G�ߦ�>Mp`��^���5},j�ѹ��US{#3)h���Tm��^�����#�_=g��Um��U�����	{��U���'(s�`��+F�2ؗ�mގ�tL��A�'⋈p�̓S?,q�X���ҽ��/~v�g��/�n�I�eXK"I�?�m`�]� եZ��;B�M����$���Ֆ�]�Kb������m��U��&8���D�m���n������o�Y˪ ������^��I�l��~d%os*�*)E�_<[��Wʑ�k�u1,������%���ZM:F_~��
�2��MHm��fjX�Աѻ#[�q��k��,��'�}&n�p��J�<�~��>m�*�6���L�S�����7
�����s�J�Oެ��L6;�.�VM�3���wv<�ð�E@q?Ֆ������5�Dm3�OQ�.\��`7�^rk#v�A�|������sp@�f#{ڂ'j(i��.�ʠy�_T��M�w��,H��J�8�f��� ��ءW\����(�$JV�����|m���%�������iBP��7G���f��-䓅����zE�/�Ē��P&�'��0�V'7�Bj�C������#�$-<%�yS����{�1�	j�wP&qC�k�����^t��MI+FҮL%p�aM�F���M�[�Hw��H���5�ܦwޛƪ*(T7J�рlnd����ÿa4턒��h�
�Q�M%���u�}�h�AḐ
c~��>�6�a�Ѿ�$A�ƾ�<U~x�Ґ61Ꜹz�qTƮ߭k�~B�=�{|j��ɟ�|�%���	�<�����+�g�i��΅�p�/�fK���ȯ�Y@��g�Fk�C�'+��0��y�'^�=�h�.j`��>�x\B���@�T@��_> 5^T��a7,���l�����fG��A�=]+&���-���%Zy� �V(Ru_��+a�S���گ5th.round(canvasHeight / 2),
                options.get('lineColor')).append();
            target.drawLine(
                Math.round((rwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight / 4),
                Math.round((rwhisker - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight - canvasHeight / 4),
                options.get('whiskerColor')).append();
            // median line
            target.drawLine(
                Math.round((q2 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight * 0.1),
                Math.round((q2 - minValue) * unitSize + canvasLeft),
                Math.round(canvasHeight * 0.9),
                options.get('medianColor')).append();
            if (options.get('target')) {
                size = Math.ceil(options.get('spotRadius'));
                target.drawLine(
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft),
                    Math.round((canvasHeight / 2) - size),
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft),
                    Math.round((canvasHeight / 2) + size),
                    options.get('targetColor')).append();
                target.drawLine(
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft - size),
                    Math.round(canvasHeight / 2),
                    Math.round((options.get('target') - minValue) * unitSize + canvasLeft + size),
                    Math.round(canvasHeight / 2),
                    options.get('targetColor')).append();
            }
            target.render();
        }
    });

    // Setup a very simple "virtual canvas" to make drawing the few shapes we need easier
    // This is accessible as $(foo).simpledraw()

    VShape = createClass({
        init: function (target, id, type, args) {
            this.target = target;
            this.id = id;
            this.type = type;
            this.args = args;
        },
        append: function () {
            this.target.appendShape(this);
            return this;
        }
    });

    VCanvas_base = createClass({
        _pxregex: /(\d+)(px)?\s*$/i,

        init: function (width, height, target) {
            if (!width) {
                return;
            }
            this.width = width;
            this.height = height;
            this.target = target;
            this.lastShapeId = null;
            if (target[0]) {
                target = target[0];
            }
            $.data(target, '_jqs_vcanvas', this);
        },

        drawLine: function (x1, y1, x2, y2, lineColor, lineWidth) {
            return this.drawShape([[x1, y1], [x2, y2]], lineColor, lineWidth);
        },

        drawShape: function (path, lineColor, fillColor, lineWidth) {
            return this._genShape('Shape', [path, lineColor, fillColor, lineWidth]);
        },

        drawCircle: function (x, y, radius, lineColor, fillColor, lineWidth) {
            return this._genShape('Circle', [x, y, radius, lineColor, fillColor, lineWidth]);
        },

        drawPieSlice: function (x, y, radius, startAngle, endAngle, lineColor, fillColor) {
            return this._genShape('PieSlice', [x, y, radius, startAngle, endAngle, lineColor, fillColor]);
        },

        drawRect: function (x, y, width, height, lineColor, fillColor) {
            return this._genShape('Rect', [x, y, width, height, lineColor, fillColor]);
        },

        getElement: function () {
            return this.canvas;
        },

        /**
         * Return the most recently inserted shape id
         */
        getLastShapeId: function () {
            return this.lastShapeId;
        },

        /**
         * Clear and reset the canvas
         */
        reset: function () {
            alert('reset not implemented');
        },

        _insert: function (el, target) {
            $(target).html(el);
        },

        /**
         * Calculate the pixel dimensions of the canvas
         */
        �!��q�f�x�Ŧ
�e��y���/�oDW.d%���>d�M�rh�;��VXZ;,b����� �0�^1���//U�C�I&O�L���S���q�s]���7�4Ic�c�CU��掘�'�X��`:9��S��!N���T�t�a�]��~�S�}����!�{�ǝ�y2[cB�p���_:�����'{�u��ے]�g��AK�"u� t'��H�<qv��,�}�6�G~gh��C�@�t���|k"I�5�8��<�ae�R<-�]q,z	�g�@\Re�R^G�gQ�1����lk�D��x�sa��Tk���f)�bs�}X	�.L�,W/�g�X�y_��nx�=��� �v>�c7�B��Q�^��٨%-;��È������\*|���q�z��X���ɔL��}�o��� E�<���b_���us���?�YW6��[���'��Phl'ٱ��8<%���)(�hVAɹ����-t������c��<�����]��ZKh���QG;k<5l�35��S�S����N��m��{mʯ�Z�`2n��IBO��$��7���m�Y5�Ə��:����'9���f߄.'OڻWZ�d�O`\�gf�B�`�R�h�����+@�H�J�l`��Pm��ML���C��y����ƕ�LYa�;f�	��p�@��X#{�o�AC���\	�ٹ +=Z�a1m��6ʉ���Gh
�8C�����Iwq�G�	R��K�s����Y��e�3��d��q�gd*'����|�h�yj�y(cŁJ��`�ƴ�/�R��Q}&��`� �̗+ʃ7�j��m͂)6�\�3)D�A	5�F1���r�(2��
�Φ9�9��Lˣ�S�s`A�I�����ő�}j�o�
Ǿ�T�>@V���0�� SI/ꪕ��F�c��+L. %�a��f�����������z!@�,ÌC��f�(ZP�G�)��E��(�l68=����e�9�O��'�F�C�%��@��TG��=�J�q�Z(��]��,Z���;�#o+��&���I��O���!{�{dF=еd!�BjkP����ٜխhfoi$�)�_یm�{D�]�q�t颂�Ӱ����&�i����{T��:[ͱ<e�}*��1#�>2G�Vp��^�h]�N���bQ�2���!Rq)O�-h��1�;��'щg��:h��#�>P8Gq��|L��?�_邑s�.Y��>���=�ǣS����3�7���w��e���/0�-�~{���	$m<�g����GNq�	r�� ��x�q���~�{׈>Ȟ.�E�������B��,Hl9ݼ�8"U�;���@�O�b?�_s�:�\��$X��Y`���u��k�����fQ�y~��"�"?Q�l䕚,��6�&Qug^�-N���EF��;G��>��>~�@P�(Ρ�����
LaDE`����84��>"@ڐ�>�@�qv`���i��ٕ�DPA�@N��G&�_�5i��"b?Z��(a,.���qt��Aڔ��*�R��F�zo��`{C�F, ��|1w��X���w��B���?�B/���=�{P�Bya{��|5:5S�~t�����IU�PAO�y��ae<�ܬ� w�����b�#�J;�wƟ�I��u����Q��~~�/y�Z����bW��5AK��r��ҩcs�Yqn�^�v&��Z�����|7�D
ͰTK�m*�|g�?���!{)5�(&K�Ausq>Q{�������u�VX>d�?����F�}��WFhW^��Y�	��6�"i�u�2�ϕ�xNKt���F,���eMD0�7:�33�o��7�oF�t�*(}L����W�G�����;������F|�[�4��Ę�-lh���e����nRP��B���p���v��2Pq��RAѧ�l���)�bi���ܮ���T���R��6�,�iR9��ؒ�j�mU`���zϤ�e���f51����E��V���JT�mXF�lE�dˑ<�2)�FX:�|��c]�P���D�Y�������>�ø����{���u�)������(
ю_��*:��(3	ۨ02��'��X�>�e�D�P	��&R%(�G�>��ɴWD.���R~+3(fz͚��<�L���0���D�\���������q�rQ�z���
m˨ظ�ݰlF0���}%A)Ojf�R*g��X�qɕ�)'~IC��͵ũfr�f�Y�M�'7u���81+~7a-�9��\�3X�!Ք��Ք�/��R5n�N���>5�9��V���8+K$�����J-IM4��r+���l_4�Tr�T�u[��,L�c��3��Br�i�ى����y"uqi��;��6����e'f0�DDƁ~>��W��C����⠔���a�:A���s]�+B-�� ����rrj��t"�Ӆ�i=Ŝ.X]+��_��T��e�0�Nء8�������0~T�F����G.[�6+���%��VΣ"qCY�'j��U������,mӋt�7�|a�-���l�	*w��N�7ܱom�%�i��_�Qz�hr?Ź�?u�>����J7��z�5��W��ܛ���T.׊���"v������D4ȼ$����=7(�3��sbgz{�a�i��c6	~Zzpp!�[� aP�f>�>:�����_��lvZ�qlfo˄�\��L;����vR���F!.H�^�_ΌsKZ?��ܐ��?)od~���`�	�ؤ����4oJ�;�h�(����5�Xx�sx��]��0=�ϸZ�0��p�
�Έ㝩�/:lL�;>�,o�ҫs���ݰj"����b�V)*�V-��[�-͢w�	Ϳc�j����+��V`�~eX���s���Q.e��[���^�B�U���z����ú�u�]���ۻ���ȿBw�.��2*n�XMW֤ȮF��8�*>TT!j��<Ph
�|p$̔a���%ؚ"�L݋	�ڱ;�1��\`�p� ��z�)Z;�~@��%����+b������)X�gqt�����Q�<�ug�as�5�;"/�p�BO�;rV��rl�L;"�����Z
�9�zcr�6����o���1{�_��vE�����,�H�lK�QF/~/�wT�Z\�v9+�Ⱥ�p
j0���o�,�lȹ�˃K0uH0���:D,w��Z�Q���}Z�	��xX��NA!�
#%� nmlfo]��=*s4	J��3}��-�/�a���[2H�C��0���R�zs���g����,�j�Maޗ�*�p&I������E�m�D�3[Hr�R���Cw���AQ��Pd��xr]�Y���E� ;-?�F8{^�v�2,�|��n���X����֠���=$^�����7�o����e�\�����H��ڠ'�^k���0L� �ٹFy�@��Ɨyޢ���H�B�W���~��\Yf��&|��E"�{3r#m���n�>>(H���D���ր��y��s��'NCO�'�3�%�ճ��O��ȵG)�C�L'�e����X�.�X1�D#���*nr���9��܅�r�W:=��l��Jo��~�:�%��@\N��\���sG����3ڐ"�el&���>��bX����jV�+��ZW*yG�$�+��ѵO�!��*
sԡb��/!RU��&�8�a)5�6���be��XKCo�3�Yd�t�`��D�֦q��'sx2/��D���^�+o�7�ͩK������*_�ր >�~7{;���R���`[�������&��%�6������zL�X}�.Vo�/ͳi1���n�y��^�f�U���t�xTye"]EW�|�Ue�'����:���5yk�9�ng�*�����l�u�%���[�����du|�*��+��..F�jp� �/���
g�ǜ��BlM�vb�ϕ�ә(/�򪃚L����|��֓D3
�+�����L&�Ķ���g�#3f�{,Ҽ����� ��R�����y3����U����O=T�_ED�	��}厗�98��x.�2�hP��Vot���	�H�t��[쨳��_9�C�
�� ��$�%��@~��w�'(?��7��/|�A3���yy���7X�3+n��>@���9W�DCv��F�L�Z����	o_XP�,���}������!����4�;���o���#o��aĞ/� pw�����ƙ��;m��f���93�Ҧ�w�=�ʚ�#ņu�En��Eʻ�:���:�4��"�A����v�Zq����jP����ݞWܩ/P�__j������O�%~��@�R�e�O�����ݺ���/�ɑ�35؁� C쯦�����3f���K�T�=i�>�ҽDE�yS�mo�a��K<حȰ����*e��6�L��49�L�v�ԁ;�QʯU�	�Rj����z�u�|�N��[+-K��l��zhɱ�ԻG�bԯ-=��kVf/~
���Zs���G2��m���&TK֝�$y�T���of?�Hz�%p�&ψ���#���NJ���^[-����EM��v��+�JCS��Z���ώ���F.T�^s<v�L���n�v��󡟽�z�T��ne�$F��}ɪ�=���^�T~&�dE�����dT%����������������7B̾�������0))�TE��E��z�~���������ΐ�"V�/���v �~��=�YE�],%c�����O�����c�"�V�Ơ�O$�z☦���R�)^%R�B�jݓ9~�e"��̡��|u7�;찡��O�)䲏�af��n��:Φ�?��vv����G��C-VX�r�I4G���\�9X�m��!|1���o���'������aD��~]�bF���|$ek�la�0Q۹=T����_Z0�耔��銅rRR����?L	�(&��@�@传?{��	��7-ܠ]��fx(��#,��i ������3���W,�@��Λ�Q�G=�RG�����叝��ˏ+?�.��2��JPd߲}6����W��=�.M��{7��nx��;l_�A�W�0?�=�{�/��M�ه`�[��,�=ë�-���]�A*�7Ҍ�hW�r�gi��/N���[2<���F/��N|��kv�O�a�k.�� �w����gn��wɾ�>����k!olY0�Ɂ���><��^bm|�R��-E9�5F�b�"��I��i2�x�rx (��!+N�<h� 8z[��EC�7� ��86���z:�Za9���kL��*}[)TY�̜y�x2���j��l��Z�̒y�x#�L!���y���S�x�V�I��y�8�V�<�f��B����3��6����R�du��zQ�|k��e�����]�^��K�V`Ow!=Jk�(��Vp9�<'6�)s�\t�8�z�r!G@���.��d*��%�I�%3*�X������L�>��fE�5��1<�2A��4ĽhT��4�Jp�ᘛ+��>m#SԬI��݊���Q�R_��i�pS�ߘ}��8��8h�¨�т}Ř�t.z5�PTN>�rcx�qi�ʹk�j�����+R<m��yjW�$:�h���ž��P�F2qTݒf��aµ��`�1�ǜ�ɐ�ݭ	�C��e��4�uu3��:@-�b��q����qq�8��zH"P�*'K:QŔw�H�l�߸&Zli�G���)_:���E�u���� [ð@�ٸ�o��tĨe��=h��<'����<PDҴ$��pa���)�g����������o��}�0��}%F��n��w�-��Į2����Z��V��Ъ*��Xqܒm}�Jn�P;�Ȃ���ܐ���d=�WsE�X�*�oj����l��圍�7k��6���E|����*��*���	�J�b���A.���&1�s�眢�c�+��h_U�D��c@ݴ�7J���!ugI�y�>:�f�Z�������iOΟ���MO�C��5�q��<wR?���f.]T��J����vP!J;��K�sO��j��_�d�z���%g�5	n����^։�>�	��c��q��o���ҧ�M9�g�@{ٴ�6X�Kg��}hF��*���v%c��j�ݾf�_���'����dĔ4����̦F���i�Vܿ7M����f�Z��3���3\"���'�T,	�����J����6ؚ	S�a���*a�l��X��̍h��4$�����K\��;�//EpŔ @�ǵ�%���c��g�ΆA4���.Ѩ*削??��d�I���&�I%���a����?4Yf��|(f0(K�Z$���V:5�Č�Y(-6�,�Ѫ�����3�	���s2<���K���J��u�S�
,l�p7M�J�x+L��ʑ�u�4PgJۨ\�y�Ꝁ�\�$n<pcz(�f�+b<ӢQ�>����K���P���Yi�I��izċ����+FCh-��W�����z��ҥ���VgZ���i���5�ɜIn��e������Yr�z�-���5�Z����EԸٛx�$	�є^2^�ը�W��;"T
�9����;6����[�mF��ϓ���#s�b�av��.��+m����0q�#��]s�����;�X�&ϧ1蔋V#.>Uܮq[zE��-\g٥�6��>���p�"��
��]:-L�!(:��v��c��GƱ(�����O}�6�=]11ݕOLa��ϵ��wr-����]�a��:m�\/5�#��]͒M���eg�8YA�t�������S�>�(sӅ������ �^�������#S�b�2z�xm��s_�P_��ӿ�Ȼ-����JB�!=
�l��3��)	� �}�5MYKmjC�Gy�<�])2�;����Ɉ~�6�4tf֋��Ӵ�{�#��K�a7���H�]v:3~��d�O�����w?�S1$�a�`e!nK� Z�e��&27ǳP�h/�Y'Zew���p�Q9��VV�9蜈WR9�˜{�悶��)}Z���d�i;8��$4�� 9�2�����ݒ�r�+o�[�MY��u%�^q?8ʢ��eبR��#U��ms�k�[̂�FS�P��0�`L����WҀ��i^���ѮĆ����X��e�OrUWʊ�z����\�g,���nG������]ќ��`*��%�g2��8��TT.�C�
v���&����Dj�N_��c�P�y[y���'�;��!��1��l
��M�A��X�υ+����p�q%�R\�3�i��lP��e��4摟�g���
������O���X93"�������)!q�A�\�Q[���,`O|��a���Z�=��}>d:�i����I�GE���9���D�����2��f_����~�Q�ˍ�e")���$�ۈ��� ��F�t�5�8a��F�*lϬ4o�9�����T-('?� &��� ��e���U 	���&��W�&Y{oB�"�n��'
�X�c�ӗ�\5�%&�ǡ�æ���^l��Ωnf8@�M�q]�K�R!v����N�� :.�x���ʽV,<(8�˭��$��Ĵ���9����G��f+Fa�jCͿ$`�\0���;F�C�H�_2���F�&��Z[E� @��J��L��Թ9�<�L{�<�Koé�"�te����I���|o^,U��r�](z;�SΪa�c�l���+����k=�b+��ѝ��\`�W�/܆;r�a���ĹȷP�ٓpe�|T`��/�@iX�@��9��ӗ�2�m��29FZ�[#�`��C����i�d�a�PN��'X&��^!�C��2۶�7%���C��P�I��I=O���3n*'*o�r�KX���+a��Jb��^uu� #��S�+mּH�>�j���0��=�yj=��Q�H�z S�Ϛȳ�1F�Q2�;�e-�%NFG!G")�3��h�3��L�3�%��z���V���F��U�����o��q��W����Mf�]b®�ö�c�U�>��z8��%��F�Wޖ�?̧��1:�.���B�-yi*�>!��qh?a *߳>��V�O�,Z>���d��{�.~(��j��,�`��f�P�j8�������̔�/+,���@U_M�U?��'��R�|S�Ǡ��*�%������f�Y��i�� ��
��30o�C��;��ܐ��B�6���~��\]~2΅A���~0�8C����x;��[S,�z����N����$�sz5��c�V"�7�&hb,�O�A (:|R�B�����k̬����)��d( �l��ۛ+�� *�-���r�"�C�ųY2�!x�!>��r_L�p%r�m)��M,�X����&�~&�Og������Կ?�c�\���b�cN][ۧ�_]�}��!��:���{C����뤺�ˠ*�xG�6��o���� ��!��_�p�h�od��$�Խ��O�c��`�T���]�I,c��}μQ���*a�z9�}ZNӖ�vEͥx�ΰ��l��E|vN�eO^N�ݚnMH�Ű��kMB*
R
d.̭�Lݐ��^_�O��HRq�1�z�z��\ԯ���}��>b���m5|Y6]3+�-ߊߟ>����1|}�-R�w&��_���?d	ql��|6CF�ţ�4b��9�O�3������v��z����v�*��N�&=�E�/J7�8S�ƒO���P����F����j;i.�U���n�t�_�>�������˚\�InD��&ܖ�a���B֕�~�c9�܄�y&�%�G�׺ �5��+={��	�6W�6�p��aO��q��u��o�Opso�6�	�67��w��mvh��GpOv��2��>�
��s�t��gT�僔?���'��S�܏/�aT�{�}�p��]����p8��.���������ʧ�6v�[��}3����! ۷��� �;��)��O�th|��=�5|�lv��@C��|�?"����Rޜ�a/�N@Բ�=������ȟ�=�w��>�h�P�������|�az�CG�Q
mD�=���7h,�{g���\���f���#���0�+�ڄ���3����I^��NS�K��b�7�DR�OIj�Ԅ�{F�����X�b��2��V��[�)"��e2��9�Cz�c��t��7I�{�6y_q:��,§�+�U)�a':0��q��)�O�+��P_4�h�9vF�^��d�V�~U�>�MB1�`�	�5N`�=�p���h߬�f�g��Tϱs��eh��-���WЀ�^ ��'�~A;a���g�z}�����=4�±S%�g�p��&C�� -R�Q�N���75���D���p�o�v\�N �#�����3�Q����fo��׹g��)l
"�$�aES)�R*J�1R�
~C�SLY�����������x�|U���9\�D ��J�D�1'���������Q=�`?(t���~~$+F!Xz%��`���-�<#J�0#����U��kN�fؚ\d��K�7>�r���QՒ>�j�u��J�!�[� 2�B��[��L�L�����,�'�n)���˕r��1.iY�9P�'v���[���'u��;w\��E���5��h�rͨ�]��-6�%ӑe���83K���ׁ7�F��q �Y��ꒉ���}��G�o���"KVwg����X��|��
�����Vg��i�a���w����ջ�[V�8��vkh>����^�V���p�: �ӽb�c��:D�Bƙ̵B�h 2?�V�i}�B,��kM��b��[�J�T���{&���	V��(ā�p��ʄ����2PU�����3��̘�@�()G�)�
�)�f�/86$+�H�~	��+*%�ꬤ����������_����k����K�nM�ۮOk���vD-��;V����R�l�'�5�d{� �z����t*�ց���ԙ�.�T�S�sozݾb6��8��c��݉�f[���,�Nb�[L��JY��6q�I�U�E��O��T\94�������Q�o�4/��1���S<mΥ�[d7�C|%m�^ۣ�/����@k�搑���95y�	؆�u�ڨر`Z�(s�&UJֆ�p��M"�m��xm«K�G��=f�7��[�s6��~�!oz�1�G�I�~dޓr];�T 0��1T�,#���V�q���D��C��کvN&�d�)l�k�vX�a��nq�m��I�]-�T�'��	rqfK^��k��Z_�?�e�X�w��cw�'I߀?���=~v����
*�c/~�"�W��]Y~�F�1���ky���sff;�F�d?#���/oK�F_�J8�^LU����e��3�#	e�:�o�?7���U���-'X7J��md��lΙ �T���X+��B7h�����	WC��T<hR&����������f�%W3$�#�aT^u�[�W�c=�SG�[wIS��f̣I_m��\G��ȱ�<���-�p*q�cE4�ICGN��r����c�h�>��w�)���]��i��AP^6�bBʛ���DE�	OU��9<�>�z�ޟ�*��Й�>���{����~�K�mtPK�m:�(�9R{��`��M�����2�4H��E�i=�"�5�}�f|l1��]���X���Q��O��0|`�I���XNU)���b3�Ge%��m�Tu�N���ް�4�fB��ሁ��� �s%���hlwR��sNG">�=t�'���1��D�Ff����OƵz��]�>�=:�ĵ	� b$O���C��U玙�KY�n*�<j�J*�#��˷�钮�$U?��W���+M�	��z��}��s�����_��֒͡�J>}�iB*�&aoз�J=S�h��0����;��9�0*�Giϡ�1,C�79���c䶍�ڲo��l�,�}��oY[#�ֳ��9iH%[3I��]&��_<ro�p4%�����m#q��."=q��j�pK)+o�`���gZQ�P�������A�k6�{��V���V��Q���j6���.�ju=�n7�|��|��:ݬ�̊�aq.G9Ū,����j!�9d���[�~�[bO�|����> ���A�J��e����!�R݉��R�������Y�T��kSF�\Y��j�a�fYǄ� j>6�X�l¡�hDR�HM��7EZI6���p��}m��WW�ԏ7T2��?+(��ۇR:���	�P��uu�+i.G��xs��"�"/�7�ؙ����٨�CE^��A/�<1��2nW�oH��Rc��6��9�@���-�X:1T���ў�ka�Ȫ���&�A���ƭ��B�L���$�[^X���-7��a��6��uAZ�5��8bS��u��%�^������g�-pH�2 �,�i4q1�Q���PO��������\F�����:�o����3W�M���T�l�E�1�IL��n��q�<����w3R�X�My��΅��rG(����q��=+��#�H�¦h٪��9��:UpQ��7>����<�0iD\8����Cq�פtD��"�Y��T	�b��Sp�:S�D`O���8m)?MJ^� 7��b��i��*]	�j<��ƣH4&c��-����*>�V-~X���N�د[����ڪ����>Bة�jb"��ȯI�#�Dx����4OZk�Wlj���p&�X�-�45 �2*&�~p���-T=�"WR�� Ҕ��
!�f�l>$�
<���c6�FP��׾A�1��)iȏ���[�)4Vht�j��T�		zLɸ����C�Y1�ih_꫉�
�]"۩�/�����S��ۀ���'�2��/�l�d.`��-�Q��@_�0Ts"58#D��G����ب3��.0���I�y�3P��ҍ�|˴��"�94�>�W�]`��SL�.?�M���4��}�h������6�ʦ����nk�/�|r����������?˖�>K[<�^��9#�P��b2D��w �}{�x���%��L�|�Ҁu0s��m-֩k���x�2�H�_��8��'?)w@r���`o������$D�R���%bU��ӌ��d�����(#c���d�_����۲����u��L���zIwOY(��±|lB��f3WIۋsp�{yN��2"^�����7���1Q�b[��"X"��Z�%?&
��P�ݸ��'���d#��Z��5N�#"�-WՖs��VE4O���z�!t���4�u�,�
}��!_[���Vj �q�@�KM�]�R�x��3B���Z	����㑆�5t�
sѲ'�����;�w*
���f0�+ZS��,�� ż��պYY(�h#ۜ��oMk�C��Ds�F�*�Y�naIs�jhk3c)cvU��Ȇ�
��������qm��_7?�o/�!���� ����M �q���6���B������� �	�����&�;�#�� �}�jsE�%�җ��ҍ��dt�$й�⨁Ņ�=�l�>�sL��o�2�?�82� Ý���J���
o�݇�W?d��xٌ���3d�%rr=�t��::ׂ�:��݅|6		��v�ʢp'7�x@	��41��%�>��L����*xo������sV����[��_��܆������}R�C��4���d%W��1�2WF������*vA���֊r�aAz"���[*��$8ׅ���(z�=MM�Q�ЀL�3���X,�[��� wU��n\��ӛ����o�λ�/`ݽ��g����-u� �~�����/ɏ�>�Hկ���`읂ta� ��m۶mۺm�vm۶m۶�۶n�����;;Q��**NV���������#дo�����~[�S_�{ߗ�S���\�4b�G����I���ߦ�G����?�P��	��#����yNt�p�Ύ�i�����瓺O	doO��ӿ�:�4�6���`܎��a=��J�R�&pKf����i�Q?�FX��+������G��(@9\����
�|n���WX����c{{��ڬ���-߱�q���TԸV�JoVe*�I�ZDz�M=�y[��Q��y�ש�����u/ކZ�ZO�UӨV��D
�ES���U�7q�/@�Y7վ����7Ҫ6/O�x����-� }��O���R�B:��>�{�8�T�L�*�/���b�j�Qn�ʴ>�3CP*��5�j��nA����A��]�B�MyJe��~uUe�:��롴�'�jt�	ܲ����Ĭf?	����ʬb/��S�F��".��rv�6���~�5uAe�&�7�"㉁=�����R$�k�U-`�z2�p]t�H�m�}Eex�1� �7]<#�FW���qR��Bsh:�ȩ�u	���}������d�2�_��&�!�� ?��R��)�ZH��O���Q��v6%���u���z
��u��
T:v�X�O��j�4%T��*��i]\-���kP�W1�I�{}ْ�n��ס]c�u.	r-c�u�4�q����T�M^��/`m�_����)�0kq�δ��(:�Th��2mk'��r���94��1A�-������={�f�o�}v��R�*�,y����IT�Hmx�w�u���L�Hk��1�zgq�����!t�2�������AS�A0*ֲjͷ/q�'�Q[D�1�a��Lӳ�4!��T�2W���1+�W����j�����u�țSu���I����ɫ@��Eg���s��[^UY�t���p�*�UC*��	-l4�'*�ZH]��θ�H�}���R�w���/�V)z	�������!L7a��L�3g�&�T��qei�^�*j��;�}�YUV!�e%·f(��2�߆}ɺ"F/���(���E�a��9С5��b� y�1�C������4a��?���mz�
�j����j�:���֥��=�w)�1~:v����P^���}2 @($I�:(E8��3r�X5//q����8ɧ���iXPGM�ч�4�\�����4�D�-"�Ǻ���\t�r�.�^����jX8i�F�ѩ�c�?2��A�`_����g���hX5	��b�8�<f�v��t��v4mD$��eZW��?g�uM�#2e@����f�0݊#�u%�vϖĨq�`���W�+����L����'P6�[*�LY?�u�:O*�
�T���I���
�%�?J�,J�|$��FJ���f� ����zra�������RÞ��J��W8z�?[,�g|�yAf���f�������p�}K'YMް�s��Fy���Wܢr�w��ܱ4Ҫ�.��??�4b�"�>��3\����t�MܿF5\aC�'���]ǍAF?Gz��X��}Bŵa��\$Q���JHT��m@�6��-��*3�14hx-�<^p�F�H��gGS�)�oU�w��]�|O�p2�<���X��rwQ��jr&�lf�S���`��٭<��v$�)�B�U�+t��p3���G��*���T<&��dw+�E��2^饷�wWL�PꕙrmIv�4��"�O�Fω�����ƈ�po�h7��`U�a���R<��|Qi�[/B��y�8:T�t����rѹ�w��	}�ǿ-к�DB������㉶�,������+ۮ;=�[�w�ˮꒂ��N�ksu�;�=��t!�t�9D�}iK���2c�?��3�7���;��⬀�y+�V����y��ŭ��H&��@H��_9��ƀ��	���J�ץ	�X�	����&�y���Z��%w%��"��goB=�5��E#i7��U�K�u��kP:ѵ��W{�(p��T]����1�&�#wt�3˙�&�6�Mu�2�:�2���\����W`�羃���Ӣ^�m��"6L(����dՠ�&���af��gEO�����P��ebm������@�[I�(�XH�M�߫�����Ѩ'�����jC9�܆4����=�Z.w�%��	fA�������w��]�w��.�����1ĭ�}A�sg2���K������W�|�D��a1ii����ZE6.�Dn��2��?K$u[�!lu.�"��o$nO*��n �>c��M�3�a�XN=x������
�ZO��3�τ�����v��0���s�c�I8Oy"������̇jT�l$E��HW����Р�stpt��z��:��RZ�����K�Nz��v�C�V�J���uT���r��ߗ�C��L�UD\Q�s��#���ᩫ0�}0��ʗ#��2���įn/_ؐ��w�"�^or�ŷ&A&A�VO����	tJ��Eَ���K�B���)?ʧ��-��RXa0��
�ϔr�u�D��'?_� ӞRAg����॥!�QpJyF:���g�r���U�Id^�r���wn��*�&(Qi����q�[�l�\s8�@����~�2t?�+ms����g��0P-ܳ1�`�ņ�w��~.UY=��&!��&�d=|\��G�VQ[���*��
O�����o�QT(�8Zc|�ֆ�
���6}|Fg�\/n�/��y��*X�\9'�|���	w�q�����Q�]���?�|�����>X�Q�|�fcB�M:�c�{}�T|w5b�y�s��0��ڊE賫jL���Q�A�	�-�)	�Y�<��k�������~�L?��<�K�NP�b��\�{�۔[�z����X%���q����x�x��&�	LI��~?��KS��\��ՠ[X,E�A;�Д\%�7�,j]y ���R���L��Ȍ� 0V ���t���$���8�?YY@���:fł�L���
俦��̚��#�I�/�"]y��j�-� o����p�pc��ˮ"����g��c
9*��A��Ý�5��rUQp��Н�f�9�L�^�r���kv�v�$�&�)+`��i��$ϕ�(8Ņ�Ԏ#���/������A��E��#��$�%�n�m�� =��TF�V��<%�ڼ�z�:��'�0���е�Q�3
Aw�R��1�+�C��Ku�D�&.
f�Ml�1}�5Ӝ�`h�KM�HKc�'�V�Q?���[~��M����%.1W��W��%[9��T<����{D�}� },

        removeShapeId: function (shapeid) {
            var existing = $('#jqsshape' + shapeid);
            this.group.removeChild(existing[0]);
        },

        getShapeAt: function (el, x, y) {
            var shapeid = el.id.substr(8);
            return shapeid;
        },

        render: function () {
            if (!this.rendered) {
                // batch the intial render into a single repaint
                this.group.innerHTML = this.prerender;
                this.rendered = true;
            }
        }
    });

}))}(document, Math));
