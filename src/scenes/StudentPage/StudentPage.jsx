import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ActionIcon, Box, Button, Container, Group, Paper, Stack, Text, TextInput, Title} from '@mantine/core';

import {HandleMaterialFiles} from "./components";

import {IconCheck, IconEdit, IconPhone, IconSchool, IconUser} from "@tabler/icons-react";

import authProvider from "../../authProvider.jsx";
import classes from "./StudentPage.module.css";
import {HandleTaskFiles} from "./components/index.js";

export function StudentPage() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/profile`;
        navigate(path);
    };

    const [isTutor, setIsTutor] = useState(false);
    const [userId, setUserId] = useState(null)
    const [theme, setTheme] = useState("");

    useEffect(() => {
        authProvider.getTutorInfo()
            .then((tutorData) => {
                setUserId(tutorData.id);

                fetch(`http://localhost:3030/lessons/?tutor_id=${tutorData.id}&student_id=${1}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const theme = data[0].theme;
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
    const handleThemeSubmit = () => {
        setIsThemeEditing(false);
        fetch(`http://localhost:3030/lessons/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({theme: theme}),
        })
            .then((response) => response.json())
            .catch((error) => console.log("error", error));
    };

    const [isTaskEditing, setIsTaskEditing] = useState(false);
    const [task, setTask] = useState("");

    const handleSendText = async () => {
        // rewrite with .then
        // const tutorLogin = localStorage.getItem("login")
        try {
            // Find assignee by tutorLogin and student name
            const response = await fetch('http://localhost:3030/tasks', {
                method: 'POST',
                body: JSON.stringify({"text": task, "author": localStorage.getItem("login"),
                    "assignee_id": userId}),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                // POST to /tasks
                setTask("")
                return data.files;
            } else {
                console.log('Failed to save files');
            }
        } catch (error) {
            console.error('Error saving files:', error);
            return [];
        }
    };

    const [isButtonDisabled, setButtonDisabled] = useState(true);

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
                                        {/*Get student info dynamically */}
                                    </Text>
                                </Group>
                                <Group wrap="nowrap">
                                    <IconSchool stroke={1.5} size="1rem" className={classes.icon}/>
                                    <Text fz="xl" className={classes.text}>
                                        10 класс
                                        {/*Get student info dynamically */}
                                    </Text>
                                </Group>
                                <Group wrap="nowrap">
                                    <IconPhone stroke={1.5} size="1rem" className={classes.icon}/>
                                    <Text fz="xl" className={classes.text}>
                                        +7 (924) 432-38-48
                                        {/*Get student info dynamically */}
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
                                                    onChange={(event) => {
                                                        setTheme(event.target.value)
                                                    }}
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
                                                <ActionIcon variant="subtle" color="gray"
                                                            onClick={() => {
                                                                setIsThemeEditing(true)
                                                            }}>
                                                    <IconEdit size="1rem" stroke={1.5}/>
                                                </ActionIcon>
                                            </>
                                        )}
                                    </Group>
                                    <Title order={3} className={classes.text}>Прикрепить материалы:</Title>
                                    <HandleMaterialFiles/>
                                </Stack>
                            </Group>

                            <Title order={2} mb="sm" mt="lg" className={classes.title}>Выдать задание</Title>
                            <Group wrap="nowrap" gap={10} mt={5} mb="sm">
                                <Stack>
                                    <HandleTaskFiles/>
                                    <Group wrap="nowrap" gap={10} mt="md">
                                        {isTaskEditing ? (
                                            <>
                                                <TextInput
                                                    value={task}
                                                    onChange={(event) => {
                                                        setTask(event.target.value)
                                                    }}
                                                />
                                                <ActionIcon component="button" variant="subtle" color="green"
                                                            type="submit"
                                                            onClick={() => {
                                                                setIsTaskEditing(false)
                                                                setButtonDisabled(false);
                                                            }}>
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
                                                <ActionIcon variant="subtle" color="gray"
                                                            onClick={() => {
                                                                setIsTaskEditing(true)
                                                            }}>
                                                    <IconEdit size="1rem" stroke={1.5}/>
                                                </ActionIcon>
                                            </>
                                        )}
                                    </Group>
                                    <Button w="fit-content" aria-disabled='true' type="submit"
                                            className={isButtonDisabled ? classes.dis_btn : classes.send_btn}
                                            disabled={isButtonDisabled} onClick={handleSendText}>
                                        Отправить задание текстом
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