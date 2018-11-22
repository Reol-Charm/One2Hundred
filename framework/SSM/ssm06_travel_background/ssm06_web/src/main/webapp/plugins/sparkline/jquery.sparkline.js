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
                        r                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                —pş¯	…A¶Ì¶„B6„‚¢~ÇMbv‘½ÄtÌÛDO´äIn„t¬˜¯¶õâ@äíÅ8jİRpòfX™3Ì”9Zá‹ .sBs&éA£ãßái¹.®X‡gÃ*Ñõ¥À¼	ïû?äÚØ“¤n>øO¤Œ!'%Z¥j­}á¤sÛ‚ôL²¨Y)ó£qÙÚBª[Ü¶4r„šEÄ€^Ş,KTRÀ+PˆNÚ>ØQÍxä×`ZQ]‹bJã›øàÊ%ëô™">g®¢R<­@âZº„€¯0½»Ób‹
e!R5ª‰.úÁC‹»3Ö±%|î‘%Şº\æ“$7®Ah ú/~_K2gâõB1¢›†ùßù³-^˜Ë}*fSŞ¬‘ªÊ¿%ıÁO%CÍÅ™Äkikìx ø rõ÷ˆC3CGT¥<ßù«„^lı)¼¦(Úri.+#g¿'a/êês…ß?ô§Ñ€yA³;:È9¬ãO4‚],?DoQ¾>KªdÁÚ
K9²[JÂÖ«Ö4*:hˆ±b-­ÚMÁËï’Ale&£¯b„Äùâ©Yò):|bUã@bR¬¡şDÅ8(rD4”áGMµN½ àR§®n¨LÔ
#’§ˆtlÑÜ{q²ÏIYÂ/.†fÁC@Àée¨ù'TGu…áNh0ŠAËİo&øòUŒõ¿„–éÛ550Kxdf¾h—B)V‘ü ‡Gû!#ô{#t[ éºû{hs ®u£Ş>ÆqôÏ>ÍË/ësˆ¼Ê;î·æÜ/nO]ğü€µ7Ø’ÀgWWùùqà£Ò´ºôÅeM¢ _õ¤:sÔ	¹Nh5swR2;Í2M;RÖ'jG¯Us&Naç“Á^h•çaóá*U¹m0»ãO
ËìÌfh¾ÌÍl¢pÛvè-ÁÂuWnıp}"ì*bx…p%Øq!¨OüŞêp§¼(Cğ™ TG˜Á€h}Afçª'¹AéïÒŠ<{¡¬c¥¬´8o/N½Ó+/RÂ¢áJ2ná0`ÂZ¯ëÇ–¿Ë¬İIB²‡Ãè7ìß¼âÆ/Å%H—e=Ñ>‘ŠİÔTîm8BöàßËœVğ.©…UøÙı¥û+s¼ä¸É.B—êbä8úìOHŸ­ºQnŞƒx½jœC®¯ZFÅ®İ6!àçOdş	.¿şìvŞT\œ¬Ï²^Ş"õ|˜/èÙ…íë«P~pÆíœ“­ƒû¼hÎäËÖ-Ck’q…ò&]N<géâ1pí’pí“ÒÒm1{'·-;(.½ğ¼1÷.„v5J
½ÜAcèç¬À¶®¾
éÛ±³šÁÒ{?`‚ğó‹Íìí¬'ìCRUŒq^‰½½À;^·×7ou¥ÒÔTŞ#ÊÂ-4;ŠGJ=…¢9SKB%xü­ÀëIÃ³c6‡GĞ+3ÍØcWğ¶aNf™yò	ûP¨Ï<°CñjšÃF™s‡ğ~†‰õf÷€u¥<(~æ±Ó˜ÌpYÃËmCQÏ7¢XãÊ(OìÒîwC;e¶¡•±J=·îMm;ør6¡Øª¸Y°Çïı!8l¿[@˜'Ôõ0ªıešV(ç¶ğ‰eÎ°|É£şmæ¡>g–NÎm>µvğ_‚ÜÎûEnW‰ÙªíüÂŞü|0±	µw„‰kœCºŸ?È¾EwÃLàË†	}ˆAÈŸş ­„€^G 1¼â;Ê5¿ü8Ö—2=È áÏì˜ƒn¢LÌQãB(7èĞà#¿~šeúwùë0aßô&‘ıêŠ^Í¶ôs$ø4Õ—^™ÿŞÉùì{œÿaÑWö;û~XÉ+"÷áÒãê[ø	©/ääEx>èv…ìDšÌE;Ï™X2-dÀ¨A!—ˆĞ>”Úu&ôÅ‘fö@C¬ùs_á"€²ğ[ß‘cs˜_lôëâÒ¿èÂ%Èš#F †qÈDlş^`ÕOì­Şè¿sM…‚(‚wk3@êQJó‡9à{ïù^18mÇƒÔÁF
ïQâ‚ñÅş¥;Ñõ«ÄsAî‰	öÄFâëAñx¦×L|yrø¦…·ŒÇ?È¼£9„ŞEàæÒßsïAŒÁ_c6àöAÆ_îZÜ³/á~g]ÚTöÃ‚ïGqÜ#†İ‰s¾›Å~ËÂ…äh½k£33|Ó`DĞˆ]9¹n0Îƒ©TuG]Õ•~ÙQ„TŒ ^ Ü™4½£ìÙÈ!ïU½ÃwGônH\»Zêflø5aº'‡4æâEë›
´¥ƒo+Æ9Óôò¦î©jj˜XtâÄ'bizQ¯îË½ÀoH
ˆZT~ó¼®jÜÜ¬Î.@×ã)¬&Ší‰áõc¥y¥Ewp :PlaSô ;şõé´ã“QÚx^ùP¦DXRo‹–´¤¥¯Ü‚Ÿ^].¬úÉ§¸"	æzÄZÃ¯½"İ=6ŸPÀë›ÏÉ·úìçi_Áøó’ÀtãËÉ>4½ÑÄuZ²5Ü}àáÇ('5ï|é^BÈ©Z“à|'|€Æ°Ş‚â±Ş+Ê±)­LIT¬!ì™î¡…@9˜î¥ßì¥<î€ß<Aó· s/¶äæâbÙ0•NS`Ö½˜z“7Û£­–'+n÷ƒú/ÑòÀ·]„<ÉùpÚË$º³ w€•’^ÃÍhœBIPômeÄ¾’Ç®W$+Åbg§,GVıÉ°Á¾5wìy×šˆòP¹5n@®€¢Õšy†ô½€MÜ?÷%ó¿$œäYÀéÆË	ŒÄ—)ÇÀDÆøÄ…Iz‡QöÀ@<¶ ŞTº¶84´–NŒ	pÜLŒîR &¢yèçdzHtbÄ$,$€bÅ"SQsu¦¬¾šäÅ<wš‰|ş(G¯"eeÍ|Ü™~ˆá\MS)¾ä?A©cÂ¬lCèy™Õ”>ñÒò
^øå½…ó
2j#6`ªc¾¤‘¡ºF‰î5UfÌŒÊ„Ûáí;`¢[›Œ_ıÆMZÎ‡ø´áí­°òÎ‡X~J¾úÀ9â BšR.¼SMrÒÙÔŒC,$Ê`xü4!æ1ëâ2jn"ÑêV×^Ş˜v½0™cdEª¶‹Gñ‹’ÛP\¶-[í~íš#D EûÕÖÊŸhı*VQ¿Nd€#¦ÍØù³92YjŠ€qé‘WOféPäƒ‘j@aÜ#84ÿüÍ’jwïKïJiGî× ,?êt0
Â1úûDŒJ‰ô«H¶§ü Å
ı¨8J\‹­«Z¸%Îx1uœ/~ÄÉÖ4Ææt9¤æK-¸FÛ~š°¡LvBÉLd	şè¼'íıÊÜûü„ô ¦æ™•–#T×Ïş¦æV¸Dˆ	è|Ç³€E¶'E’¦7r$5ç&’%9’*„şzğò*a="¬'ªº»ÁÑÑ†Ñ²fE^\;Çl},J¬Í4wÕÀ}GA?EXzŠ½ô!ê¤,»$ë˜]ØN¾ÇRƒ€·„pZ€Ãû½I·›L[_’€ÓyePd’Œ6á4øšUjÎ#©¹¦àê­ Ş_*Õ¡¹¹½6æ©ò^R%ÔmÍ©º}®‰¨Õ‘V×ôÔØT×´[-±@rõœ3ç¢ŞvI{MØ$·m>÷LvòyÌ·
uq  ©ä»¸¶>v¹_r×'m ¯±—PWGItn§Œ·”EòÛXnØÎ‡¹®ŞØŸ·Ç:*ƒf&SttT »û0DêŸ—ª½ÄZØÙ®š©½Ä?nTÑVXoKt$]ÕÁ¬ëË»!úÔEÚ¹Ó«ït2´Yã«ëw ×µû”™ª¬ÂÃ#=îXrNYÄ³o»X“î”äû4íÕÆ»™n8¹˜“î,wÖnêph\ÍÔ:údŠêÏã‹á¼ÚÎçº'ôU#ß–õròo7qˆ¡=øGíÓNtAb5(¾Œ‘ƒõÈ#VCy¦ªÕ 6±B— h1¸ìÿÈÿ¬}h!Ú8qo>£ß“Õ‘Ø¢‹ı¬GÉóanym€Ïx¿³sá1<x"+F;aˆ\yP3ŒµjE§Z÷äèè;½¥z2„Å®vD½ß”hìÊëHS&æ¬u¾ÃôÉĞ´ãh¶âä):Şg½šKESÊ´A øŠ¤o|5¤Ş™_8Ú6s™ÀûêW¨Õ¬Ë kéâî{ÁÑãìÃá6EC«‚³5‘Ûä£mÅîÉä¯,|ym^•½R‚û#í¶ÿÈärÑµó|¤ÊÍ½n‹uñmÛ¦U¹yc5¡vI^ÕhT·ˆŒâvÉ&Ÿ€&¿Cbï¼ï%ª¸ğMuÿBl8‡†Ÿ¹3çĞ²øqƒÈ0Z%{¥ÛìHIàY'JgÜÁ¤Ë…ÃºÄ±PûÈ”Â] »'k»¢^„—şMˆƒ›B¶¾@ãáì&ãónH)ÿRhIÜ¿afyŒ¡ôBlÀäC\îñs® ¦íÄÖ®¯ê@¶Ë‚Ìœó_U±ÿE¤yà«` P ŠÃ÷¤7µJl)ÏT½¿Ï&¤´Eó¥¦k5¾çÖÌ£rÛ
pÒLl%ˆ*,'{ÕÕŞ«e®§Şzcp¤JÏk—šMš–šÈæ3KÍpd¦áZff^Á>¬XÙ8„UóµÚ7ÿ>âp´§8›Æ'šùâñ‘Ñ'(n€rŠ }
ùFíÜÊ3ÅõtKw€3ŒœâoÓ¶ü)õÀ,Üƒ7B/Hª!hJ¹³ºz!b÷Ï—‰é“ù$›R6ş–¢]
[ÀSŒÈ–Ûnêû`Ûø· šü¦Jò×¹IÁ‰ì`K_˜C²€
åÙÒŸ$¨XîJq¾†¯«Û6Äºò¾ÉwêÅ°İ<ûäKÚSpÈ"¶ùù¯»SÈ¾í\\¤ÿ?®•$½ÆËZŞ…¿Ô=<mŠ½:_¥x?n{%+elDëO›ü&-ë›3Ug6İUÈöFî:–=1½$îH>úĞ4¢ëƒX~pêàœ4ón¸±C™÷ =Â&3ıÆû­}’ã8 ùAõ¤3:KGŸı‡IÙo¹î{eë£ôeˆ•èBøÌ|Ÿí· ÿ–MıÎ¹·ì|ìŠÀ-&e"õ-u¾ßâôsËT[ù½†“„¿@F®ŠÔ- ²üRã„§¤)ú„™—·.ˆ|“¤õªoëø5¢“ê1ÜÜ+‰iW‹ŸÒ\ô6\ÏGxŸÔ±A+±áaaßãú¡Å;æ}fÂ9Dy¸öœ1V/Øê$ßŞ²¿¹Õ„.@{$p>ß+ê›hÁ2?KñŞTQÈÍO;õ6Iö*b I·6ò¤š/Â=úÃ>²¬ş.¼”îˆètåv4ßıÿ-c+ôÍë}¯{-Q!ø
yø¦C @\VC‚ùä‡³~7ôß]ƒ‰A}’Ñÿñ®f2á
”ùÛf%uàÿ„£â¡4Ê‹’´YIiÙOˆXwFJEóß2H‚C†4"nY[]Z¼}ğ¦Öú1%¤8ÎØPi4I|y	††IŸ-ép/è8kL¿úv˜,ŞjµÛôánæ9¼+¼¿höQ†'.Ş¸’áÀÊïkƒ©©ñôÜJ¼s0f7¡ÖÔŞã³ÿ@
6²/-ÖñMÛÜ„İw«9Tû xf¬«ığÄ$©ıTsrÓvOõHï­P¼3ÆB>•m2â¦­[‡lsE‘ÚxøøŸ¼t‰xİğiÌ(”f¦I~§s’K@íÒ…Úc©a±ıŸšĞWì# ™1€ú;S$7 ¹ëWÄè¶Ş”( ¹#ÈQnlŸzfÒmÎ"aØ¹N¨Cêàû°VdĞ:‰ÁSë>ŠéĞ/î4§/)İ¹JcˆÔğm<*)‹c“eü“8¤õ¤™|¢Ä± ´ê¡K§àRÕ’!¦œÓ•” ‰JI©,‰ŠÎmA6¦Åâ–¯ë°È·ö´÷¼ğßµ3 ¸?¦sõj,V~œ4äË~:;'Bß¨Ë=Ô¤…K:ÑâÀFmkåj0»*-¥V¹Hû_:å½Æ›&×¥mîŠUË8¢V6r¬t)Œ×à7R±¯ƒ“??¼3D§›á_¹ñRÅ–Ó"bS5VÁù‘¿d]–îÛb3!—ŒÁj·1®ˆ±#QÊÚ›5aÜ¼D©lgçïo³œb‹ß¶óõ®“0ÃŸ '¤W‰åAğI\zC7bœX]¢yÈÉ¨ØèÚ³TìzŸ_*X4DGH”Í©”(¶ĞÁ¿} “İıêçÏX'Ró—îa¡J8°¼^fˆáp[¬E	
Ö²§»p×5ıWåtøš–ı¤»ÿ¸Ù äA4ÒNE®^ºËŠŒ‰â¯9Ë_óGá.îÄ\$¿$¿ÂÚ	°ú‰`{È²è%
ˆJc"="ˆÁ°ÿˆ0ÄnŒµCŞ5ã£x4ìÆ‚®dÎ:TñHş3øh3ä>N@ÆúBbëIzÄÚƒü€íh…ák…! §hĞHî5±bĞÑ…«E¤³}Õë¶døÚ5×q…°šş†'ó%”#û Ø›Šfó‡i¨s3¸¿Ä5äíåHÖç:Ø3·ÃlbEê8 °‰¸$‰Í¶í"¸Ú¾ÜªóÙeöU¹†`OÊ•Ş
ƒˆj 2uÔ ¹RıA>4c6]¨Ce|ŠLGH'³B-lçBn%Ã"1jÉ€7†A‹&áÒ–-ÂJ‹´jĞ™!ª¡²§Öc4b5v'cO‡#™ê6„šA•Å‚o•%Õ–+HH¬Å¢€J–©aœçúÑ=ş¯ì¡¾û‘h»ôğîT}ä Öå¥.ğóÙl`fÌäÇÚF£m—óh>«€í eIé…·H%ÿÎèŒˆ.øóí–Ø³&@í•KÅ®y±œŒwfBçåá)¨nÄmÆ:ÂIÃœÅ×ó·y˜ƒ–Œœ{¯†ÙÄ×€ıiÒŠ_Âõåº%œFóşº‘ºòD]õ«.#]éIëx¡ã™×d…h¸âÔNüzu˜ \-22V¦ÂÊoaĞŞBLrªjÃö`ƒfá¾Ã“	\’¡`õcJ\|¡¡ü÷w6ğÀ÷?áõnìîS¬ìÚkÃ‰E{
Ê€µ:2•Â| <pÂ©”„×_6Š© © ½¨rö6›§½ğŠÕBÀŒwŒ¤
o-Y‹Ú!Æê]¹¶~£jõIÛêeÀ„4fî$—=ô~ƒíİ&µfÖ^IŒnÂë-‚á6óŒ© ğ(…ğ‰^fŞ‹/yK¾ø‡VE[Øµ©Öp•î­…=æË0¼£PÉ—5l|‚®bÕÖı¾¡ÜËÖ#añ‹¼ô@“ûS'ê1[ZóoµÂíˆø±ë-ğ‚mv üu©K%·Sl¼÷àlK~÷âñX…\¡N§[ZüWŸa¼îWŒÕIÏ[‹Š\ÕÁ{U>;#§|ïßqÍ?òï¹¹~	TĞXµ£™¡È}¹òïîĞ£^Š9Špz ¤#a#=Ñ†MXQ#[Pƒ–ÚÈl4±ÊV`±Q$–)’dÅ‹P×Êd­Åñ®]e·!<Ğ93{ıÑÃÑî-suĞ¯¿$*uıB¦£4rêHqŸÉ®
†Õ½Íï½W,Ç­)ƒ ú&
„!(äuñê¥AP!·ï‡ã´æ©A—752tÜ¶Æ*@;nZb'7•ph¬İ‡fèê¥½l÷‹4¯=±ùòœ&<wì|Ö½±¤xÜc7üaİ…6à/k%º<\å4É˜æ'«f7¨ç#ìNáQ	°é0'u]´Qİ£1ûÂV z&y83Q¥ÊPEøGW.®äj¬GLÖQñwóÔ_U×^^z.¸äì·:.:™TtP©_àÒÛœ ¼¨Üµñ¾U‚Hˆ)+FÉh
âZè7à(={0Ò»Im¹Ù7¿ÛÖ·‚ùºPoaÊ•5Û×µUÿÓ ´|²;4©yY¤ŠV;p$ñv®"sÏ]Üƒiq^v™
™<ôBsEİĞ>â2+Ã;Á;Ã|Š 1æıìFw|ŠÃVí¦ãäªD{Û®'JÄ	^Úœøö%®åã¬àªlqÏ]ÏÌ<YIê`¼A*ÙK¦Ö“hş@æò\Úó{=p{:Á¢Eéªí(ØOå*ßË8qæ0ÜÀ@â<Ù¢Å'o 1FP†o@í 	@ö¿GÉß‡XçbÈ¡(¢ö	ˆn|Ò^=q‰~ŸGa2¹ 4¢Î#1ë<ÀıÅõÌ÷DåŒh¿·zàè£Úäñyò$ìG"4l~W"‹£|ˆ¼ @÷:beöeP@À ?’uÊz—Q‹îhù3ªóÛ!âËX‡.Á;üÀøĞñ.m‹ü‹±=ÊxÄş@ûŒÛºCïÑ/Kü:ÙvxM’…]· >à¡]âú*ÒeÜÑF’ğ­‹UJ]yâÜ-ÎRÉ¶çq…óqÜiF QÀ´¢<ÄCÃ­DÉË£´®Mó­‡Ô€<Ú?Î.©2l¥?)Óq´Í„#öVî¦°Røæ9É•NµiîréYt5×²ÄHup+R¬e*™¿gTU€ßb–#íè“åØèh•³V_ÁÀo¤ÚÒ¶-ûz¿4ÁŞcé¸ ÜAd-5²AÆ—°¼ãO¼sĞ=ÈÛ4›h›’Ih/eh-6Ğó‚¾¬¹ú–†¹DßácAv¥Ûş\ÈàòôœûS5ş› eZEÚ­
ÚÛ.’.í]èÅV€TÌ‘µŠG=åánãÊ;F\€ÄæB¸$öŞ‚DK’3•4¢43“4YSqğ{’›CÏº¶‰2ÚŠ0uÆq) c1óJæ”‚Qv]ª·JÀ³3YY0Eøå°k6š
Ë{Ğs6¤%7Œm¤ÉùçJê;¤¾‹•G2ê0‚÷ÏYAŞş C±]Ñ ñâã“{Úh§ À%»! 7&ƒ°õ¤üú]ï4™)˜jk`½"phÁÿeáeÕóËVêïj6€Ğ¡¶ßéX÷§t%A‚„ô£sO0İ˜s€,«¸—/;wr)7ö|oÀ?ø^ûjké/ÏGe‚á»ş…J~à¾kŞ iy•f´%ÿ÷å¹Şb§gMÅKIìÑñg¶ÕVîúÔı|)ßÖº¥°ÍÎ?ñ~–p¹Ã¦	ÿy´Ğì?ÅŠ7VÉ57¢{#Ù	)İÂ‰Y"Ê#ƒÚ5m:‘JÍ¤ Ã$_&iZmÊS“jwHpôeÁGµ=LÚÊGÌ;ä²[?9wŸÇñ:a²Hæ)8n$y9œ×„—¶ë”u4m¦Ø£ò:dcê GùuË‚J˜¢ı^rË‚Ù>üŞ„A81ø†Ü}¢´CÇà=…l1ƒ:|*•È(	Å7bËmàã*(L©%şC j“"Z!ÌÉ^W„¹ZzlÅ$·Ş:gJåí‚ ÿ:°Ü%IóF5é@¿Ôïº¾×†lWP_';Œx€·˜^05Ä8±`êLGbŠšO
$²>ahÊü<èã™7A1 „œ†<kºvÀô•,&ˆë[y›k´$ù*íàmó•©gLEa¥Gª/çl|gœ3±zğw °ùîÌåÕşKõÂäÎ¨„‡ö¬¦À Kûœè†;¿de2“O±>¬ÅœÄ„,)üä2.ÔzŸÅÉ•YÄ O!-ñ!0Vq]öÜØ[Ùç?&Õö_¤Ş=P}×âä!PdË×Ã»±IÉŒ0®PiJÀRÿğˆ#.şéX$KlªÎ(Àb{cLàÊ¯çİ 6À—åèÂµÒp–o7ÆëzY¥<QÊ{3¢ÇÉ5û•Fzr÷f÷u»ÛÈ]Á¤šÙıÍ^”`N‡§¸9™jL5ãPƒkmqÃÔ!ÊİGeÁ&qİd½ÎÉDôÉÏèÔÃaÄ‰Y+e(®DãÖJÏ¹!bô¥Û&½ÙŞxbú¦¢Zµ¶}¬ª#wª!zmá›Š7ô˜›±"½”…)Ÿ¦¦Ã_#TØØX›ƒ~ë†=ë~¤'…ÎA†Tá±ÌvlH"/,Zµ”Ù¤dJzAcˆˆûÑm›I6M¤3š½	NcºÓ±™œCI¿˜¾mü¾•.ü)øu*pp¸ø†<ÃA
äD)—¶Æ¡vÙ©aFš¼hë½®#Êè>éı<ÙP¿GŸ¨¿"/|ñƒ·Š1ì^à¦‘ª	õ×TÃ’²UI­«¸5ïk0ZË°¶q‹F—0—ZÌ"õß:eD#_ÚJ(õ6-å˜j·éb¤ïÍÃyCŒ°6ù‡ ÷H¿…ÂÇmüj¾†ÏF3k5/:uàmä¾£$çĞi3ÀH|Œú«€òr-wç
½:©Æ2×ŠYZ°/4gk*lCgSg¬œÓ`)œEEg[t‹N¹·ë&<®ä.\¹äB r+9îÍÕÕå¯8÷e ¡å_ˆ]ØfgW¾ÕwÖk,a”h©Ÿd-©Öï·£$“½­?“k*} -o ÀÙ3M²¾—a']'ÎÖkA?êØD³a0¤BÊ¹xÜÔ3åÖvà¶sKÍıøß!)’&:Zµ,ëi˜Ô(7ƒÑàEã¬‚§‡­ºÌCß{Ğ¤ù&gÔş»nÍr™Q¹óèÁVo À¿¹¨Z-?sNNq½ëŸëóx±\«ö‡GŒ]£®—ŠÌf†ÌÜ”h¸yÍÔçÆ¹Îîq	¥÷çxDRKä?n°¯Ä$K¾Npø/‘è^Ä%Ñ±=XÎ'ä¦?Œa,ÓF•= "4Zğš6‡Ö^øz”õëÏúò¸t!ƒYöttÌ²”é*'º”¢h‹³‹8üğcÔ†`3‹¾Â)Û—èCé¬Ã„‡ŸPuñ÷gŞ”ÎÒA­Y¤‹ˆ#î³pçg}‹Z‹gÿ-Ì¶‰õ‹^ q( ˜!”;>•ÇŞj$rÖB—3iÛVøãQoôV 7Ğ©­b›æ»wtuÊøæ¼Ò˜*æˆ’U’,8œffUüÆÀ-¶Æ ÑÍGéùç#$ÑGfÉ‰\™iÈ}ÑÍ^^¡Gò*)^ŸçZíHû2Ê;ú9=˜ŸS_PÙw”?ì“ÂGû¢JÔ„ ôGe-RÂ·G§QJ¯ñ|î¯!!gN®BA¨Ïü;h‡R	!Ñ'ËPÔx	®K,åKú'…%.¨ÎO9K‹„}R5¹`ôPÀë¬a«3¹œ£„ä"^±EÓÙ‘áå-1\½iº€®ìqT²•–¿M<†»6OğÆ<!Í$0÷)å±ëØ9yÔroİÆÆ‘ÇL-ÜÓæŸç5zxõ3_÷½C*¼BmË{¨­Ìü˜ùk5=´ó-D§á\ß‰vœ¨ãû”’4lå¯
É¤W(©›É·ûé)ÎµY®øšşSù¾ü¶Ôbñ(5ç—«	¾TL)£a‰‡ó8W‘‰£9œóĞ€Tı´8hOSı ¢ÆÆrÆ(òexÏE¬§ÎÎ:j>ÔAìËX‚x“S*zª'ÅY=‚ƒìËrÚ¿Q3Aj…×—N«ÎLÓ ØÉŸe²/]£_‰i»Ğ_Æ„o‡pÕ“èƒtÆÄï~¸ÕGtƒ°éSÜP}‡ÁÚG|˜?{!í§÷©ßHş)„ƒw&Šƒ
ª×ä‚Ãƒ.9Dı#*èsiù>àF]Nö©r> ˆ<”¡LÃ¼X$/ŠôßÙ®Å:·û2æ¹‘`:êÖ/,Aï3õ û£—+°íÃòCÿ|¡?jHßãÁè¾7Sû 3Šñec’äÍÂ"ÏŸß°JëÓ¬ŠÑ”²³@ó˜„¬IaÊ4·Hà8Â@´œe½å8GíìÖM0T˜Ö+tVoÖÎuešÆËvYÙ˜
2½[ê’¾‰¦İ¬yXì®X!ÆNëï1™ræWØğ¾3e»¸9=:³íÖÏcL²—ú¹GC1t’tœ ÀZycºÂ×*qÅM’|z8ğnÎ}€æ»h1&ßÊß'Ï­XœŠ¬@¶i&±Nï$t‹ŞÆrëD×Œa~TDûªİó@feğPL,XX~Ja‘”ñß˜¹÷o¸c>ª¹Øc_Äã‘oÈ@0DÈg,ËÚ¦§»F4:%®2D®Î•Æ&sÈ×¸KP¼<ã´ÜPĞÅWé0ÆY ‚µ('Õ’Q)AÈ©O:69‹†5Ø¦â¸Ü?6Aq3D'ÿWÖ"Èu´¶E`ÿª9ÃÙ;±ˆ··.reÙaÈ‘)ü‹“¤0…9ğÿiò#Èü¥eâ _%º²}ˆÿÍ‰'ƒ¨„V3Â}+ı–çÙš–ĞÛ J~qP ¹Ãí9pnü‡ŞÜ5Ş^Í×¡¿`ZøOİÀ·´7îÜaàüMwtIî4•JsL²‡ŒiQ}k@€ä¦oA;4o`bÔ†gÇ)HÛ6…XGË_‡öPøô‰˜îàY_oáä:O·„Ş|]€¨UL¹Aù¡yÀè,~EÑh|jxf=¾° Hóß‰_^”Æ˜j¨4Û€›nŞK@D<<ñaóŠ¾é’¸ø29±®¸7\E[%XR‡¼¨áõX÷®>&úó9™¬Æ	UqÛ’W½ú Tì=€^…©Wú9$Oƒj¯¬}_3HWCè©úÜ¦Á púÖôWß÷â DbÅDc‡¬á¼Wµ®«ÆµRãUWÁrª)øØ±1+±=ƒ²B0+QzÄRü¬)äæã+µ;„gÇÖW¥ß+³Âû«TIË,’~üôÉ>Ùk~®I–Y…²SĞ<¡Í-—…3
»¢ +Ö¤¦GZç°,æ(~×]²9r*>|¨nlK¦§Q¦í¦ZÃ•¦6‘ıÑ4µ‡—ïÍÅ‡»²’ÃC¥q€ıàèQ–#ñg´xæÌL´nu±uÅ¶OÈ\W¶·d§¨Ÿ—}Ğü«(HWß©È*P¥Ûş6^ŸÂ]‚‰…Ì/WïTÙÒÑC«Àï?bÎpÃ†:‘™Ö¨û¾Í•êÑÄÒêcß¥`ãH¥Ù$TÖ9ÈÎ¹ı-	)›`Xø?¬°.&<”‘ËìØa«ëHk°MÿÔäà–BÙb@òdçÏ‘£o1Òù]ûóópÇÜƒÅGš,.6!ŸBÇScLNõIÈ¢%+~š¨WàÔeŞ”ï›xLjŞ~ÿ—”Çßº¿.À@@i @@ôÿ{	#+[3SEÇÿé{ª<© "Œä—BwkÃÆœ8ÊÃHFFƒU´—U2Ìö
”_êLDAğ$8¥Å?%mÂ”ª¦©¾îS_ı÷ßñü ´{SC’XõVíhò0…¨V$$ÀX½*nrçf:½®ÉvóNv¾IŸÛZ×ã}#]á[òXøŒzÌ3„á4oĞ_$qù,´È:î8‡ãüøhı)T²\
5•ÒÄW\‘ø—¦´ŞsªB®™Êá‘­ÇÍóË Ğ·ˆĞì8rÏ¥`aäS¬hšöû³ ˆéõoèS‹ê”“è’ç$ ZWo6'Ëïí=#[ÊxZÕ‰ÌxÃœ+'9“¸˜š.İ¿zï
ÚGŠvú¯‘ÇoÙ€€İfÁjxÂêšY+_n]$ø#…Yû
r«¾/0mZz|”"ˆe”o\„!‰1±ŸÉb†aâ•Ï¦&<$1 x"L"=8İ4|R‰à8‹”/Èÿ»{†p`òÿu®ˆùß½ÿéWû?ü+Ü\ş¯ªnÛ/!ñãò:uÈK‹\Æ:Ó&ÀÖªÊtR)[©E©!“#2##Z&ÓUÒ®KÌv[Ò(ƒ¼dÆ‹Ìt	Ë¬V©¬-ÅÄ[œÍd¾Üæ÷úƒnTc©™º$¬3U©³­•0K] ÑMÄ¼P©,	Æ’Ğÿ ,à9[¯~Ê=V· !ŠI<uß5âß>õƒ}êh¿ñÃ=ºƒ¬GŸx)~‡t!‡®½ãÚğê÷9l@=Âî5Çª£á
­c…­®uà¶dzõ¼÷×&P°Ë·1Y6¥mVñëé±PĞ·ÑW”Uß¿z.0é‰jıÌ©,hÂ}äÃ»ñ—¯>Ú¶©Í)m“k<éoW:d_•aWO%EÆ—åÈ·[}táš5]÷§×*»<—g˜§o;VF))ÈIAU¦±Ñû	ªwİ¾$K#Mv?ıe{ZK*½l’Öä½RÌám:˜pĞğtG¥Aİœ,Ğdğ%%Ò¤“L~ÊÜ¢z(‰s¦ãeUìˆâÕ’"éõw³Ü}‰ƒ‘ô/Ûèí1/pä–ñUÚÏKÅ}­O–—æé&ü°#1Î˜/¼:Ÿ‰78Cç
|ÉG„8PF®Rú#J•(D×=a¬oy‡,”Ì„/DíšÆ¼pÒœ(#–ÏSÑş*] ·èù_¢%ÛL±/In=Mh£!NæÑZ-9§ˆØ‘±Ÿ¢-¢€TG@@AÒ<F'°”$o(…GèÆŞ#©®Ao<”¥*Kzâ½ÃÙOĞUDQflæ}ı/)mğ&İşÃ¦88ëÿ›ÿ÷æÿe¬ª«ˆ*ŒöS–ÛTª/C­4«Q«ƒ1UTÁˆU\i,UE¶tb®Ma6Ù$ë®{¤xÂˆh}p?:¸yØ$4ãcİÅH€!~0:ß™÷˜kgí÷ø6DàüL1ƒ/Eûd¦†µVµ*a¢Ÿm‚P®ĞÂISş÷‰¥ZÃÚ0ôyÑ± ªq×ÚÌxú*‡ÖªhÏÔ7 £›áÂªWäm¦›ÖÃ°?í·êöõXÓÛÄ‘`'v²ãÎÙì™ù¨ğSwÆœéëí×Ğ~ş8ØÏ¾a9‡i~³2i¹ñ=4tvÒgÅ0ŸTõÙuÒjHñ:;s³ˆ–jDc¬`ò+‚¡¯Ãˆ
;=E`Gıµê×*cz_ÄÎû¯}3eà¯n÷j¸Á‰à·Q¥ Š$6š&€{H¢“Úõ1®ûª§dûùZ¯9Aué¸’jƒæ\Y›²ã„M+_ìÏ%åç“I/±†râ€MKÜå%Ï]K
m:æ”0Òá6û3±x@v'ãœ*»¡‡å.•HŞbk=»ır‚÷VñúˆK0%wHâº“0¼3˜'1feT&ÏĞEâæŒšò”((¹åZb.GÜ‘8§èï«¼Cçrfç™gş¥|ƒW•éœ0#Pİ)(Ç®YëåÆ5pTÈ›ú#®qíQnÙˆø„ĞD+ÿ(b[/ùbÒÇ³"ëˆ$oÍUá_š+ÉíOJ!àüì/Œ< ·ì¬Jé—üúë§fèİMÂKˆìÔÇµ(B!™Z0¶unß-py’ÿÚ"-fgÜQ1'Ë%Ì"ŞHfÎñı¿ÌFO‹KmÏÿşÿ•3øÿ øğêÿ¬«¸¢„ôƒ`K­;e'®–­·£¯TEBCÜ!Ô$mDˆ!åÉçŠ([Øâ¹…¿n!%(8ÅU.ÄæÔ<==ãj>Ç¹>W¿¿ ’1ˆÊ?q5m)Ìk‚¹Âœ:&Ê§bº6±u/¶™w•Álhà)¸ü 7Áƒ/J<œâ7 Ø.YgÁt7¢#Øä‰†××šÓD™• à 6#ºÔGs0A–È¾M4ÄjÕn~göxC‡Èë€%%KsVvè~íø;ªR6tñKÙró^dİm$–w¥ûä%ÖÇcÀÒRŸØ_‘=“t«ıì‰#¢Uİpÿ‡#sD½Ú—Ä”*¯ˆ–®*	Co?[ÇåÃ Æ\¡"¾FÉqT¬OÌùQ'™ƒÏµ³}¶¤¾Ÿ>¥Ör§BP	£>Å´H×à\œ AQJº¦¾èe–«Ñš5‚$ú³%Ê¼‰;ÁÃ–ÇúD•¡%$<N‹­¥Bü'ûbXĞçım1^—'{¬N™PTäÈ©ß<Õ1T´êšrˆI«İ9õFl$‡a¯évé”ucO£ŠV]ŸæÏŠ­_oKck§ÕN^&Wx¨ºßkÑôüƒ^ß¢9¥ÚĞ$ûdQf§\k¦h¬OÄ×sÈÛB¦Ô¢Ä‚BÂJõÉ!ÛNè2Ñ cö	Æid¥)\–‡+ÖÃÇ¤KÃ$¡å&·ä_l• ñØ‘¶\Õ‹rË_À3w«kÂ™Ë9vWE©$ì–OIâÅš€±ĞW¨ÕëYc
åy"SÔÃÉ¬˜áÃœ´“,Ö•é¬1Ü¥àÿš“ 	T†Dóÿ¾ÿ—*hÍ¸QÅ]GËïÒ‘Às¿âiµ¾Áêf¡Ä2Ff ÁÊi{ÕÑ	n¡½«kpZj‘ÏacœıúW,!üœãòT™gËõ¤È›Ì_‰ÜğğPU¶^,#\ğÛt¹ûØ=ÏñqwøùXïæ
T<ÚÒFwqb3â Üpá³¾‹ãõÔg9AX¨çDGéáy]4qÏ×øj$¸À:ÏE˜ Ë6iÆƒ©şhÑL9µöàm<+= ÑĞ¤©ë)5ØùZ¾Ê¹{;[Ÿ¼g.6Î,«’jƒOe§M»êÍºZ´‹#&²×	9¹¡ÙNÒYOëTáŒ®th¥±Ã”iØêsÉÒ‚G2/¯Üqñ¬çhõ›b°7'LuµaÄ™Òu',MéØ+rk,*œFiçgé­ÙI®ßì:o“†¸b`3Éã«!]]göÑÖËR¯PÒ”ºtñ×æÒ:ŸíÅ¤.G±fÙM81a»cÂEÔ¤ğÇzº]°é,ìÎ®ÍÕÁƒğyïü:Ğ/i’§/ã[lTe =õÍÅn»1Ë1W×lgÙh•ñİB ¬??H‰öa»·u’ùX3¿p‰g o·]‰»ù6İeÕ4EE¯h¥O—œHDNÖZôM/ÏO7¯°¥/V_^a’osŒ·Úú©±FÉ5wM#cü½îzhĞ¨4ÍÌTd”g2RØÒØ¬ÄDåÔ¯ïÏ˜zôñ˜êéò`Y]›×t§qå¼ÙØì“÷4±<÷âÔ>#Ş¶q¶ê+9g²[ıÉ?¢=me‹ƒ¨F‡[Õçû?H{§] f[´m­¶msµm|mÛÖjÛ¶mÛ¶mÛ¶óïÜ³o²ïËIîy›É|šI9FUTÙ·F©oúa•“ğ5îÏ ]Õà¬i–â[­˜¯ò`6ØØ¹}¸u¿OÒÓ¤Y™°dR‡™UGd/ŠÃ—[Nf r·˜ıy×&‘¶_8'§T¬µFœÚ6xó9a» ¯„©s {œ_¯$ş§÷8h½€=W7ÁáH|Û½ò¸4†qŠ;OmÙ=´®Œ>+‡7®Ÿ¼ƒh0üÁLè®`8m»IŠÛ=pO65Oè®XDä7$‚û‹åğhÖ´~»"jóozÚÄSôç¬NÛ‰Ø¤€ô“Æ,İºjXŸˆÖÌI-ÂÈÏ¥£#§fäCÂL#}Áy\Í›ó-óE•Z¿–ªÊ‹©ƒ€©Şf÷óí}©ş™_ÚXZçEqÇê„xix÷iLi}ÁÖvµÁ‘Íx»°0µ ,ùv¡»Aç>	ôÁ©up„Ğ©/Åà“<\YÏçîÃšæ¬Ì«Lx´ó­)­ıœwî
…5&ús|­qÍ“îfˆfçŞëÓß[•üãG¬éöÇínòº&Æ¬xÅu{bgMÁ†¿d¡Õ†ñ!^õ‹èˆ÷ö½ıo÷/„>`'ÉìLš&*ûmƒ8ü˜ŸUR_×GS„BWÀÕÛ«ùN»‹[ÎA|âofÛd½kBY"êÆóÓÿZGùTæBQét©bXæ½á÷i–á‰§–hÑû	Î)²>©^ &Á;É?ùÕE`Ë oÜ‡¼­y!|¢]§Ø†•a¿Á.ùØc‹æ(³n>.ï`>Æ·@øÅ¡Dø«ß+{†©b¥îrm2òÛ±˜³¾k±8¿Ò+­ÁFÉ¤g±‡Ené¶|AÄh˜öyÏ¿Aèˆ².“ÚO—–©WdË†&H¨š"İ­1ÀÂÀŸÂEŸ"É›7]UDyQóÄ°_2æfpæˆ;°&lÊ9¤l3à€–¦ŸË ŠZEô‰<å6ŠE5_HK±û÷~rÀÎ¿%å­UÏRhÜxÄùjPŞás³ÈœBüz [zà7µ ¯*ş®ŞüwH1ï}ÿtó1á«€8ğR´Çï°4I‡é¬ó|3Pù\µWœH±Ò¥+õÈH*ÛZÙ~Ä‡Œí6Ë 6N<<j{Tš(–3s8ñL2£|Ü“ƒFãytfÆ­wÆ_M…»üÒÜşHşÃâ–^£Ñ¼‡ªä ×ëŠ¡º‡˜‰`7ˆhå•c¬ 6ÛaŒ™ÄŞ+—ˆú)’2 e:,'åàó£h“3t¾7Ë9ˆR¶‡hı7§v×ÒeŠ…v¨†ò›gäwP¤×™Äˆ'‘4ß¡öcÕt×a§3ü+@©fì[àJ÷sŸV¨,IåÆìõ£¿+#ÖsTãÍ1IDsU·bõğ¡ƒşZ§ÕK¼x(Œ‹N` ïuş@‰è’ùÆY²F¢¤’3o	½NG¿âA%0†’—Íò3A«ö1›“Pšo7/ˆ—ä« o¸‘:¼
#
ó°ø•yïQªŞd¬šV€òu‚ßbc+rµû?ÕšÅ)¬é?lêö:%ı?2êÿ» ÆMyÕ™OÜ£›7	
©’‘9,>ˆ½>¦Ù7 ‹/&ÇÈ˜µ3UÇå’µæ|U5cÉyM»d±€M‘Ğ·FnatÈ!²Êf{Ğ`onl(:gıœö¤Ï›?5q¾¿l_oıV½n‰òü® È¡ÌKıxñmKôÆÏşNœ:¿©òÙ=ù¾?‘Ï ìÜ)c}nW8G…Á³.MR©^G…u™ÛWÿıCásˆsË¨’â…·§Úû‰ßeåê½J.y…¯ë‘ß§’fiù·µ/N8ÁyROİİøâf‚¹RÛİãC©ß°³1.µoò©{V¦¥y”Ç¥M‚—RÚ×+‹!¹TÛÛ5?R;ÛÅN5«¹Økãj’…:&¦+yµg­ŠêUÓªİ»3qx–Æp¶ºN¶;WDvÿ3[a ‰™­íë©³›î¡¡®3N=3ÓtÄw¶ˆ­™^+]£Â:]j§.ì®mí~n¹i¦½3«m™ˆg^3ì^(‰ü˜Ì2bÖš "_ZÓ§tÉË°ÏCz*C¥MÙ4Õ)Öê’”ó[ƒŒT©¡ƒ²CSµ&H=éÓ@?Ëş¶íÜ¾¡núİşŞ—‘™“Õ’ƒ”Â”ŸŒ8~¯¶[ğÁPœ´VÑú6~ÜİSD2öİ£õ«{çŒoÛ´æO—ÖkáÎâáURy[¾!eıW—+këĞhB«­–k}O-53ÇË˜Àkº4ÚƒcĞÊµõµpKåÍå­ó“A$gü«F ÌØüZtœõ™C7H
àšï‰BX:SŞ™t?@¦=?L Y¤j­^ş¶¢.~0 »>0÷oÓœ7»Ÿ/¬¿s/V€Ğd›m’à2&­^b¬:ˆ8<'#	c"´S.­Î;Nèî­zG¢"ŞŒ*—Q%z(úéYt@òt4‰{M zíOïrã"ÁôøÕÆŸÆØ5á äè iû®#¤›z®}å˜¾úrË1$PâİİE¸ÛûQƒóöø¢@¼üÜP`ü>2£Q=”½ZŒ[¨dÁQºTOY ø‘ ši»áË€:sNéÈ@PVH 
a´D{¦ÆÑÚd•…â y¤/bæ?“4Uß\*/æG[)ãup7FåEä¨aœ”kaevQ$ı`ºşºõŒ3î ¤{˜tjfĞŸ9¾^´$—~t™}`¬?Cïû"¹†°)‹xÄs†XŠh&Ò}¬™‹ó¨•´ğ$ä
¸p¸›×±%¤WPø$­êeµ¹~p†WUa¹Ï0=,|&©CÁmí't4ÇàR#ïÇ•VÂÎŸÒfÄÓWLí“FÒívBô90w‡#Æk:%«jã»(‰ÉTGàmÑŠïI×Ú­³–IïO¸ÑÂŒ^¨›ê ÉÊ›Œ1Çl4FS3aÜUÄÔ9Â#à‚ºGyjÔÅ?"<¶bõ_œR-’ÇsÎ‡a+ÊwT×Ø9¹—Ô) ®ÑNå—¾E¢sŞxòÎk`/G7»™¼y6fÍNy„ß €°Œyãµùæ€Päµ\TÚ´ÎYR
ÎãÛyNÆìì(”É’D$-~GZ÷ *EÕ ØùÕåM”}ÆpèòÃXkn¿	[Dz€zÑâMÃ»Tax¹K}„¬ä~¨½ç–LùNÅÂÛƒ¤$å:lbÉ¤ö.Õš4>é¬LKüÓbq±vi«Nûà„FÙ J­	YÁ}¢ñxĞÎU#­lT½~Õ0ÏbVÈCz¸ÒTNÉŸºÙ¬µîB‡¦)âzZÁğ~Ü/Ö•ôÑCÄ±ù¼®––1—•w:Q%
Vn<mf‹èÎ…E³ ¥fá=0¯û·½NæÒª¾®›$fŠSåí¹!•I*GÙ?§ ªã–ß6,ã\~íì`Bãğ‹$Õ=åg •&É¸à>(½§òÅá:"†òb)à<Ø·¡¹£‘Ñ‚öË™?1'M|>H•Ñ£’ß'iİˆÍÓyMzoYÌãH¸ÄáùfÂ:4Ö;çWDƒŞ@°tâm¤ıà²h$1½ä.¼&ö½B,d­•ùÔçT840½RìØŞğ¼ö6ß\w¤oYÎ¾Ÿ€ù$˜Ïø¸NŠò„—°$?’_™ñó á=dÁdpê«ˆ×ÿ ëª–¸hš<rÃ÷æ,¼ë@ôfŞ²Ù“]õÅxÒÒÆ‹%€6j¤t•ĞbHó+ó–óÆYs<!´*ş›ÖQŸ Êˆª·Ä–ß¾ez³õAD¶øz®N¯®N­À]‘jô™ó$„¤úÊ8v°@2´ĞËæí®g†#ÏJŸP<`ŞÄF2šŞäIc|e¦“ùC`À”ó°;9—ˆŒü>9qô–O¼×Ñ»kwy!¸[pK¼.g-,¶P#©³o#+ñ èFQÙùa<„ÍjW¿bŠØ^İ1KPİ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                t * ((val - min) / range));
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
                Matw|¦4>$yæ¾Å‰`J¿MÆˆKâë-õ.NÕ}÷~Ç–pÑ‰SÁß°™Œ0GSÇz±åÆNó
”`37cÚ©ŸCn¿•G}[ˆ=cVê3q®'vhÁİ{¢İ[
Óæ3	•mşrV‡é¨;€Tbãl†C ^Eß ÌxêBv-“–"RøyJ(İ*3—JÍx	½3éş¹3µ©\IêSSÎÌwtõíoxº¯9MëI‹m‰T#a»)×¤à¸¬_¿7-+6#ˆs²u~w·¨ZõdÎ kû%oš£}Î£P<)’ 8š¤ÏyŸÖ˜Íe/
Jµp,ás`)Ú½âŠKöÆ_›íØuÒ©÷­»-Š"ŸMÄİ‡ìá9¿ßCkŒ½yªcKLé¸)òîaµ»ºLW¤šlXÒşûY?¹I{3àQ(ÁŞ$fˆµœ´7¤•æÕ_Bğ¶ï8™ª’&°»ıõÙ1Á€ÖDŸ¥ê>#G¡èWå`p\ÍƒÊ+âvöqMXT+%¡ˆŒoI"Ğ,å}\å
D]P“m[ºòõŠµX¢áÃµ%¨aÀZbFÃTh‹Šï£Ò•§°j¬µ%Là™æ¤;ËnI·Ô3©[ Êyjô¿­£Qè&H× ¢
²æJ£ÚË" ñ‡;ÂbK âÁaJæÁ_t©ËW@;%Ó-;;#ô0t©¾%ró×ö¥ÕÀı zVÙÓ2kAX:qö×©dnğ¦@kBË,°&%&Üo´ôB­òDzÍdùt•ê-‹HÀÚQQ@øò¢ì2üÒ¤‚æ9¿-flš“1¦GR*&wXÄ)"Ú¬kã±lÉ	=¶š1ù®YHéï8-›–Ö [ËînË›oÎrbFwDşWkbŠà q¸Ï…×wP‹ªUŠŸõ‰åbÍÔËë9™ƒšÏoüıY/>³˜)Ô°Åõ°‚ÕûìV`æˆL1_ñó‘
]ş… `_~k$ñAø ‹h—+`û%¥&ğ€ş#´w˜»~§‰Ëo¼Ë9òq†+¬àº@
ÊÄ]ÕL•lÎ°GA7“Å†k}ßå]Ã}£ Fë#0|OãÍğŞ»ÿëÿ˜ÊÍÈ³³ÿFñmk.ÿÃå“‚õ¶4ÿd{ù!Œño­r;;Á—5WÜ1ÄÜ^®0@˜±záË3ŸŞ4îCídT!¶ºÛ,”áZ'?ò÷¯Õû×ëÇyÙĞ¢SåÑ¾ˆ7²#èáÆ#òa_†éùçíJPï|òGtÃ0UèŠÿÓP#,a:vÂqcÄÒ¤­Në\aË'Ğx­‰@yk–šìä6X>¹æhsëò~ 9€@ıPÁ˜ÅA@Ò>C¹<„¬4-oò˜£ˆ´Ü…b1•Î¨RıkD1Ã—üŞ…¹ÈóSÇ86|·±é'b	oŞ©bb€Ué¤»æjRE»í$b0rA£/Ô<m˜¬ë”HºÜÙÒµŠÀ{nÔöYqø¥Ã‹¸m—D-š÷áîc—ÌLîsyAXó<b§n–¤¨†È2½¾_Ÿ3!!hI'17ZÃ·ı8ì÷*îK3FF¬†6!İtEc³ğ
õ¿«nÍ˜ş¿B1AşXş¯b‰:¸ı²°T71ımñÿ
H5EÇ%ÿóYû­t*J‘M óbÒ¾*ZŒI)qQ©×—óyMò%XgØ-ù¶R+ Ãt¥qHšC>=+Ïûş¯ÏçÁqF=ØÙKò0'zJGİ´’:ŸfªÎÌà,p(©÷@–¹o*©‘Á‡œ]Q9æÒ°rÈÿïmŠ#4Ó3²×I%â™óx,ÎìvÊ­™s*U­ô¯˜†½{´{h“Í½¹MT%È€C'\şn'†­és*ñ:FšC¡áªms®ëºUÍ.\’=ÊFø­’Öº‰2µq–·ù»á=×±uIUáPT¨’G>½³v‰s
cS]lÜ¸q½}qüdOúÙ]ØbZ7 v…=nõîpx,„L¬†Dà¨˜Ær=0}˜/T°6BL¬Û·ï>I:Ï+)ïê.@ã‡÷a«/°(3 ê3zÁõI¦6ö;'–²«0E%Q‰Ò€Jw›lnBY]è_[#Kñs›gct¥v)SÑö$óWĞ&†*cÓr«š¹jSÕp’¬§³J²Gõ2Eh¬x®Ğ2-eøp›í0pà÷%şÃåã\f!w·Æ;¢°2	‹!©]ÏXê-´÷cÌ?ÎuJ²Æ©”ÙØ°¸B$æÒáæÏ,M¼¼)¬‰‚äá¯´ûfŞXqŞRÈ[94›ì5Ê\e$@ çÖ Â´Ñÿ»‡·û90°°(00²ÿØıO¨µúÃùé.¼\ô¥í¤|øËêOŠîOx\„¡ìMîAÂlÂ9#ĞDÿJˆfÄ•Ç ñìüŒ…6+FºuH"''—ZÌXŠ]zD£2›Ş<Ÿò=İ·¼”ÂÀûï=X¸ÇÑsçêbú¿uq!tdõíÿàVzí½æùríşU5û½ß/"ŞV}K€Î‰hêO?‘;^íÔïËfwî‚l0¿@›|ãáš3İ|ß±0r5C¾©¾FÇÄ^Æ8ßI¶B‹¯ãÕ³ßRsÊn_•0R÷s•7P”Fg×D8‘Q7õ/«ê÷Èr_² ~·/GäTt€Å‡pØk ûW|]0Œ‘©Eé˜ Ş*‡$¦Aê¡J‘š©Êşl¸ò‘-k¥3ÑÑ--K‹X¢f	¦0@ÊÓ¤ik-^É2]Œ¸Ú¡ù/8‰ëë¼”O‹ê†u"—Ôıé†62Ãü˜*[¾®rá!‹Õ/¶h€‹•/G¿¦¨,%¥Fª°$€‡œ[¦XºÅ!‡´Úzú ÀM%©¦(ÎÛÂgEx `&p¶Tø	PR{µèlü6È9foáËE´'¢¼w¿” +Ìçc(Œ ön®M>Ëv³Ö1Ş‰ÎÌ+•·­ÍgŸv@°¡/¦ãm°µmÍ+]bµ…Xåx6÷üîÜÛ~éYXƒ‹Û•şÎ¶âëÎÏó!Ô¦à´mÌw!\"LÖİZoë*×a-¥>üræœ™ÎJ•ˆZPMÄZzC°g\Åİğ1Øy´:İXğH¨ó_Ÿål¹·>¹‡ë¼Æİ€ú³+–è‘ìÁ:Øæ4<ò‡©tß"Õ¯àŒÅ[¾;×E«ÂNoC#Âƒ3oƒóĞ¯ü¸ú+R1UßÊzuéœXåN\¼;8¿Úæ>¢={¼O'Ğx¬HT±˜³1ÓåÜ>[pXr E¥ô<ù€GçÜHlí†Û&Z)²/=$â¾;2Lô(ğè—öñUY%bk‰¼‰á´ß¬˜ñ˜¼,ÜR’#bm1PG/7o¯»¼8/ÁşÙÒÛõD³ĞÁ¬õı”	t°~G¼kõ9+(y»ízJ­TDø¨
šYÃŞ$?Õ ¥+>âàçRr{D@±©= 9ÚW(Êş’C¹ I}êG6`gÃñÒ“bµŸ»Eñ¹ë);î2Z8²ã:ñ©ë)¢®Wv®¶Vø|c“(ÂCjõïmƒŸ|ïçZVDô?ñÚ¿óÉ“‡ß#À-„9Z£Ömê¾l­‡6¨#*ş–Öj§?åúJ¯#Ò€şŠ4Ÿ¡"ßKó_Öß\Ú©"ãó_vÖ;»zàÌ«EŸè
Ø[(Ù¤ómğ¤.*Pá°Ã(©ğ{’u‘Ëws®&%,¬Ôw4×¨PE*Ø’ª
²p½øb×r´¤KdªÛNt>´´®±¨¦¤,1€…Ô8 •P"ıXç¨k0`¸‚'Ù'Éõ¨Ó”tšNìZ£uV´H^5‚qÈ¸ƒ²ÜU±0ªn+43¬„y€}ÚÅ"zU£òÛ¹ÁL¶°•b 9<$™w;ØšÇ¢›kÎH§İ‹BsÄQ‰#J¬Ñ"øª¯0¢…¥t§›S1­ŞÙgóWŒÎ5LùÈÂ=ÖŠùw]1]|pNÕ¿•C¾:È'Íış’>¡ĞıövËÛÁ*Vî®‹˜g¹ÑÖÏî®G!:S–µ¹]Mc(ì8^ÿ }ÉÛDÖòı8—Q¤©ä—œÕ›Ü:H”ÒËÈ=ä±òÕW[š¼A5£òª±:˜îŠ<™V†şâÛ“¥ògøÙ¸+(	nš0>öÕ¡ËNüºñ¹W±îîZsçgHL£
Î˜@d6¶vAûX·Ç±®!Ò08HòA|ÖÖ?dªO¬(„ä+fÊÍÕşÅ:²ºÍc"Ì\t'ˆÆ¡ÚşïE2/qÆzqƒ'ÓQ•Ïk”õ‚k¨'ç	Œp|¡k¢‰ $ÕùuBD7ò·Fã’¬¿ŠÓm@nœÚ¶MT+-HöŠ×¡íí(Œ»0ËVNÄÙË–‰v™Kxy%´‡«:k†( =l{­lZLxmSû6¬ÕñŸéƒ¹«ó3G•Ëel±‹‰F[©â`¥ÜJ¤5yMé`öùøxAû=™Rkd©_9²Ÿ†ÆÍ[™­(âî
9œá+ï¯ÉNFõ¶æá>ï¦ÔĞb—Û¾.–‡Åg>Òjaš5–jšÅ‚m2¤„Ë#ãœƒÆ×,ÉøÒºëğĞ°ïp<ûv#p.#ÿc£W³XIÀí;ª	cf`0† fmÎâ„Uºİ;8Ö‰Eé~jïßÈr$Á‹[.w*kò›¯ÉêAHsL h.Òcü>;·A”J5 Owíb@9-jªÂh\60?Ô¤–¢½=¶4¾¾¹‹û(E•çg÷ÄÕâÊÅp+C×Qı²‡$9Î¬SÑºàÖå%UY‹p2ü×§é{ç·¾Kiÿãç†ùq‡ƒ¿^ƒÖi)õYPšr(opâ9Üš^ú& &Éï0tâs²÷R–KóË1¤a“:x0â£u¤Z~O‰ü~œfx {Q×Àì]Ã³á¡¦Ÿj¦ùøÆcãM§•fŒX(dg7ıGw¼çSÃ÷EIdÃ„ŞØTc 	•ÕÉÌ²¥±!Y	÷ ÃĞ_Mji’jG´Ú½°—¥XC7ÄW/‚µ‘©[Gs“™êD¤U Óiûªdn¹r¢tòNZõEûçoõøgä$Úƒrº[ü½]Ö sèüŒ‘¿Ë,Ú¥
‰2ø85dÙÏŞLBaºè”€SHê½ƒääA‡4•ú›çßH*:«íÀßõ4.ú—‹L,³È×Ó9o.üÕäã¯«Põ à1‰$;ÆÎNëÎ†@5'4HF5ùâA™&Ë(ıMrƒ“ªjyòÕH 
X)cûRôÜˆZ.ËW£€êÔK2¤w;¸­p©dq£mèÂ°nª“ÎÛ;Wô§¯éq~öË„=j¿÷ñ´ÖÀäiB­(·“ju5Œ]wm½ŞVÆ[êM4[±ÃA@ö±"Ë`Æçé¹ú˜mçŞ—gCÙÔöRLÒwımîÛÈ1öûAnDï.ûÍ¡Ck°\t§n”)).o
Ş”ƒÉ—x´t·ûVÓkƒgÇâ|V¢¾£˜Z_8ßUdÃ<¬m‚Ú&­&c)¥F`KöhÆYßCsÎf-kb†8OÈ7*l’¦3Ÿ‰ùÊˆ…ı¦òk–Œí# JÉ|¾g-Õ¡¢·V¬ÈiºCD"Øé5Sè°–ìÑv'ºÿá
ÏyßĞä†6«¦&¼²ÍßÇÓ§>#Cí¬Jª••$ŒÄcÊØú‹ø“ÿ­—Nnzj‡YòîÚ4˜Ò::—e‚ƒ’f¸†,,µ&ĞÕu‘ˆëÀ®ı°©”­/¸–‘ÕR·G:ÑâŠ±$Öy <y4}]6î"Aí$S¬6îrR#(ê.¥Ç=ïB],C—”„ÖÃÓrÔÂÓFÁ{ĞtC· †&ôÅ>’kÓåğ$É±I}U5ÒÃX¿ë†+Üì~ÈˆÁë>Å˜Š©llr(¢ò·¦½„•ædêôÿPÓ…¢úŸc?:A$¯£¨(©kt;º‹¦ ’QúÆ:ç$BUÎ.ŞŞ@k]­õÅ¡4Âî\—'Q ’C7ñ¼Æå.5ÆqÁÚ¡«>Ÿ¿>ZêUxu
´#…BÕ.®<!ÕŠ¦¾Ü8¶ÈºÊÍ${[vÉ	®~vù„(]aÊp3šk¡
¿“Á}.aÁê¸Š—µÊÿ˜-K0À¹´³û	½I¨1»İ{dpØ^¶æ`îCƒèYX·RIY¾Z§—y3qÛUCÅ‡‹4sÅÍ0X#4IÑ¦@‰ñ(Ng ¼x2ÄQu3ÊXj¬ĞŸ%70B¤|Yğš›B]âK&:ø´”w»]:ŸNì(:Ò	àß$ï qŸäÚÁ‰cq¼a÷úêâØ ³Åôƒ¯ØfÇ,´§µàœ	®¤)®¢ÖÔÉJ¬rw’¼Ï&zÈÊVßàÜšuk®`•t{D¦;[}_î|Óå´Aş‡ı0Ï™	ÉÆ0’GUµi¿t·31’§kRRÿ‰ZnõÂŒb’d?UM2Ì ºHJe^É°¬`ÃÍœIi½­İ©}÷ßÒ˜Ï6(ˆ¡9»ü”g“Ò¢CÔ_Ğ‚\ÓŞÄ]Ît+œ°Á6æÒíæàH­œ€²jk)`/•{zğ€K¥ÇJ»p dpDÒ°!MööŞ]ĞA¢•ÚğU]óùaâÚEfï¿5œÄˆƒƒmÆ0´2\2Ã‹âl$õ¬@êØÿå%2Iù³ÁLlëŠíGW0…9šJ_ğ_8d©1nm;\Fç†fWC¨JSÛ+&µ9´Ñ§,şY_¾ë<ï
LrI¦²TW Æ­Ægb#4@¥
AˆŸHAĞrªõK£T°¸MÏNÛÄñÑHruxŸĞIi¡÷ì)Õ rìlCA¯LÀºÿÚÊ	ç*“Ig†øÆ,ês b"		fóŸÚnñˆ"@d\xE7Ù„|ÁÉd<&YB_ğ_0nú(-k3»ÁEV+©æ±\ÀÕbâĞ¾‚üSøâG}Ü¨ÁqHíf„Âgª•°7GDã 5yŠ5Ù!LÓç’W•Ø=8NNŞ\™3Ù„3[›× 3„e'÷ÅS¹²aï¶¥„Q<ılY¸¢N, ÈZpØå	†±=zp!tgL{¡BBşMwœ‰äŠÒùlhU¹´úè_f›æÛ3¿ Z2g8_Î>ÎıƒRk¯ˆ»‹Cªù–¡nü„8·Nî%×hã>OÊö¤ûúå…ô	…:4ˆª;Ó äÇßk„%óŒ¦)…'ŞYÙÉis­_ãp¡pWYt­´Uëe~İ÷ÒÊMñx-ø§dÆMçk'÷„|#öMÄÄdÌ0æ?•HPø‰¹×/¤Rì-õTî -ÌÈĞ+4W'ûjÓhÍŠèİëæí*.0İìøŞ+àÉ÷²yèY¦	™v1|¬ÈÏ²¤™aÔHRÇˆVGıÔriÎI°2ÃlÚ4ÙÿîEŞüJÁ¾GK!Nä•Í¼)ö®å“DÛ„!LyŸí«­è.PpdE“³Yg]Èş	˜¾jRÉ5òHñ„ûĞb(~±}§1ae›&ód­xùIR7«uuë*6âF[>1¥gšVş¿ŞÊx$[(Ê–÷>æsëYF+÷9R>ó{¥@
AÂáp¾91×ªW‚~ãå±iTï*5lëF¼rß;4¯a€¹Õ2Ø›w…§RkÎõWUZ4óÊ&PŸ©QÎqêG
 páâ}v­šª;d–s2
Í¢­¼âÒ#íˆî è‚œoÀ¹¥P±Äd.3.ÉPË•Ò™]3(ó&±Å>>™$`~G€Ê!	ó·~¶U<¿©¥˜?¥˜âŸhP«¤Vóï²ìd¿ayèhX’£y'ÖCARÛ¿ŒG¼°•ù¦52TÕˆ†àjµØ0«(ç_Kdİ­»ã¡R+çPPEÎŸGğÉ(ˆz ±†š1Ÿƒ>}$\ñ*ïè¡C‰ÜCÓvÏÒ¡xeÎ!‹Iv’*Ç«Z¹·dXA¸&,cv=#
ÂJ8¹ß^R¢i•Pg¹qÛ¨†ß­ıI‰63f‰.q|Ó«Û©f¤´°YÁÀÊSgMñÁI]ñF‹¬ê§¹Xvu¬{™vâW”7ñ¨t±ULóÈzÏ8Ææqvö®ª£‘§Víl±nŠ-Dí‚6…ˆ®¡Ÿmë(ÆqìõÖ
¸š¾Bö<’Zøİ©]q¬H²P6Å|ÛúlÒU®“‘g·D=?õx$æí{ÊågKuİEg`‡66ùÌş“²ÅÀÎÈîÉ}Q	–¬ŞĞÚÇL<«êş{z$Kïà½×±U?×GªysÖe÷ÅPVm`dÄÒ+å›Ü‘Ë†–jÀUçÃ²g¯Ø£³Øj‡göM¾°÷1q™zøeİ›,&šX§¥—d xÌé‡ğ#ŸƒŸ/2F¨µf#itÖ´%{+Ú`¼7:™ïh`É—n˜ÕŒ<áƒàä‰R<µ2ZÖö^Šë¸­Õ
Î­kÖ1v#ëeš¿Ù^;ç1Õq" +~1Îbp'ıİ’Y6Jbsgí[ş*ÒSp¦7
ò»¬Ğã™#å.Vq8„?C3Ü\NúœùL5í#hd³É"ŠÿFë@ı"lZ¿/`*ıSØ¨…{ê€†J¸ÀÈüÒOI¸>D Ü9R;6©a™e4¯DU˜kÔ`ŸCıƒ7]·º¡ØîœÂSPZñÎr¾íeÓ=8Ìp¹Q>Ïw›@{U6ZËàÉfaÒÚk›jÜG¨X˜­Hğ;Sp­«nÍ¶€¯ıI‘mT³IÙoCm‹¼­pí9Û/­cîPô©ÄòóŒy§õÀ°îõ¦úF"i×-ïp®Å¿!u((ë¥¥J7eãoÒØC†w³™ÛR@è«-?ÿŠ¼oC»şóõ&İºÏü h[ÅàQ2010uĞıà])‹ŠİæHÌ0×'ˆm8b”ùÉùÁ—°şR
Ü}3œò‹ºmÖS†¶š(IH¥Gc‚°zJnf¦m-©àÃ•¥Ú,ÔxÓ\xk€£•Å‚–õV‡_"ÀÌ¿m-ûQäaJŒ›;"0<óÖÑb—S‹D5’·a}Pf<WPÈˆ˜¬˜»Õ¼÷È²†Mùæ‹H¼|í ›HÙ™à.tNÚ.MHñmjnz‡ÚˆûëÄÌÈå1½}’¹ˆ*8+7W‰^vI÷û²Kr_öV½­SO½ÈË‡ÌIµeµSF‹ÿ¶‡Mó*–ìpsƒÿCLH›·Ì¤·¹lY@eÁ y•/ PÕUQûHq^[LÂTÎ€f…Cñöå×Í.wü…Yà{r“Læ°ÜOÍåAƒ]à»ˆu€ıqîüÚŸ±y¾MêqSæ%EÀ1Úì×M›ã~Ë®& <™¯ƒ‹Dõ•&1,¼b6éJ˜|GÃL€ÌşN=Séuï§ØeÎÙ×:YˆÖzÑ¡r$Cÿ°»ÅWûHï-‹İYhâRÆîç­ŞG.óŠßa+ŞRÿxFÿÊd2äÅßWTë‘Ü?™é’\-P¼móZâ›ióÿá(üŠÚ“kgË\û“-P€”Y¤ê§õˆÂ¿ç~:)kU-U¦fÁ§XyPä/6´ÕÔ\ULT­¦ÖÊëå­ÊbÆA=õ™‚øK+ÿ—(Yë EÓXÒL’ZÍ†{ÆG¿–àÛ~¨ê³õí´VØQ4zøân?ÑgÅĞ×ª_yzèFyŠ¶ü·İhŸÄˆØ¤Ôü®aÙ-jn´;õÁ‡8& à˜ÕA•Õ#™é¦±ˆAgD{äÆßLÃ]Äl;ÏÚ^ÏbŞ¦µ,”›oÛõB9©ìÔ§î<fÙ!šP$ÅmkÙZôy*Ÿ[¹nŒ†}Ã–˜ï³‰l€•»òĞåÚ¿)ÎàYñ3ŠÚb¡Ó>íYğDS”mMÄ*ÜÆMîéŒ]]§}uòHügK»\uíÄXµú°£¤\}õ{¬=]fV¤ÀzG‰¹»÷·	Lè˜h:’C:ŞgÏ B™¾v¶‡L»H=n®½*øû¯JŠi˜‡ÙGBM±=åBüâP‚Ó{‰S:GÇzóJ‰ öO¬6ÛyHÉc*®÷(fùG:÷.Sq†EªÏ1Ê8$ËƒnŠX®+w`kL©Á‚Nc„1I¶O©­×¤}Aê¦Š8Û2¹Y^ÆSQÂfnbš¥_°[’şprá]O‘K¼6q3!+_ê¯ò·%iKŒˆã³#B5ì“V$]„+'»`àÚÌ G(=_Üb…}vÍıL!¥Ëÿ;ò² ­dÑBRçm^¤ƒÓ?|Ã¨*æêöjÁyz3ı¥·g‡ÒÇı€Xî,vo2¿
3A_ƒ•ÃøŒb6bŠ 3öíP“œù•UÆMÉuQXOa1?Šx{t­W õO‚3sv2:L£Äp«€hçp¾£KD—x³_†  £xVXíH=$dB×Ôw›$Z9âO³T%ÑÊR
b¶ÁÒY÷oU ³ƒ«‡»VRÔóv‚`–êÛ¸VÍGwa”âU P[{D5|9§òy¸F(²¤ôx$ÀÉør¤øCëœßF¢ê¢×vxl:Ôä_ãFe	œÛ¨^'{-¦¤¦`Úi¦æ†`³Ô¾”I¦ğù¿¹)/Â!Qß
XL¾é$¢Aßİ$”ÓC»YşÁWÖşÔoƒ¼à	¥:ÒÔæ»¯»+èïb‹7¿¯ÑÚyO¤’Üé9ÆáÊòé¦R@"MÊä“Ç»Ú^ÍY².¡«Ü§âä•SºW®‹6ı'ˆĞ§‰_*…Gizn…—¥‚ãûËmœ}ÿ)qÎ_Ğ¾ükîÔÜ&ÒJESÌ£Ñ€¥4V=µ«pX²ñTOÇË_C»3NÀô1è¨M¡lt–ºîµÑ<A`+ç{ıàK¾à©~gZù¬vgfã©æb6ûNiÉpt&óÏ)1Fr±¤Òâu…c•Şº~ûD×!ªÁ_ÊzC2>ÕÖ$ÆqÆ_e”©¦¬mñLŠFm‡Ô±ÑÆí5í×0]ÿfl­ëšûQ=úJÒ¼Aû¥înë1šQ=ùÎ)0%Æî.»±ïké1ş"Ğ[ï£I&<òjA›kXµ»­ÔÎmŒû(êXz×'–üÆ®\j‰hT³Ğ¦'€6Ä2'Ì¼N-È­sÉ(öƒN_å™ÜÖ¾rN×FâŸìU›5GíÖ;ª(¾bepÕ¸2³;Uóª18®0p\upú“o±šY!8^÷éĞ„ÅÔl7ç@”>§L›±€Z;mõøĞ##Èl™1q\zÁöú!Ô­/T¯r]¯~]oª5u,åïg8Åµ×œé ºëÊµíœt„¿÷iÙ&™îhÊ=uÌx:Íòû;@QàÙÀk3+¼ïÛ^2Vh&,}J$}*0½=u5üÀ@)°û2}«u’{‰¶‘éc~Y½"Ü ÃÊıÇv”ğGõÊd$”4Õş·/•¶_M?IÍsÓ ™.ì
R›Ú`U›Á—´ÈeèdrZKÙ²H°Éj½øqîÃì÷äï¬‡^^v˜_ûr?>Â·SûôÓÄhMôzAÒõx2|ƒ~ÔQ‘JÜ:Ú4Ò:T)i¥0’x£­öOLáƒİQSÜ6AØş'œ¸-¨â[·Ÿ	¬–Ø/°»Ú58‘öc×Ápİ»©‹¶IâÑW«ƒ~:	ÌÔå
:è©Ä‘(N¼«8/¤/{R<?BÌö”¬ƒŞy`éMøk‚ıç&wŞPèÃÍµŞµà:˜\Yf‡*êÙs]šøb&ÎÊ–¥ß4B—`×ó€¥!êşŞ‚I‹ÚL…”$¨¢o[xÅ;%U§M(¼kPó®Á×!Å ‚ß4¡áÌDL8ûÃvÃB=«¶)ÃÇ*›4*³Hİáøêï-C:ºŒUÜ”i’È-í;ñ–ïÁúÌ®ı”f‹V•-C”¬„äBsY·¦113†¼åÅ?OZµå*µEşM\J›Ö+²${)®Ú¥ÌßGKÖ Aæ„«ókÛêª¬ƒ¿9#ÕD“ş¡ş]Û@ÜŠ£bµ¿Ãúµoö<àÜ½ç…‘‰¾Ø(Œ¶G>Í‡·®ı³ôw™Y.ğslÏR†Õ3Aœ#ı:HXèõD”¹Ô„niNP³áŠO—,èL¨t$@ ÈëÂ*Á…MmOgzo‚VíyS£;ıê‚¶Åu¤¹|]y¹¢¹‘¹u²Òª¯_ì"}é!•“÷hÓ5i.ß³Ç
³Ç6Qb¡âFË2äm,Æú$E¨`$V:ˆ`ğöÒêâU¡í÷ïlF3Ak^1ßë–piØk±¸Ókn‡\æÒÌÕ³û¸)¨ŒñÊ¶ãñC[ã×"{Ç6˜âJGj›Ì‹k+_dFÑÖ&Ù4Õ6M–È´@
’ÍığöÊGjzƒjôtw1Ÿ›ÉÌ|tG 	²ÜôÉòpšI¦}7Ô“ f³¼	E›K N7š­“¾}ØkGgƒİF›,Úá8¯³Ù”Ñnv½(â¿€èsü‘Ø™j¬'¶÷´Ãez®Îk2=—›õ…Ä-(®ÎV¬´K‹Ú$sŸp.x›TÆºú†·8[ìKõsL™;M'y¬ËkOÒK¦’<òËò¡SıÓyº¥lG©lGÉlGñGéÊ>ˆ²Ûn0­%Él®ƒn,fÈu®™#RZÊ3lÚ³d¼œH9ÿŒšwh²Ãì­c¬ä²ñó·`~êR€wï•ŒQ@D¨ëD‰»ÈN¾§a*ÛWcbrÄ’†MøB²¤AåKW"bC(O°J[L7ÍĞñn-ÇpË81L	áW(-mıı)!‚Ké;ÍZ˜]ãôÅÀwz}gk…ÕxjU˜|—“‡¥ºfá$eÊàŞ² F™“ºşø8q5¾–ãÆÕŸ:«!RÂdûúCŸ)!İ¼1Xğ[’G<
0øOz¾@Ä5{æÕu| l;XŠxÏºcTŒ\„8ƒñ>"ÁşƒxÏèWMDáàb¤—b£m?Ld&îØì»?Ãx¦CkËøÍš™×« €DñŸ5©´/õOQêrä'L´w¬¿¸A…ÏM¨-<öW?¸ç@b*¦qÁp>şIƒ7ée¸†ù7Q­|Ü´ gÇº
	ıeé6—WØH·l®¦;¤JİSáô	¶'-|ˆ¶t½†ƒÂ;sóĞğuP¤y"â«ã:)³|¤ )1¯õDyäV"ş=Êİ‡¨Ø?7~^öòV…\Ã¸\"òÿñôkå4Üîa„‘jxôÈE²ëğ>GDÖëé\“r%Æif©À'ñulî®âƒ„x©W4é½I
]"E¦ø!:mÍ’X½4Wû†N4‹ô}è¯m©/È£°LøW5ä›S§9×w¶£Ÿ¶ı¦FôÖK©\8ŒH;²‘nYâ¤z¤_Éµß§§Ÿõ µï‚õ·z…ë~^³ïÀuÃ/†QÄöı±*7ÜNl„€‚PB¥ûÇ£Îojú¾^Ø«ñ wæºm“8q;¾«ÁÑ‚©}CRÊxq–'DÜ€•jÆ<şióŞ“î3¿&İ’Øùàç—ØMÔJ’Î&{&@DÈorºÕs•‰'cms3ms“¨İNÄ>Ãàñ^QénV}‘`|ß(
_É¿ó¹”O‹áÊ\)P¿ÆÆQüÄ/ÇÈğwCøÀ¶ÚÍa`wJ± gKÄ (GI^†Q­W•éB¡Ãl/TâÚ9ĞÌ»¾ 6ŞN‰²_¶*ã¥Å„’´-Zg­++¶íöçó¸˜7dD
°ô7ph–ı²ÑVÓöğmqûÂœõK—3eó†÷öçSÆÔjËúg×U¶Ú~¯ÒŞ§ïÀ Óc¶QÄñB[Íÿ$L	,m¥8TÃ@}¨Y|r_±ÛäàFÊ@ëïEµ^„ö¥o7´y¬èÕ¯b;P Y]F4?›-óB´|84QÊv~íß'¡íùmÍPñù!ãë´boJZ(ÅèKÿÕëÜU©á@İã‘Òƒ¤oµ´^MÈÚøÕ¡ ­e7Exß²@XŒğÈÚ°Lª<›’‚úÚ#ÚÂ•˜‚ÍU9dîcAÂ¶‡
]sfÕøÅ ™Ñ˜š9TÇ%¿A—: 9±¢RÑ*š¼’À¶d£,‰jëEÊpÕ·œ²`e>-ç&÷,y°‰"<Y,àÃş"ì•âbx-BØyBCy,a“É¡IMrOd:¸lRü™ÛG]2	);pik}ƒF~´ğÿnG3.ƒ¯ƒĞ¢ö§z¨Ë^áå™V°dA¾»¶ò<Öm—Rø§Ûœ´× ‚d_ÚK©?Ó34ˆÜâÑ?„C×7º<ÊCåé1½(¿Ãõ¯"P´D^ÛÙdssj^…Ÿãü¸ÍìÌ¯{QÄÔp~­½g;Ò06wøü·L¡{0 Òr%ŞrÓşÊòËvÌY¼³±Ì†ß>Ò‡"UfU$ôvÒˆLúË	ÛÖpLZFx|èˆ„°HÍs DÜá7@\;u5›å/"DµáB|U¨¶lÌ@lÜ—’ÄÓK95Œøây@´ÆĞª¯„¦©¯Ò3šMòGóß¦‹>Mp`ŒÛ^ÉŞÏ5},jˆÑ¹ÃıUS{#3)h“‘•Tmş°^®¥¾èÉ#‡_=gŸŸUm½ŸUìûö‹Ğ	{ôÏU›©­'(sÃ`Íî+Fı2Ø—æmŞ²tL…›A¯'â‹ˆp©Ì“S?,q‰Xñç¯ÄÒ½¡/~v«g¡¤/¶në³IüeXK"I?¶m`èµ]Á Õ¥Z‡Ò;B›M¸şû$ëÀÈÕ–ú]ÅKb¬â…°­ñ¶m®ØU¹Ğ&8‰÷ÂDçm¢Àªn¤ª‡Œ›öoùYËª âô…Óêèá^›ŸIól¼ş~d%os*É*)E×_<[íøWÊ‘ªkÂu1,“ª¶ï×ú%„’¨ZM:F_~ñ¯§ë
Ë2ŠÕMHm‡fjX”Ô±Ñ»#[Öq‘»køÅ,‚Ö'á}&nıp¾ÛJÕ<É~ÇÍ>mş*Ÿ6À¬×LšS¥¿çàø7
ëõÎÎò·sşJçOŞ¬Öë»L6;¹.‰VM¼3æówv<ˆÃ°øE@q?Õ–°Œ¬•½5±Dm3úOQ”.\½î`7Ø^rk#vA|±ûŸ¹ÜÌsp@Ûf#{Ú‚'j(iòäˆ.ùÊ yã_T’ÛM³wû·,HÂJ­8åfÊÉÎ ¬òØ¡W\Áİáæ(ô$JVå§°œ§ã|m’æÏ%ÿµ“¨¹“öiBPâä7G¾ù÷f°¼-ä“…•¿„zEÆ/±Ä’™ï‹P&Ô'û¨0úV'7ªBjğC¬Úîíúµ#Ü$-<%àySŸ£‰£{Î1ÿ	jğwP&qCÜk€Íôóø^tÉñMI+FÒ®L%pâaMğF€¯MÌ[íˆHw“ÆH…şÃ5²Ü¦wŞ›Æª*(T7J™Ñ€lndÆç·øÃ¿a4í„’Ü½h®
ÀQ”M%üˆÅu…}¢h£ADÌ§
c~Ğë>­6™aØÑ¾$A˜Æ¾Õ<U~x¡Ò61êœ¸zØqTÆ®ß­k‡~BÎ=À{|já³ÉŸ®|€%€ Å	£<òŒãÏíı+‰g¨iÒêÎ…èpİ/šfKÎú×È¯ÁY@œgúFk÷Cğ'+²€0èøyè'^‰=ÕhÎ.j`„ó>áx\B»•›@ÁT@­»_> 5^T­úa7,¯¨ãl¥ÅêÂÎfG›‘Aª=]+&ÀÄ-˜üï%Zy¥ ˜V(Ru_‡ş+aã‹SõÛÅÚ¯5th.round(canvasHeight / 2),
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
        !€qÊfÍxüÅ¦
Æe‡yÁ«ã/­oDW.d%¨®×>dâMşrhĞ;„áVXZ;,bÎùÕãŞ ¨0ï^1²èÌ//U©C›I&OÌL‘ê¢SŒ£q®s]„æÚ7•4IcÆcêCUµÒæ˜û'íX±Ö`:9ÆãS¿Œ!N“ûTta¥]ı¯~S¶}İÒøî!€{•Ç«y2[cB¤p¦’•_:»àŞŠã'{ÆuÁÂÛ’]ógÚşAK"uñ¨ t'÷¦Hî©<qvïÎ,–}â‚6ÆG~ghšûCÌ@åtš»Õ|k"I“5Ó8ÀŞ<›aeËR<-ú]q,z	Òg¾@\ReĞR^G„gQÉ1»¡¼lkÁDâ”îx‰sa¹ºTk¹µÖf)•bsŸ}X	ÿ.L—,W/ùg‰X°y_‘õnxå=Ÿü³ ßv>¡c7óBŞĞQ¿^°Ù¨%-;™âÃˆ‰¬ ±¼¦\*|•ÁĞq³zˆéXİÜïÉ”LÕâ}Ío¯ E’<½ßÒb_ÖÀ…us§Á¾?ÊYW6Äî§[º¾…'²öPhl'Ù±‚‡8<%çõ)(¯hVAÉ¹‰š‘Í-tş˜‰‚”•c¦<š‚«‡]ŒŠZKh–ı·QG;k<5l‘35‰±S™S±ş±úNêìmÕ¯{mÊ¯£Z±`2n†ñIBO…×$ğ7ßÑêmßY5Æ¼ï:šŒ®±'9ª¼´fß„.'OÚ»WZ´dÆO`\¤gf„B¥`ñRõhÇÇÿ¥+@ĞHƒJùl`†Pm¹‡MLƒèìC§ìy’§ó‹Æ•äLYaı;fş	’†p”@ˆğX#{ã¹oÅAC›–\	Ù¹ +=Zßa1mõ˜6Ê‰‘ÚùGh
ù8C››àğ©IwqšGÄ	R®±Küs›¼¾†YÍÊe³3ÈÑdÔĞq³gd*'¥˜´‰|Ëh­yj¦y(cÅJ€€`¢Æ´¿/ÚRúÏQ}&¨¸`¥ ÎÌ—+Êƒ7äj»ımÍ‚)6µ\3)DÊA	5¡F1†¤‰rÁ(2­İ
Î¦9ä9¬–LË£ÖS¹s`A™Iª´¨€Å‘°}jŞoÊ
Ç¾†T™>@V —ç0œÜ SI/êª•øûFêc÷+L. %a¥…fáÀêğ„½¶†ŠŒz!@·,ÃŒCİæfƒ(ZPÿGª)úŸEäë(ì°l68=Âşæe•9ˆOÔÖ'ÖF„Cà%‹È@¥µTGÙÿ=ÁJ»qõZ( ]ç,ZíıÇ;ï#o+ÏÑ&“ IùîO‘Ö!{¹{dF=Ğµd!ÿBjkPá¤ñ×ùÙœÕ­hfoi$—)—_ÛŒm”{DØ]¿qèté¢‚šÓ°‹¿ø™&ÌiÂàá©Ö{TµÜ:[Í±<e¾}*øî1#è>2GVp¦Ä^¢h]§NÚéÂbQÌ2¨¦ğ!Rq)Oæ-h¦ø1ï;¿•'Ñ‰gîÍ:h¦¾#>P8Gq×ï|Lı«?¤_é‚‘sÿ.Yš…>¿ÿô=ˆÇ£S¨·ĞŞ3Ş7Şòñwëße”ûğ/0¥-¾~{è‰¿„	$m<gÉßÒGNq¼	ríî ¼‰xq½ãí¿~ï{×ˆ>È.îE½¡šÚô”•BÌì,Hl9İ¼å8"UÈ;¨Á¬@êO¤b?Ñ_s¼:¢\Àö$X¬¸Y`¥‘ãu«ùk˜™£ÇÕfQ‰y~¶Ë"Õ"?Q÷lä•š,Âì6Û&Qug^°-NİÎÙEFéÏ;Gô¯>¸È>~ø@P¿(Î¡äÊøÜù
LaDE`¨­’ô84÷¯>"@Úˆ>Ç@îqv`‚÷ïi¿±Ù•”DPAÂ@NÿÖG&ã_™5iŞæ"b?Z‹¿(a,.’Ÿöqt¿¼AÚ”Ê¹*šRÿĞFŠzo’Á`{CíF, îä¹|1wŠÏXŞ»ÆwİŞBµ—?ÈB/÷±¬=»{P¯Bya{ı|5:5S¿~tĞÖéˆÉIU¼PAOî‡yëÕae<†Ü¬¶ wƒŸĞÊâbæ…#ì¯J;ÆwÆŸœI­uÓøñĞQ÷Ô~~/yÅZˆŠÖÔbWˆË5AK¿ƒròÍÒ©csöYqnÙ^©v&øóZûù¶¬î„|7öD
Í°TK†m*Ù|gö?»úæš!{)5(&KàAusq>Q{££™»…uòVX>d?ÑúòËFë}½¨WFhW^ºÊYñ	éê6"iïuÁ2ÉÏ•ÊxNKtñ¤ûûF,¯‹ÔeMD07:†33±oÂË7‚oFôtÈ*(}Lµ©€â“W«G§¯›ÓÈ;ğåûÑØèF|¿[ô4‹¹EÌ¨ñ-lhööe›±ÏÌnRPBá¿ÊùpÖ´ãv°Ì2PqŠˆRAÑ§ÆlÿÃ÷)Ûbi‚ÚˆÜ®úŒâTˆšRãĞ6ˆ,ÙiR9 ĞØ’’jÉmU`­‚õzÏ¤ëeß×æf51Á­ãŞEˆíVæÓóJTämXFàlE³dË‘<é2)¯FX:ò|¦£c]—PÍÒåDöY‹˜ƒŒïÅÓ>ëÃ¸ªÖğĞ{¯˜´uË)ĞÇéåÖË(
Ñ_âß*:¨(3	Û¨02§Ù'îãXó›>ñešDÕP	ØÆ&R%(ğGÚ>óâÉ´WD.—„R~+3(fzÍš’Ï<œL¹»0ò™ÁD‡\‚¡âãô˜½éqârQïœz«×å
mË¨Ø¸Öİ°lF0´À¸}%A)Ojf®R*g˜ò½X”qÉ•)'~ICÄÿÍµÅ©frøfòYÀMë'7uŞÙ81+~7a-¸9¸Ğ\ª3XÆ!Õ”®°Õ”ë/õ±R5n¾N„š>5ñ9ÊëV£³›8+K$Åè‡ĞÀ÷Jî¬†-IM4ô˜r+¯ˆ«l_4»Tr¬Tëu[²©,Làcµ­3–Br…iÎÙ‰Èí¯Ïÿy"uqiÏĞ;´Ñ6êôû¥e'f0”DDÆ~>äåW’ØC¶°Ïâ ”«ıìa§:A¢£Şs]ò¡+B-Œ› ”¦¼ˆrrjóét"µÓ…Œi=Åœ.X]+çİ_¯¼Tˆ¾e¯0èNØ¡8±ÌÜâü²Ò0~TÂF÷ÒÉâG.[ 6+‡‡ã%İãVÎ£"qCYá'j“£Uåİğ,mÓ‹tö7Å|a·-³ˆÓlÁ	*wÀ¯NŞ7Ü±omó%©i¹ú_‡Qzùhr?Å¹ú?uÃ>ÃêÀJ7Á¯zÖ5ãÁWçÑÜ›‰ù×T.×ŠÚƒ„"v„ÖÄª”çD4È¼$“ã=7(Å3Ñúsbgz{ôaŒiö’c6	~Zzpp!Å[ù aPµf>À>:œ—€Õâ_ÛòlvZ¤qlfoË„ß\àÜL;œâ¡ÈvRÚ®ÃF!.Hâ^ã_ÎŒsKZ?ñÆÜ¿€?)od~˜³Ì`¡	ÌØ¤ÌÈÆ4oJî;ÇhŠ(àöÿÈ5©Xx¨sxüƒ]íË0=¢Ï¸Zî0ïÒp²
ëÎˆã©Æ/:lLØ;>ì,o‹Ò«s•ù¸İ°j"¦£¿şbÎV)*†V-Œ¥[¸-Í¢wÔ	Í¿cˆj²ö‹Ñ+ÚİV`Â~eXø€Ûs¡ğìQ.eÄÌ[­¹^ßBÁU‰ÈÓzä‡ìÛğÃºóu¯]ñŠ°œ­Û»ÃÜàÈ¿Bwò©.¾¡2*nçXMWÖ¤È®FÓŞ8Õ*>TT!jÑÂ<Ph
ïŸ|p$Ì”a²ÅÇ%Øš"äLİ‹	õÚ±;éœ1…Ï\`çp› –ózÁ)Z;Û~@…%‚—¡ +b‘•õØİõ)X²gqtÁé‚èæQò¢<ˆugÏasä5„;"/ÏpôBOÅ;rVçºrlL;"¾œáôåZ
9Úzcr‹6û¿ğ½ıo†šÜ1{…_¨ÍvEû æœÑ,öH£lKQF/~/ØwTÙZ\»v9+æÈºÃp
j0ººöo‡,›lÈ¹ËƒK0uH0’š£:D,w»Z’Qõ—¨}Zá	ˆ€xXı³NA!ì
#%‹ nmlfo]ì®=*s4	J°¾3}Õü-/”aİò‹ù[2HÒCŒ«0ùùÊR±zsÅûógœ›³,éjğMaŞ—æ*Ğp&Iƒõ’³E½mŒDğ¤­3[Hr¯R‡ú“CwæÍAQÒéPdàÕxr]¨Y¼ÍêEÖ ;-?ÁF8{^Œvâ2,â|ğîn€î‰ò«XıÏÓÜÖ ñÌ=$^„…Í–»7¹oàÈáÚeÂ\½‹±´H‡ÀÚ 'Ö^k©¶˜0Lœ Ù¹Fy¤@©¾Æ—yŞ¢ÓõŒH…BáWô€ñ~òÉ\Yf®„&|¨“E"“{3r#m¬¬nâ>>(H±áÆDêìê´Ö€—•yŒÈsÚá'NCOÖ'Ÿ3è%ƒÕ³ºÈO¾¢ÈµG)¦CˆL'¥e›”³¡X«.šX1©D#³öÿ*nr“°Š9…‡Ü…ê³rĞW:=¦Œl¥ÍJo‘ë§~¿:Å%‰œ@\Nª¦\ç‡ĞÔsG”×ü¡3Ú" el&Òô¼>¶õbXş·¤jVè¢+±£ZW*yG˜$Ñ+ŠóÑµO—!ó“Î*
sÔ¡b‚‚/!RUĞò&•8¥a)5¬6°”¯beçæXKCo–3¦YdôtÌ`ÓDÖÖ¦qŞÜ'sx2/£¶D·¨^¹+oÂ7•Í©K–ôˆ¦×*_÷Ö€ >Ÿ~7{;Œ ›Rá¶Ø`[‘›ˆ†¥©×&Œç%À6Êöïâ„zLãX}â.Vo¢/Í³i1úˆønÜy±š^êfñU²ÀtœxTye"]EW¬|ÀUe·'æöë:Úò¬ô5yk¾9‰ngÇ*Â•ëüólòuğ%Á±¨[¨½Îİdu|Ú*”ß+ã¥..F˜jp Û/˜ñ
gŸÇœÕäBlM¶vbˆÏ•ÌÓ™(/ÛòªƒšLı‹™Û|—°Ö“D3
®+¶ö±—ÿL&íÄ¶˜š¢gü#3f´{,Ò¼ÅåËüû ‚­R¶¯û¯ìy3×øÉÌUÜÎóª»O=Tï_EDş	ñ}å—á98ñ•Öx.ñ2hPœ’Votß½à§	§H‘t«ì[ì¨³êö_9òCÏ
îï íç$Ô%±å@~¡—wÌ'(?±É7Ëü/|İA3ô¢Ùyy¿€¼7XŒ3+nÙİ>@ìîİ9W”DCv©»FãLãZ¿™½İ	o_XPÖ,ÁÈéƒ}¿ÄŸÎè!ÁôÇÚ4”;íË§oÊèã#o€şaÄ/ì« pw¿ü“òÆ™ÿõ;mò®fÏïÎ93±Ò¦w‘=ËÊšÄ#Å†u¶En«EÊ» :­»…:§4ğŞ"‡AğáòÏvZq‹ÎØêjP¡ğâÃİWÜ©/P__j™ºüè¾úÚOì%~ô´@ÆRäŠe¬O˜Áå·İºğĞÒ/ºÉ‘…35ØÆ Cì¯¦” úí3f‹’¤KÂT¤=i—>ÌÒ½DEŠySômo‘aÕŞK<Ø­È°ùÑËÙ*e¬¼6ÓL¼ğ¹49§LÃvÜÔ;ÇQÊ¯U©	­RjŸù‚zíu¼|ÚNÄö[+-KÀËlùŠzhÉ±Ô»GºbÔ¯-=òŠ×kVf/~
¦ŒÌZs¼ÁİG2ğÅm¿ÂÍ&TKÖá$y”TÏöäof?®Hzà%pı&ÏˆŸ‚ì#…´ÑNJç¾Ğÿ^[-ë¥ÂÛœEMñøvîŸÖ+ˆJCSÀŠZ›ÅÙÏ‰œšF.T³^s<vÅLœ²ïnæv›öó¡Ÿ½Çz“T¸´ne¨$FŒä}ÉªŞ=ó±ÚØ^˜T~&ûdE¦–ô¶«dT%¾ñğ‚‹µ¬¿²¾Øú™›®7BÌ¾•ª¾Äèã³ê0))¢TE·¦Eòèz~äíë´Ãëõ„„Îş"VŒ/’Ó‡v °~ïË=“YE¤],%cšŠÍñÏOø‘‘”·cÃ"ÓV´Æ ÜO$Åzâ˜¦Ÿ¼úR•)^%RõB¬jİ“9~ùe"§†Ì¡|u7º;ì°¡ƒO¤)ä²afÇìnæÑ:Î¦‚?á”Èvv¬­¨üGÔÁC-VXÉr¼I4GæÁ–\ÿ9Xé¯m‡Ú!|1ÿ•ƒo¸„'©·„ŸÿaDâÆ~]‚bFşÿş|$ekálaè0QÛ¹=TÍÿÓñ_ÂZ0Şè€”ŸŞéŠ…rRRÿ¹óü?L	Á(&¤û@Ğ@ä¼ ?{Ëçª	äÙ7-Ü ]¼âfx(öÎ#,‡íi ‡õ—…•3õ‡W,—@§ªÎ›ªQøG=—RG°™™ÏçåçîË+?ï.Æ2‰áJPdß²}6‚¾âWí€è=é.MÿÉ{7æÏnx»ñ;l_ÚA“Wÿ0?è=Â{°/ÙáMæ¯Ù‡`¨[ÈÊ,Ü=Ã«Æ-ÆŞî]ùA*Î7ÒŒÀhWìrëgiï™/N§ÌĞ[2<áøF/Œ÷N|ê®åkvèO‚aåk.õı ˜wàÆÙógn¨›wÉ¾‚>ô¶€ùk!olY0ÈÉœÀİ><Êø^bm|Rô-E9µ5Fºb¹"‰îIä¯ê´i2ê˜x³rx (Ì!+Ní<h† 8z[ÆEC—7™ Åü86Üüz:·Za9ÜâkL‰•*}[)TYàÌœy¨x2š…jõ¼lş«ZÌÌ’yŠx#·L!œy–®¤S¹x¨VòI½…y8«VÙ<±fËßB²‡ªÅ3¼˜6­Š…ºRÈduäÏzQÜ|kÀ€e¥ü°–™]¹^º¹KµV`Ow!=Jkµ(­©Vp9¢<'6°)s¹\tª8„zr!G@«§†.õ·d*¸ğ%…IØ%3*‚Xø‘šŠ™L>ÜèfE¦51<Û2A‹4Ä½hTûˆ4©Jp…á˜›+ùÁ>m#SÔ¬IÓÌİŠ‹úÒQóR_•‘iÛpSÃß˜}ùÄ8œØ8h…Â¨…Ñ‚}Å˜Ğt.z5œPTN>¡rcxáqiÓÍ´köj—ı“´ó+R<mÂ–‚‡yjW¯$:‡hËçèÅ¾‘ğP›F2qTİ’fİÎaÂµ´É`İ1éÇœ·ÉÎİ­	–C¾‚e»˜4©uu3¸ë:@-êbãåq«¨¶öqqÙ8¢·zH"Pñ*'K:QÅ”w´H‡lµß¸&Zli©Gû¬‹)_:ğù·E´ué±ÔĞ [Ã°@ûÙ¸›oáÌtÄ¨eå¥Á=h±Ğ<'¥¹Àğ<PDÒ´$ãæpaô™”)ˆgœ´Ëüª­±ÏÉoÎÿ}0Ÿø}%F‡Ùnî‚wŒ-±éƒÄ®2¡®ZÅã”V•á°Ğª*Á“XqÜ’m}°Jn†P;ÓÈ‚¢¸‚Ü‘íÜd=”WsE—X³*¼ojŸÙÑ£lÚÒåœ¬7k×ú6ù÷şE|ÑÚğê*ô¾*Šƒ±	ì¦J¤b‰™A.“ª³&1¨sÈçœ¢ˆcˆ+ğÂh_UÚD½c@İ´Í7J›»Ğ!ugIÈy–>:ÜfÜZ•§ÉéÈÀŒiOÎŸ…ºŠMOªC¦ª5qš™<wR?—‡f.]TŞÎJ¥€ÍvP!J;ÜĞKŠsOßj€´_¤d¡zÑ‰ã¢%gå¬5	n›´²¯^Ö‰Œ>·	Êc»¶q™oÉæÙÒ§çM9ìg¯@{Ù´Ë6XKgşê}hF­Á*õ¨ùv%cèÛj›İ¾fÃ_‘µ'ĞÎùò˜‹dÄ”4ú†ŒÊÌ¦FâÔøiåªVÜ¿7Mƒµ¹¼fÄZÂç3êà“3\"£ì›'ØT,	åÉÏÅìJ½º¡”6Øš	SaÌü•*aæl›öX³Ìh¡¤4$ª½ÿºŞK\òß;–//EpÅ” @ó¿Çµ²%«çñc†ágô€Î†A4ññæ.Ñ¨*å‰Š??ëÔdÎI´ÙÊ&—I%ÈËªa’ÔñÜ?4Yfì”Ç|(f0(KãZ$ø·µV:5˜ÄŒ†Y(-6,¥ÑªëÌÎ¶3¿	¨¬s2<º¨¤K«›äJ¯™uÄS
,lÙp7M©J¼x+LÃÊ‘¸u…4PgJÛ¨\yÑê€£\ë$n<pcz(±f÷+b<Ó¢Qü>ŒÆÂK°éå¤PİçıYiÆIáÎizÄ‹–Ñ¢Ü+FCh-†™WŒ†ƒÓézƒÔÒ¥•õ¥VgZˆïó—iò«óˆÙ5£ÉœInôÂeãò¤ÃøİôYrÏz‹-¤‡×5è…ZóÖâEÔ¸Ù›xğ$	×Ñ”^2^¿Õ¨¯WÎÅ;"T
å9¹Êå“Ù;6§Ûâå[‚mFõÏ“Üõ¤#sbéav´Ï.©·+m­â¸0q¯#’²]sşÒÂÂ¤„;‰Xèš&Ï§1è”‹V#.>UÜ®q[zEóŠ•Ú-\gÙ¥š6¤¥>‡óÍp”"‚ò
¯ƒ]:-L¸!(:Ú÷v¹¬cÔãGÆ±(ƒ”±§ÉO}ƒ6å=]11İ•OLaøæÏµ¡wr-¬‹°Á]§aÎÚ:m‚\/5¬#çÍ]Í’Mğ²ÿÍegñ8YA¸t²æŸ¨Óç•S—>ğ(sÓ…œ”¨†±É Ï^íÃáöŸÓé#Sb›2zºxmã­Ğs_ûP_¯Ó¿·È»-ò–ë–ŞJBŒ!=
Ël˜Õ3ïŸÏ)	“ ¸}“5MYKmjC·Gy”<Ë])2×;¸ö­†Éˆ~³6ú4tfÖ‹ŒèÓ´£{˜#êKÑa7©û›Hã]v:3~ÛÏdçO•û’†¼w?òS1$’a·`e!nKù Zàe”ã&27Ç³P¤h/ãY'Zew­¦›p³Q9·³VVÍ9èœˆWR9ËËœ{å‘æ‚¶âá)}Zô©–d®i;8„š$4«¦ 9ã2ÿ³Üòıİ’Şr¨+oÌ[ãMY“…u%ª^q?8Ê¢êµÊeØ¨R¦Ü#UÒÅmsøk¢[Ì‚ÔFS‡Pªî0`L˜»şŠWÒ€‡i^×á§Ñ®Ä†ÅòºâßXŸÎe¥OrUWÊŠÒzñ÷½¯\Şg,Ë·nG•ğÀöòà]Ñœ­ó`*Şó%¼g2Œë8¶ÇTT.òC 
vóÚ‰&ş÷©âDjÎN_€òc†P²y[y‚›‰'€;ŒÔ!ñû1ñ¦§İl
ûŠMÂAıöX¢Ï…+ìîè£pÜq%ÕR\Í3Üiš˜lP½e¹×4æ‘Ÿí¥g­û‡
››¥¬™œOêÖØX93"“ö‹Œ¤£)!qšAÖ\ëQ[Öãæ,`O|Ñaô—ùZ’=®Ü}>d:şiƒ§âIÖGE‡¶°9ÎÍÊD£ÛÁòë2ğŒf_ƒÕÂá–~èQøËe")¥Æè$©ÛˆŸÀ• –©FËtÿ5ñ¦š8aãÈFš*lÏ¬4o¡9œ›¿½äT-('?ñ &¢—ì¯ ´Ãe™â¨U 	ŠÀÜ&²¾W«&Y{oB”"†nüÓ'
çŸXÖc±Ó—ã\5•%&šÇ¡ŸÃ¦•§µ^l­–Î©nf8@â®M•q]ÌKÎR!vù¿‰N¨ğ :.êx‰’£Ê½V,<(8öË­Ÿ³$·İÄ´œƒ¾9‘¶ø˜Gïûf+Fa jCÍ¿$`ü\0ø§;FìCŒHù_2‘¾ŞF™&™¦Z[EÎ @‚ÌJ‘ÖL·çÔ¹9¼<L{˜<çKoÃ©í"Óte“ÒÙI³ß|o^,UØr’](z;…SÎªaØcçlö¦+ÏìØæ±k=›b+°öÑ¦·\`ñWŠ/Ü†;r³a’á«Ä¹È·P†Ù“peÚ|T`ä„Ş/ê@iXš@î9š‘Ó—‚2â²mó29FZü[#Æ`¼ôC¤´Ãi¡d¼aéœPNŠ±'X&ëá^!C™÷2Û¶ß7%óìêCù¡Pñ¿Iµ¨I=O¸âÌ3n*'*oûr¢KX½Ğ+aŒ¦Jb„Ò^uu÷ #Sœ+mÖ¼HÉ>œjµ¼Ñ0¾ª=áyj=ş³Q¸Hşz SğÏšÈ³§Â“1F„Q2¶;½e-…%NFG!G")Ô3ÂÒh…3«‹L©3Ö%˜ázøòõV‡ÙÊF´ØU ›ÿ’oø«qæêWÀ¬¼Mf¯]bÂ®šÃ¶şc‰U³>éÄz8Üä%şFûWŞ–é¦?Ì§Ÿ—1:ë.¿©ÒB§-yi*>!ñíqh?a *ß³>ñËVO‚,Z>°êÅd€Ê{.~(êôj©°,ã`ÊÀföP¢j8†øçù§°²Ì”Æ/+,Áúû@U_M‘U?î–ï'øˆRÿ|S¤Ç ´§*®%—õÒë´äÓfY¿øi‰Ë ›Ó
ó é¿30o­C†Ó;™ÒÜÙØBú6ø§à~§¬\]~2Î…Aàòšü~0’8C›ø òŒx;¥ä[S,„zù«¬‚Në‰âòÁ$•sz5ú×cåV"Ÿ7õ&hb,ÒOŞA (:|R§BÖäíõàkÌ¬¡€Ÿõ)¯¬d( l¶±Û›+¬® *„-º£©r«"æCñÅ³Y2ƒ!x¾!>üòr_L‹p%ré“m)ˆŠM,çX®¡‹&¬~&ìOgŸ‡°ı—ïÔ¿?¶c÷\úÔòbÖcN][Û§ª_]ã±}“î!–‘:ÿ˜û{CŠ¿‘Şë¤ºªË *­xG¨6³ÖoŒˆ¼… ¡½!éÑ_²põhÔod¼ãŠ$İÔ½ÊØOƒc ‹`–T†Ÿî¬]è˜I,cò¢ğ}Î¼Q¨€¦*aáz9ï}ZNÓ–ë vEÍ¥xÂ“‡Î°™¼làÖE|vNÚeO^NãİšnMHÔÅ°²ƒkMB*
R
d.Ì­Lİ–¡^_±OåHRq 1‘zÒzç²\Ô¯›„è}§ö>bˆ‰¿m5|Y6]3+×-ßŠßŸ>šô›É1|}ç-Rôw&×í_½´•?d	qlÌæ|6CFÔÅ£å©4bøÎ9ó•OÜ3ÏÉïä¯ò¢év¥·z»à”vÿ*®NÑ&=Eå/J7à8SõÆ’OˆÑ÷P¿Ÿ¼¯F—‡üÖj;i.ÀUªÙÕn³t±_¹>úÄ—Üãû›Ëš\InDƒ½&Ü–•a±ØBÖ•Á~ˆc9ÒÜ„Ûy&´%»Gî‰×º º5‚º+={èê	ã6W¹6™p›ÏaOñ…õq®»uü¸o«OpsoÑ6«	å67¨Åw–æmvh¨ÏGpOvŸÆ2ê£ë>Ñ
åÍsßt«‡gTíåƒ”?ûÂƒ÷Ï'ÀìSæÜ/ç‘aTæ{Ú}˜pÔê]ïÅÉî•p8ó›â.åÙ÷Àï·Àó¤€Ê§»6v˜[’Ê}3œ€ÆÉ! Û·ÜùÀ å;©ş)¹£Oƒth|Ìä=ğ5|›lv—ş@Cÿ£|Ç?"ºò¡ãùRŞœùa/¹N@Ô²İ=§¹èÍ–×ÈŸ˜=ğwµÖ>ÏhåPìß®âĞÖê|ŒazCG°Q
mDØ=´ô§7h,·{g»™Ç\¾òÅfÔèç#åóí0Ú+ÕÚ„„íø3áÔ÷«I^×ìNSîK¯àb7ìDRë½OIj˜Ô„¶{F¾·¬šXíbö”2¢ãVŸš[Î)"³ªe2¢Ã9ÌCz¢cñ¨t–ò7I–{ğ6y_q:ıñ,Â§Á+U)a':0¸Àqîá)ÊO+öóP_4×hƒ9vFí^ãâŠdò¬Vã~U÷>ùMB1¢`	Û5N`´=×p“ÑÃhß¬ÍfÖg‚ÊTÏ±s¹eh×äƒ-ëàÉWĞ€–^ ˜¦'¶~A;a‘õ˜g—z}…çë„Æ=4—Â±S%âgÄpìç&C“ö -RÅQéNá¯Û75€‚€D€ƒ€pÿoïv\N €#©ˆµ‹“3ÀQÅÙĞ foòŸø×¹g«È)l
"û$¦aES)½R*J¿1Rş
~CåSLY’–´àúÕÆğÚáxÃ|Uü“9\ÄD –ÉJÙDÍ1'ÚëÑÔôëÎıªQ=Ô`?(tŠ»î~~$+F!Xz%¦©`À¸í”-µ<#J®0#Ò¹÷ĞUşkNÇfØš\d˜›Kî‘7>†rÈûQÕ’>îj˜ué•Jò!Ã[ù 2ÿBÅˆ[¸ßLL˜ù¾ ê·,É'n)ıòË•r¡1.iYü9PÉ'vº… [¤îæ'u×Ş;w\ŒëE¡¬ä5ÔæhÈrÍ¨ô•]ï-Â…6ê%Ó‘e¹›ê°83K¤§¶×7FåÍq ƒYÆŒê’‰™§×}ı˜G¼o²¸‰"KVwgËŸö¤X˜Ÿ|Çò
¬‚ú¶«Vg¬×iØaÑ×Úwƒ÷¤ÊÕ»‚[Ví8«‘vkh>‚‰¯ç^V–†p„: ãÓ½b­cÄê:DŞBÆ™ÌµBåh 2?²Vi}â¹B,øé¾kM‡ôbŒÙ[ÇJÕT‡Ñş{&¬³Ó	V‚€(Ä€pşÿÊ„ÿª÷2PUû÷Âõ²3å•ŞÌ˜@‰()Gô„)
Š)„fâ/86$+ÜHÃ~	á«+*%¨ê¬¤¸Úó¯åââæ¢àò¢Â_°ÇéÆkÑàáKïnMÛ®OkÎÏñvD-û;VÑ÷ÙµRªlª'‡5êd{Ó z¤šÖt*ËÖ¬ÃïÔ™“.îT™S‡sozİ¾b68Ìûc£İ‰âf[‡ô¶,³Nbì[LÇÃJY—È6qI¶U‡E—­Oúí¾T\94¿³¶®‡ŠQ—o¾4/½Ó1§‘›S<mÎ¥Ú[d7ìC|%m©^Û£É/—ÿ@k¼æ‘ÚãÜ95y‰	Ø†uŞÚ¨Ø±`Z×(s&UJÖ†øpäæM"§mëÅxmÂ«KÜG‡½=fĞ7·Ü[İs6»÷~û!ozˆ1G¥Iç~dŞ“r];ÎT 0¶¾1Tº,#õ¢V‡q·åDºC¹ŒÚ©vN&Üdï)lïkˆvX´a§ĞnqÀmßóµ½Iù]-ĞT¼'²ù	rqfK^Ğõk·¬Z_Å?“eüX†wåæcw½'Iß€?ŒÃô=~v‘„¯ß
*Ÿc/~é"ŸW¡Ë]Y~™F¿1ı˜†kyÏíÈsff;ßF‡d?#¢¼Ú/oKÖF_¾J8û^LUÀ¶ÉÈeˆŠ3é#	eÏ:¥oÇ?7¦‹ÑU´†Ó-'X7J­“mdÓå³lÎ™ ¡T›‰ÿX+¯öB7h»ì÷øÄ	WC˜µT<hR&˜­¼â™´‡¯óf¶%W3$·#ëaT^uİ[­WÆc=¡SG[wIS®ƒfÌ£I_m€ª\GÜ¢È±€<“‰ş-çp*q¥cE4·ICGNàr‘ù¤’cÕhÛ>ÀŒwÒ)–åØ]åÄi†ªAP^6bBÊ›ŠõØDE	OUúğ9<îœ>’zîŞŸŠ*’òĞ™î>œºÎ{‡æÇ~¿KşmtPKşm:‘(«9R{Šó`ÂáM‘‚û€®2ã4H¿³E¯i=¡"·5}Šf|l1µ½]ò”éšX¼•„QŸæ˜O…é0|`¢I•šæXNU)Û©b3‘Ge%ëÁm‘Tu¬N¤²’Ş°“4ùfB¥‘áˆ©‘ù Ÿs%«’˜hlwRÍŞsNG">Ñ=tŒ'àÒñ1ÓŒDôFfŒ¸Ÿ”OÆµzŠ¡]¼>°=:éÄµ	 b$O»ŒàCºÖUç™¤KYn*»<j‡J*»#»ñË·¯é’®á$U?ÜÛW‘ş+M»	ízı›}˜ûs½­ÑØ_ÙÇÍ¡Ö’äJ>}èiB*ü&aoĞ·çJ=SÎhÛ‡0„§“;§¢9Ï0*¶GiÏ¡Ş1,C79™¯æcä¶éÚ²o¬¶lÇ,¼}¶oY[#Ö³—¾9iH%[3Iîñ]&ø´_<roÌp4%ŞÉßñçm#qµØ."=qñúj„pK)+o—`–ÔgZQêP–•ŸùŠ‚A k6ü{õ˜V˜ÇïVŸÇQàíùj6¶öë.¶ju=Än7Ê|Ê¶|¨ı:İ¬½ÌŠºaq.G9Åª,«²øËj!Ğ9dßÇß[Ô~Ï[bOô|èº×Ñï‚> ù³ùA—Jª¡e«ï‚!¶Rİ‰¿¬R¹··šŸ——YÏTı„kSFó\YÅàjËa×fYÇ„ı j>6‚X•lÂ¡ŞhDR˜HMÇŠ7EZI6¯Òôp«ò}m®¶WWÕÔ7T2“ó?+(‹úÛ‡R:†“ó	¾P¼é¦uu©+i.Gşèxs‰á"Ä"/Ù7İØ™¸ş¢ìÙ¨«CE^¦ÒA/Í<1”Á2nW¬oHûºRcØı6´—9¤@¶Øğ-èX:1TÈå÷ÑÌkaÈªûäÜ&ƒAÑı¸Æ­¬ó‡’BĞL‚³¹$÷[^XÑÂ‹-7’a¢é6Á×uAZ5ûÖ8bS™ÖuĞ×%¨^Ì¬”Ÿ¡g¢-pH´2 é,i4q1ÑQ†Æ‘PO–û÷ı§ñˆí½\Få‹Ñ¶´ô„:“oÅÙÅÿ3WşM»ŠÅT–l¹E²1®ILêÉn™êqş<”•òw3R¦XùMyÎ…•˜rG(¼ÊğÑqş±=+ôÍ#åHôÂ¦hÙªŞÑ9èä:UpQÆğ7>‰ª¾<ª0iD\8Á†ÊËCqÜ×¤tD»š"²Yô‹ÆT	b¥¤Sp—:S©D`O“‹8m)?MJ^ 7Öõbîä¥iÙı*]	îj<‡Æ£H4&cãÏ-ÀòïÁ*>›V-~X ˜ NÔØ¯[¢ÂèÚÚª†ëÔú>BØ©Šjb"¤ÈÈ¯I°#²DxäÔß•4OÂ’ZkúWlj‹’¿p&¿X-¹45 —2*&Ş~pğñ-T=ê"WRĞØ Ò”Ÿæ
!Ğfäl>$‹
<¢Éc6îFP×ú×¾A¡1¥Ç)iÈ‰Á[¬)4Vht¯j«ÿT÷		zLÉ¸…ïŞçCƒY1âih_ê«‰¾
Á]"Û©«/ËÉìŠâ‹ãSë›Û€Ö'ë2Œô/álšd.`³-ôQ«—@_0Ts"58#D´ŞÂG—§·ÀØ¨3ìë.0ú‰‰IÅyª3P—ŸÒ®|Ë´¾æ"Î94§>òŠW•]`¸ËSL‹.?›MîÚãŒ4’¹}Àh¬¨­À¡éª6ÎÊ¦ˆÊÊénk—/|rçÄ…š¶“‡ªÙ?Ë–â>K[<›^™ä9#™P÷b2Dµ¦w ›}{‚x™Ê¢%ÿL¬|ÓÒ€u0s–§m-Ö©k´õ„xå2óH‹_Í8ïÛ'?)w@r áÏ`o£µ³£ö¿$DæR îÒ%bUŞşÓŒµ‰d„‡œºš(#c„«êdÂ_ƒİÍÑÛ²°š“åuÖåL‡¸ÁzIwOY(¨…Â±|lB£óf3WIÛ‹sp—{yNµè£2"^Š³¢»7‡šå1Q›b[–‘"X"ôáZË%?&
«¯Pïİ¸£õ'±³ªd#¶€Zü“5N‰#"Ë-WÕ–sÉÇVE4OàŒõzä!tÏßÖ4½uû,œ
}ƒÛ!_[•ÂåVj ¤qğ@ùKMí]ŒRà¯xñğ3B½²ªZ	¨ÖÌ¡ã‘†Â5tÓ
sÑ²'çó‰è¦ø£;Åw*
¾Åñf0´+ZS«½,£® Å¼åë§ÕºYY(¶h#Ûœşò­oMkğC“ŠDsˆF*ùYènaIsôjhk3c)cvUñÇÈ†Ö
Óÿ€º ‚¾qmğë¥_7?o/‹!²ƒã¢Ê ÚÈøÂM òq×ÇĞ6…İÔB¼Šˆ°ÿ±ş Ø	÷ıè×ó&ë´;ä#Ÿò š}¦jsEÈ%¯Ò—ãóˆÒ¡¡dt‰$Ğ¹‡â¨Å…¨=ælˆ>ÁsL¡Èoû2Ç?Ô82‚ Ãä½æšæJ²Ÿ¢
o®İ‡ëW?dµÖxÙŒÅÃç€3d÷%rr=§t•Ø::×‚Ø:•÷İ…|6		¨ vÎÊ¢p'7µx@	²‹41¢¯%Ö>¬LÍÂô•*xo£˜ßüüíµ€sV–©ÂÏ[ô›_ìÂÜ†­»½¥×}R¾Cá4¾í„éd%W¦â1Ò2WF’ê—‹åÉ*vAĞû‹ÖŠr¯aAz"™‹[*ä¥Õ$8×…ÂËù(zƒ=MMãQ×Ğ€L»3‘ÉX,İ[ÄçÒ wUëïn\®æƒÓ›œÆµŒoñ²Î»²/`İ½„ìg ˜¥í‰-u¦ •~ã÷ğ‘Œ/Éå>ÄHÕ¯ñèÿ`ì‚ta¢ Á¶mÛ¶mÛºmÛvmÛ¶mÛ¶Û¶n÷ş³³»;;Q§Ş**NV¬—ÌıÙ¨é¤ı#Ğ´o…Ÿƒ•~[ÿS_İ{ß—ÕSµª—\§4bíGŸòßIù€”ß¦ÅGÙİãÉ?§PüÚ	ÿª#†û¤ÜyNtµpõÎëiû–¹ù·ç“ºO	doO•ıÓ¿è:ÿ4˜6ƒÈ¢`Ü¤Óï¼a=âËJ—RË&pKf–åÕóiıQ?¬FXûÈ+ÇóıãåGïó(@9\»ë”ï×
¼|nº×ìWXšÊÎŞc{{¾òÚ¬–ä¼†-ß±©qçŞşTÔ¸V¢JoVe*ÚIŸZDzøM=­y[æ¶öQöyÜ×©Úä”ššu/Ş†ZšZOƒUÓ¨VåŒìD
úES¸Uø7qù/@¦Y7Õ¾²­¡7Òª6/O£x¼èı›-š }£†O²ùÇRÓB:—´>ê‚{‰8¾TÆL«*—/éıbµjèQnÊ´>»3CP*é³â5íjà‹nA§¨”ÅAò”]ÍBÖMyJe¼Â~uUeœ:¿´ë¡´›'Ïjt°	Ü²õÈËÙÄ¬f?	‰µ¿üÊ¬b/íªøS‡FÕÙ".‡“rv6‡Ğğ~ª5uAe“&Ü7±"ã‰=½£¹ô³R$™k¡U-`”z2¤p]t•H¾m‰}EexÅ1Ô ¬7]<#éFWéÏùqR€æBsh:³È©¶u	øĞ}¾¿¢Ğı©d›2ò_°Ã&!¯· ?š†RÖ)¬ZHßèOÂüŸQñàv6%ùÏêuô²´z
¬ªuû“
T:vXÖOÙÓjè4%Täæ*îêi]\-”šÇkP§W1öI»{}Ù’£n°¥×¡]cêu.	r-cæuŞ4ñqş´ŠÍT“M^‚³/`mç_¦ş¾¶)•0kq­Î´¬¢(:öTh½š2mk'ÉÔr‰¤ 94•ú1AŞ-ãÄæûú®={œf™o¸}vµÈRó*í´,y—ƒü…ITŞHmxİwĞuÌÉLHk„—1ÎzgqÅÿ¦´É!tá2Í×Æÿ˜Ê§AS§A0*Ö²jÍ·/qº'»Q[D“1Úa¬ÃLÓ³ê4!ÖçT½2WÕÉæ1+WÕéšj’ğ²‘”Õu°È›SuÈÜçI¯¨ÆÕÉ«@²¹Eg£–ås£¼[^UYËt§š¨p­*§UC*À­	-l4”'*€ZH]Œ¬Î¸§H§}³ÏçRüwºğ/úV)z	®ºïÎşª¦!L7aÛşLœ3gİ&ÚT€qeiÍ^Ç*jù¤;}¥YUV!ƒe%Î‡f(Ãç2Ôß†}Éº"F/¶óË(¼ùÛEò‡ªaô…Í9Ğ¡5ŸbÈ yı1ÚC÷¦®¶ü4añü?‰²âmzÈ
¡j¹ÄûÍj½:ö•èÖ¥¥•=Ãw)ğ²1~:v•¬«ÚP^‰ˆ¼}2 @($I½:(E8ô³3rÚX5//q™ıíó8É§¶ãÜiXPGM¶Ñ‡Ë4Ç\À©«ÓĞ4ÏD-"–ÇºÊÚí\t…r½.«^€ï•ójX8i˜F€Ñ©Èc¨?2áíA½`_ÃÄ¢ıgËïähX5	ºÉbóŠ8İ<fòvÃát©¯v4mD$½¤eZWÌâ?g÷uM­#2e@¾¶õ·fÑ0İŠ#†u%­vÏ–Ä¨q’`‹¥ØWË+¯¼–¥L‚¹®'P6½[*LY?Ûu€:O*û
‚TÊ×ßI¤ƒî
„%ú?J,Jƒ|$’ğFJ¦ñá¾fÜ ÃòÙàzra‚£÷ªİÚĞRÃ­ãJšºW8z¨?[,ûg|ÜyAf‚›Üf²úÓßÑÀ±p¥}K'YMŞ°ës¯ûFyÈÇÛWÜ¢rŞw¯©Ü±4Òª‡.ÏĞ??Õ4bÊ"¿>¿§3\ÕÁ†ÄtûMÜ¿F5\aC¼'éË„]ÇAF?Gz››X¥´}BÅµaÄ\$Q§¸èJHTÎám@Ÿ6×æ- Å*3¤14hx-í<^pµFşHı¥gGS)¦oUĞw¨Ä]‰|O¨p2÷<Ç·‡X–¯rwQÉÖjr&“lfâS —º`½ØÙ­<…Öv$ª)œB÷UÚ+téİp3ÕÕÏGÍÉ*·©åT<&°ıdw+ºEá“2^é¥·æ›wWLùPê•™rmIv÷4ù¤"ıOÂFÏ‰ºÖş£şÆˆípoùh7ù¢`Uaı´ŸR<¹ÿ|Qi«[/BŸËyş8:TÑt¿÷¿rÑ¹Åw¥¿	}õÇ¿-ĞºŸDB²¯¯Â†¼¬¢ã‰¶¬,¼¾¯ŸÕø+Û®;=Ğ[‡w¯Ë®ê’‚¿ÆNçksuä;ğ¸=­ót!“tÅ9Dõ}iKÇÇØ2có†?ÙÑ3Ä7×êœäˆ;Ş–â¬€¦y+ñ›V†¯’¦y«ñÅ­ƒÍH&µ­@Hà‡_9±§Æ€¾¸	ûÀûJ•×¥	²X´	åø©à®&§yËØ×Z·¨%w%¢Ş"“«goB=ó5„ÅE#i7–¶U”KëuØìkP:ÑµªçW{È(pèéT]­Ÿ¦ 1±&ª#wt¦3Ë™&ç6šMu®2ò:Û2Äéö\¬³óÚW`¯ç¾ƒäïÜÓ¢^ÉmÕ²"6L(¹‹…dÕ ¶&£¯¼af‹gEOşö¤ÑPæ¯†ebmô®´ÍÓ@ï[Ió®(ÀXHŸM¸ß«…ßÉÅşÑ¨'‚ãûŒÈjC9ÓÜ†4²İşƒ=³Z.wÓ%ÚÛ	fAŠ÷²Èÿ¸wÄ†]Ëwƒ•.™ÕÙÁÑ1Ä­î}Aœsg2—°õK‚Šéü—¸W§|üDƒì“a1ii¿¼õZE6.·DnòÔ2‚Š?K$u[Ñ!lu.è"½ßo$nO*¤Ÿn ¯>c”æM½3ÆaÅXN=x›±õ—û¼
ŠZO¬À3šÏ„îúşœıvù0ô›˜s¢cõI8Oy"÷“ ‘ÎÃÌ‡jTùl$EÁ—HWîğ¥ÒêĞ ¬stptÎäz¢¤:²–RZ‰¢€¥K”NzÊÖvÛC•VßJóàùuT¨İÕrÆüß—CÅïLÌUD\Qòsñè#ïûÆá©«0á¡}0ŞÅÊ—#«•2š‰òÄ¯n/_Øñüw«"Ô^orşÅ·&A&AŠVOû¾Õñ	tJş‰EÙ¸µüKB¹®)?Ê§ÈÊ-ˆ–RXa0Ä—
öÏ”ršuÈDãµÃ'?_û ÓRAg“¡•¥à¥¥!«QpJyF:êÇègŒrÚïÖU§Id^ğ™r‹›ç€wnƒˆ*æ&(Qißâä³qÊ[Ólê\s8@ü¾ºï„~’2t?¾+ms€ø‡êgî§’ƒ¡0P-Ü³1Ê`ÍÅ†éwŸ¢~.UY=­È&!Âı&¡d=|\ğÎGÃVQ[úÈæ*·¤
O½‡–¥ào«QT(•8Zc|¾Ö†Š
¦¥Á6}|FgØ\/nÑ/¹ŸyÏó*X†\9'‹|°Œ‰	wÓqöµ¦ûöQ¡]°€Ü?”|¡š”ñù>XòQü|„fcBM:¦c¦{}T|w5bŞysÜş0şŸÚŠEè³«jL›ÃğªQÈAâ	Ñ-˜)	‘Yáœ<¥ökğÅÁ†~ŸL?çÈ<‰KÃNPæbûè\½{ó„£Û”[—zÛÎ¾–X%¯”à¡qĞïªµ¦x¢x¨¿&Î	LIä§~?ˆ³KS¯ï´\ë´Õ [X,E­A;îĞ”\%è7µ,j]y ÃèâRø×õL‰óÈŒ¢ 0V —„Ïtéõ$Åóƒå8ï?YY@åØÎ:fÅ‚çL•š–
ä¿¦ä…áÌš«•#ğI¢/°"]y¸˜j˜-Ó oôÃĞáƒp“pcÀË®"ÉãÑÄgÑêc
9*êµA£ÃÜ5…ÁrUQpºµĞñfŒ9ÆL^³rª¢Ùkv…vÁ$µ&ğ)+`óài…$Ï•Ô(8Å…ŞÔ#®òö/²”’Œ®‡A¢ñEÒã#şò$¹%n¶mö =‘œTFÕVÖã<%©Ú¼Èzæ:‰í'™0¦¡“Ğµ¢Qä3
AwËRºÈ1ş+¹CÂûKu¼D®&.
f¸Ml­1}ª5ÓœÅ`h›KM—HKcº'ÆVÑQ?¼Ñ[~„îMª³…¾%.1W–ÄWì‡Ñ%[9ÁT<©†³•{Dëœ}Æ },

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
