import React, {useEffect, useState} from "react";
import {Link, Outlet, useLocation} from "react-router-dom";

import {AppShell, Burger, Group} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

import {ThemeToggle} from "./components/index.js";
import {Footer} from "./components/index.js";
import {Logo} from "./components/index.js";

import authProvider from "./authProvider.jsx";
import classes from "./Root.module.css";

const Root = () => {
    const [opened, {toggle, close}] = useDisclosure();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const location = useLocation()
    useEffect(() => {
        authProvider.checkAuth()
            .then(() => {
                setIsLoggedIn(true);
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, [location]);

    const handleLogout = () => {
        authProvider.logout().then(() => {
            setIsLoggedIn(false);
        });
    };

    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 300, breakpoint: "sm", collapsed: {desktop: true, mobile: !opened}}}
        >

            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                        aria-label="menu"
                    />

                    <Group justify="space-between" style={{flex: 1}}>
                        <Logo/>

                        <Group ml="xl" gap={0} visibleFrom="sm">
                            {isLoggedIn ? (
                                <>
                                    <Link className={classes.control} to="/" onClick={() => {
                                        handleLogout();
                                        close()
                                    }}>
                                        Выйти из системы
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link className={classes.control} to="/" onClick={close}>
                                        На главную
                                    </Link>
                                    <Link className={classes.control} to="/login" onClick={close}>
                                        Войти в систему
                                    </Link>
                                </>
                            )}

                            <ThemeToggle/>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                {isLoggedIn ? (
                    <>
                        <Link className={classes.control} to="/" onClick={() => {
                            handleLogout();
                            close()
                        }}>
                            Выйти из системы
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className={classes.control} to="/" onClick={close}>
                            На главную
                        </Link>
                        <Link className={classes.control} to="/login" onClick={close}>
                            Войти в систему
                        </Link>
                    </>
                )}

                <ThemeToggle/>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet/>
                <Footer/>
            </AppShell.Main>

        </AppShell>
    );
};

export default Root;





