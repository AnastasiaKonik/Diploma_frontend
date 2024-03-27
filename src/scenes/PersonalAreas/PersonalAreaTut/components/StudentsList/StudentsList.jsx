import {Link} from "react-router-dom";
import {useState} from "react";

import {ActionIcon, Button, Group, List, Text, TextInput} from '@mantine/core';

import {IconArchive, IconArchiveOff} from "@tabler/icons-react";

import classes from "./StudentsList.module.css";

const initialStudents = [
    {
        student: 'Коник Анастасия Александровна',
        archived: false
    },
    {
        student: 'Иван Иванов Иванович',
        archived: false
    }
];

export function StudentsList() {
    const [students, setStudents] = useState(initialStudents);
    const [newStudentName, setNewStudentName] = useState('');

    const handleAddStudent = () => {
        if (newStudentName.trim() !== '') {
            const newStudent = {student: newStudentName, archived: false}
            setStudents([
                ...students,
                newStudent,
            ]);
            setNewStudentName('');
            initialStudents.push(newStudent);
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
        <div>
            <List size="md" spacing="xs" type="ordered">
                {students.map((student, index) => (
                    <List.Item key={index}>

                        <Group gap={0} justify="flex-end">
                            <Text fw={500} className={classes.text}
                                  style={{color: student.archived ? 'gray' : 'inherit'}}>
                                {student.archived ? (
                                        student.student
                                    )
                                    : (
                                        <Link to={"/student_page"} className={classes.link}>
                                            {student.student}
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
                mt="md"
                maw={300}
                value={newStudentName}
                onChange={(event) => setNewStudentName(event.target.value)}
                placeholder="Введите ФИО ученика"
            />
            <Button onClick={handleAddStudent} className={classes.add_btn} mt="sm">Добавить ученика</Button>
        </div>
    );
}