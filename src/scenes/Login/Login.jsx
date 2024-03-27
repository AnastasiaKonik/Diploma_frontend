import React from "react";
import {useNavigate} from "react-router-dom";

import {Text, Button, Container, Group, Paper, PasswordInput, TextInput, Title} from "@mantine/core";
import {matches, useForm} from "@mantine/form";

import authProvider from "../../authProvider.jsx";
import classes from "./Login.module.css";

export const Login = () => {
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: matches(/^([a-zA-Z0-9]){4,12}$/, 'Логин должен содержать от 4 до 12 символов латиницей ' +
                'или цифр'),
        },
    });


    const navigate = useNavigate();
    const handleSubmit = (values) => {
        authProvider.login({username: values.username, password: values.password})
            .then((redirectPath) => {
                navigate(redirectPath)
            })
            .catch((reason) => {
                console.log(reason)
                form.setErrors({"login-failed": `Не удалось войти: ${reason}`})
            })
    };

    return (
        <Container size={520} my={40} className={classes.main}>
            <Title align="center">
                Войти в личный кабинет
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        p={5}
                        id="login"
                        label="Логин"
                        placeholder="Введите логин"
                        {...form.getInputProps('username')}
                        required/>
                    <PasswordInput
                        p={5}
                        id="password"
                        label="Пароль"
                        placeholder="Введите пароль"
                        {...form.getInputProps('password')}
                        required
                    />
                    <Group justify="center">
                        {["login-failed"].map((errorKey) => (
                            <Text
                                key={errorKey}
                                c="var(--mantine-color-error)"
                                fz="sm"
                                style={{textIndent: 0}}
                            >
                                {form.errors[errorKey]}
                            </Text>
                        ))
                        }
                        <Button fullWidth mt="sm" className={classes.login_btn} type="submit">
                            Войти
                        </Button>
                    </Group>
                </form>
            </Paper>

        </Container>
    );
}