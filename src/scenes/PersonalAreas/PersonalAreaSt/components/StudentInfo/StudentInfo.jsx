import {useEffect, useState} from "react";
import {IMaskInput} from "react-imask";

import {ActionIcon, Group, Text, TextInput} from "@mantine/core";

import {IconCheck, IconEdit, IconPhoneCall, IconSchool, IconUser} from "@tabler/icons-react";

import authProvider from "../../../../../authProvider.jsx";
import classes from "./StudentInfo.module.css";


export function StudentInfo() {
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [isGradeEditing, setIsGradeEditing] = useState(false);
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        patronymic: "",
        phone: "",
        grade: "",
        id: "",
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
        authProvider.getStudentInfo()
            .then((studentData) => {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    grade: studentData.grade,
                    id: studentData.id
                }));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const handleChangePhone = (event) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            phone: event.target.value
        }))
    };
    const handleChangeGrade = (event) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            grade: event.target.value
        }));
    };

    const handlePhoneSubmit = () => {
        setIsPhoneEditing(false);
        authProvider.patchUserPhone(userData.phone)
            .then()
            .catch((reason) => {
                console.log(reason)
            })
    };
    const handleGradeSubmit = () => {
        setIsGradeEditing(false);
        authProvider.patchStudentGrade(userData.grade)
            .then()
            .catch((reason) => {
                console.log(reason)
            })
    };

    return (
        <>
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
                            value={userData.phone}
                            component={IMaskInput}
                            mask="+7 (000) 000-00-00"
                            onChange={handleChangePhone}
                        />
                        <ActionIcon component="button" variant="subtle" color="green"
                                    type="submit"
                                    onClick={handlePhoneSubmit}>
                            <IconCheck size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </>
                ) : (
                    <>
                        <Text fz="lg" className={classes.text}>{userData.phone}</Text>
                        <ActionIcon variant="subtle" color="gray"
                                    onClick={() => setIsPhoneEditing(true)}>
                            <IconEdit size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </>
                )}
            </Group>

            <Group wrap="nowrap" gap={10} mt={5} mb="md">
                <IconSchool stroke={1.5} size="1rem" className={classes.icon}/>
                {isGradeEditing ? (
                    <>
                        <TextInput
                            value={userData.grade}
                            onChange={handleChangeGrade}
                        />
                        <ActionIcon component="button" variant="subtle" color="green"
                                    type="submit"
                                    onClick={handleGradeSubmit}>
                            <IconCheck size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </>
                ) : (
                    <>
                        <Text fz="lg" className={classes.text}>{userData.grade} класс</Text>
                        <ActionIcon variant="subtle" color="gray"
                                    onClick={() => setIsGradeEditing(true)}>
                            <IconEdit size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </>
                )}
            </Group>
        </>
    );
}
