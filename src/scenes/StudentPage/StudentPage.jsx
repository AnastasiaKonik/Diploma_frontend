import {ActionIcon, Box, Button, Container, FileInput, Group, Text, TextInput, Title} from '@mantine/core';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import classes from "./StudentPage.module.css";
import {IconEdit, IconFile, IconSchool, IconUser} from "@tabler/icons-react";

export function StudentPage() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/lk_tutor`;
        navigate(path);
    };

    const [isThemeEditing, setIsThemeEditing] = useState(false);
    const [theme, setTheme] = useState("Тригонометрия");

    const handleThemeClick = () => {
        setIsThemeEditing(true);
    };

    const handleChangeTheme = (event) => {
        setTheme(event.target.value);
    };

    const handleThemeBlur = () => {
        setIsThemeEditing(false);
        // Save the changes or perform any required actions here
    };

    return (
        <Container fluid maw={1400}>
            <Box px="md" mx="auto" pt="xs" mb="md">
                <Title order={1} align="center" className={classes.text}>Страница ученика</Title>

                <Title order={2} mb="xs" className={classes.title}>Информация об ученике</Title>
                <Group wrap="nowrap">
                    <div>
                        <Group wrap="nowrap" gap={10} mt={5}>
                            <IconUser stroke={1.5} size="1rem" className={classes.icon}/>
                            <Text fz="xl" className={classes.text}>
                                Коник Анастасия Александровна
                            </Text>
                        </Group>
                        <Group wrap="nowrap" gap={10} mt={5}>
                            <IconSchool stroke={1.5} size="1rem" className={classes.icon}/>
                            <Text fz="xl" className={classes.text}>
                                10 класс
                            </Text>
                        </Group>
                    </div>
                </Group>

                <Title order={2} mb="sm" mt="lg" className={classes.title}>Материалы для занятий</Title>
                <Group wrap="nowrap">
                    <div>
                        <Title order={3} mb="xs" className={classes.text}>Тема следующего занятия:</Title>
                        <Group wrap="nowrap" gap={10} mt={5} mb="sm">
                            {isThemeEditing ? (
                                <TextInput
                                    value={theme}
                                    onChange={handleChangeTheme}
                                    onBlur={handleThemeBlur}
                                />
                            ) : (
                                <Text fz="lg" className={classes.text}>{theme}</Text>
                            )}
                            <ActionIcon variant="subtle" color="gray" onClick={handleThemeClick}>
                                <IconEdit size="1rem" stroke={1.5}/>
                            </ActionIcon>
                        </Group>
                        <Title order={3} mb="xs" className={classes.text}>Прикрепить материалы:</Title>
                        <FileInput
                            rightSection={<IconFile size="1rem" stroke={1.5}/>}
                            clearable
                            multiple
                            placeholder="Сделать дропзону с отображением файлов и их удалением"
                        />
                    </div>
                </Group>

                <Title order={2} mb="sm" mt="lg" className={classes.title}>Выдать задание</Title>
                <Group wrap="nowrap" gap={10} mt={5} mb="sm">
                    <div>
                        <FileInput
                            rightSection={<IconFile size="1rem" stroke={1.5}/>}
                            mb="xs"
                            clearable
                            multiple
                            placeholder="Сделать дропзону с отображением файлов и их удалением + отправкой ученику"
                        />
                        <TextInput
                            placeholder="Сделать отправку текста ученику"
                        />
                        <Button mt="sm" mx="auto" className={classes.send_btn} type="submit"
                                onClick={() => routeChange()}>
                            Отправить ученику
                        </Button>
                    </div>
                </Group>

                <Button mt="xl" mx="auto" className={classes.btn} type="submit"
                        onClick={() => routeChange()}>
                    Назад
                </Button>
            </Box>
        </Container>
    );
}
