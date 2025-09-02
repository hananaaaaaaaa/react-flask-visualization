import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Menu, Layout, Card } from 'antd';
import { 
    BarChartOutlined, 
    PieChartOutlined, 
    LineChartOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { RatingChart, YearChart, CountryChart, GenreChart } from './charts';
import './style.css';

const { Header, Sider, Content } = Layout;

function App() {
    const [currentChart, setCurrentChart] = useState('rating');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const menuItems = [
        {
            key: 'rating',
            icon: <BarChartOutlined />,
            label: '评分分布',
        },
        {
            key: 'year',
            icon: <LineChartOutlined />,
            label: '年份分布',
        },
        {
            key: 'country',
            icon: <GlobalOutlined />,
            label: '国家分布',
        },
        {
            key: 'genre',
            icon: <PieChartOutlined />,
            label: '类型分布',
        }
    ];

    const fetchChartData = async (chartType) => {
        setLoading(true);
        try {
            const endpoints = {
                rating: '/api/rating_distribution',
                year: '/api/year_distribution',
                country: '/api/country_distribution',
                genre: '/api/genre_distribution'
            };
            
            const response = await fetch(`http://localhost:5000${endpoints[chartType]}`);
            const data = await response.json();
            setChartData(data);
        } catch (error) {
            console.error('获取数据失败:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchChartData(currentChart);
    }, [currentChart]);

    const renderChart = () => {
        if (!chartData) return <div>加载中...</div>;

        switch (currentChart) {
            case 'rating':
                return <RatingChart data={chartData} />;
            case 'year':
                return <YearChart data={chartData} />;
            case 'country':
                return <CountryChart data={chartData} />;
            case 'genre':
                return <GenreChart data={chartData} />;
            default:
                return <div>请选择图表类型</div>;
        }
    };

    return React.createElement(Layout, { style: { minHeight: '100vh' } },
        React.createElement(Header, { 
            style: { 
                color: 'white', 
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center'
            } 
        }, '豆瓣电影数据分析'),
        
        React.createElement(Layout, null,
            React.createElement(Sider, { 
                width: 200,
                style: { background: '#fff' }
            },
                React.createElement(Menu, {
                    mode: 'inline',
                    selectedKeys: [currentChart],
                    items: menuItems,
                    onClick: ({ key }) => setCurrentChart(key),
                    style: { height: '100%', borderRight: 0 }
                })
            ),
            
            React.createElement(Content, { 
                style: { 
                    padding: '24px', 
                    background: '#f0f2f5' 
                } 
            },
                React.createElement(Card, {
                    title: menuItems.find(item => item.key === currentChart)?.label,
                    loading: loading,
                    style: { minHeight: '400px' }
                }, renderChart())
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
