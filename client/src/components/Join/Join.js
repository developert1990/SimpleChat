import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

// Modal import 
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [icon, setIcon] = useState('');
    const [open, setOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const inputFocusRef = useRef();
    useEffect(() => {
        inputFocusRef.current.focus();
    }, [])


    const handleLink = (e) => {
        setClicked(true);
        if (!name || !room) {
            e.preventDefault();
        }
        else {
            return null;
        }
    }

    const handleImgClick = (e) => {
        setOpen(false);
        setIcon(e.target.getAttribute('name'));
    }
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">League Chat</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} ref={inputFocusRef} /></div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                    <div className="iconbox">
                        <button className="modal-button" onClick={() => setOpen(true)}>
                            <img src="/images/32.png" alt="iconimg" />
                        </button>
                    </div>
                </div>
                {clicked &&
                    (
                        !name || !room ? <div style={{ color: 'red' }}>Please type Name and Room</div> : ''
                    )}



                <Modal open={open} onClose={() => setOpen(false)} center>
                    <h2>Pick Icon</h2>
                    <div className="icon-imgs">
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/1.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="1.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"> <img src="/images/2.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="2.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/3.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="3.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/4.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="4.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/5.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="5.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/6.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="6.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/7.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="7.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/8.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="8.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/9.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="9.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/10.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="10.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/11.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="11.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/12.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="12.jpg"></div>
                        </div>
                        <div className="icon-img">
                            <button className="modal-img-button"><img src="/images/13.jpg" alt="icon" /></button>
                            <div className="img-hide-tag" onClick={(e) => handleImgClick(e)} name="13.jpg"></div>
                        </div>

                    </div>
                </Modal>
                <Link onClick={(e) => handleLink(e)} to={`/chat?name=${name}&room=${room}&icon=${icon}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;




















