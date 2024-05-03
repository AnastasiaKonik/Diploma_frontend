import {useEffect, useState} from "react";

import {Table, Text, Group, ActionIcon, TextInput} from '@mantine/core';

import {IconPlus, IconTrash} from "@tabler/icons-react";

import classes from "./Timetable.module.css";
import moment from "moment";

export function TimetableTut() {
    const [data, setData] = useState([
        {
            id: '',
            date: '',
            time: '',
            theme: '',
            student: ''
        },
    ])
    const [editingCell, setEditingCell] = useState(null);

    const tutorId = localStorage.getItem('id')

    const getTimetable = () => {
        fetch(`http://localhost:3030/lessons/?tutor_id=${tutorId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(json => {
                    if (json.length) {
                        setData(json.map(x => {
                            return {
                                "id": x.id,
                                "date": x.date,
                                "time": x.time,
                                "theme": x.theme,
                                "student": `${x.student_surname} ${x.student_name} ${x.student_patronymic}`,
                            }
                        }))
                    } else {
                        setData([...data])
                    }
                }
            )
            .catch(error => console.error('Ошибка получения занятия', error));
    }

    useEffect(() => {
        setTimeout(getTimetable, 100)
    }, [localStorage.getItem("lesson_id")]);


    const handleEdit = (id, field, value) => {
        const updatedData = data.map((row) =>
            row.id === id ? {...row, [field]: value} : row
        );
        setData(updatedData);
    };

    const handleKeyDown = async (event, id, value) => {
        if (event.key === 'Enter') {

            await fetch(`http://localhost:3030/lessons?tutor_id=${tutorId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(json => {
                    if (!json.length) {
                        const id = Date.now().toString()
                        fetch(`http://localhost:3030/lessons`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                "id": id,
                                "date": "",
                                "time": "",
                                "theme": "",
                                "student_id": "",
                                "student_surname": "",
                                "student_name": "",
                                "student_patronymic": "",
                                "tutor":
                                    `${localStorage.getItem("last_name")} ${localStorage.getItem("first_name")} ${localStorage.getItem("patronymic")}`,
                                "tutor_id": tutorId,
                                "subject": localStorage.getItem("subject"),
                                "contacts": localStorage.getItem("phone")
                            }),
                        })
                            .then(response => response.json())
                            .catch((error) => {
                                console.log(error)
                            })
                        localStorage.setItem("lesson_id", id)
                    } else {
                        if (/^[а-яА-Я]+\s[а-яА-Я]+$/.test(value)
                            || /^[а-яА-Я]+\s[а-яА-Я]+\s[а-яА-Я]+$/.test(value)
                            || !value) {
                            const student_name = value?.split(' ')[1] ? value.split(' ')[1] : "";
                            const student_surname = value?.split(' ')[0] ? value.split(' ')[0] : "";
                            const student_patronymic = value?.split(' ')[2] ? value.split(' ')[2] : "";

                            setEditingCell(null);

                            if (student_name && student_surname) {
                                fetch(`http://localhost:3030/students_info?first_name=${student_name}&last_name=${student_surname}`,
                                    {
                                        method: "GET",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        localStorage.setItem("student_id", data[0].id)
                                    })
                                    .then(() => {
                                        fetch(`http://localhost:3030/lessons/${localStorage.getItem("lesson_id")}`, {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                "student_id": localStorage.getItem("student_id"),
                                                "student_name": student_name,
                                                "student_surname": student_surname,
                                                "student_patronymic": student_patronymic,
                                            }),
                                        })
                                            .then(response => response.json())
                                            .catch((error) => {
                                                console.log(error)
                                            })
                                    })
                                    .catch((error) => console.log("Ошибка получения id", error));
                            } else {
                                fetch(`http://localhost:3030/lessons/${localStorage.getItem("lesson_id")}`, {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "date": data[data.length - 1]?.date || "",
                                        "time": data[data.length - 1]?.time || "",
                                        "theme": data[data.length - 1]?.theme || "",
                                    }),
                                })
                                    .then(response => response.json())
                                    .catch((error) => {
                                        console.log(error)
                                    })
                            }
                        } else {
                            alert("ФИО введено некорректно")
                        }
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    const handleDelete = (id) => {
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);

        fetch(`http://localhost:3030/lessons/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            })
    };

    const handleAddRow = () => {
        const newId = data[0].id + 1;
        const newRow = {
            id: newId,
            date: '',
            time: '',
            theme: '',
            student: ''
        };
        setData([...data, newRow]);

        fetch(`http://localhost:3030/lessons/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": newId,
                "date": "",
                "time": "",
                "theme": "",
                "student_id": "",
                "student_surname": "",
                "student_name": "",
                "student_patronymic": "",
                "tutor":
                    `${localStorage.getItem("last_name")} ${localStorage.getItem("first_name")} ${localStorage.getItem("patronymic")}`,
                "tutor_id": tutorId,
                "subject": localStorage.getItem("subject"),
                "contacts": localStorage.getItem("phone")
            }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error)
            })
    };

    const weekday = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    const rows = data.map((row) => (
        <Table.Tr key={row.id}>

            <Table.Td onDoubleClick={() => setEditingCell({id: row.id, field: 'date'})}>
                {editingCell && editingCell.id === row.id && editingCell.field === 'date' ? (
                    <TextInput
                        type="date"
                        variant="filled"
                        value={row.date}
                        onChange={(event) => handleEdit(row.id, 'date', event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event, row.id)}
                    />
                ) : (
                    row.date ? (
                        <Text>
                            {weekday[new Date(row.date).getDay()]}
                            {" "}
                            {moment(row.date, 'YYYY-MM-DD').format('DD.MM.YYYY')}
                        </Text>
                    ) : (
                        <Text>
                            {row.date}
                        </Text>
                    )
                )}
            < /Table.Td>

            <Table.Td onDoubleClick={() => setEditingCell({id: row.id, field: 'time'})}>
                {editingCell && editingCell.id === row.id && editingCell.field === 'time' ? (
                    <TextInput
                        type="time"
                        variant="filled"
                        value={row.time}
                        onChange={(event) => handleEdit(row.id, 'time', event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event, row.id)}
                    />
                ) : (
                    <Text>{row.time}</Text>
                )}
            </Table.Td>

            <Table.Td onDoubleClick={() => setEditingCell({id: row.id, field: 'theme'})}>
                {editingCell && editingCell.id === row.id && editingCell.field === 'theme' ? (
                    <TextInput
                        variant="filled"
                        placeholder="Введите тему занятия"
                        value={row.theme}
                        onChange={(event) => handleEdit(row.id, 'theme', event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event, row.id)}
                    />
                ) : (
                    <Text>{row.theme}</Text>
                )}
            </Table.Td>

            <Table.Td onDoubleClick={() => setEditingCell({id: row.id, field: 'student'})}>
                {editingCell && editingCell.id === row.id && editingCell.field === 'student' ? (
                    <TextInput
                        variant="filled"
                        placeholder="Введите ФИО ученика"
                        value={row.student}
                        onChange={(event) => handleEdit(row.id, 'student', event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event, row.id, row.student)}/>

                ) : (
                    <Text>{row.student}</Text>
                )}
            </Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" className={classes.icon_trash}
                                onClick={() => handleDelete(row.id)}>
                        <IconTrash size="1rem" stroke={1.5}/>
                    </ActionIcon>
                </Group>
            </Table.Td>

            <Table.Td>
                <ActionIcon variant="subtle" color="green"
                            onClick={() => handleAddRow()}>
                    <IconPlus size="1rem" stroke={1.5}/>
                </ActionIcon>
            </Table.Td>

        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={800} type="native">
            <Table verticalSpacing="sm" horizontalSpacing="xl"
                   withTableBorder withColumnBorders
                   align="center" w="auto" mb="lg" highlightOnHover>
                <Table.Thead className={classes.table_header}>

                    <Table.Tr>
                        <Table.Th>День занятия</Table.Th>
                        <Table.Th>Время</Table.Th>
                        <Table.Th>Тема</Table.Th>
                        <Table.Th>Ученик</Table.Th>
                        <Table.Th/>
                        <Table.Th>
                        </Table.Th>
                    </Table.Tr>

                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}