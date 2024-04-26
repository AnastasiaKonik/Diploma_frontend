import {useEffect, useState} from "react";
import {IMaskInput} from "react-imask";

import {ActionIcon, Group, Text, TextInput} from "@mantine/core";

import {IconBook, IconCheck, IconEdit, IconPhoneCall, IconUser} from "@tabler/icons-react";

import authProvider from "../../../../../authProvider.jsx";
import classes from "./TutorInfo.module.css";

export function TutorInfo() {
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [userData, setUserData] = useState({
        first_name: null,
        last_name: null,
        patronymic: null,
        phone: null,
        id: null,
    });

    useEffect(() => {
        authProvider.getIdentity()
            .then((identityData) => {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    first_name: identityData.first_name,
                    last_name: identityData.last_name,
                    patronymic: identityData.patronymic || null,
                    phone: identityData.phone
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        authProvider.getTutorInfo()
            .then((tutorData) => {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    subject: tutorData.subject,
                    id: tutorData.id
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handlePhoneClick = () => {
        setIsPhoneEditing(true);
    };

    const handleChangePhone = (event) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            phone: event.target.value
        }))
    };

    const handlePhoneSubmit = () => {
        setIsPhoneEditing(false);
        authProvider.patchUserPhone(userData.phone)
            .then()
            .catch((reason) => {
                console.log(reason)
            })
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
                <IconBook stroke={1.5} size="1rem" className={classes.icon}/>
                <Text fz="xl" className={classes.text}>
                    Предмет преподавания: {userData.subject}
                </Text>
            </Group>

            <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon}/>
                {isPhoneEditing ? (
                    <>
                        <TextInput
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
