import {useEffect, useState} from "react";
import {IMaskInput} from "react-imask";
import {useLocation} from "react-router-dom";

import {ActionIcon, Group, Text, TextInput} from "@mantine/core";

import {IconCheck, IconEdit, IconPhoneCall, IconSchool, IconUser} from "@tabler/icons-react";
import {StatusCodes} from "http-status-codes";

import authProvider from "../../../../../authProvider.jsx";
import {ApiPath} from "../../../../../main.jsx";
import classes from "./StudentInfo.module.css";


export function StudentInfo() {
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [isGradeEditing, setIsGradeEditing] = useState(false);
    const [userData, setUserData] = useState({
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
        grade: null
    });

    const location = useLocation()
    //TODO
    useEffect(() => {
        fetch(`${ApiPath}/users/student_info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            }
        }).then(resp => {
            switch (resp.status) {
                case StatusCodes.INTERNAL_SERVER_ERROR:
                    throw new Error("Ошибка сервера")
                case StatusCodes.UNAUTHORIZED:
                    throw new Error("Истек токен доступа")
                case StatusCodes.FORBIDDEN:
                    throw new Error("Нет прав доступа")
                case StatusCodes.GATEWAY_TIMEOUT:
                    throw new Error("Сервер временно недоступен")
                case StatusCodes.OK:
                    return resp.json()
                default:
                    throw new Error("Сервер недоступен")
            }
        }, () => Promise.reject("Неизвестная ошибка"))
            .then((json) => {
                setUserData(prevUserData => ({
                    ...prevUserData || {},
                    grade: json["grade"]
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }, [location]);


    useEffect(() => {
        authProvider.getIdentity()
            .then((identityData => {
                setUserData({
                    first_name: identityData.first_name,
                    last_name: identityData.last_name,
                    patronymic: identityData.patronymic || null,
                    phone: identityData.phone
                });
            }))
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handlePhoneClick = () => {
        setIsPhoneEditing(true);
    };
    const handleGradeClick = () => {
        setIsGradeEditing(true);
    };

    const handleChangePhone = (event) => {
        setUserData["phone"](event.target.value);
    };
    const handleChangeGrade = (event) => {
        setUserData["grade"](event.target.value);
    };

    const handlePhoneSubmit = () => {
        setIsPhoneEditing(false);
        //TODO Save the changes or perform any required actions here
    };
    const handleGradeSubmit = () => {
        setIsGradeEditing(false);
        //TODO Save the changes or perform any required actions here
    };

    return (
        <div>
            <Group wrap="nowrap" gap={10} mt={5}>
                <IconUser stroke={1.5} size="1rem" className={classes.icon}/>
                <Text fz="xl" className={classes.text}>
                    {userData.last_name} {userData.first_name} {userData.patronymic}
                </Text>
            </Group>

            <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon}/>
                {isPhoneEditing ? (
                    <>
                        <TextInput
                            minlength="18"
                            maxlength="18"
                            value= {userData.phone}
                            component={IMaskInput}
                            mask="+7 (000) 000-00-00"
                            onChange={handleChangePhone}
                        />
                        <ActionIcon component="button" variant="subtle" color="green"
                                    type="submit" onClick={handlePhoneSubmit}>
                            <IconCheck size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </>
                ) : (
                    <>
                        <Text fz="lg" className={classes.text}>{userData.phone}</Text>
                        <ActionIcon variant="subtle" color="gray" onClick={handlePhoneClick}>
                            <IconEdit size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </>
                )}
            </Group>

            <Group wrap="nowrap" gap={10} mt={5}>
                <IconSchool stroke={1.5} size="1rem" className={classes.icon}/>
                {isGradeEditing ? (
                    <>
                        <TextInput
                            value={userData.grade}
                            onChange={handleChangeGrade}
                        />
                        <ActionIcon component="button" variant="subtle" color="green"
                                    type="submit" onClick={handleGradeSubmit}>
                            <IconCheck size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </>
                ) : (
                    <>
                        <Text fz="lg" className={classes.text}>{userData.grade} класс</Text>
                        <ActionIcon variant="subtle" color="gray" onClick={handleGradeClick}>
                            <IconEdit size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </>
                )}
            </Group>
        </div>
    );
}
