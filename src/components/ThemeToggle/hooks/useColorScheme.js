import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

export const useColorScheme = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("dark", { getInitialValueInEffect: true });
    const dark = computedColorScheme === "dark";
    const light = computedColorScheme === "light";

    return { colorScheme: computedColorScheme, dark, light, setColorScheme };
};
