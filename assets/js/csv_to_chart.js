d3.csv('https://ethercalc.org/w2gfa2jtho6c.csv')
  .then(makeChart);

function makeChart(players) {
  var playerLabels = players.map(function(d) {return d.Date});
  var weeksData = players.map(function(d) {return d.Sum});
  var playerColors = players.map(function(d) {return d.New === '' ? '#19A0AA' : '#F15F36' ;});

  var chart = new Chart('chart', {
    type: 'bar',
    data: {
      labels: playerLabels,
      datasets: [
        {
          data: weeksData,
          backgroundColor: playerColors,
          label: '确诊人数',
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: '中国国内感染人数 2019-12-08 至今'
      },
      backgroundColor: 'blue',
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          //type: 'time',
          time: {
                  unit: 'day'
              },
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });
}
