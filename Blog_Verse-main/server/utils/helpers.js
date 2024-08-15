const isValidJSON = (str) => {
    try {
        JSON.parse(str)
        return true;  // valid JSON , parsing without error
    } catch (e) {
        return false;
    }
}

module.exports = { isValidJSON };
//This function is useful for validating JSON data before processing it further in your application.