import { rulesRegEx, expressionRegEx } from './Patterns';

const parseExpression = (expression) => {
    let result;
    expressionRegEx.forEach(expObj => {
        let { regEx, operator1Index, operator2Index, operandIndex } = expObj;
        let match = regEx.exec(expression);
        if (match) {
            result = {
                operand: match[operandIndex].trim(),
                operator1: match[operator1Index].trim(),
                operator2: match[operator2Index].trim()
            }
        }
    });
    return result
}

const parseRule = (rule) => {
    let result = []
    for (const index in rulesRegEx) {
        if (rulesRegEx.hasOwnProperty(index)) {
            let { regEx, expressionsIndex } = rulesRegEx[index];
            let match = regEx.exec(rule);
            if (match) {
                expressionsIndex.forEach(expIndex => {
                    result.push(parseExpression(match[expIndex]))
                });
                break;
            }
        }
    }
    return result;
}
export const parseRules = (rules) => {
    return rules.map(rule => parseRule(rule));
}

