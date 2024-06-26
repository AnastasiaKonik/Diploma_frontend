import React, {useState} from "react";

import {Box, Button, FileButton, Group, Image, Stack, Text} from "@mantine/core";
import {MIME_TYPES} from "@mantine/dropzone";

import {Dropzone} from "./Dropzone.jsx";
import classes from "./Files.module.css";


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

    const handleSaveFiles = async () => {
        try {
            const formData = new FormData();
            form.values.files.forEach((file, index) => {
                formData.append(`file${index}`, file);
            });
            formData.append('author',
                `${localStorage.getItem("first_name")} ${localStorage.getItem("last_name")} ${localStorage.getItem("patronymic")}`,
            );
            formData.append('student_id', localStorage.getItem("student_id"));


            const response = await fetch('http://localhost:3030/tasks', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
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
        setForm({
            ...form,
            values: {
                files: []
            }
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
                                <Text>
                                    {file.name}
                                </Text>
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
                        <Button variant="outline" className={classes.trash_btn}
                                onClick={handleRemoveFiles}>
                            Удалить все
                        </Button>
                        <Button variant="outline"
                                onClick={handleSaveFiles}>
                            Сохранить и отправить
                        </Button>
                    </Group>
                </Stack>
            )}
        </div>
    );
}