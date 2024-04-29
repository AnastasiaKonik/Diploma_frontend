import {Table, Text, Anchor} from '@mantine/core';

import classes from "./Timetable.module.css";
import {useEffect, useState} from "react";
import authProvider from "../../../../../authProvider.jsx";
import moment from "moment";


export function TimetableSt() {

    const [timetable, setTimetable] = useState([
        {
            "id": null,
            "date": null,
            "time": null,
            "subject": null,
            "theme": null,
            "tutor": null,
            "student_id": null,
            "contacts": null
        }
    ])

    useEffect(() => {
        authProvider.getStudentInfo()
            .then(studentData => {
                fetch(`http://localhost:3030/timetable/?student_id=${studentData.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => response.json())
                    .then(json => {
                        setTimetable(json.map(x => {
                                return {
                                    "id": x.id,
                                    "date": x.date,
                                    "time": x.time,
                                    "subject": x.subject,
                                    "theme": x.theme,
                                    "tutor": x.tutor,
                                    "student_id": x.student_id,
                                    "contacts": x.contacts
                                }
                            }
                        ))
                    })
                    .catch((error) => console.log("Error fetching timetable:", error));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const weekday = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    const rows = timetable.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {weekday[new Date(item.date).getDay()]} {moment(item.date, 'YYYY-MM-DD')
                    .format('DD.MM.YYYY')}
                </Text>
            </Table.Td>

            <Table.Td>
                <Text fz="sm" fw={500}>
                    {moment(item.time, 'HH:mm:ss.SS')
                        .format('HH:mm')}
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