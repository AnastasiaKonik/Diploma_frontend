import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ActionIcon, Box, Button, Container, Group, Paper, Stack, Text, TextInput, Title} from '@mantine/core';

import {GetMaterials, HandleMaterialFiles} from "./components";

import {IconCheck, IconEdit} from "@tabler/icons-react";

import authProvider from "../../authProvider.jsx";
import classes from "./StudentPage.module.css";
import {HandleTaskFiles, StudentData} from "./components/index.js";

export function StudentPage() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/profile`;
        navigate(path);
    };

    const [isTutor, setIsTutor] = useState(false);

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


    const [isTaskEditing, setIsTaskEditing] = useState(false);
    const [task, setTask] = useState("");

    const handleSendText = async () => {
        try {
            const response = await fetch('http://localhost:3030/tasks/', {
                method: 'POST',
                body: JSON.stringify({
                    "text": task,
                    "author":
                        `${localStorage.getItem("first_name")} ${localStorage.getItem("last_name")} ${localStorage.getItem("patronymic")}`,
                    "assignee_id": localStorage.getItem("student_id")
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
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
                            <StudentData/>

                            <Title order={2} mb="sm" mt="lg" className={classes.title}>Материалы для занятий</Title>
                            <Group wrap="nowrap">
                                <Stack>
                                    <Title order={3} className={classes.text}>Прикрепить материалы:</Title>
                                    <HandleMaterialFiles/>
                                    <Title order={4} className={classes.text}>Ваши материалы:</Title>
                                   <GetMaterials/>
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