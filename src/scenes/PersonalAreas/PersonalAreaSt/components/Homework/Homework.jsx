import React from "react";

import {Card, Text, Group} from "@mantine/core";

import classes from "./Homework.module.css";

export const Homework = () => {
    const homeworks = [
        {
            title: "Задание по тригонометрии",
            description: "Посчитать логарифмы",
            author: "Коник Ольга Юрьевна"
        }
    ];

    return homeworks.length ? (
        homeworks.map((homework) => (
            <Card shadow="sm" radius="md" withBorder key={homework.id} maw={400} className={classes.homeworkCard}>
                <Card.Section withBorder mx="auto">
                    <Text className={classes.text} fw={500} size="lg" mt="sm">{homework.title}</Text>
                </Card.Section>
                <Group justify="space-between">
                        <Text size="md" mt="md" className={classes.text}>
                            Описание задания: {homework.description}
                        </Text>
                        <Text size="sm" mb="xs" className={classes.text}>
                            Автор задания: {homework.author}
                        </Text>
                </Group>
            </Card>
        ))
    ) : (
        <Text mt="sm" fz="md">{"Задания не выдавались"}</Text>
    );
};
