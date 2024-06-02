import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const alertsBySignature = data.reduce((acc, item) => {
                    if (item.alert && item.alert.signature) {
                        const signature = item.alert.signature;
                        if (!acc[signature]) {
                            acc[signature] = 0;
                        }
                        acc[signature]++;
                    }
                    return acc;
                }, {});

                const labels = Object.keys(alertsBySignature);
                const counts = Object.values(alertsBySignature);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Alert Count by Signature',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
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
                <Bar 
                    data={chartData} 
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: 'white'
                                }
                            },
                            tooltip: {
                                enabled: true
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: 'white',
                                    maxRotation: 90,
                                    minRotation: 90
                                },
                                grid: {
                                    display: false
                                }
                            },
                            y: {
                                ticks: {
                                    color: 'white'
                                },
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
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

export default BarChart;