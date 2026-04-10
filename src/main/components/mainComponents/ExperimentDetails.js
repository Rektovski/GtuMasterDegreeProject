import "../../styles/experimentDetailsStyle.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { UserAPI } from "../../APIServers/UserAPI";
import { VscClose, VscFilePdf, VscDesktopDownload } from "react-icons/vsc";
import html2pdf from "html2pdf.js";

export const ExperimentDetails = (props) => {
    const { data, show, onHide } = props;
    const protocolRef = useRef(); // Reference for the PDF generator
    const [authorUser, setAuthorUser] = useState("");
    const [authorSignature, setAuthorSignature] = useState("");

    const has = data?.has || 0;
    const need = data?.need || 0;

    useEffect(() => {
        if (!data?.userId) return;
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(UserAPI);
                const author = userResponse.data.find(item => item.userId === data.userId);
                if (author) {
                    setAuthorSignature(author.signature);
                    setAuthorUser(author.username);
                }
            } catch (error) {
                console.error("Error fetching expert data:", error);
            }
        };
        setAuthorUser(localStorage.getItem('user') || "სისტემური მომხმარებელი");
        fetchUserData();
    }, [data?.userId]);

    const downloadPDF = () => {
        const element = protocolRef.current;
        const options = {
            margin: 0,
            filename: `Protocol_No${data.id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(options).from(element).save();
    };

    if (!show || !data) return null;

    return (
        <div className="protocolOverlay">
            <div className="protocolToolbar">
                <div className="protocolInfo">
                    <VscFilePdf size={20} />
                    <span>ექსპერტიზის ოქმი #{data.id}</span>
                </div>
                <div className="toolbarActions">
                    <button className="downloadBtn" onClick={downloadPDF}>
                        <VscDesktopDownload size={20} />
                        <span>PDF ჩამოტვირთვა</span>
                    </button>
                    <button className="protocolCloseBtn" onClick={onHide}>
                        <VscClose size={24} />
                    </button>
                </div>
            </div>

            {/* The ref is placed on the paper content only */}
            <div className="protocolPaper" ref={protocolRef}>
                <header className="protocolHeader">
                    <div className="protocolStamp">შსს ექსპერტიზა</div>
                    <h1 className="protocolMainTitle">ექსპერტიზის დასკვნა No̱: {data.id}</h1>
                    <div className="protocolMeta">
                        <p>თარიღი: {data.date}</p>
                        <p>დრო: {data.time}</p>
                        <p>ექსპერტი: {authorUser}</p>
                    </div>
                </header>

                <section className="protocolSection">
                    <h3 className="sectionTitle">ობიექტის მონაცემები</h3>
                    <div className="protocolDataGrid">
                        <div className="dataRow"><span>მძღოლი:</span> <b>{data.driverFullName}</b></div>
                        <div className="dataRow"><span>ქვეითი:</span> <b>{data.pedestrianFullName}</b></div>
                        <div className="dataRow"><span>რეაქციის დრო (t1):</span> <b>{data.t1} წმ</b></div>
                        <div className="dataRow"><span>მუხრუჭის დაყოვნება (t2):</span> <b>{data.t2} წმ</b></div>
                        <div className="dataRow"><span>მუხრუჭის ეფექტურობა (t3):</span> <b>{data.t3} წმ</b></div>
                        <div className="dataRow"><span>მანქანის სიჩქარე:</span> <b>{data.carVelocity} მ/წმ</b></div>
                        <div className="dataRow"><span>ქვეითის სიჩქარე:</span> <b>{data.humanVelocity} მ/წმ</b></div>
                        <div className="dataRow"><span>ქვეითის მანძილი:</span> <b>{data.humanLength} მ</b></div>
                        <div className="dataRow"><span>აჩქარება (J):</span> <b>{data.J} მ/წმ²</b></div>
                    </div>
                </section>

                <section className="protocolSection resultsBox">
                    <h3 className="sectionTitle">გამოთვლის შედეგები</h3>
                    <p>გასაჩერებლად საჭირო მანძილი: <b>{need.toFixed(2)} მ.</b></p>
                    <p>არსებული თავისუფალი მანძილი: <b>{has.toFixed(2)} მ.</b></p>
                </section>

                <section className="protocolSection">
                    <h3 className="sectionTitle">საექსპერტო დასკვნა</h3>
                    <div className="conclusionText">
                        ჩატარებული კვლევის შედეგად დადგინდა, რომ მძღოლი <b>{data.driverFullName}</b> {
                        data.guilty
                            ? "დამნაშავეა. მძღოლს საკმარისი დისტანცია ჰქონდა ავტო სატრანპსორტო საშუალების გასაჩერებლად და მან ეს დ" +
                            "ისტანცია ვერ გამოიყენა დაუდგენელი მიზეზებიდან გამომდინარე. (იგულისხმება, რომ: \n 1. " +
                            "მძღოლი შემოწმებული იყო ალკოჰოლურ და ნარკოტიკულ სიმთვრალეზე, რაზეც უარყოფითი შედეგი იქნა მიღებული; \n2." +
                            " სამუხრუჭე სისტემა ცალკე კვლევის შედეგად გამართული იყო."
                            : "უდანაშაულოა. მოცემულ ვითარებაში მძღოლს არ გააჩნდა ფიზიკური შესაძლებლობა..."
                    }
                    </div>
                </section>

                <footer className="protocolSignatureSection">
                    <div className="signatureLine">
                        <span>ხელმოწერა:</span>
                        {authorSignature && <img src={authorSignature} alt="Signature" />}
                    </div>
                </footer>
            </div>
        </div>
    );
};