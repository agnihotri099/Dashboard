import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const DoughnutChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const alertsBySeverity = data.reduce((acc, item) => {
                    if (item.alert && item.alert.severity !== undefined) {
                        const severity = item.alert.severity;
                        if (!acc[severity]) {
                            acc[severity] = 0;
                        }
                        acc[severity]++;
                    }
                    return acc;
                }, {});

                const labels = Object.keys(alertsBySeverity).map(severity => `Severity ${severity}`);
                const counts = Object.values(alertsBySeverity);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Alerts by Severity',
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
                <Doughnut 
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

export default DoughnutChart;
