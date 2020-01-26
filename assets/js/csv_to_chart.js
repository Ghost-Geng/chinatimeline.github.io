d3.csv('https://ethercalc.org/w2gfa2jtho6c.csv')
  .then(makeChart);

var timeFormat = 'YYYY-MM-DD';

function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569)*86400*1000));
}

function SerialDateToJSDate(serialDate, offsetUTC) {
  return new Date(Date.UTC(0, 0, serialDate, offsetUTC));
}

function makeChart(players) {
  var playerLabels = players.map(function(d) {return d.Date});
  var weeksData = players.map(function(d) {return d.Sum});
  var totalDeath = players.map(function(d) {return d.TotalDeath});
  var totalCure = players.map(function(d) {return d.TotalCure});
  var playerColors = players.map(function(d) {return d.New === '' ? '#19A0AA' : '#F15F36' ;});
  var playerDates = players.map(function(d) {return SerialDateToJSDate(d.Date -1, 8).toLocaleDateString("en-US")});

  var chart = new Chart('chart', {
    type: 'line',
    data: {
      labels: playerDates,
      datasets: [
        {
          data: weeksData,
          borderColor: '#19A0AA',
          label: '确诊人数',
        },
        {
          data: totalDeath,
          borderColor: '#F15F36',
          label: '死亡人数',
        },
        {
          data: totalCure,
          borderColor: '#64f30e',
          label: '治愈人数',
        },
      ]
    },
    options: {
      title: {
        display: true,
        text: '中国2019-nCoV肺炎病毒感染统计 2019-12-08 至今'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          //type: 'time',
          time: {
							    parser: timeFormat,
                  unit: 'day'
              },
          //stacked: true
        }],
        yAxes: [{
          //stacked: true
        }]
      }
    }
  });
}
