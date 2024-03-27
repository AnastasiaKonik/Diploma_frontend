import React, {useState} from "react";

import {Box, Button, FileButton, Group, Image, Stack, Text} from "@mantine/core";
import {MIME_TYPES} from "@mantine/dropzone";

import {Dropzone} from "./Dropzone.jsx";

const handleSaveImages = async (files) => {
    try {
        // Simulate sending files to the server and receiving a response
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({success: true, files});
            }, 2000);
        });

        // Simulate receiving files from the server
        if (response.success) {
            return response.files;
        } else {
            throw new Error('Failed to save files');
        }
    } catch (error) {
        console.error('Error saving files:', error);
        // Display an error message or handle the error appropriately
        return [];
    }
};

export function HandleFiles() {
    const [form, setForm] = useState({
        values: {
            files: []
        },
        errors: {}
    });

    const handleSetImages = (imageFiles) => {
        setForm({
            ...form,
            values: {
                ...form.values,
                files: imageFiles
            }
        });
    };

    const handleRemoveImages = () => {
        setForm({
            ...form,
            values: {
                files: []
            }
        });
    };

    const handleReceiveFiles = async () => {
        const receivedFiles = await handleSaveImages(form.values.files);
        setForm({
            ...form,
            values: {
                files: receivedFiles
            }
        });
    };

    return (
        <div>
                {form.values.files.length === 0 ? (
                    <Dropzone mx="auto" onDrop={handleSetImages} error={form.errors["files"]}/>
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
                                    handleSetImages([...form.values.files, ...imageFiles])}
                                accept={[MIME_TYPES.png,
                                    MIME_TYPES.pdf,
                                    MIME_TYPES.docx,
                                    MIME_TYPES.jpeg,
                                    MIME_TYPES.pptx,
                                    MIME_TYPES.xlsx]}
                            >
                                {(props) => <Button {...props}>Выбрать другие файлы</Button>}
                            </FileButton>
                            <Button variant="outline" color="pink" onClick={handleRemoveImages}>
                                Удалить все
                            </Button>
                            <Button variant="outline" onClick={handleReceiveFiles}>
                                Сохранить
                            </Button>
                        </Group>
                    </Stack>
                )}
        </div>
    );
}