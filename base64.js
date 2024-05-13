function base64encode(input) {
    const base64 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
    let encoded = '';
    let rawBinary = '';

    for(let letterIndex = 0; letterIndex < input.length; letterIndex++)
    {
        letterDecimal = input[letterIndex].charCodeAt(0);
        binary = letterDecimal.toString(2);
        if(binary.length < 8) binary = '0'.repeat(8 - binary.length) + binary;
        rawBinary += binary;
    }

    rawBinary += '0'.repeat(6 - (rawBinary.length % 6));
    for(let i = 0; i < Math.ceil(rawBinary.length / 24) * 24; i+=6)
    {
        binary6 = rawBinary.substr(i, 6);
        let number = parseInt(binary6, 2);
        encoded += number ? base64[number] : '=';
    }

    return encoded;
}

console.log(base64encode('a'));