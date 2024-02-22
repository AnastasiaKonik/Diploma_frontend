import {IconCheck, IconX} from '@tabler/icons-react';
import {Box, rem, Text} from '@mantine/core';

export function PasswordRequirement({meets, label}) {
    return (
        <Text
            c={meets ? 'teal' : 'red'}
            style={{display: 'flex', alignItems: 'center'}}
            mt={7}
            size="sm"
        >
            {meets ? (
                <IconCheck style={{width: rem(14), height: rem(14)}}/>
            ) : (
                <IconX style={{width: rem(14), height: rem(14)}}/>
            )}{' '}
            <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    {re: /[0-9]/},
    {re: /[a-z]/},
    {re: /[A-Z]/},
];

// eslint-disable-next-line react-refresh/only-export-components
export function getStrength(password) {
    let multiplier = password.length > 15 && password.length < 128 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
