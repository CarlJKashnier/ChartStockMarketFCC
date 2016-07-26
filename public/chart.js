function dataForChart (arrayOfStocks) {
  arrayOfStocks = ["MSFT", "YHOO"]
var seriesToPass = [];
//Add for each here

console.log(arrayOfStocks[0])
    $.getJSON('https://www.quandl.com/api/v3/datasets/YAHOO/'+ arrayOfStocks[0] +'.json?start_date=2015-01-03&order=asc', function (dat) {
      console.log(dat.dataset.data);
       var data =dat.dataset.data;
        // split the data set into ohlc and volume
        var ohlc = [],
            volume = [],
            dataLength = data.length,
            // set the allowed units for data grouping
            groupingUnits = [[
                'week',                         // unit name
                [1]                             // allowed multiples
            ], [
                'month',
                [1, 2, 3, 4, 6]
            ]],

            i = 0;

        for (i; i < dataLength; i += 1) {
            ohlc.push([
                Date.parse(data[i][0]+' UTC'), // the date
                data[i][4] // close
            ]);

            volume.push([
                data[i][0], // the date
                data[i][5] // the volume
            ]);
        }
        seriesToPass.push("{name:"+ arrayOfStocks[0] + "data:"+ohlc+"}")
        makeChart(seriesToPass);
}


);}

        // create the chart

function makeChart (arrayToRender){
        $('#container').highcharts('StockChart', {

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'Historical Daily Closings'
            },

            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],

            series: [{
                name: stockSym,
                data: ohlc,
                dataGrouping: {
                    units: groupingUnits
                }
            }]
        });
}
