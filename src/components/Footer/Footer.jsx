import React from "react";

import { Anchor, Text } from "@mantine/core";

import classes from "./Footer.module.css";

export function Footer() {
    return (
        <div className={classes.footer}>
            <div className={classes.inner}>
                <Text size="sm">© 2024 Мой репетитор</Text>
                <Anchor
                    className={classes.link}
                    href="#"
                    underline="hover"
                    onClick={(e) => {
                        window.location.href = "mailto:konik.ftl@mail.ru";
                        e.preventDefault();
                    }}
                    size="sm"
                >
                    Связаться с разработчиком
                </Anchor>
            </div>
        </div>
    );
}