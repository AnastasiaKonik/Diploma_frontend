import React from "react";
import {Button, Container, Paper, PasswordInput, TextInput, Title} from "@mantine/core";
import classes from "./Login.module.css";
import {matches, useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const form = useForm({
        initialValues: {
            login: '',
            password: '',
        },

        validate: {
            login: matches(/^([a-zA-Z0-9]){4,12}$/, 'Логин должен содержать от 4 до 12 символов латиницей ' +
                'или цифр'),
        },
    });

    let navigate = useNavigate();
    const routeChangeLogin = () => {
        let path = `/`;
        navigate(path);
    };

    return (
        <Container size={520} my={40} className={classes.main}>
            <Title align="center">
                Войти в личный кабинет
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(console.log)}>
                    <TextInput
                        p={5}
                        label="Логин"
                        placeholder="Введите логин"
                        {...form.getInputProps('login')}
                        required/>
                    <PasswordInput
                        p={5}
                        label="Пароль"
                        placeholder="Введите пароль"
                        {...form.getInputProps('password')}
                        required
                    />
                    <Button fullWidth mt="xl" className={classes.login_btn} type="submit">
                            {/*onClick={() => routeChangeLogin()}>*/}
                        Войти
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}