import React, {useEffect, useState} from "react";

import {Container} from "@mantine/core";

import {PersonalAreaSt} from "./PersonalAreaSt/index.js";
import {PersonalAreaTut} from "./PersonalAreaTut/index.js";

import authProvider from "../../authProvider.jsx";
import classes from "./PersonalAreas.module.css";


export function PersonalAreas() {
    const [role, setRole] = useState("");

    const getUserRole = async () => {
        try {
            await authProvider.checkAuth()
            await authProvider.getIdentity()

            const permissions = await authProvider.getPermissions()

            if (permissions === 'TU') {
                setRole("tutor")
            } else if (permissions === 'ST') {
                setRole("student")
            } else {
                setRole("")
            }
        } catch (error) {
            console.error('Ошибка получения пользователя', error);
        }
    }

    useEffect(() => {
        getUserRole().then()
    }, []);


    if (role === "student") {
        return <PersonalAreaSt/>
    } else if (role === "tutor") {
        return <PersonalAreaTut/>
    } else {
        return (
            <Container className={classes.main}>
                <h2 className={classes.heading}>
                    У вас нет доступа к личному кабинету
                </h2>
            </Container>
        )
    }
}