import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './ManageVisitors.css'; // Import your existing CSS file
import MainPage from "./MainPage";
import AsideBar from "./AsideBar";

// Set the modal root element for react-modal
Modal.setAppElement('#root');

function ManageVisitors() {
    const [visitor, setVisitor] = useState([]);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVisitor, setCurrentVisitor] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [outTime, setOutTime] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/addVisitors')
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

    const filteredVisitors = visitor.filter(v => {
        const visitorDate = v.date;
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

    const openModal = (visitor) => {
        setCurrentVisitor(visitor);
        setFeedback(visitor.feedback || '');
        setOutTime(visitor.outTime || '');
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVisitor(null);
        setFeedback('');
        setOutTime('');
    };

    const handleUpdate = () => {
        if (currentVisitor) {
            axios.put(`http://localhost:8000/addVisitors/${currentVisitor._id}`, {
                feedback,
                outTime
            })
                .then(() => {
                    setVisitor(visitor.map(v =>
                        v._id === currentVisitor._id ? { ...v, feedback, outTime } : v
                    ));
                    closeModal();
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this visitor?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`http://localhost:8000/addVisitors/${id}`)
                            .then(() => {
                                setVisitor(visitor.filter(v => v._id !== id));
                            })
                            .catch(err => console.log(err));
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log('Delete action canceled')
                }
            ]
        });
    };

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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVisitors.map((visitor) => (
                                    <tr key={visitor._id} className="tr1">
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
                                        <td className="td1">
                                            <span className="span1">
                                                <BsFillTrashFill
                                                    className="delete-button"
                                                    onClick={() => handleDelete(visitor._id)}
                                                />
                                                <BsFillPencilFill
                                                    className="edit-button"
                                                    onClick={() => openModal(visitor)}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="errs">No data found</p>
                    )}
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName={{ base: 'modal-overlay', afterOpen: 'modal-overlay active', beforeClose: 'modal-overlay' }}
            >
                <div className="modal-header">
                    <h2>Update Visitor</h2>
                </div>
                <div className="modal-body">
                    <form className="modal-form">
                        <div className="form-group">
                            <label htmlFor="feedback">Feedback:</label>
                            <input
                                id="feedback"
                                type="text"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Enter feedback"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="outTime">Out Time:</label>
                            <input
                                id="outTime"
                                type="time"
                                value={outTime}
                                onChange={(e) => setOutTime(e.target.value)}
                                placeholder="Enter out time"
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="update-button" onClick={handleUpdate}>Update</button>
                            <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default ManageVisitors;
