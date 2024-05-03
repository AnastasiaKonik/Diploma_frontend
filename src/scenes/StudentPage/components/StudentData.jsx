import React, {useEffect, useState} from "react";

import {Group, Text, Title} from "@mantine/core";

import classes from "../StudentPage.module.css";
import {IconPhone, IconSchool, IconUser} from "@tabler/icons-react";


export function StudentData() {
    const [student, setStudent] = useState([
        {
            "first_name": '',
            "last_name": '',
            "patronymic": '',
            "grade": '',
            "phone": '',
            "student_id": ''
        }
    ])

    const first_name = localStorage.getItem('student_name')
    const last_name = localStorage.getItem('student_surname')

    const getStudentId = async () => {
        await fetch(`http://localhost:3030/students_info?&first_name=${first_name}&last_name=${last_name}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(json => {
                setStudent(json.map(x => {
                    return {
                        "first_name": x.first_name,
                        "last_name": x.last_name,
                        "patronymic": x.patronymic,
                        "grade": x.grade,
                        "phone": x.phone,
                        "student_id": x.id
                    }
                }))
            })
            .catch((error) => console.log("error", error))
    }

    useEffect(() => {
        getStudentId().then()
        localStorage.setItem("student_id", student[0].student_id)
    }, [student[0].student_id])

    return (
        <>
            <Title order={2} mb="xs" className={classes.title}>
                Информация об ученике
            </Title>
            <div>
                <Group wrap="nowrap">
                    <IconUser stroke={1.5} size="1rem" className={classes.icon}/>
                    <Text fz="xl" className={classes.text}>
                        {student[0].last_name} {student[0].first_name} {student[0].patronymic}
                    </Text>
                </Group>
                <Group wrap="nowrap">
                    <IconSchool stroke={1.5} size="1rem" className={classes.icon}/>
                    <Text fz="xl" className={classes.text}>
                        {student[0].grade}
                    </Text>
                </Group>
                <Group wrap="nowrap">
                    <IconPhone stroke={1.5} size="1rem" className={classes.icon}/>
                    <Text fz="xl" className={classes.text}>
                        {student[0].phone}
                    </Text>
                </Group>
            </div>
        </>

    )
}