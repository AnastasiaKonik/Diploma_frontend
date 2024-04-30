import {Group, Text, Title} from "@mantine/core";
import classes from "../StudentPage.module.css";
import {IconPhone, IconSchool, IconUser} from "@tabler/icons-react";
import React, {useEffect, useState} from "react";

export function StudentData() {
    const [student, setStudent] = useState([
        {
            "full_name": null,
            "grade": null,
            "phone": null,
        }
    ])

    useEffect(() => {
        fetch(`http://localhost:3030/students_info?student_id=${localStorage.getItem('student')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(json => {
                setStudent(json.map(x => {
                    return {
                        "full_name": x.full_name,
                        "grade": x.grade,
                        "phone": x.phone,
                    }
                }))
            })
            .catch((error) => console.log("error", error))
    }, [])

    return (
        <>
            <Title order={2} mb="xs" className={classes.title}>Информация об ученике</Title>
            <div>
                <Group wrap="nowrap">
                    <IconUser stroke={1.5} size="1rem" className={classes.icon}/>
                    <Text fz="xl" className={classes.text}>
                        {student[0].full_name}
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