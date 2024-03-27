import {Table, Text, Anchor} from '@mantine/core';

import classes from "./Timetable.module.css";

const data = [
    {
        date: "24.03.2024",
        time: '16:00',
        theme: 'Тригонометрия',
        subject: 'Математика',
        tutor: 'Коник Ольга Юрьевна',
        phone: '+7(927)-277-55-03',
    },
];


export function TimetableSt() {
    const rows = data.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.date}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.time}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.subject}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.theme}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {item.tutor}
                </Text>
            </Table.Td>

            <Table.Td>
                <Anchor size="sm" fw={500} className={classes.phone} underline="hover" href={`tel:${item.phone}`}>
                    {item.phone}
                </Anchor>
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
                        <Table.Th>Предмет</Table.Th>
                        <Table.Th>Тема</Table.Th>
                        <Table.Th>Репетитор</Table.Th>
                        <Table.Th>Контакты</Table.Th>
                    </Table.Tr>

                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}