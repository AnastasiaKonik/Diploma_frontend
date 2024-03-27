import React from "react";

import {Box, Button, Container, Title} from '@mantine/core';

import {StudentInfo} from "./components/StudentInfo/index.js";
import {TimetableSt} from "./components/Timetable/index.js"
import {Homework} from "./components/Homework/index.js"

import authProvider from "../../../authProvider.jsx";
import classes from "./PersonalAreaSt.module.css";

export function PersonalAreaSt() {

    return (
        <Container fluid maw={1400} className={classes.main}>

            <Box px="md" mx="auto" pt="xs" mb="md">
                <Title order={1} align="center" className={classes.text}>Личный кабинет</Title>
                <StudentInfo/>
                <Title order={2} align="center" mb="lg" className={classes.text}>Расписание занятий</Title>
                <TimetableSt/>
                <Title order={2} align="center" mb="lg" className={classes.text}>Выданные задания</Title>
                <Homework/>
                <Button mt="xl" mx="auto" className={classes.logout_btn}
                        onClick={() => authProvider.logout()}>
                    Выйти
                </Button>
            </Box>

        </Container>
    );
}
