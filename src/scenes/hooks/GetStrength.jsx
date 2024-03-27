import {requirements} from "./Requirements.jsx";

export function getStrength(password) {
    let multiplier = password.length > 15 && password.length < 128 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
