function makeChart (arrayToRender){
  console.log(arrayToRender);
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
                    text: 'Daily Close'
                },
                height: '100%',
                lineWidth: 2
            }],

            series: arrayToRender

        });
}
