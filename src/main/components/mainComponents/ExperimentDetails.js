import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import "../../styles/experimentDetailsStyle.css";
import {UserAPI} from "../../APIServers/UserAPI";
import axios from "axios";

export const ExperimentDetails = (props) => {
    const {data} = props;
    const has = data.has || 0;
    const need = data.need || 0;
    const date = data.date;
    const time = data.time;
    const [authorUser, setAuthorUser] = useState("");
    const [authorSignature, setAuthorSignature] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(UserAPI);
                const users = userResponse.data;
                const author = users.find(item => item.userId === data.userId);
                if (author) {
                    setAuthorSignature(author.signature);
                    setAuthorUser(author.username);
                }
            } catch (error) {
                console.log("Error while fetching user data:", error);
            }
        };

        const storedUser = localStorage.getItem('user');
        setAuthorUser(storedUser);

        fetchUserData();
    }, [data.userId]);

    return (
        <Modal
            {...props}
            fullscreen={true}
            aria-labelledby="example-modal-sizes-title-lg"
            className={'experimentDetailsModal'}
        >
            <Modal.Header closeButton>
                <h1 className={'experimentId'}>
                    ოქმი No̱: {data.id}
                </h1>
            </Modal.Header>
            <Modal.Body>
                <h5 className={'experimentCalendar'}>თარიღი - {date}</h5>
                <h5 className={'experimentTime'}>დრო - {time}</h5>
                <h3 className={'experimentAuthorUser'}>ექსპერტი: {authorUser}</h3>

                <Container>
                    <h3 className={'experimentListItemTitle'}>მონაცემები</h3>
                    <div className={"experimentListItem"}>მძღოლის სრული სახელი <div>{data.driverFullName}</div></div>
                    <div className={"experimentListItem"}>ქვეითის სრული სახელი <div>{data.pedestrianFullName}</div>
                    </div>
                    <div className={"experimentListItem"}>რეაქციის დრო <div>{data.t1}</div></div>
                    <div className={"experimentListItem"}>მუხრუჭის დაყოვნებისთვის საჭირო დრო <div>{data.t2}</div>
                    </div>
                    <div className={"experimentListItem"}>მუხრუჭის მაქსიმალური ეფექტისათვის საჭირო
                        დრო <div>{data.t3}</div></div>
                    <div className={"experimentListItem"}>მანქანის სიჩქარე <div>{data.carVelocity}</div></div>
                    <div className={"experimentListItem"}>ქვეითის სიჩქარე <div>{data.humanVelocity}</div></div>
                    <div className={"experimentListItem"}>ქვეითის მიერ მანქანის სავალ ნაწილზე გადასვლისას გავლილი
                        მანძილი <div>{data.humanLength}</div></div>
                    <div className={"experimentListItem"}>მაქსიმალური ნიშნიანი აჩქარება კონკრეტულ
                        გრუნტზე <div>{data.J}</div></div>

                    <div className={'experimentResultsSpace'}>
                        <div className={'experimentResults'}>
                            <h3 className={'experimentResultsTitle'}>მიღებული შედეგები</h3>
                            <div>
                                მძღოლს გასაჩერებლად სჭირდებოდა <b>{`${need.toFixed(2)}`} მეტრი</b> <br/>
                            </div>
                            <div>
                                მძღოლს გასაჩერებლად ჰქონდა <b>{`${has.toFixed(2)}`} მეტრი</b>
                            </div>
                        </div>
                    </div>

                    <div className={'experimentConclusionSpace'}>
                        <h3 className={'experimentConclusionTitle'}>საექსპერტო დასკვნა</h3>
                        <div className={'experimentConclusion'}>
                            {date} რიცხვში, {time} საათზე, ექსპერტი <b>{authorUser}</b>-ის მიერ
                            ჩატარებული <b>No̱: {data.id}</b> კვლევის
                            შემდეგ დადგინდა, რომ ავტოსატრანსპორტო საშუალების მძღოლი,
                            პიროვნება, <b>{data.driverFullName}</b> {
                            data.guilty ? "დამნაშავეა. მძღოლს საკმარისი დისტანცია ჰქონდა ავტო სატრანპსორტო საშუალების გასაჩერებლად და მან ეს დ" +
                                "ისტანცია ვერ გამოიყენა დაუდგენელი მიზეზებიდან გამომდინარე. (იგულისხმება, რომ: \n 1. " +
                                "მძღოლი შემოწმებული იყო ალკოჰოლურ და ნარკოტიკულ სიმთვრალეზე, რაზეც უარყოფითი შედეგი იქნა მიღებული; \n2." +
                                " სამუხრუჭე სისტემა ცალკე კვლევის შედეგად გამართული იყო.)"
                                :
                                "უდანაშაულოა. აღნიშნულ შემთხვაში მძღოლს არ ჰქონდა ფიზიკურ-ტექნიკური საშუალება დროულად გაეჩერებინა მანქანა და თავიდან აერიდებინა ავარია."
                        }
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div className={'experimentAuthorsUsersSignature'}>
                                ხელმოწერა:

                                <img src={authorSignature} alt={'signature'}/>
                            </div>
                        </div>
                    </div>
                </Container>
            </Modal.Body>
        </Modal>
    )
}