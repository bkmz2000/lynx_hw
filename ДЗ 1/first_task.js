const prompt = require('prompt-sync')();

function lowerFCapital(text) {
    if(text === '') {
        return '';
    }

    let first = text[0].toUpperCase();
    let rest = text.slice(1, text.length).toLowerCase();

    return first + rest;
}

function correctWhitespaces(text) {
    let punctuation = / *([\.,\:])/g;
    let severalWhitespaces = /  +/g;
    
    // Тут могут возникнуть новые подряд идущие пробелы, но на следующей строчке я их уберу
    let goodPunctuation = text.replace(punctuation, "$1 "); 
    let goodWhitespaces = goodPunctuation.replace(severalWhitespaces, " ");

    return goodWhitespaces;
}

function countWords(text) {
    let goodText = correctWhitespaces(text); // Удобно
    let tokens = goodText.split(' ');

    let words = tokens.filter(function(word) {
        return word !== ''
    });

    return words.length;
}

function countUniqueWords(text) {
    let punctuation = / *([\.,\:])/g;
    text = text.toLowerCase().replace(punctuation, ' ');

    let tokens = text.split(' ');
    let words = tokens.filter(str => str.length > 0);

    let counts = {};

    for(let word of words) {
        if(!(word in counts)) {
            counts[word] = 0;
        }

        counts[word]++;
    }

    return counts;
}

console.log(countUniqueWords('Текст, в котором слово текст несколько раз встречается и слово тоже'));