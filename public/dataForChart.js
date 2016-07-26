function dataForChart (arrayOfStocks) {
var seriesToPass = [];
//Add for each here
var rdyToRender = 0;
for(i=0;i<arrayOfStocks.length;i++){
    $.getJSON('https://www.quandl.com/api/v3/datasets/YAHOO/'+ arrayOfStocks[i] +'.json?start_date=2015-01-03&order=asc&api_key=sFptNZbzyTC5XE1vXq4y', function (dat,err,xhr) {
      //&api_key=sFptNZbzyTC5XE1vXq4y
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
        rdyToRender++;
console.log(ohlc);

        let stockName = JSON.parse(xhr.responseText);
        //stockName = stockName.dataset.dataset_code
//        let toAdd = "{name:'"+stockName.dataset.dataset_code +"' ,data:"+ohlc+",dataGrouping: {units: groupingUnits}}";
        var myObj = {
          name:  stockName.dataset.dataset_code,
          data: ohlc,
          dataGrouping: {units: groupingUnits}
        };

//toAdd = eval("("+toAdd+")")
                seriesToPass.push(myObj);
console.log(myObj);
        if(rdyToRender == arrayOfStocks.length){
          console.log(seriesToPass);
          makeChart(seriesToPass);

}
});
}







}
