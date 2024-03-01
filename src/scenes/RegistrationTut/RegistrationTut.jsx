import React, {useState} from "react";
import {Container, Title, Button, PasswordInput, TextInput, Paper, Popover, Progress} from "@mantine/core";
import {IMaskInput} from 'react-imask';

import classes from "./RegistrationTut.module.css";
import {matches, useForm} from "@mantine/form";
import {getStrength, PasswordRequirement} from "../hooks/index.js";

export const RegistrationTut = () => {
    const requirements = [
        {re: /[0-9]/, label: 'Содержит число'},
        {re: /[a-z]/, label: 'Содержит латинскую букву в нижнем регистре'},
        {re: /[A-Z]/, label: 'Содержит латинскую букву в верхнем регистре'},
    ];

    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState('');
    // const [value2, setValue2] = useState('');
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)}/>
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';


    const form = useForm({
        initialValues: {
            name: '',
            lastname: '',
            patronymic: '',
            login: '',
            subject: '',
            // confirmPassword: '',
            phone: ''
        },

        validate: {
            name: (value) => (value.length > 64 ? 'Имя должно быть менее 64 символов' : null),
            lastname: (value) => (value.length > 64 ? 'Фамилия должна быть менее 64 символов' : null),
            patronymic: (value) => (value.length > 64 ? 'Отчество должно быть менее 64 символов' : null),
            login: matches(/^([a-zA-Z0-9]){4,12}$/, 'Логин должен содержать от 4 до 12 символов латиницей ' +
                'или цифр'),
            // confirmPassword: (value2, value1) =>
            //     value2 !== value1 ? 'Пароли не совпадают' : null,
            subject: (value) => (value.length < 3 || value.length > 32 ?
                'Предмет должен содержать от 3 до 32 символов' : null),
            phone: (value) => (value.length !== 18 ? 'Номер введен некорректно' : null),
        },
    });


    return (
        <Container size={520} my={40}>
            <Title align="center">
                Создать аккаунт
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(console.log)}>
                    <TextInput
                        p={5}
                        label="Логин"
                        placeholder="Придумайте логин"
                        {...form.getInputProps('login')}
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
                                value={value}
                                onChange={(event) => setValue(event.currentTarget.value)}
                                /*{...form.getInputProps('password')}*/
                                required
                            />
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Progress color={color} value={strength} size={5} mb="xs"/>
                            <PasswordRequirement label="От 8 до 128 символов" meets={value.length > 7
                                && value.length < 128}/>
                            {checks}
                        </Popover.Dropdown>
                    </Popover>
                    <TextInput
                        p={5}
                        label="Имя"
                        placeholder="Ваше имя"
                        {...form.getInputProps('name')}
                        required/>
                    <TextInput
                        p={5}
                        label="Фамилия"
                        placeholder="Ваша фамилия"
                        {...form.getInputProps('lastname')}
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
                    <Button type="submit" fullWidth mt="xl" className={classes.reg_btn} variant="filled">
                        Подтвердить
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};
