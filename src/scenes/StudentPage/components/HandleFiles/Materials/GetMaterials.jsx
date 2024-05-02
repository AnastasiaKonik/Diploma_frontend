import {ActionIcon, Group, List, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import classes from "./GetMaterials.module.css"
import {IconTrash} from "@tabler/icons-react";

export function GetMaterials() {
    const [files, setFiles] = useState([])
    const getMaterials = () => {
            fetch(`http://localhost:3030/materials?author_id=${localStorage.getItem('id')}&student=${localStorage.getItem('student_id')}`, {
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
        setFiles([]);
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
                        onClick={() => handleDeleteMaterial()}
                        variant="default"
                        className={classes.iconTrash}
                        mx="sm"
                    >
                        <IconTrash size="1rem" stroke={1.5}/>
                    </ActionIcon>
                </Group>
            ) : (<></>)}
        </div>
    )
}