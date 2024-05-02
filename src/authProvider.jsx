import {ApiPath, JSONServerPath} from "./main.jsx";
import {StatusCodes} from "http-status-codes";

const authProvider = {
    login: ({username, password}) => {
        return fetch(`${ApiPath}/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, password: password}),
        })
            .then(resp => {
                switch (resp.status) {
                    case StatusCodes.INTERNAL_SERVER_ERROR:
                        return Promise.reject("Ошибка сервера")
                    case StatusCodes.UNAUTHORIZED:
                        return Promise.reject("Неверные логин и/или пароль")
                    case StatusCodes.GATEWAY_TIMEOUT:
                        return Promise.reject("Сервер временно недоступен")
                    case StatusCodes.OK:
                        return resp.json()
                    default:
                        return Promise.reject("Сервер недоступен")
                }
            }, () => Promise.reject("Неизвестная ошибка"))
            .then((json) => {
                localStorage.setItem("access-token", json.access)
                localStorage.setItem("refresh-token", json.refresh)
                return Promise.resolve("/profile")
            })
    },
    logout: () => {
        localStorage.removeItem('access-token')
        localStorage.removeItem('refresh-token')

        localStorage.removeItem('student_name')
        localStorage.removeItem('student_surname')
        localStorage.removeItem("student_id")

        localStorage.removeItem("first_name")
        localStorage.removeItem("last_name")
        localStorage.removeItem("patronymic")

        localStorage.removeItem("id")
        localStorage.removeItem("role")
        localStorage.removeItem("login")

        localStorage.removeItem("phone")
        localStorage.removeItem("grade")
        localStorage.removeItem("subject")

        return Promise.resolve('/')
    },
    checkAuth: () => {
        return localStorage.getItem('access-token')
            ? Promise.resolve()
            : Promise.reject();
    },
    createUser: (values) => {
        return fetch(`${ApiPath}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then(resp => {
            if (!resp.ok) {
                return Promise.reject("Ошибка сервера")
            }
            return resp.json()
        }, () => Promise.reject("Неизвестная ошибка"))
            .then(() => {
                return Promise.resolve()
            })
            .catch((reason) => {
                console.log(reason)
            })
    },
    postStudentInfo: (grade) => {
        return fetch(`${ApiPath}/users/student_info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            },
            body: JSON.stringify({"grade": grade}),
        }).then(resp => {
            if (!resp.ok) {
                return Promise.reject("Ошибка сервера")
            }
            return resp.json()
        }, () => Promise.reject("Неизвестная ошибка"))
            .then(() => {
                return Promise.resolve()
            })
            .catch((reason) => {
                console.log(reason)
            })
    },
    getStudentInfo: () => {
        return fetch(`${ApiPath}/users/student_info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            }
        }).then(resp => {
            switch (resp.status) {
                case StatusCodes.INTERNAL_SERVER_ERROR:
                    throw new Error("Ошибка сервера")
                case StatusCodes.UNAUTHORIZED:
                    throw new Error("Истек токен доступа")
                case StatusCodes.FORBIDDEN:
                    throw new Error("Нет прав доступа")
                case StatusCodes.GATEWAY_TIMEOUT:
                    throw new Error("Сервер временно недоступен")
                case StatusCodes.OK:
                    return resp.json()
                default:
                    throw new Error("Сервер недоступен")
            }
        })
            .then((json) => {
                localStorage.setItem("grade", json.grade);
                localStorage.setItem("id", json.user);
                return Promise.resolve({
                    grade: localStorage.getItem('grade'),
                    id: localStorage.getItem('id'),
                })
            })
    },
    postStudentInfoJsonServer: (grade, id) => {
        return fetch(`${JSONServerPath}/students_info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "first_name": localStorage.getItem('first_name'),
                "last_name": localStorage.getItem('last_name'),
                "patronymic": localStorage.getItem('patronymic'),
                //"grade": localStorage.getItem('grade'),
                // "id": localStorage.getItem('id'),
                "phone": localStorage.getItem('phone'),
                "id": id,
                "grade": grade
            }),
        }).then(resp => {
            if (!resp.ok) {
                return Promise.reject("Ошибка сервера")
            }
            return resp.json()
        }, () => Promise.reject("Неизвестная ошибка"))
            .then(() => {
                return Promise.resolve()
            })
            .catch((reason) => {
                console.log(reason)
            })
    },
    patchStudentGrade: (grade) => {
        return fetch(`${ApiPath}/users/student_info`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            },
            body: JSON.stringify({"grade": grade}),
        }).then(resp => {
            if (!resp.ok) {
                return Promise.reject("Ошибка сервера")
            }
            return resp.json()
        }, () => Promise.reject("Неизвестная ошибка"))
            .then(() => {
                return Promise.resolve()
            })
            .then(() => {
                fetch(`${JSONServerPath}/students_info/${localStorage.getItem('id')}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"grade": grade}),
                }).then(resp => {
                    if (!resp.ok) {
                        return Promise.reject("Ошибка сервера")
                    }
                    return resp.json()
                }, () => Promise.reject("Неизвестная ошибка"))
                    .then(() => {
                        return Promise.resolve()
                    })
                    .catch((reason) => {
                        console.log(reason)
                    })
            })
            .catch((reason) => {
                console.log(reason)
            })
    },
    postTutorInfo: (subject) => {
        return fetch(`${ApiPath}/users/tutor_info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            },
            body: JSON.stringify({"subject": subject}),
        }).then(resp => {
            if (!resp.ok) {
                return Promise.reject("Ошибка сервера")
            }
            return resp.json()
        }, () => Promise.reject("Неизвестная ошибка"))
            .then(() => {
                return Promise.resolve()
            })
            .catch((reason) => {
                console.log(reason)
            })
    },
    patchUserPhone: (phone) => {
        return fetch(`${ApiPath}/users/full_info`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            },
            body: JSON.stringify({"phone": phone}),
        }).then(resp => {
            if (!resp.ok) {
                return Promise.reject("Ошибка сервера")
            }
            return resp.json()
        }, () => Promise.reject("Неизвестная ошибка"))
            .then(() => {
                return Promise.resolve()
            })
            .then(() => {
                if (localStorage.getItem("role") === "ST") {
                    fetch(`${JSONServerPath}/students_info/${localStorage.getItem('id')}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({"phone": phone}),
                    }).then(resp => {
                        if (!resp.ok) {
                            return Promise.reject("Ошибка сервера")
                        }
                        return resp.json()
                    }, () => Promise.reject("Неизвестная ошибка"))
                        .then(() => {
                            return Promise.resolve()
                        })
                        .catch((reason) => {
                            console.log(reason)
                        })
                }
            })
            .catch((reason) => {
                console.log(reason)
            })
    },
    getTutorInfo: () => {
        return fetch(`${ApiPath}/users/tutor_info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            }
        }).then(resp => {
            switch (resp.status) {
                case StatusCodes.INTERNAL_SERVER_ERROR:
                    throw new Error("Ошибка сервера")
                case StatusCodes.UNAUTHORIZED:
                    throw new Error("Истек токен доступа")
                case StatusCodes.FORBIDDEN:
                    throw new Error("Нет прав доступа")
                case StatusCodes.GATEWAY_TIMEOUT:
                    throw new Error("Сервер временно недоступен")
                case StatusCodes.OK:
                    return resp.json()
                default:
                    throw new Error("Сервер недоступен")
            }
        })
            .then((json) => {
                localStorage.setItem("subject", json.subject);
                localStorage.setItem("id", json.user);
                return Promise.resolve({
                    subject: localStorage.getItem('subject'),
                    id: localStorage.getItem('id'),
                })
            })
    },
    getIdentity: () => {
        return fetch(`${ApiPath}/users/full_info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('access-token')}`
            }
        })
            .then(resp => {
                switch (resp.status) {
                    case StatusCodes.INTERNAL_SERVER_ERROR:
                        throw new Error("Ошибка сервера");
                    case StatusCodes.UNAUTHORIZED:
                        throw new Error("Неверный токен");
                    case StatusCodes.FORBIDDEN:
                        throw new Error("Доступ запрещен");
                    case StatusCodes.GATEWAY_TIMEOUT:
                        throw new Error("Сервер временно недоступен");
                    case StatusCodes.OK:
                        return resp.json();
                    default:
                        throw new Error("Сервер недоступен");
                }
            })
            .then((json) => {
                localStorage.setItem("phone", json.phone);
                localStorage.setItem("first_name", json.first_name);
                localStorage.setItem("last_name", json.last_name);
                localStorage.setItem("patronymic", json.patronymic);
                localStorage.setItem("role", json.role);
                localStorage.setItem("login", json.username);
                return Promise.resolve({
                    phone: localStorage.getItem('phone'),
                    first_name: localStorage.getItem('first_name'),
                    last_name: localStorage.getItem('last_name'),
                    patronymic: localStorage.getItem('patronymic')
                })
            });
    },
    getPermissions: () => {
        const role = localStorage.getItem('role');
        return Promise.resolve(role);
    },
};
export default authProvider;