import React from "react";

import {Box, Container, SimpleGrid, Title} from '@mantine/core';

import {StudentInfo} from "./components/index.js";
import {TimetableSt} from "./components/index.js"
import {Homework} from "./components/index.js"

import classes from "./PersonalAreaSt.module.css";

export function PersonalAreaSt() {
    const cards = Homework()

    return (
        <Container fluid maw={1400} className={classes.main}>

            <Box px="md" mx="auto" pt="xs" mb="md">
                <Title order={1} align="center" mb="lg" className={classes.text}>Личный кабинет</Title>
                <StudentInfo/>
                <Title order={2} align="center" mb="lg" className={classes.text}>Расписание занятий</Title>
                <TimetableSt/>
                <Title order={2} align="center" mb="lg" className={classes.text}>Выданные задания</Title>
                <SimpleGrid cols={{md: 3, xs: 2, xl: 4}}>{cards}</SimpleGrid>
            </Box>

        </Container>
    );
}
