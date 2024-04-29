import React, {useEffect, useState} from "react";

import {Card, Text} from "@mantine/core";

import classes from "./Homework.module.css";
import authProvider from "../../../../../authProvider.jsx";

export const Homework = () => {

    const [tasks, setTask] = useState([
            {
                text: null,
                file: null,
                author: null,
                id: null,
            },
        ]
    )

    useEffect(() => {
        authProvider.getStudentInfo()
            .then(studentData => {
                fetch(`http://localhost:3030/tasks/?assignee_id=${studentData.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => response.json())
                    .then(json => {
                        setTask(json.map(x => {
                                return {
                                    // taskTheme: json.theme,
                                    text: x["text"] ? x.text : null,
                                    file: x["file0"] ? x.file0.path : null,
                                    author: x.author,
                                    id: x.id
                                }
                            }
                        ))
                    })
                    .catch((error) => console.log("Error fetching task:", error));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return tasks.length ? (
        tasks.map((homework, index) => (
            <Card shadow="sm" radius="md" mt="md" withBorder
                  key={homework.id} className={classes.homeworkCard}>
                <Card.Section withBorder mx="auto">
                    <Text className={classes.text} fw={500} size="lg" mt="sm">Задание № {index + 1} </Text>
                </Card.Section>
                <>
                    <Text size="md" mt="md" className={classes.text}>
                        Текст или файл задания:
                    </Text>
                    <Text size="md" fw={500} className={classes.text}>
                        {homework.text} {homework.file}
                    </Text>
                    <Text size="sm" mb="xs" mt='md' className={classes.text}>
                        Автор задания: {homework.author}
                    </Text>
                </>
            </Card>
        ))
    ) : (
        <Text mt="sm" fz="lg">У вас пока нет заданий</Text>
    )
};
