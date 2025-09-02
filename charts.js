import React from 'react';
import ReactECharts from 'echarts-for-react';

export const RatingChart = ({ data }) => {
    const option = {
        title: { text: '电影评分分布', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: { 
            type: 'category', 
            data: data.map(item => item.rating),
            name: '评分'
        },
        yAxis: { 
            type: 'value', 
            name: '电影数量' 
        },
        series: [{
            data: data.map(item => item.count),
            type: 'bar',
            itemStyle: { color: '#1890ff' }
        }]
    };
    return React.createElement(ReactECharts, { option, style: { height: 400 } });
};

export const YearChart = ({ data }) => {
    const option = {
        title: { text: '电影年份分布', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: { 
            type: 'category', 
            data: data.map(item => item.year),
            name: '年份'
        },
        yAxis: { 
            type: 'value', 
            name: '电影数量' 
        },
        series: [{
            data: data.map(item => item.count),
            type: 'line',
            smooth: true,
            itemStyle: { color: '#52c41a' }
        }]
    };
    return React.createElement(ReactECharts, { option, style: { height: 400 } });
};

export const CountryChart = ({ data }) => {
    const top10 = data.slice(0, 10);
    const option = {
        title: { text: '电影国家分布 Top10', left: 'center' },
        tooltip: { trigger: 'axis' },
        xAxis: { 
            type: 'value', 
            name: '电影数量' 
        },
        yAxis: { 
            type: 'category', 
            data: top10.map(item => item.country),
            name: '国家'
        },
        series: [{
            data: top10.map(item => item.count),
            type: 'bar',
            itemStyle: { color: '#722ed1' }
        }]
    };
    return React.createElement(ReactECharts, { option, style: { height: 400 } });
};

export const GenreChart = ({ data }) => {
    const top10 = data.slice(0, 10);
    const option = {
        title: { text: '电影类型分布 Top10', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            radius: '60%',
            data: top10.map(item => ({
                value: item.count,
                name: item.genre
            })),
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    return React.createElement(ReactECharts, { option, style: { height: 400 } });
};
