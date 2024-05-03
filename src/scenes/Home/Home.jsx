import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, Title, Text, Stack, Paper, Button, Group} from "@mantine/core";

import {Logo} from "../../components/index.js";
import classes from "./Home.module.css";

export const Home = () => {
    let navigate = useNavigate();
    const routeChangeSt = () => {
        let path = `/registration_student`;
        navigate(path);
    };
    const routeChangeTut = () => {
        let path = `/registration_tutor`;
        navigate(path);
    };

    return (
        <Container fluid className={classes.main}>

            <Container p="xl" w="fit-content">

                <Paper shadow="md" withBorder={true} p="xl" className={classes.paper}>
                    <Stack justify="center">
                        <Title ta="center" order={1} mb="md">
                            Возможности платформы <Logo inherit={true}/>
                        </Title>
                        <Text ta="center">
                            Наш веб-сайт позволяет улучшить качество образовательного процесса между репетиторами
                            и учениками, автоматизируя рутинные действия репетиторов.
                        </Text>
                        <Text ta="center" mb="xl">
                            Пользоваться системой могут как репетиторы, так и ученики.
                        </Text>
                        <Group justify="center">
                            <Button className={classes.reg_btn} variant="filled"
                                    onClick={() => routeChangeSt()}>
                                Зарегистрироваться как ученик
                            </Button>
                            <Button className={classes.reg_btn} variant="filled"
                                    onClick={() => routeChangeTut()}>
                                Зарегистрироваться как репетитор
                            </Button>
                        </Group>
                    </Stack>
                </Paper>

            </Container>

        </Container>
    );
};
