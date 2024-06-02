import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const alertsByCategory = data.reduce((acc, item) => {
                    if (item.alert && item.alert.category) {
                        const category = item.alert.category;
                        if (!acc[category]) {
                            acc[category] = 0;
                        }
                        acc[category]++;
                    }
                    return acc;
                }, {});

                const labels = Object.keys(alertsByCategory);
                const counts = Object.values(alertsByCategory);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Alerts by Category',
                            data: counts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching the data:', error));
    }, []);

    return (
        <div className="chart">
            {chartData ? (
                <Pie 
                    data={chartData} 
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'white'
                                }
                            }
                        }
                    }}
                />
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default PieChart;