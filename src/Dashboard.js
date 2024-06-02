import React from 'react';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import DoughnutChart from './components/DoughnutChart';
import './Dashboard.css';


const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Network Security Dashboard</h1>
            <div className="charts-container">
                <div className="chart-container">
                    <BarChart className="chart"/>
                </div>
                <div className="chart-container">
                    <PieChart className="chart"/>
                </div>
                <div className="chart-container">
                    <LineChart className="chart"/>
                </div>
                <div className="chart-container">
                    <DoughnutChart className="chart"/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;