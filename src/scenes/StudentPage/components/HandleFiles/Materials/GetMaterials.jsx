import {useEffect, useState} from "react";

import {ActionIcon, Group, List, Text, Title} from "@mantine/core";

import classes from "./GetMaterials.module.css"
import {IconTrash} from "@tabler/icons-react";

export function GetMaterials() {
    const [files, setFiles] = useState([])

    const authorId = localStorage.getItem('id')

    const getMaterials = () => {
        fetch(`http://localhost:3030/materials?author_id=${authorId}&student_id=${localStorage.getItem('student_id')}`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(json => {
                const lst = []
                setFiles(json.map(x => {
                    Object.entries(x).forEach(([key, value]) => {
                        if (key.includes('file')) {
                            lst.push(value.path)
                        }
                    })
                    return lst
                }))
                return lst
            })
            .then((lst) => setFiles(lst))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        setTimeout(getMaterials, 100);
    }, [])


    const handleDeleteMaterial = () => {
        fetch(`http://localhost:3030/materials?student_id=${localStorage.getItem("student_id")}&author_id=${authorId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => response.json())
            .then(json => {
                json.map(x => {
                    fetch(`http://localhost:3030/materials/${x.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        .then(response => {
                            if (response.ok) {
                                setFiles([])
                            } else {
                                console.log('Ошибка удаления файлов');
                            }
                            return response.json()
                        })
                        .catch(error => console.log(error))
                })
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <List size="md" spacing="xs" type="ordered" mb="md">
                {files.map((file, index) => (
                    <List.Item key={index}>
                        <Group gap={0} justify="flex-end">
                            <Text>
                                {file}
                            </Text>
                        </Group>
                    </List.Item>
                ))}
            </List>

            {files.length ? (
                <Group gap={0}>
                    <Title order={5}>
                        Удалить материалы:
                    </Title>
                    <ActionIcon
                        variant="default"
                        className={classes.icon_trash}
                        mx="sm"
                        onClick={() => handleDeleteMaterial()}>
                        <IconTrash size="1rem" stroke={1.5}/>
                    </ActionIcon>
                </Group>
            ) : (<></>)}
        </div>
    )
}