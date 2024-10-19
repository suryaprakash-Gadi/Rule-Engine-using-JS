# Rule Engine with Abstract Syntax Tree (AST)

## Introduction

This project implements a Rule Engine using Abstract Syntax Trees (AST) to evaluate user eligibility based on various attributes. The rule engine parses rule strings into AST nodes, combines multiple rules into a single AST, and evaluates the AST against given data.

## Features

- **Rule Parsing:** Converts rule strings into AST nodes.
- **Rule Combination:** Combines multiple rules into a single AST.
- **Rule Evaluation:** Evaluates the AST against given data attributes.
- **User Interface:** Simple web interface to create, combine, and evaluate rules.

## Project Structure

- `index.html`: The HTML file containing the structure of the web app.
- `styles.css`: The CSS file for styling the web app.
- `script.js`: The JavaScript file containing the logic for rule parsing, combination, and evaluation.
- `data.json`: Sample data used for rule evaluation.

## Setup and Usage

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd rule-engine-ast
    ```

2. Open `index.html` in a web browser.

3. Use the web interface to:
    - Create rules by entering rule strings.
    - Combine multiple rules.
    - Evaluate rules against sample data.

## Example

### Create Rule

1. Enter a rule string in the "Create Rule" section (e.g., `age > 30 AND department = 'Sales'`).
2. Click "Create Rule".
3. The AST representation of the rule will be displayed.

### Combine Rules

1. Enter multiple rule strings in the "Combine Rules" section, one per line.
2. Click "Combine Rules".
3. The combined AST will be displayed.

### Evaluate Rule

1. Enter JSON data in the "Evaluate Rule" section (e.g., `{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}`).
2. Click "Evaluate Rule".
3. The evaluation result will be displayed, indicating whether the user meets the combined rule criteria.


## Conclusion

The Rule Engine with AST provides a robust framework for evaluating complex rules against user data. The use of AST allows for efficient parsing, combination, and evaluation of rules, making this project suitable for various decision-making applications.
