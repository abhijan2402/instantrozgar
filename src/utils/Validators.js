export const validateEmail = email => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
};



export const phonenumber = (inputtxt) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const reg = regex.test(inputtxt)

    if (reg) {
        return true
    }
    else {
        return false
    }
}


export const graduationTest = (YOG) => {
    const regex = /^\d{4}$/
    const reg = regex.test(YOG)


    if (reg) {
        return true
    }
    else {
        return false
    }
}


export const ValidateNumber = (input) => {
    const regex = /^[0-9]+$/;
    if (regex.test(input)) {
        return true
    } else {
        return false
    }
}