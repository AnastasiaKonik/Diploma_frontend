import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import classes from "./Root.module.css";
import { ThemeToggle } from "./components/ThemeToggle";
import { Footer } from "./components/Footer";
import { Logo } from "./components/Logo";

const Root = () => {
    const [opened, { toggle, close }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
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
                    <Group justify="space-between" style={{ flex: 1 }}>
                        <Logo />
                        <Group ml="xl" gap={0} visibleFrom="sm">
                            <Link className={classes.control} to="/">
                                Войти в систему
                            </Link>
                            <ThemeToggle />
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar py="md" px={4}>
                <Link className={classes.control} to="/" onClick={close}>
                    Войти в систему
                </Link>
                <ThemeToggle />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>

            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};

export default Root;


