import {Table, Text, Group, ActionIcon, TextInput} from '@mantine/core';
import classes from "./Timetable.module.css";
import {Link} from "react-router-dom";
import {IconCheck, IconEdit, IconPlus, IconTrash, IconX} from "@tabler/icons-react";
import {useState} from "react";

// TODO: doesnt work anything

const data = [
    {
        date: "24.03.2024",
        time: '16:00',
        theme: 'Тригонометрия',
        student: 'Коник Анастасия Александровна',
    },
    {
        date: "24.03.2024",
        time: '14:00',
        theme: 'Планиметрия',
        student: 'Иванов Иван Иванович',
    },
    {
        date: "21.03.2024",
        time: '16:00',
        theme: 'Параметры',
        student: 'Петров Петр Петрович',
    },
];

export function TimetableTut() {
    const [editingId, setEditingId] = useState(null);
    const [newRowData, setNewRowData] = useState({date: '', time: '', theme: '', student: ''});
    const [editedValues, setEditedValues] = useState({});

    const handleEdit = (id, value) => {
        setEditingId(id);
        setEditedValues({ ...editedValues, [id]: value });
    };

    const handleSave = (id) => {
        const newData = { ...data.find(item => item.id === id), ...editedValues[id] };
        const updatedData = data.map(item => (item.id === id ? newData : item));
        setEditingId(null);
        setEditedValues({});
    };
    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleDelete = (id) => {
        const updatedData = data.filter(item => item.id !== id);
        // Update the data source with the updatedData
    };

    const handleAddRow = () => {
        const newId = data.length + 1;
        const newData = {...newRowData, id: newId};
        const updatedData = [...data, newData];
        // Add newData to the data source
        setNewRowData({date: '', time: '', theme: '', student: ''});
    };

    const rows = data.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                {editingId === item.id ? (
                    <TextInput value={item.date} onChange={(event) => setEditedValues(event.currentTarget.value)}/>
                ) : (
                    <Text fz="sm" fw={500}>
                        {item.date}
                    </Text>
                )}
            </Table.Td>

            <Table.Td>
                {editingId === item.id ? (
                    <TextInput value={item.time}
                               onChange={(e) => handleEdit(item.id, { time: e.target.value })}/>
                ) : (
                    <Text fz="sm" fw={500}>
                        {item.time}
                    </Text>
                )}
            </Table.Td>

            <Table.Td>
                {editingId === item.id ? (
                    <TextInput value={item.theme}
                               onChange={(e) => handleEdit(item.id, { theme: e.target.value })}/>
                ) : (
                    <Text fz="sm" fw={500}>
                        {item.theme}
                    </Text>
                )}
            </Table.Td>

            <Table.Td>
                {editingId === item.id ? (
                    <TextInput value={item.student}
                               onChange={(e) => handleEdit(item.id, { student: e.target.value })}/>
                ) : (
                    <Text fw={500} fz="sm">
                        <Link to={"/student_page"} className={classes.link}>
                            {item.student}
                        </Link>
                    </Text>
                )}
            </Table.Td>

            <Table.Td>
                <Group gap={0} justify="flex-end">
                    {editingId === item.id ? (
                        <>
                            <ActionIcon variant="subtle" color="green"
                                        onClick={() => handleSave(item.id, {...item, data: 'new value'})}>
                                <IconCheck size="1rem" stroke={1.5}/>
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="gray" onClick={handleCancelEdit}>
                                <IconX size="1rem" stroke={1.5}/>
                            </ActionIcon>
                        </>
                    ) : (
                        <ActionIcon variant="subtle" color="gray" onClick={() => handleEdit(item.id)}>
                            <IconEdit size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    )}
                    <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(item.id)}>
                        <IconTrash size="1rem" stroke={1.5}/>
                    </ActionIcon>
                </Group>
            </Table.Td>

            <Table.Td>
                <ActionIcon variant="subtle" color="green" onClick={handleAddRow}>
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