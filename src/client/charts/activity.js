export default {
    chart: {
        type: 'solidgauge',
        marginTop: 0,
        width: 230,
        height: 230,
    },
    credits: false,
    title: false,
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        pointFormat: '<span style="font-size:1.8em;color: {point.color};font-weight: bold;font-family: \'Proxima Nova\', sans-serif;">{point.y}%</span>',
        positioner: labelWidth => ({
            x: 115 - (labelWidth / 2),
            y: 95,
        }),
    },
    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Запланировано
            outerRadius: '97%',
            innerRadius: '85%',
            backgroundColor: '#ffebcd',
            borderWidth: 0,
        }, { // Смотрю
            outerRadius: '83%',
            innerRadius: '70%',
            backgroundColor: '#afdafc',
            borderWidth: 0,
        }, { // Завершено
            outerRadius: '67%',
            innerRadius: '55%',
            backgroundColor: '#a0d6b4',
            borderWidth: 0,
        }, { // Брошено
            outerRadius: '52%',
            innerRadius: '40%',
            backgroundColor: '#fdbdba',
            borderWidth: 0,
        }],
    },
    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
    },
    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: false,
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true,
        },
    },
    series: [{
        name: 'Запланировано',
        data: [{
            color: '#ffbd88',
            radius: '97%',
            innerRadius: '85%',
            y: 80,
        }],
    }, {
        name: 'Смотрю',
        data: [{
            color: '#008cf0',
            radius: '83%',
            innerRadius: '70%',
            y: 65,
        }],
    }, {
        name: 'Завершено',
        data: [{
            color: '#00a86b',
            radius: '67%',
            innerRadius: '55%',
            y: 65,
        }],
    }, {
        name: 'Брошено',
        data: [{
            color: '#d54343',
            radius: '52%',
            innerRadius: '40%',
            y: 50,
        }],
    }],
};

