import React from "react";

import {Badge, Box, Container, Title, Tooltip} from '@mantine/core';

import {TutorInfo} from "./components/TutorInfo/index.js";
import {TimetableTut} from "./components/Timetable/index.js";
import {StudentsList} from "./components/StudentsList/index.js";

import classes from "./PersonalAreaTut.module.css";

export function PersonalAreaTut() {

    return (
        <Container fluid maw={1400} className={classes.main}>

            <Box px="md" mx="auto" pt="xs" mb="md">
                <Title order={1} align="center" className={classes.text}>Личный кабинет</Title>
                <TutorInfo/>
                <Title order={2} align="center" mb="lg" className={classes.text}>Расписание занятий</Title>
                <Tooltip
                    multiline
                    withArrow
                    arrowSize={5}
                    w={250}
                    label="Для редактирования таблицы дважды нажмите на нужную ячейку.
                    После нажмите клавишу Enter"
                    color="indigo"
                >
                    <Badge mb="xs" className={classes.badge}  variant="filled">Инфо</Badge>
                </Tooltip>
                <TimetableTut/>
                <Title order={2} align="center" mb="lg" className={classes.text}>Ваши ученики</Title>
                <StudentsList/>
            </Box>

        </Container>
    );
}
