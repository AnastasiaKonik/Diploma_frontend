import React, {useEffect, useState} from "react";

import {Container} from "@mantine/core";

import {PersonalAreaSt} from "./PersonalAreaSt/index.js";
import {PersonalAreaTut} from "./PersonalAreaTut/index.js";

import authProvider from "../../authProvider.jsx";
import classes from "./PersonalAreas.module.css";


export function PersonalAreas() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        authProvider.checkAuth()
            .then(() => {
                authProvider.getIdentity()
                    .then(() => {
                        authProvider.getPermissions()
                            .then((userRole) => {
                                if (userRole === 'ST') {
                                    setRole("student");
                                } else if (userRole === 'TU') {
                                    setRole("tutor");
                                } else {
                                    setRole("");
                                }
                            });
                    })
            })
            .catch(error => {
                console.error('Error fetching user identity:', error);
            });
    }, []);


    if (role === "student") {
        return <PersonalAreaSt/>
    } else if (role === "tutor") {
        return <PersonalAreaTut/>
    } else {
        return (
            <Container className={classes.main}>
                <h2>
                    У вас нет доступа к личному кабинету
                </h2>
            </Container>
        )
    }
}