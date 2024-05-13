const crypto = require('crypto');

const base64 = async(message, empty) => {
    const base64 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
    let encoded = '';
    let rawBinary = '';

    for(let letterIndex = 0; letterIndex < message.length; letterIndex++)
    {
        letterDecimal = message[letterIndex].charCodeAt(0);
        letterBinary = letterDecimal.toString(2);
        if(letterBinary.length < 8) letterBinary = '0'.repeat(8 - letterBinary.length) + letterBinary;
        rawBinary += letterBinary;
    }

    if(rawBinary.length % 24 != 0) rawBinary += '0'.repeat(6 - (rawBinary.length % 6));
    for(let i = 0; i < Math.ceil(rawBinary.length / 24) * 24; i+=6)
    {
        binary6 = rawBinary.substr(i, 6);
        const decimal = parseInt(binary6, 2);
        encoded += (!isNaN(decimal)) ? base64[decimal] : '=';
    }

    return encoded;
}

const sha = async(message, name) => crypto.createHash(name).update(message, 'utf-8').digest('hex');
const shake = async(message, name, length) => crypto.createHash(name, { outputLength: length}).update(message, 'utf-8').digest('hex');

async function main(){
    const message = 'test';
    const algorithm = 'sha3-512';
    const shakeLength = 32;

    const algorithms = {
        'base64': base64,
        'sha1': async(message, empty) => sha(message, 'sha1'), 
        'sha224': async(message, empty) => sha(message, 'sha224'),
        'sha256': async(message, empty) => sha(message, 'sha256'),
        'sha384': async(message, empty) => sha(message, 'sha384'),
        'sha512': async(message, empty) => sha(message, 'sha512'),

        'sha3-224': async(message, empty) => sha(message, 'sha3-224'),
        'sha3-256': async(message, empty) => sha(message, 'sha3-256'),
        'sha3-384': async(message, empty) => sha(message, 'sha3-384'),
        'sha3-512': async(message, empty) => sha(message, 'sha3-512'),

        'shake128': async(message, length) => shake(message, 'shake256', length),
        'shake256': async(message, length) => shake(message, 'shake128', length)
    }

    let result = algorithms[algorithm](message, shakeLength);
    await result.then(encrypted => console.log(encrypted))
}

main();