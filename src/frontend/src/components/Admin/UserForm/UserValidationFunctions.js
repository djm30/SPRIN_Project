// Validation functions for the UserForm component
// Ensuring they match with the constraints in the backend

export const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
        return "Please enter a valid email address";
    }
};

export const validateName = (name) => {
    if (name.length < 1) {
        return "Please enter a valid name";
    }
};

export const validatePassword = (password) => {
    // 8 Characters
    if (password.trim().length === 0) return "";

    if (password.trim().length < 8) {
        return "Password must be at least 8 characters";
    }

    // 1 Number
    if (!/[0-9]/.test(password)) {
        return "Password must contain a number";
    }

    if (password.toLowerCase() === password) {
        // 1 Capital
        return "Password must contain at least one capital letter";
    }
};

export const validateConfirmPassword = (password) => {
    return (confirmPassword) => {
        if (password !== confirmPassword) {
            return "Passwords do not match";
        }
    };
};
