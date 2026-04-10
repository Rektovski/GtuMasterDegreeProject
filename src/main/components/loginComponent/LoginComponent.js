import "../../styles/loginComponentStyle.css";
import React, {useRef, useState} from "react";
import {GiPoliceBadge} from "react-icons/gi";
import axios from "axios";
import {UserAPI} from "../../APIServers/UserAPI";

const defaultForm = { username: "", password: "", userId: "", signature: "" };

export const LoginComponent = () => {
    const [loginRegistration, setLoginRegistration] = useState("login");
    const [userForm, setUserForm] = useState(defaultForm);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevPos, setPrevPos] = useState({x: 0, y: 0});
    const canvasRef = useRef(null);

    const handleChange = (e) => {
        setUserForm({...userForm, [e.target.name]: e.target.value});
    };

    // Drawing Logic (Kept the same)
    const startDrawing = (e) => { setIsDrawing(true); setPrevPos(getMousePos(e)); };
    const stopDrawing = () => { setIsDrawing(false); };
    const draw = (e) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current.getContext("2d");
        const {x, y} = getMousePos(e);
        ctx.strokeStyle = "blue";
        ctx.beginPath(); ctx.moveTo(prevPos.x, prevPos.y); ctx.lineTo(x, y); ctx.stroke();
        setPrevPos({x, y});
    };
    const getMousePos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const saveSignatureInForm = () => {
        userForm.signature = canvasRef.current.toDataURL("image/png");
    };

    const loginAction = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.get(UserAPI);
            const exists = data.some(item =>
                userForm.userId === item.userId ||
                (userForm.username === item.username && userForm.password === item.password)
            );
            if (exists) {
                localStorage.setItem("user", userForm.username);
                localStorage.setItem('userId', userForm.userId);
                window.location.reload();
            }
        } catch (e) { console.error(e); }
    };

    return (
        <div className={loginRegistration === "registration" ? "centeredLoginRegistration" : "centeredLogin"}>
            <div className={loginRegistration === "registration" ? "formSpaceRegistration" : "formSpace"}>
                <form onSubmit={loginAction}>
                    <div className="formIconSpace">
                        <GiPoliceBadge className="formIcon" size={60}/>
                        <div className="formTitle">
                            <h1>Mobile</h1>
                            <h6>Laboratory</h6>
                        </div>
                    </div>

                    <div className="field-group">
                        <label className="form-label">Username</label>
                        <input className="form-control" name="username" value={userForm.username} onChange={handleChange} required />
                    </div>

                    <div className="field-group">
                        <label className="form-label">Password</label>
                        <input className="form-control" type="password" name="password" value={userForm.password} onChange={handleChange} required />
                    </div>

                    <div className="field-group">
                        <label className="form-label">ID Number</label>
                        <input className="form-control" type="password" name="userId" value={userForm.userId} onChange={handleChange} required />
                    </div>

                    {loginRegistration === "registration" && (
                        <div className="signature-section">
                            <label className="form-label">Signature</label>
                            <canvas ref={canvasRef} width={534} height={221} onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw} className="signatureCanvas" />
                            <div className="button-group">
                                <button type="button" className="btn-secondary" onClick={clearCanvas}>Clear</button>
                            </div>
                        </div>
                    )}

                    <div className="button-group main-actions">
                        {loginRegistration === "login" ? (
                            <>
                                <button className="btn-primary" type="submit">შესვლა</button>
                                <button className="btn-secondary" type="button" onClick={() => setLoginRegistration("registration")}>რეგისტრაცია</button>
                            </>
                        ) : (
                            <>
                                <button className="btn-primary" type="button" onClick={saveSignatureInForm}>შენახვა</button>
                                <button className="btn-secondary" type="button" onClick={() => setLoginRegistration("login")}>უკან</button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};