import React, {useEffect, useState} from "react";

import {Box, Button, FileButton, Group, Image, Stack, Text} from "@mantine/core";
import {MIME_TYPES} from "@mantine/dropzone";

import {Dropzone} from "./Dropzone.jsx";
import authProvider from "../../../authProvider.jsx";


export function HandleTaskFiles() {
    const [form, setForm] = useState({
        values: {
            files: []
        },
        errors: {}
    });

    const handleSetFiles = (imageFiles) => {
        setForm({
            ...form,
            values: {
                ...form.values,
                files: imageFiles
            }
        });
    };

    const [userId, setUserId] = useState(null)

    useEffect(() => {
        authProvider.getTutorInfo()
            .then((tutorData) => {
                setUserId(tutorData.id);
            })
    }, []);

    const [taskId, setTaskId] = useState(null)
    const handleSaveFiles = async () => {
        try {
            const formData = new FormData();
            form.values.files.forEach((file, index) => {
                formData.append(`file${index}`, file);
            });
            formData.append('author_id', userId);
            // Find assignee same as in SendText
            formData.append('assignee_id', userId);


            const response = await fetch('http://localhost:3030/tasks', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTaskId(data.id)
                setForm({
                    ...form,
                    values: {
                        files: []
                    }
                })
                return data.files;
            } else {
                console.log('Ошибка сохранения файлов');
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const handleRemoveFiles = () => {
        fetch(`http://localhost:3030/materials/${taskId}`, {
            method: 'DELETE',
        })
            .then(resp => {
                if (!resp.ok) {
                    return Promise.reject('Ошибка удаления файлов')
                }
                setForm({
                    ...form,
                    values: {
                        files: []
                    }
                })
            })
            .then(() => {
                return Promise.resolve()
            })
            .catch((reason) => {
                console.log(reason)
            })
    };

    return (
        <div>
            {form.values.files.length === 0 ? (
                <Dropzone mx="auto" onDrop={handleSetFiles} error={form.errors["files"]}/>
            ) : (
                <Stack>
                    {form.values.files.map((file, index) => (
                        <Box key={index} style={{borderRadius: "1rem"}}>
                            {file.type.includes("image") ? (
                                <Image maw="300" fit="contain" src={URL.createObjectURL(file)}/>
                            ) : (
                                <Text>{file.name}</Text>
                            )}
                        </Box>
                    ))}
                    <Group justify="center">
                        <FileButton
                            onChange={(imageFiles) =>
                                handleSetFiles([...form.values.files, ...imageFiles])}
                            accept={[MIME_TYPES.png,
                                MIME_TYPES.pdf,
                                MIME_TYPES.docx,
                                MIME_TYPES.jpeg,
                                MIME_TYPES.pptx,
                                MIME_TYPES.xlsx]}
                        >
                            {(props) => <Button {...props}>Выбрать другие файлы</Button>}
                        </FileButton>
                        <Button variant="outline" color="pink" onClick={handleRemoveFiles}>
                            Удалить все
                        </Button>
                        <Button variant="outline" onClick={handleSaveFiles}>
                            Сохранить и отправить
                        </Button>
                    </Group>
                </Stack>
            )}
        </div>
    );
}