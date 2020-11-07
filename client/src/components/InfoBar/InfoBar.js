import React, { useState } from 'react';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';
import './InfoBar.css';
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";


const InfoBar = ({ room, users }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online" />
                <h3>{room}</h3>
                <button className="modal-button info-modal-button" onClick={() => setOpen(true)}>
                    <img src="/images/icons/chat1.png" alt="iconimg" />
                </button>
                <Modal open={open} onClose={() => setOpen(false)} center>
                    <h3>Currently chatting</h3>
                    <h2>
                        {
                            users
                            && (
                                users.map(({ name, icon }) => (
                                    <div key={name} className="activeItem info-activeItem">
                                        {console.log(icon)}
                                        <img alt="Online Icon" src={onlineIcon} className="online-icon" />
                                        <span className="info-user-name">{name}</span>
                                        <img className="info-user-icon" src={`/images/${icon}`} alt="userIfon" />
                                    </div>
                                ))
                            )}
                    </h2>

                </Modal>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close" /></a>
            </div>
        </div>
    )
}

export default InfoBar;

