import React from "react";

import { Text } from "@mantine/core";

export const Logo = (props) => {
    return (
        <Text
            component="span"
            fw={900}
            variant="gradient"
            gradient={{ from: "#1C7ED6", to: "#1098AD", deg: 50 }}
            size="xl"
            inherit={props.inherit}
        >
            Мой репетитор
        </Text>
    );
};