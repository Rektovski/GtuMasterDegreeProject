import Modal from 'react-bootstrap/Modal';
import {useEffect} from "react";
import {map} from "react-bootstrap/ElementChildren";

export const ExperimentDetails = (props) => {
    const data = props.iacw;

    useEffect(() => {
        console.log(props.iacw);
    }, []);

    return (
        <Modal
            style={{zIndex: 10000}}
            {...props}
            fullscreen={true}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                კვლევა #: {data.id}
            </Modal.Header>
            <Modal.Body>
                {/*{*/}
                {/*    data.map((item, index) => (*/}
                {/*        <div key={index}>*/}
                {/*            <div>რეაქციის დრო: {item.t1}</div>*/}
                {/*            <div>რეაქციის დრო: {item.t2}</div>*/}
                {/*            <div>რეაქციის დრო: {item.t3}</div>*/}
                {/*            <div>რეაქციის დრო: {item.t1}</div>*/}
                {/*            <div>რეაქციის დრო: {item.t1}</div>*/}
                {/*            <div>რეაქციის დრო: {item.t1}</div>*/}
                {/*            <div>რეაქციის დრო: {item.t1}</div>*/}
                {/*        </div>*/}
                {/*    ))*/}
                {/*}*/}
            </Modal.Body>
        </Modal>
    )
}