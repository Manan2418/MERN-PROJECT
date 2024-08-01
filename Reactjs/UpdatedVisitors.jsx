import React, { useEffect, useState } from "react";
import "./ManageVisitors.css";
import AsideBar from "./AsideBar";
import MainPage from "./MainPage";
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";

function ManageVisitors() {
    const [visitor, setVisitor] = useState([]);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedVisitor, setSelectedVisitor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/manageVisitor/:id')
            .then(res => setVisitor(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const toDMYformat = (date) => {
        const day = date.split("-");
        return `${day[2]}-${day[1]}-${day[0]}`;
    };

    const handleUpdate = (visitor) => {
        setSelectedVisitor(visitor);
    };

    const filteredVisitors = visitor.filter(v => {
        const visitorDate = (v.date);
        const start = startDate ? toDMYformat(startDate) : null;
        const end = endDate ? toDMYformat(endDate) : null;
        const isDateInRange = (!start || visitorDate >= start) &&
            (!end || visitorDate <= end);
        const isSearchMatch = v.firstName.toLowerCase().includes(search) ||
            v.lastName.toLowerCase().includes(search) ||
            v.phoneNumber.includes(search) ||
            v.email.toLowerCase().includes(search) ||
            v.address.toLowerCase().includes(search) ||
            v.purposeOfVisit.toLowerCase().includes(search) ||
            v.whomToMeet.toLowerCase().includes(search);
        return isDateInRange && isSearchMatch;
    });

    return (
        <>
            <MainPage />
            <AsideBar />
            <div className="table1">
                <div className="tables">
                    <form>
                        <input
                            className="searches"
                            placeholder="Search Visitor"
                            type="search"
                            onChange={handleSearch}
                        />
                        <IoIosSearch className="search-icon" />
                        <div className="inmputs">
                            <label className="label12">Start Date:</label>
                            <input
                                className="dates"
                                placeholder="Start Date"
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                            <label className="label12">End Date:</label>
                            <input
                                className="dates"
                                placeholder="End Date"
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </form>
                    {filteredVisitors.length > 0 ? (
                        <table className="table2">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Purpose Of Visit</th>
                                    <th>Whom to Meet</th>
                                    <th>IN Time</th>
                                    <th>Feedback</th>
                                    <th>Out Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVisitors.map((visitor, index) => (
                                    <tr key={index} className="tr1">
                                        <td className="td1">{visitor.date}</td>
                                        <td className="td1">{visitor.firstName}</td>
                                        <td className="td1">{visitor.lastName}</td>
                                        <td className="td1">{visitor.phoneNumber}</td>
                                        <td className="td1">{visitor.email}</td>
                                        <td className="td1">{visitor.address}</td>
                                        <td className="td1">{visitor.purposeOfVisit}</td>
                                        <td className="td1">{visitor.whomToMeet}</td>
                                        <td className="td1">{visitor.inTime}</td>
                                        <td className="td1">{visitor.feedback}</td>
                                        <td className="td1">{visitor.outTime}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="errs">No data found</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ManageVisitors;
