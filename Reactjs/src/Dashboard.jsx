import React, { useEffect, useState } from "react";
import MainPage from "./MainPage";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
    const [stats, setStats] = useState({
        today: 0,
        yesterday: 0,
        month: 0,
        total: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:8000/visitorStats");
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching visitor statistics:", error);
            }
        };

        fetchStats();
        // Set an interval to refresh the data every 5 minutes
        const intervalId = setInterval(fetchStats, 300000); // 300000 ms = 5 minutes

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <>
            <MainPage />
            <div className="cards">
                <div className="card-1">
                    <div className="num-1">
                        <u>{stats.today}</u>
                    </div>
                    <a className="text-1">Today's Visitors</a>
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/020/911/732/small/profile-icon-avatar-icon-user-icon-person-icon-free-png.png"
                        alt="logo"
                        className="profile-1"
                    />
                    <footer className="footer-1">
                        <div className="bottom-1">
                            <a href="/moreinfo" className="info">More info</a>
                        </div>
                    </footer>
                </div>

                <div className="card-2">
                    <div className="num-2">
                        <u>{stats.yesterday}</u>
                    </div>
                    <a className="text-2">Yesterday's Visitors</a>
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/020/911/732/small/profile-icon-avatar-icon-user-icon-person-icon-free-png.png"
                        alt="logo"
                        className="profile-2"
                    />
                    <footer className="footer-2">
                        <div className="bottom-2">
                            <a href="/moreinfo" className="info">More info</a>
                        </div>
                    </footer>
                </div>

                <div className="card-3">
                    <div className="num-3">
                        <u>{stats.month}</u>
                    </div>
                    <a className="text-3">This Month's Visitors</a>
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/020/911/732/small/profile-icon-avatar-icon-user-icon-person-icon-free-png.png"
                        alt="logo"
                        className="profile-3"
                    />
                    <footer className="footer-3">
                        <div className="bottom-3">
                            <a href="/moreinfo" className="info">More info</a>
                        </div>
                    </footer>
                </div>

                <div className="card-4">
                    <div className="num-4">
                        <u>{stats.total}</u>
                    </div>
                    <a className="text-4">All Visitors</a>
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/020/911/732/small/profile-icon-avatar-icon-user-icon-person-icon-free-png.png"
                        alt="logo"
                        className="profile-4"
                    />
                    <footer className="footer-4">
                        <div className="bottom-4">
                            <a href="/moreinfo" className="info">More info</a>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Dashboard;