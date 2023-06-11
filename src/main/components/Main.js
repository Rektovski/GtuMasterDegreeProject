import {useEffect, useState} from "react";
import "../styles/mainStyle.css";
import {isDriverGuilty, driverHas, driverNeed} from "./calculationFunctions";

const defaultForm = {
    t1: 0,
    t2: 0,
    t3: 0,
    carVelocity: 0,
    humanVelocity: 0,
    humanLength: 0,
    J: 0,
}

export default function Main() {
    const [form, setForm] = useState(defaultForm);
    const [result, setResult] = useState(null);
    const [has, setHas] = useState(0);
    const [need, setNeed] = useState(0);
    const [date, setDate] = useState('');

    const handleChange = (e) => {
        setForm((prevState) => ({
                ...prevState, [e.target.name]: e.target.value
            }
        ));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(isDriverGuilty(form));
        setNeed(driverNeed(form));
        setHas(driverHas(form));

        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        setDate(hours + ' : ' + minutes + ' : ' + seconds);
    };

    useEffect(() => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        console.log(`\"მიღებულია ახალი მონაცემი.\n\nპასუხია: ${result ? 'დიახ' : 'არა'}. \n\nდასკვნის დრო: ${hours} : ${minutes} : ${seconds}\n\n\"`)
    }, [result]);

    return (
        <>
            <div className={'backgroundImage'}>
                <div className={'board'}>
                    <div className={'boardTitle'}>ექსპერიმენტი</div>
                    <div className={'boardDescription'}>გზაზე გადამსვლელ ქვეითს დაეჯახა მანქანა. საჭიროა დადგინდეს
                        ჰქონდა თუ არა მძღოლს საკმარისი დისტანცია გასაჩერებლად!
                    </div>
                    <div className={'boardBody'}>
                        <div className={'boardLeft'}>
                            <form className={'boardLeftForm'} onSubmit={handleSubmit}>
                                <label className={'formLabel'}>
                                    რეაქციის დრო:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="t1"
                                        value={form.t1}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'}>
                                    მუხრუჭის დაყოვნება:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="t2"
                                        value={form.t2}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'}>
                                    მუხრუჭის მაქს.ეფექტ. საჭირო დრო:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="t3"
                                        value={form.t3}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'}>
                                    მანქანის სიჩქარე:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="carVelocity"
                                        value={form.carVelocity}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'}>
                                    ქვეითის სიჩქარე:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="humanVelocity"
                                        value={form.humanVelocity}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'}>
                                    ქვეითის მიერ გავლილი მანძილი:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="humanLength"
                                        value={form.humanLength}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br/>
                                <label className={'formLabel'}>
                                    მაქსიმალური ნიშნიანი აჩქარება:
                                    <input
                                        className={'formInput'}
                                        type="number"
                                        name="J"
                                        value={form.J}
                                        onChange={handleChange}
                                    />
                                </label>
                                <br/>
                                <div className={'formButtonSpace'}>
                                    <button className={'formButton'} type="submit">კალკულაცია</button>
                                </div>
                            </form>
                            <div className={'historyButtonSpace'}>
                                <button className={'historyButton'}>ისტორია</button>
                            </div>
                        </div>
                        <div className={'boardRight'}>
                            <div>
                                {
                                    result !== null ?
                                        <>
                                            <div>
                                                კვლევის ჩატარების დრო: {`${date}`}
                                            </div>
                                            <div>
                                                მძღოლი დამნაშავეა?:
                                                {
                                                    result ? " დიახ" : " არა"
                                                }
                                            </div>
                                            <div>
                                                მძღოლს გასაჩერებლად სჭირდებოდა {`${need}`} <br />
                                                მძღოლს გასაჩერებლად ჰქონდა {`${has}`}
                                            </div>
                                        </>
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}