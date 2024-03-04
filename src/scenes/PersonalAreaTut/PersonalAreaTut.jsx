import {Box, Button, Container, Title} from '@mantine/core';

import React from "react";
import {useNavigate} from "react-router-dom";
import classes from "./PersonalAreaTut.module.css";
import {TutorInfo} from "./components/TutorInfo/index.js";
import {TimetableTut} from "./components/Timetable/index.js";
import {StudentsList} from "./components/StudentsList/index.js";

export function PersonalAreaTut() {
    let navigate = useNavigate();
    const routeChangeLogout = () => {
        let path = `/login`;
        navigate(path);
    };


    return (
        <Container fluid maw={1400}>
            <Box px="md" mx="auto" pt="xs" mb="md">
                <Title order={1} align="center" className={classes.text}>Личный кабинет</Title>
                <TutorInfo/>
                <Title order={2} align="center" mb="lg" className={classes.text}>Расписание занятий</Title>
                <TimetableTut/>
                <Title order={2} align="center" mb="lg" className={classes.text}>Ваши ученики</Title>
                <StudentsList/>
                <Button mt="xl" mx="auto" className={classes.logout_btn} type="submit"
                        onClick={() => routeChangeLogout()}>
                    Выйти
                </Button>
            </Box>
        </Container>
    );
}
