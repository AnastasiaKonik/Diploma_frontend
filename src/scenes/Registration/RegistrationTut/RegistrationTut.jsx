import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IMaskInput} from 'react-imask';

import {Container, Title, Button, PasswordInput, TextInput, Paper, Popover, Progress, Group, Text} from "@mantine/core";
import {matches, useForm} from "@mantine/form";

import {getStrength, PasswordRequirement, requirements} from "../../hooks/index.js";
import authProvider from "../../../authProvider.jsx";
import classes from "./RegistrationTut.module.css";

export const RegistrationTut = () => {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [password, setPassword] = useState('')

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)}/>
    ));
    const strength = getStrength(password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';


    const form = useForm({
        initialValues: {
            first_name: '',
            last_name: '',
            patronymic: '',
            username: '',
            subject: '',
            phone: '',
        },

        validate: {
            first_name: (value) => (value.length > 64 ? 'Имя должно быть менее 64 символов' : null),
            last_name: (value) => (value.length > 64 ? 'Фамилия должна быть менее 64 символов' : null),
            patronymic: (value) => (value.length > 64 ? 'Отчество должно быть менее 64 символов' : null),
            username: matches(/^([a-zA-Z0-9]){4,12}$/, 'Логин должен содержать от 4 до 12 символов латиницей ' +
                'или цифр'),
            subject: (value) => (value.length < 3 || value.length > 32 ?
                'Предмет должен содержать от 3 до 32 символов' : null),
            phone: (value) => (value.length !== 18 ? 'Номер введен некорректно' : null),
        },
    });


    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        values["password"] = password
        values["role"] = "TU"
        let subject = values.subject
        delete values.subject

        await authProvider.createUser(values)
            .then()
            .catch((reason) => {
                console.log(reason)
            })

        await authProvider.login({username: values.username, password: values.password})
            .then((redirectPath) => {
                navigate(redirectPath)
            })
            .catch((reason) => {
                console.log(reason)
                form.setErrors({"login-failed": `Не удалось войти: ${reason}`})
            })

        await authProvider.postTutorInfo(subject)
            .then()
            .catch((reason) => {
                console.log(reason)
            })
    };

    return (
        <Container size={520} my={40} className={classes.main}>
            <Title align="center">
                Создать аккаунт
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        p={5}
                        label="Логин"
                        placeholder="Придумайте логин"
                        {...form.getInputProps('username')}
                        required/>
                    <Popover opened={popoverOpened} position="bottom" width="target"
                             transitionProps={{transition: 'pop'}}>
                        <Popover.Target
                            onFocus={() => setPopoverOpened(true)}
                            onBlur={() => setPopoverOpened(false)}>
                            <PasswordInput
                                p={5}
                                label="Пароль"
                                placeholder="Ваш пароль"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                required
                            />
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Progress color={color} value={strength} size={5} mb="xs"/>
                            <PasswordRequirement label="От 8 до 128 символов" meets={password.length > 7
                                && password.length < 128}/>
                            {checks}
                        </Popover.Dropdown>
                    </Popover>
                    <TextInput
                        p={5}
                        label="Имя"
                        placeholder="Ваше имя"
                        {...form.getInputProps('first_name')}
                        required/>
                    <TextInput
                        p={5}
                        label="Фамилия"
                        placeholder="Ваша фамилия"
                        {...form.getInputProps('last_name')}
                        required/>
                    <TextInput
                        p={5}
                        label="Отчество"
                        placeholder="Ваше отчество (при наличии)"
                        {...form.getInputProps('patronymic')}/>
                    <TextInput
                        p={5}
                        label="Предмет"
                        placeholder="Предмет преподавания"
                        {...form.getInputProps('subject')}
                        required/>
                    <TextInput
                        p={5}
                        label="Телефон"
                        component={IMaskInput}
                        mask="+7 (000) 000-00-00"
                        placeholder="Номер телефона"
                        {...form.getInputProps('phone')}
                        required/>
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
                        <Button type="submit" fullWidth mt="sm" className={classes.reg_btn} variant="filled">
                            Подтвердить
                        </Button>
                    </Group>
                </form>
            </Paper>

        </Container>
    );
};
