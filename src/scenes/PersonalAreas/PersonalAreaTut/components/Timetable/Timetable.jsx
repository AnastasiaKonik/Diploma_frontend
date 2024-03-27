import {useState} from "react";

import {Table, Text, Group, ActionIcon, TextInput} from '@mantine/core';

import {IconPlus, IconTrash} from "@tabler/icons-react";

import classes from "./Timetable.module.css";

// TODO: strange behavior when deleting and adding rows
export function TimetableTut() {
    const [data, setData] = useState([
        {
            id: 1,
            date: "24.03.2024",
            time: '16:00',
            theme: 'Тригонометрия',
            student: 'Коник Анастасия Александровна',
        },
        {
            id: 2,
            date: "24.03.2024",
            time: '14:00',
            theme: 'Планиметрия',
            student: 'Иванов Иван Иванович',
        },
        {
            id: 3,
            date: "21.03.2024",
            time: '16:00',
            theme: 'Параметры',
            student: 'Петров Петр Петрович',
        },
    ]);

    const [editingCell, setEditingCell] = useState(null);

    const handleEdit = (id, field, value) => {
        const updatedData = data.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
        );
        setData(updatedData);
    };

    const handleKeyDown = (event, id, field) => {
        if (event.key === 'Enter') {
            setEditingCell(null);
        }
    };

    const handleDelete = (id) => {
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
    };

    const handleAddRow = (id) => {
        const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
        const newRow = { id: newId, date: 'Введите дату', time: 'Введите время',
            theme: 'Введите тему', student: 'Введите ФИО'};

        const newData = data.reduce((acc, current) => {
            acc.push(current);
            if (current.id === id) {
                acc.push(newRow);
            }
            return acc;
        }, []);

        setData(newData);
    };

    const rows = data.map((row) => (
        <Table.Tr key={row.id}>

            <Table.Td onDoubleClick={() => setEditingCell({id: row.id, field: 'date'})}>
                {editingCell && editingCell.id === row.id && editingCell.field === 'date' ? (
                    <TextInput
                        value={row.date}
                        onChange={(event) => handleEdit(row.id, 'date', event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event, row.id, 'date')}
                    />
                ) : (
                    <Text>{row.date}</Text>
                )}
            </Table.Td>

            <Table.Td onDoubleClick={() => setEditingCell({id: row.id, field: 'time'})}>
                {editingCell && editingCell.id === row.id && editingCell.field === 'time' ? (
                    <TextInput
                        value={row.time}
                        onChange={(event) => handleEdit(row.id, 'time', event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event, row.id, 'time')}
                    />
                ) : (
                    <Text>{row.time}</Text>
                )}
            </Table.Td>

            <Table.Td onDoubleClick={() => setEditingCell({id: row.id, field: 'theme'})}>
                {editingCell && editingCell.id === row.id && editingCell.field === 'theme' ? (
                    <TextInput
                        value={row.theme}
                        onChange={(event) => handleEdit(row.id, 'theme', event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event, row.id, 'theme')}
                    />
                ) : (
                    <Text>{row.theme}</Text>
                )}
            </Table.Td>

            <Table.Td onDoubleClick={() => setEditingCell({id: row.id, field: 'student'})}>
                {editingCell && editingCell.id === row.id && editingCell.field === 'student' ? (
                    <TextInput value={row.student}
                               onChange={(event) => handleEdit(row.id, 'student', event.target.value)}
                               onKeyDown={(event) => handleKeyDown(event, row.id, 'student')}/>
                ) : (
                    <Text>{row.student}</Text>
                )}
            </Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(row.id)}>
                        <IconTrash size="1rem" stroke={1.5}/>
                    </ActionIcon>
                </Group>
            </Table.Td>

            <Table.Td>
                <ActionIcon variant="subtle" color="green" onClick={() => handleAddRow(row.id)}>
                    <IconPlus size="1rem" stroke={1.5}/>
                </ActionIcon>
            </Table.Td>

        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={800} type="native">
            <Table verticalSpacing="sm" horizontalSpacing="xl" withTableBorder align="center" w="auto" mb="lg">
                <Table.Thead className={classes.tableHeader}>

                    <Table.Tr>
                        <Table.Th>День занятия</Table.Th>
                        <Table.Th>Время</Table.Th>
                        <Table.Th>Тема</Table.Th>
                        <Table.Th>Ученик</Table.Th>
                        <Table.Th/>
                        <Table.Th/>
                    </Table.Tr>

                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}