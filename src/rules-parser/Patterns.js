export const rulesRegEx = [{
    regEx: /if(.+?)and(.+?)$/i,
    expressionsIndex: [1, 2]
}, {
    regEx: /if(.+?)$/i,
    expressionsIndex: [1]
}]

export const expressionRegEx = [{
    regEx: /(.+?)(<=|>=|<|>)(.*?)$/i,
    operator1Index: 1,
    operator2Index: 3,
    operandIndex: 2
}, {
    regEx: /(.+?)(is one of the)(.*?)$/i,
    operator1Index: 1,
    operator2Index: 3,
    operandIndex: 2
}, {
    regEx: /(has)(.+?)(in the)(.*?)$/i,
    operator1Index: 2,
    operator2Index: 4,
    operandIndex: 3
}]