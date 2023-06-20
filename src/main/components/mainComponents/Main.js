import {useEffect, useState} from "react";
import "../../styles/mainStyle.css";
import {isDriverGuilty, driverHas, driverNeed} from "../helperFunctions/calculationFunctions";
import {dateNow} from "../helperFunctions/dateFunction";
import MonitorAnswer from "./MonitorAnswer";
import axios from "axios";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import {ModalHeader} from "react-bootstrap";
import {ExperimentDetails} from "./ExperimentDetails";
import {TableGallery} from "./TableGallery";

const API = 'https://retoolapi.dev/hN9mV9/gtumurmanishvilimasterdegreeprojectserverapi';

const defaultForm = {
    t1: 0,
    t2: 0,
    t3: 0,
    carVelocity: 0,
    humanVelocity: 0,
    humanLength: 0,
    J: 0,
    driverFullName: "",
    pedestrianFullName: "",
    date: "",
    time: "",
    has: null,
    need: null,
    guilty: null,
}

export default function Main() {
    const [form, setForm] = useState(defaultForm);
    const [result, setResult] = useState(null);
    const [has, setHas] = useState(0);
    const [need, setNeed] = useState(0);
    const [date, setDate] = useState('');
    const [dataList, setDataList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState({});
    const [tableOpen, setTableOpen] = useState(false);

    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleChange = (e) => {
        setForm((prevState) => ({
                ...prevState, [e.target.name]: e.target.value
            }
        ));
    }

    const calculateInformationAndSendItToAPI = async (e) => {
        e.preventDefault();
        form.date = dateNow('date');
        form.time = dateNow('time');

        // true or false
        setResult(isDriverGuilty(form));
        form.guilty = isDriverGuilty(form);

        // Detailed info about needed and had distances.
        // For localUse
        setNeed(driverNeed(form));
        setHas(driverHas(form));

        // For API
        form.need = driverNeed(form);
        form.has = driverHas(form);

        // Sending data to database (API)
        await axios
            .post(API, form)
            .then(r => console.log(r))
            .catch(e => console.error("Error: " + e));

        // Resetting inputs in the form after gaining results.
        setForm(defaultForm);

        setDate(dateNow);
    };

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
    }, [date]);

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
            <div className={'backgroundImage'}>
                <div className={'logoutBtnSpace'}>
                    <button className={'logoutBtn'} onClick={logout}>გამოსვლა</button>
                </div>
                <div className={'board'}>
                    <div className={'boardTitle'}>საექსპერიმენტო ლაბორატორია</div>
                    <div className={'boardDescription'}>გზაზე გადამსვლელ ქვეითს დაეჯახა მანქანა. საჭიროა დადგინდეს
                        ჰქონდა თუ არა მძღოლს საკმარისი დისტანცია გასაჩერებლად!
                    </div>
                    <div className={'boardBody'}>
                        <div className={'boardLeft'}>
                            <form className={'boardLeftForm'} onSubmit={calculateInformationAndSendItToAPI}>
                                <label className={'formLabel'} htmlFor={"t1"}>
                                    რეაქციის დრო:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="t1"
                                        placeholder={'წმ'}
                                        value={form.t1 ? form.t1 : ""}
                                        onChange={handleChange}
                                        required={true}
                                        min={0.01}
                                        max={3}
                                        step={0.01}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'} htmlFor={"t2"}>
                                    მუხრუჭის დაყოვნება:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="t2"
                                        placeholder={'წმ'}
                                        value={form.t2 ? form.t2 : ""}
                                        onChange={handleChange}
                                        required={true}
                                        min={0.01}
                                        max={2}
                                        step={0.01}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'} htmlFor={"t3"}>
                                    მუხრუჭის მაქს.ეფექტ. საჭირო დრო:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="t3"
                                        placeholder={'წმ'}
                                        value={form.t3 ? form.t3 : ""}
                                        onChange={handleChange}
                                        required={true}
                                        min={0.01}
                                        max={2}
                                        step={0.01}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'} htmlFor={"carVelocity"}>
                                    მანქანის სიჩქარე:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="carVelocity"
                                        placeholder={'მ/წმ'}
                                        value={form.carVelocity ? form.carVelocity : ""}
                                        onChange={handleChange}
                                        required={true}
                                        min={0.01}
                                        max={500}
                                        step={0.01}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'} htmlFor={'humanVelocity'}>
                                    ქვეითის სიჩქარე:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="humanVelocity"
                                        placeholder={'მ/წმ'}
                                        value={form.humanVelocity ? form.humanVelocity : ""}
                                        onChange={handleChange}
                                        required={true}
                                        min={0.01}
                                        max={138.88}
                                        step={0.01}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'} htmlFor={'humanLength'}>
                                    ქვეითის მიერ გავლილი მანძილი:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="humanLength"
                                        placeholder={'მ'}
                                        value={form.humanLength ? form.humanLength : ""}
                                        onChange={handleChange}
                                        required={true}
                                        min={0.01}
                                        max={15}
                                        step={0.01}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'} htmlFor={'J'}>
                                    მაქსიმალური ნიშნიანი აჩქარება:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="J"
                                        placeholder={'მ/წმ^2'}
                                        value={form.J ? form.J : ""}
                                        onChange={handleChange}
                                        required={true}
                                        min={0.01}
                                        max={10}
                                        step={0.01}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'} htmlFor={'driverFullName'}>
                                    მძღოლის სრული სახელი:
                                    <input
                                        className={'formInput'}
                                        type="text"
                                        name="driverFullName"
                                        placeholder={'გვარი, სახელი'}
                                        value={form.driverFullName ? form.driverFullName : ""}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'} htmlFor={'pedestrianFullName'}>
                                    ქვეითის სრული სახელი:
                                    <input
                                        className={'formInput'}
                                        type="text"
                                        name="pedestrianFullName"
                                        placeholder={'გვარი სახელი'}
                                        value={form.pedestrianFullName ? form.pedestrianFullName : ""}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </label>
                                <br/>
                                <div className={'formButtonSpace'}>
                                    <button className={'formButton'} type="submit">კალკულაცია</button>
                                    <button className={'formButtonHistory'} type={"button"} onClick={onOpen}>ისტორია</button>
                                    <button className={'formButtonTable'} type={"button"} onClick={() => {
                                        setTableOpen(true);
                                    }}>ცხრილები</button>
                                </div>
                            </form>
                        </div>

                        <div className={'boardRight'}>
                            <div className="pcMonitorContainer">
                                <div className={'pcMonitorText '}>
                                    <MonitorAnswer result={result} has={has} need={need} date={date}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader className={'ModalHistoryHeader'}>კვლევათა ნუსხა</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {dataList.map((item, id) => (
                            <div key={id} className={'HistoryListItem'} onClick={() => {
                                setItem(item);
                                setModalVisible(true);
                            }}>
                                {`კვლევა #${item.id}. მძღოლი - ${item.driverFullName}. ქვეითი - ${item.pedestrianFullName}`}
                            </div>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            დახურვა
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <ExperimentDetails show={modalVisible} onHide={() => { setModalVisible(false); }} data={item} />

            <TableGallery style={{visibility: tableOpen ? "unset" : "hidden"}} show={tableOpen} onHide={() => {
                setTableOpen(false);
            }}/>
        </>
    )
}