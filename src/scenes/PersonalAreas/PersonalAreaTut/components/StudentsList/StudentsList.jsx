import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {ActionIcon, Button, Group, List, Text, TextInput} from '@mantine/core';

import {IconArchive, IconArchiveOff} from "@tabler/icons-react";

import classes from "./StudentsList.module.css";


export function StudentsList() {
    const [newStudentName, setNewStudentName] = useState('');
    const [students, setStudents] = useState([])
    const [errorMessage, setErrorMessage] = useState("");
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    const tutor = localStorage.getItem("login")

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
        if (/^[а-яА-Я]+\s[а-яА-Я]+$/.test(newStudentName)
            || /^[а-яА-Я]+\s[а-яА-Я]+\s[а-яА-Я]+$/.test(newStudentName)) {
            const last_name = newStudentName.split(' ')[0];
            const first_name = newStudentName.split(' ')[1];
            const patronymic = newStudentName.split(' ')[2] ? newStudentName.split(' ')[2] : "";

            await fetch(`http://localhost:3030/students_info?first_name=${first_name}&last_name=${last_name}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        response.json()
                            .then(json => {
                                setErrorMessage(json.message)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                    return response.json()
                })
                .then((json) => {
                    if (json.length === 0) {
                        setErrorMessage("Ученик не зарегистрирован на платформе")
                    } else {
                        setErrorMessage('')
                        fetch(`http://localhost:3030/tutors_students`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                student_info: {
                                    first_name: first_name,
                                    last_name: last_name,
                                    patronymic: patronymic,
                                    archived: false,
                                    student_id: json.id
                                },
                                tutor: localStorage.getItem("login")
                            }),
                        })
                            .then(response => {
                                if (!response.ok) {
                                    response.json()
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
                    }
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

    return (
        <>
            <List size="md" spacing="xs" type="ordered">
                {students.map((student, index) => (
                    <List.Item key={index}>

                        <Group gap={0} justify="flex-end">
                            <Text fw={500} className={classes.text}
                                  style={{color: student.archived ? 'gray' : 'inherit'}}>
                                {student.archived ? (
                                        <>
                                            {student.last_name} {student.first_name} {student.patronymic}
                                        </>
                                    )
                                    : (
                                        <Link to={`/student_page`} className={classes.link}
                                              onClick={() => {
                                                  localStorage.setItem('student_name', student.first_name)
                                                  localStorage.setItem('student_surname', student.last_name)
                                              }}
                                        >
                                            {student.last_name} {student.first_name} {student.patronymic}
                                        </Link>
                                    )}
                            </Text>

                            {student.archived && (
                                <ActionIcon
                                    variant="default"
                                    className={classes.iconArchive}
                                    mx="sm"
                                    onClick={() => handleUnarchiveStudent(index)}>
                                    <IconArchiveOff size="1rem" stroke={1.5}/>
                                </ActionIcon>
                            )}
                            {!student.archived && (
                                <ActionIcon
                                    variant="default"
                                    className={classes.icon_archive}
                                    mx="sm"
                                    onClick={() => handleArchiveStudent(index)}>
                                    <IconArchive size="1rem" stroke={1.5}/>
                                </ActionIcon>
                            )}

                        </Group>

                    </List.Item>
                ))}
            </List>

            <TextInput
                placeholder="Введите ФИО ученика"
                mt="md"
                maw={300}
                value={newStudentName}
                onChange={(event) => {
                    setErrorMessage('')
                    setButtonDisabled(false)
                    setNewStudentName(event.target.value)
                }}
                error={errorMessage}
            />
            <Button aria-disabled='true' mt="sm" mb="md"
                    disabled={isButtonDisabled}
                    className={isButtonDisabled ? classes.dis_btn : classes.add_btn}
                    onClick={handleAddStudent}>
                Добавить ученика
            </Button>
        </>
    );
}