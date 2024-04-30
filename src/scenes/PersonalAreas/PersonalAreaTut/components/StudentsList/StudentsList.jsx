import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {ActionIcon, Button, Group, List, Text, TextInput} from '@mantine/core';

import {IconArchive, IconArchiveOff} from "@tabler/icons-react";

import classes from "./StudentsList.module.css";


export function StudentsList() {
    const [newStudentName, setNewStudentName] = useState('');
    const tutor = localStorage.getItem("login")
    const [students, setStudents] = useState([])
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3030/tutors_students?tutor=${tutor}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(json => {
                setStudents(json.map(x => {
                    return x.student_info
                }))
            })
            .catch((error) => console.log("error", error))
    }, [])


    const handleAddStudent = async () => {
        if (/^[а-яА-Я]+\s[а-яА-Я]+\s[а-яА-Я]+$/.test(newStudentName)) {
            await fetch(`http://localhost:3030/tutors_students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    student_info: {
                        full_name: newStudentName,
                        archived: false,
                        student_id: "10"
                    },
                    tutor: localStorage.getItem("login")
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        response
                            .json()
                            .then(json => {
                                setErrorMessage(json.message)
                            })
                            .catch(error => error)
                    }
                    return response
                })
                .then(response => response.json())
                .then(json => {
                    setNewStudentName('')
                    setStudents([...students, json.student_info])
                })
                .catch((error) => {
                    setErrorMessage("Что-то пошло не так")
                    console.log(error)
                })
        } else {
            setErrorMessage("ФИО введено неверно")
        }
    };

    const handleArchiveStudent = (index) => {
        const updatedStudents = [...students];
        const studentToArchive = updatedStudents[index];
        studentToArchive.archived = true;
        updatedStudents.splice(index, 1);
        updatedStudents.push(studentToArchive);
        setStudents(updatedStudents);
    };

    const handleUnarchiveStudent = (index) => {
        const updatedStudents = [...students];
        const studentToUnarchive = updatedStudents[index];
        studentToUnarchive.archived = false;
        updatedStudents.splice(index, 1);
        updatedStudents.unshift(studentToUnarchive);
        setStudents(updatedStudents);
    };

    const [isButtonDisabled, setButtonDisabled] = useState(true);

    return (
        <div>
            <List size="md" spacing="xs" type="ordered">
                {students.map((student, index) => (
                    <List.Item key={index}>

                        <Group gap={0} justify="flex-end">
                            <Text fw={500} className={classes.text}
                                  style={{color: student.archived ? 'gray' : 'inherit'}}>
                                {student.archived ? (
                                        student.full_name
                                    )
                                    : (
                                        <Link to={`/student_page`} className={classes.link}
                                              onClick={() => {
                                                  localStorage.removeItem('student')
                                                  localStorage.setItem('student', student.student_id)
                                              }}>
                                            {student.full_name}
                                        </Link>
                                    )}
                            </Text>

                            {student.archived && (
                                <ActionIcon
                                    onClick={() => handleUnarchiveStudent(index)}
                                    variant="default"
                                    className={classes.iconArchive}
                                    mx="sm"
                                >
                                    <IconArchiveOff size="1rem" stroke={1.5}/>
                                </ActionIcon>
                            )}
                            {!student.archived && (
                                <ActionIcon
                                    onClick={() => handleArchiveStudent(index)}
                                    variant="default"
                                    className={classes.iconArchive}
                                    mx="sm"
                                >
                                    <IconArchive size="1rem" stroke={1.5}/>
                                </ActionIcon>
                            )}

                        </Group>

                    </List.Item>
                ))}
            </List>

            <TextInput
                error={errorMessage}
                mt="md"
                maw={300}
                value={newStudentName}
                onChange={(event) => {
                    setButtonDisabled(false)
                    setNewStudentName(event.target.value)
                }}
                placeholder="Введите ФИО ученика"
            />
            <Button aria-disabled='true'
                    disabled={isButtonDisabled}
                    className={isButtonDisabled ? classes.dis_btn : classes.add_btn}
                    onClick={handleAddStudent} mt="sm">Добавить ученика</Button>
        </div>
    );
}