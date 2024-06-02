import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const alertsByTimestamp = data.reduce((acc, item) => {
                    if (item.timestamp) {
                        const timestamp = new Date(item.timestamp).toLocaleTimeString();
                        if (!acc[timestamp]) {
                            acc[timestamp] = 0;
                        }
                        acc[timestamp]++;
                    }
                    return acc;
                }, {});

                const labels = Object.keys(alertsByTimestamp);
                const counts = Object.values(alertsByTimestamp);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Alerts Over Time',
                            data: counts,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            fill: false
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching the data:', error));
    }, []);

    return (
        <div className="chart">
            {chartData ? (
                <Line 
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
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: 'white'
                                }
                            },
                            y: {
                                ticks: {
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

export default LineChart;