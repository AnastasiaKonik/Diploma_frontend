import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ActionIcon, Box, Button, Container, Group, Paper, Stack, Text, TextInput, Title} from '@mantine/core';

import {HandleFiles} from "./components";

import {IconCheck, IconEdit, IconPhone, IconSchool, IconUser} from "@tabler/icons-react";

import authProvider from "../../authProvider.jsx";
import classes from "./StudentPage.module.css";

export function StudentPage() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/profile`;
        navigate(path);
    };

    const [isTutor, setIsTutor] = useState(false);
    const [userData, setUserData] = useState({
        id: null,
        subject: null,
    })

    useEffect(() => {
        authProvider.getTutorInfo()
            .then((tutorData) => {
                setUserData({
                    id: tutorData.id,
                    subject: tutorData.subject
                });

                fetch(`http://localhost:3030/lessons/${tutorData.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const theme = data.theme; // Assuming there is only one lesson for the tutor
                        if (theme) {
                            setTheme(theme);
                        } else {
                            console.log("Lesson not found for tutor ID:", tutorData.id);
                        }
                    })
                    .catch((error) => console.log("Error fetching lesson:", error));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        authProvider.checkAuth()
            .then(() => {
                authProvider.getIdentity()
                    .then(() => {
                        authProvider.getPermissions()
                            .then((userRole) => {
                                if (userRole === 'TU') {
                                    setIsTutor(true);
                                } else {
                                    setIsTutor(false);
                                }
                            });
                    })
            })
            .catch(error => {
                console.error('Error fetching user identity:', error);
            });
    }, []);

    const [isThemeEditing, setIsThemeEditing] = useState(false);
    const [theme, setTheme] = useState("");


    const [isTaskEditing, setIsTaskEditing] = useState(false);
    const [task, setTask] = useState("");

    const handleThemeClick = () => {
        setIsThemeEditing(true);
    };

    const handleChangeTheme = (event) => {
        setTheme(event.target.value);
    };

    const handleThemeSubmit = () => {
        setIsThemeEditing(false);
        fetch(`http://localhost:3030/lessons/${userData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({theme: theme}),
        })
            .then((response) => response.json())
            .catch((error) => console.log("error", error));
    };

    const handleTaskClick = () => {
        setIsTaskEditing(true);
    };

    const handleChangeTask = (event) => {
        setTask(event.target.value);
    };

    const handleTaskSubmit = () => {
        setIsTaskEditing(false);
        //TODO: Save the changes or perform any required actions here
    };

    return (
        <Container fluid maw={1400} className={classes.main}>
            {isTutor ? (
                    <>
                        <Box px="md" mx="auto" pt="xs" mb="md">
                            <Title order={1} mb="lg" align="center" className={classes.text}>Страница ученика</Title>

                            <Title order={2} mb="xs" className={classes.title}>Информация об ученике</Title>
                            <div>
                                <Group wrap="nowrap">
                                    <IconUser stroke={1.5} size="1rem" className={classes.icon}/>
                                    <Text fz="xl" className={classes.text}>
                                        Коник Анастасия Александровна
                                    </Text>
                                </Group>
                                <Group wrap="nowrap">
                                    <IconSchool stroke={1.5} size="1rem" className={classes.icon}/>
                                    <Text fz="xl" className={classes.text}>
                                        10 класс
                                    </Text>
                                </Group>
                                <Group wrap="nowrap">
                                    <IconPhone stroke={1.5} size="1rem" className={classes.icon}/>
                                    <Text fz="xl" className={classes.text}>
                                        +7 (924) 432-38-48
                                    </Text>
                                </Group>
                            </div>

                            <Title order={2} mb="sm" mt="lg" className={classes.title}>Материалы для занятий</Title>
                            <Group wrap="nowrap">
                                <Stack>
                                    <Title order={3} className={classes.text}>Тема следующего занятия:</Title>
                                    <Group wrap="nowrap" gap={10}>
                                        {isThemeEditing ? (
                                            <>
                                                <TextInput
                                                    value={theme}
                                                    onChange={handleChangeTheme}
                                                />
                                                <ActionIcon component="button" variant="subtle" color="green"
                                                            type="submit" onClick={handleThemeSubmit}>
                                                    <IconCheck size="1rem" stroke={1.5}/>
                                                </ActionIcon>
                                            </>
                                        ) : (
                                            <>
                                                <Paper withBorder p="xs" shadow="md" miw={250}>
                                                    <Text
                                                        fz="md"
                                                        className={classes.text}>{theme}
                                                    </Text>
                                                </Paper>
                                                <ActionIcon variant="subtle" color="gray" onClick={handleThemeClick}>
                                                    <IconEdit size="1rem" stroke={1.5}/>
                                                </ActionIcon>
                                            </>
                                        )}
                                    </Group>
                                    <Title order={3} className={classes.text}>Прикрепить материалы:</Title>
                                    <HandleFiles/>
                                </Stack>
                            </Group>

                            <Title order={2} mb="sm" mt="lg" className={classes.title}>Выдать задание</Title>
                            <Group wrap="nowrap" gap={10} mt={5} mb="sm">
                                <Stack>
                                    <HandleFiles/>
                                    <Group wrap="nowrap" gap={10}>
                                        {isTaskEditing ? (
                                            <>
                                                <TextInput
                                                    value={task}
                                                    onChange={handleChangeTask}
                                                />
                                                <ActionIcon component="button" variant="subtle" color="green"
                                                            type="submit" onClick={handleTaskSubmit}>
                                                    <IconCheck size="1rem" stroke={1.5}/>
                                                </ActionIcon>
                                            </>
                                        ) : (
                                            <>
                                                <Paper withBorder p="xs" shadow="md" miw={250}>
                                                    <Text
                                                        fz="md"
                                                        className={classes.text}>{task}
                                                    </Text>
                                                </Paper>
                                                <ActionIcon variant="subtle" color="gray" onClick={handleTaskClick}>
                                                    <IconEdit size="1rem" stroke={1.5}/>
                                                </ActionIcon>
                                            </>
                                        )}
                                    </Group>
                                    <Button mt="sm" maw="180" className={classes.send_btn} type="submit"
                                            onClick={() => ({})}>
                                        Отправить ученику
                                    </Button>
                                </Stack>
                            </Group>

                            <Button mt="xl" mb="lg" mx="auto" className={classes.btn} type="submit"
                                    onClick={() => routeChange()}>
                                Назад
                            </Button>
                        </Box>
                    </>
                ) :
                (
                    <Container className={classes.main}>
                        <h2>
                            У вас нет доступа к странице ученика
                        </h2>
                    </Container>
                )
            }
        </Container>
    );
}