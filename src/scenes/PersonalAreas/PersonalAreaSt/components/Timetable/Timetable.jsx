import {Table, Text, Anchor} from '@mantine/core';

import classes from "./Timetable.module.css";
import {useEffect, useState} from "react";
import moment from "moment";


//TODO: render before page refresh
export function TimetableSt() {

    const [timetable, setTimetable] = useState([
        {
            "id": '1',
            "date": '',
            "time": '',
            "subject": '',
            "theme": '',
            "tutor": '',
            "student_name": '',
            "student_surname": '',
            "contacts": ''
        }
    ])

    useEffect(() => {
        fetch(`http://localhost:3030/lessons/?student_id=${localStorage.getItem('id')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(json => {
                if (json.length) {
                    setTimetable(json.map(x => {
                            return {
                                "id": x.id,
                                "date": x.date,
                                "time": x.time,
                                "subject": x.subject,
                                "theme": x.theme,
                                "tutor": x.tutor,
                                "contacts": x.contacts
                            }
                        }
                    ))
                }
                else {setTimetable([...timetable])}
            })
            .catch((error) => console.log("Error fetching timetable:", error));
    }, []);

    const weekday = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    const rows = timetable.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                {item.date ? (
                    <Text fz="sm" fw={500}>
                        {weekday[new Date(item.date).getDay()]} {moment(item.date, 'YYYY-MM-DD')
                        .format('DD.MM.YYYY')}
                    </Text>
                ) : (
                    <Text fz="sm" fw={500}>
                        {item.date}
                    </Text>
                )}
            </Table.Td>

            <Table.Td>
                {item.time ? (
                    <Text fz="sm" fw={500}>
                        {moment(item.time, 'HH:mm:ss.SS')
                            .format('HH:mm')}
                    </Text>
                ) : (
                    <Text fz="sm" fw={500}>
                        {item.time}
                    </Text>
                )}
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
                <Anchor size="sm" fw={500} className={classes.phone} underline="hover" href={`tel:${item.contacts}`}>
                    {item.contacts}
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