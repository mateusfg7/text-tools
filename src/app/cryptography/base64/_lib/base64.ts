export function validateBase64(base64: string) {
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    return base64regex.test(base64)
}

export function generateBase64(text: string) {
    const convertedText = btoa(text)
    return convertedText
}

export function base64ToText(base64: string) {
    if(validateBase64(base64)){
        return atob(base64)
    }

    return "Base64 Invalid"
}