import "../../styles/mainStyle.css";
import { useState, useEffect } from "react";
import { isDriverGuilty, driverHas, driverNeed } from "../helperFunctions/calculationFunctions";
import { dateNow } from "../helperFunctions/dateFunction";
import MonitorAnswer from "./MonitorAnswer";
import axios from "axios";
import { TableGallery } from "./TableGallery";
import { ModalHistory } from "./ModalHistory";
import { API } from "../../APIServers/API";

const defaultForm = {
    t1: 0, t2: 0, t3: 0,
    carVelocity: 0, humanVelocity: 0, humanLength: 0, J: 0,
    driverFullName: "", pedestrianFullName: "",
    date: "", time: "", has: null, need: null, guilty: null,
};

export default function Main() {
    const [form, setForm] = useState(defaultForm);
    const [result, setResult] = useState(null);
    const [has, setHas] = useState(0);
    const [need, setNeed] = useState(0);
    const [date, setDate] = useState('');
    const [historyModalVisible, setHistoryModalVisible] = useState(false);
    const [isTableVisible, setTableVisible] = useState(false);
    const [isClosing, setClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    // Key used to force-restart monitor animations
    const [renderKey, setRenderKey] = useState(0);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const calculateInformationAndSendItToAPI = async (e) => {
        e.preventDefault();
        if (isCalculating) return;

        setIsCalculating(true);
        const updatedForm = { ...form };
        updatedForm.date = dateNow('date');
        updatedForm.time = dateNow('time');
        updatedForm.guilty = isDriverGuilty(form);
        updatedForm.need = driverNeed(form);
        updatedForm.has = driverHas(form);
        updatedForm.user = localStorage.getItem('user');
        updatedForm.userId = localStorage.getItem('userId');

        setResult(updatedForm.guilty);
        setNeed(updatedForm.need);
        setHas(updatedForm.has);

        // Increment key to trigger re-render and CSS animation reset
        setRenderKey(prev => prev + 1);

        try {
            await axios.post(API, updatedForm);
        } catch (err) {
            console.error("API Error:", err);
        } finally {
            setTimeout(() => {
                setIsCalculating(false);
                setForm(defaultForm);
            }, 800);
        }
        setDate(dateNow);
    };

    const logout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    useEffect(() => {

    }, [isClosing])

    return (
        <div className={`main-wrapper ${isVisible ? 'page-fade-in' : ''}`}>
            <header className="dashboard-header">
                <div className="brand">
                    <span className="brand-accent">E</span> LABORATORY
                </div>
                <button className="logout-btn" onClick={logout}>გამოსვლა</button>
            </header>

            <main className="dashboard-content">
                <section className="input-panel">
                    <h2 className="panel-title">Forensic Parameters</h2>
                    <form className="analysis-form" onSubmit={calculateInformationAndSendItToAPI}>
                        <div className="input-grid">
                            {[
                                { label: "რეაქციის დრო (წმ)", name: "t1" },
                                { label: "მუხრუჭის დაყოვნება (წმ)", name: "t2" },
                                { label: "მუხრუჭის ეფექტ. (წმ)", name: "t3" },
                                { label: "მანქანის სიჩქარე (მ/წმ)", name: "carVelocity" },
                                { label: "ქვეითის სიჩქარე (მ/წმ)", name: "humanVelocity" },
                                { label: "ქვეითის მანძილი (მ)", name: "humanLength" },
                                { label: "აჩქარება (მ/წმ²)", name: "J" }
                            ].map((field, index) => (
                                <div
                                    className="field staggered-input"
                                    key={field.name}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <label>{field.label}</label>
                                    <input
                                        type="number"
                                        name={field.name}
                                        step="0.01"
                                        value={form[field.name] || ""}
                                        onChange={handleChange}
                                        required
                                        disabled={isCalculating}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="text-fields-section">
                            <div className="field-full staggered-input" style={{ animationDelay: '0.4s' }}>
                                <label>მძღოლის სრული სახელი</label>
                                <input type="text" name="driverFullName" placeholder="გვარი, სახელი" value={form.driverFullName} onChange={handleChange} required disabled={isCalculating} />
                            </div>
                            <div className="field-full staggered-input" style={{ animationDelay: '0.5s' }}>
                                <label>ქვეითის სრული სახელი</label>
                                <input type="text" name="pedestrianFullName" placeholder="გვარი, სახელი" value={form.pedestrianFullName} onChange={handleChange} required disabled={isCalculating} />
                            </div>
                        </div>

                        <div className="button-group">
                            <button className={`btn-primary ${isCalculating ? 'btn-loading' : ''}`} type="submit" disabled={isCalculating}>
                                {isCalculating ? "მუშავდება..." : "კალკულაცია"}
                            </button>
                            <button className="btn-secondary" type="button" onClick={() => setHistoryModalVisible(true)}>ისტორია</button>
                            <button className="btn-secondary" type="button" onClick={() => setTableVisible(true)}>ცხრილები</button>
                        </div>
                    </form>
                </section>

                <section className="display-panel">
                    {/* The key={renderKey} forces the entire monitor to remount and replay animations */}
                    <div className="hologram-monitor" key={renderKey}>
                        <div className="monitor-grid-overlay"></div>
                        <div className="monitor-scanline"></div>
                        <div className="monitor-corner top-left"></div>
                        <div className="monitor-corner top-right"></div>
                        <div className="monitor-corner bottom-left"></div>
                        <div className="monitor-corner bottom-right"></div>
                        <div className="monitor-content monitor-entrance-animation">
                            <MonitorAnswer result={result} has={has} need={need} date={date} />
                        </div>
                    </div>
                </section>
            </main>

            <ModalHistory show={historyModalVisible} onHide={() => setHistoryModalVisible(false)} date={date} />
            {isTableVisible && (
                <div className={`table-gallery-overlay ${isClosing ? 'fade-out' : 'fade-in'}`}>
                    <TableGallery onHide={() => setClosing(true)} />
                </div>
            )}
        </div>
    );
}