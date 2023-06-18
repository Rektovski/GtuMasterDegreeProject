import "../styles/monitorAnswerStyle.css";

export default function MonitorAnswer(object) {
    const {result, has, need, date} = object;
    return (
        result !== null ?

        <div className={'errorMessage'}>
            <div className={'css-typing'}>
                <p>
                    კვლევის ჩატარების დრო: {`${date}`}
                </p>
                <p>
                    მძღოლი {
                    result ? " დამნაშავეა" : " უდანაშაულოა"
                }
                </p>
                <p>
                    მძღოლს გასაჩერებლად სჭირდებოდა {`${need.toFixed(2)}`} მეტრი <br />
                </p>
                <p>
                    მძღოლს გასაჩერებლად ჰქონდა {`${has.toFixed(2)}`} მეტრი
                </p>
            </div>
        </div>

        : <></>
    )
}
