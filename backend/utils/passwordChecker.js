function checkPasswordStrength(password) {

    let strength = "Weak"
    let suggestion = ""

    if (password.length < 6) {
        suggestion = "Password too short"
    }
    else if (!/[A-Z]/.test(password)) {
        suggestion = "Add uppercase letters"
    }
    else if (!/[0-9]/.test(password)) {
        suggestion = "Add numbers"
    }
    else if (!/[!@#$%^&*]/.test(password)) {
        suggestion = "Add special characters"
    }
    else {
        strength = "Strong"
        suggestion = "Good password"
    }

    return { strength, suggestion }
}

module.exports = checkPasswordStrength