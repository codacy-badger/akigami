export default {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    width: 230,
    height: 230,
  },
  title: false,
  tooltip: {
    headerFormat: '<table>',
    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
    footerFormat: '</table>',
    backgroundColor: '#404040',
    borderWidth: 0,
    borderRadius: 15,
    shadow: 0,
    style: {
      color: 'white',
      fontFamily: "'Proxima Nova', sans-serif",
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  legend: {
    margin: -5,
    itemDistance: 10,
    itemStyle: {
      fontFamily: "'Proxima Nova', sans-serif",
    },
  },
  series: [
    {
      name: false,
      colorByPoint: true,
      innerSize: '60%',
      data: [
        {
          name: 'Аниме',
          color: '#d54343',
          y: 95.97,
        },
        {
          name: 'Манга',
          color: '#2e2371',
          y: 5.03,
        },
      ],
    },
  ],
};
