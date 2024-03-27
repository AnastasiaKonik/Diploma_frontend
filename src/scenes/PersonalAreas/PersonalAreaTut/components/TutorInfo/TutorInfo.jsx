import {useEffect, useState} from "react";
import {IMaskInput} from "react-imask";

import {ActionIcon, Group, Text, TextInput} from "@mantine/core";

import {StatusCodes} from "http-status-codes";
import {IconCheck, IconEdit, IconPhoneCall, IconUser} from "@tabler/icons-react";

import authProvider from "../../../../../authProvider.jsx";
import {ApiPath} from "../../../../../main.jsx";
import classes from "./TutorInfo.module.css";

export function TutorInfo() {
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [userData, setUserData] = useState({
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
        subject: null
    });

    //TODO: put in right place or don't use
    useEffect(() => {
        fetch(`${ApiPath}/users/tutor_info`, {
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
                    grade: json["subject"]
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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

    const handleChangePhone = (event) => {
        setUserData["phone"](event.target.value);
    };

    const handlePhoneSubmit = () => {
        setIsPhoneEditing(false);
        //TODO: Save the changes or perform any required actions here
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
                            value={userData.phone}
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
        </div>
    );
}
