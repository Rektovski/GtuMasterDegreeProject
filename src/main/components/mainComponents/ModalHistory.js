import "../../styles/modalHistoryStyle.css";
import { ExperimentDetails } from "./ExperimentDetails";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../APIServers/API";
import { VscClose, VscHistory } from "react-icons/vsc";

export const ModalHistory = (props) => {
    const [experimentDetailModalVisible, setExperimentDetailModalVisible] = useState(false);
    const [item, setItem] = useState({});
    const [dataList, setDataList] = useState([]);

    const getHistoryDataFromServerAPI = async () => {
        try {
            const response = await axios.get(API);
            // Sorting by ID descending
            const sortedData = response.data.sort((a, b) => b.id - a.id);
            setDataList(sortedData);
        } catch (error) {
            console.error("Archive Access Denied: " + error);
        }
    }

    useEffect(() => {
        if (props.show) {
            getHistoryDataFromServerAPI();
        }
    }, [props.show, props.date]);

    if (!props.show) return null;

    return (
        <div className="historyOverlay">
            <div className="historyContainer">
                <header className="historyHeader">
                    <div className="historyTitle">
                        <VscHistory size={28} className="historyIcon" />
                        <span>კვლევების არქივი</span>
                    </div>
                    <button className="historyCloseX" onClick={props.onHide}>
                        <VscClose size={30} />
                    </button>
                </header>

                <div className="historyBody">
                    <div className="historyListGrid">
                        {dataList.length > 0 ? (
                            dataList.map((item, index) => (
                                <div
                                    key={index}
                                    className="historyItemCard"
                                    onClick={() => {
                                        setItem(item);
                                        setExperimentDetailModalVisible(true);
                                    }}
                                >
                                    <div className="itemBadge">#{item.id}</div>
                                    <div className="itemInfo">
                                        <div className="infoRow">
                                            <span className="infoLabel">მძღოლი:</span>
                                            <span className="infoValue">{item.driverFullName}</span>
                                        </div>
                                        <div className="infoRow">
                                            <span className="infoLabel">ქვეითი:</span>
                                            <span className="infoValue">{item.pedestrianFullName}</span>
                                        </div>
                                    </div>
                                    <div className="itemMeta">
                                        {item.date} | {item.time}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="noData">არქივი ცარიელია...</div>
                        )}
                    </div>
                </div>

                <footer className="historyFooter">
                    <button className="historyCloseBtn" onClick={props.onHide}>დახურვა</button>
                </footer>
            </div>

            <ExperimentDetails
                show={experimentDetailModalVisible}
                onHide={() => setExperimentDetailModalVisible(false)}
                data={item}
            />
        </div>
    );
}