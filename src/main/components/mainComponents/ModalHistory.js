import Modal from "react-bootstrap/Modal";
import {ExperimentDetails} from "./ExperimentDetails";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {API} from "../../APIServers/API";
import {Button} from "@chakra-ui/react";
import "../../styles/modalHistoryStyle.css";

export const ModalHistory = (props) => {
    const [experimentDetailModalVisible, setExperimentDetailModalVisible] = useState(false);
    const [item, setItem] = useState({});
    const [dataList, setDataList] = useState([]);


    const getHistoryDataFromServerAPI = async () => {
        await axios.get(API)
            .then(response => {
                let data = response.data.sort((a, b) => b.id - a.id);
                setDataList(data);
            })
            .catch(error => console.error("Error: " + error));
    }

    useEffect(() => {
        getHistoryDataFromServerAPI().then(r=>console.log(r)).catch(e=>console.error("Error: ", e));
    }, [props.date]);

    return (
        <>
            <Modal
                {...props}
                fullscreen={true}
                aria-labelledby="example-modal-sizes-title-lg"
                className={'experimentDetailsModal'}
            >
                <Modal.Header className={'ModalHistoryHeader'} closeButton>
                    კვლევათა ნუსხა
                </Modal.Header>
                <Modal.Body>
                    {dataList.map((item, id) => (
                        <div key={id} className={'ModalHistoryListItem'} onClick={() => {
                            setItem(item);
                            setExperimentDetailModalVisible(true);
                        }}>
                            {`კვლევა #${item.id}. მძღოლი - ${item.driverFullName}. ქვეითი - ${item.pedestrianFullName}`}
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button colorScheme='blue' mr={3} onClick={props.onHide}>
                        დახურვა
                    </Button>
                </Modal.Footer>
            </Modal>

            <ExperimentDetails show={experimentDetailModalVisible} onHide={() => { setExperimentDetailModalVisible(false); }} data={item} />
        </>
    )
}







