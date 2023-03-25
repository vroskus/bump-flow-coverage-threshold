# @vroskus/bump-flow-coverage-threshold

Tool for bumping flow static type check coverage threshold value in package.json.

## Installation

Call:

`npm install -D @vroskus/bump-flow-coverage-threshold`

`yarn add -D @vroskus/bump-flow-coverage-threshold`

## Usage

1. Make sure that you have run [flow-coverage-report](https://www.npmjs.com/package/flow-coverage-report) and it has generated a "json" type report into `coverage` output directory. Here is a configuration example:

```json
// package.json
...
  "flow-coverage-report": {
    "threshold": 0,
    "outputDir": "coverage",
    "reportTypes": [
      "json"
    ]
  },
...
```

3. Call `bump-flow-coverage-threshold` after running flow check, for example:

```json
// package.json
...
  "scripts": {
    "flow": "flow-coverage-report",
    "postflow": "bump-flow-coverage-threshold"
  }
...
```

When the tool is called, it finds coverage information, compares new value with the stored threshold value in the package.json, and updates it if the new value is greater then the stored one.
