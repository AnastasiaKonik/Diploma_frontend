import {ActionIcon, Group, Text, TextInput} from "@mantine/core";
import classes from "./StudentInfo.module.css";
import {IconEdit, IconPhoneCall, IconSchool, IconUser} from "@tabler/icons-react";
import {useState} from "react";
import {IMaskInput} from "react-imask";


export function StudentInfo() {
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [isGradeEditing, setIsGradeEditing] = useState(false);
    const [phone, setPhone] = useState("+7(919)-824-38-78");
    const [grade, setGrade] = useState("10");

    const handlePhoneClick = () => {
        setIsPhoneEditing(true);
    };
    const handleGradeClick = () => {
        setIsGradeEditing(true);
    };

    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    };
    const handleChangeGrade = (event) => {
        setGrade(event.target.value);
    };

    const handlePhoneBlur = () => {
        setIsPhoneEditing(false);
        // Save the changes or perform any required actions here
    };
    const handleGradeBlur = () => {
        setIsGradeEditing(false);
        // Save the changes or perform any required actions here
    };

    return (
            <Group wrap="nowrap">
                <div>
                    <Group wrap="nowrap" gap={10} mt={5}>
                        <IconUser stroke={1.5} size="1rem" className={classes.icon}/>
                        <Text fz="xl" className={classes.text}>
                            Коник Анастасия Александровна
                        </Text>
                    </Group>

                    <Group wrap="nowrap" gap={10} mt={5}>
                        <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon}/>
                        {isPhoneEditing ? (
                            <TextInput
                                value={phone}
                                minlength="18"
                                maxlength="18"
                                component={IMaskInput}
                                mask="+7 (000) 000-00-00"
                                onChange={handleChangePhone}
                                onBlur={handlePhoneBlur}
                            />
                        ) : (
                            <Text fz="lg" className={classes.text}>{phone}</Text>
                        )}
                        <ActionIcon variant="subtle" color="gray" onClick={handlePhoneClick}>
                            <IconEdit size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </Group>

                    <Group wrap="nowrap" gap={10} mt={5}>
                        <IconSchool stroke={1.5} size="1rem" className={classes.icon}/>
                        {isGradeEditing ? (
                            <TextInput
                                value={grade}
                                onChange={handleChangeGrade}
                                onBlur={handleGradeBlur}
                            />
                        ) : (
                            <Text fz="lg" className={classes.text}>{grade} класс</Text>
                        )}
                        <ActionIcon variant="subtle" color="gray" onClick={handleGradeClick}>
                            <IconEdit size="1rem" stroke={1.5}/>
                        </ActionIcon>
                    </Group>
                </div>
            </Group>
    );
}
