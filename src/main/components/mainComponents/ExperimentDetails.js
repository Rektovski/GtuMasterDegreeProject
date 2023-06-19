import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";

export const ExperimentDetails = (props) => {
    const {data, date} = props;
    const [user, setUser] = useState("");

    useEffect(() => {
        setUser(localStorage.getItem('user'));
    }, []);

    return (
        <Modal
            style={{zIndex: 10000}}
            {...props}
            fullscreen={true}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <h1 style={{border: "3px dotted black", padding: 4, borderRadius: "10px 0px 10px 10px"}}>
                    ოქმი No̱: {data.id}
                </h1>
            </Modal.Header>
            <Modal.Body>
                <h5 style={{textDecoration: "underline", fontStyle: "italic"}}
                    className={'d-flex justify-content-end'}>ოქმის გატარების თარიღი & დრო: {date}</h5>
                <h3 className={'d-flex justify-content-center'}>ექსპერტი: {user}</h3>

                <Container>
                    <div>მძღოლის სრული სახელი - {data.driverFullName}</div>
                    <div>ქვეითის სრული სახელი - {data.pedestrianFullName}</div>
                    <div>რეაქციის დრო - {data.t1}</div>
                    <div>მუხრუჭის დაყოვნებისთვის საჭირო დრო - {data.t2}</div>
                    <div>მუხრუჭის მაქსიმალური ეფექტისათვის საჭირო დრო - {data.t3}</div>
                    <div>მანქანის სიჩქარე - {data.carVelocity}</div>
                    <div>ქვეითის სიჩქარე - {data.humanVelocity}</div>
                    <div>ქვეითის მიერ მანქანის სავალ ნაწილზე გადასვლისას გავლილი მანძილი - {data.humanLength}</div>
                    <div>მაქსიმალური ნიშნიანი აჩქარება კონკრეტულ გრუნტზე - {data.J}</div>
                </Container>
            </Modal.Body>
        </Modal>
    )
}