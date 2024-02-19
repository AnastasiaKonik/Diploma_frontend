import React from "react";
import {Container, Title, Text, Stack, Paper, Button, Group} from "@mantine/core";

import classes from "./Home.module.css";
import {Logo} from "../../components/Logo";

export const Home = () => {
    return (
        <Container fluid>
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
                            <Button className={classes.reg_btn} variant="filled">Зарегистрироваться как ученик</Button>
                            <Button className={classes.reg_btn} variant="filled">Зарегистрироваться как репетитор</Button>
                        </Group>
                    </Stack>
                </Paper>
            </Container>
        </Container>
    );
};
