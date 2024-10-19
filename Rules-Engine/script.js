// Data structure for AST Node
class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

// Function to parse a rule string into AST
function parseRule(rule) {
    let tokens = rule.match(/([A-Za-z]+|\d+|\S)/g);
    let stack = [];
    let currentNode = null;

    while (tokens.length) {
        let token = tokens.shift();
        if (token === "(") {
            stack.push(currentNode);
            currentNode = null;
        } else if (token === ")") {
            let node = currentNode;
            currentNode = stack.pop();
            if (!currentNode) currentNode = node;
            else {
                if (!currentNode.left) currentNode.left = node;
                else currentNode.right = node;
            }
        } else if (token === "AND" || token === "OR") {
            currentNode = new Node("operator", currentNode, null, token);
        } else if (["<", ">", "=", "!="].includes(token)) {
            let leftNode = currentNode;
            let rightValue = tokens.shift();
            currentNode = new Node("operand", leftNode, new Node("value", null, null, rightValue), token);
        } else {
            if (!currentNode) currentNode = new Node("value", null, null, token);
            else currentNode = new Node("value", currentNode, null, token);
        }
    }

    return currentNode;
}

// Function to combine multiple rules into a single AST
function combineRulesAST(rules) {
    let combinedNode = null;
    for (let rule of rules) {
        let ruleNode = parseRule(rule);
        if (!combinedNode) combinedNode = ruleNode;
        else combinedNode = new Node("operator", combinedNode, ruleNode, "AND");
    }
    return combinedNode;
}

// Function to evaluate AST against data
function evaluateAST(node, data) {
    if (node.type === "value") return data[node.value];
    if (node.type === "operand") {
        let leftValue = evaluateAST(node.left, data);
        let rightValue = node.right.type === "value" ? node.right.value : evaluateAST(node.right, data);
        switch (node.value) {
            case ">":
                return leftValue > rightValue;
            case "<":
                return leftValue < rightValue;
            case "=":
                return leftValue == rightValue;
            case "!=":
                return leftValue != rightValue;
            default:
                return false;
        }
    }
    if (node.type === "operator") {
        let leftValue = evaluateAST(node.left, data);
        let rightValue = evaluateAST(node.right, data);
        switch (node.value) {
            case "AND":
                return leftValue && rightValue;
            case "OR":
                return leftValue || rightValue;
            default:
                return false;
        }
    }
}

// UI Functions
function createRule() {
    let ruleInput = document.getElementById("rule-input").value;
    let ruleAST = parseRule(ruleInput);
    document.getElementById("rule-output").textContent = JSON.stringify(ruleAST, null, 2);
}

function combineRules() {
    let combineInput = document.getElementById("combine-input").value.split("\n");
    let combinedAST = combineRulesAST(combineInput);
    document.getElementById("combine-output").textContent = JSON.stringify(combinedAST, null, 2);
}

function evaluateRule() {
    let dataInput = JSON.parse(document.getElementById("data-input").value);
    let combinedAST = JSON.parse(document.getElementById("combine-output").textContent);
    let result = evaluateAST(combinedAST, dataInput);
    document.getElementById("evaluate-output").textContent = result ? "User is eligible" : "User is not eligible";
}
