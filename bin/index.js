#! /usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');

const getPackageJson = () => {
  const file = fs.readFileSync('./package.json');

  if (file) {
    return JSON.parse(file);
  }

  return null;
};

const getFlowCoverage = () => {
  const file = fs.readFileSync('./coverage/flow-coverage.json');

  if (file) {
    return JSON.parse(file);
  }

  return null;
};

const updatePackageJsonThershold = ({
  packageJson,
  percent,
}) => {
  if (packageJson['flow-coverage-report'] && packageJson['flow-coverage-report'].threshold) {
    const updatePackageJson = packageJson;

    updatePackageJson['flow-coverage-report'].threshold = percent;

    fs.writeFileSync(
      './package.json',
      JSON.stringify(
        updatePackageJson,
        null,
        2,
      ),
    );
  } else {
    console.warning('package.json is incompatible');
  }
};

const main = () => {
  const packageJson = getPackageJson();

  if (packageJson === null) {
    console.warning('Unable to get package.json');

    return process.exit(0);
  }

  const flowCoverage = getFlowCoverage();

  if (flowCoverage === null) {
    console.warning('Unable to get flow-coverage.json');

    return process.exit(0);
  }

  if (flowCoverage.percent) {
    updatePackageJsonThershold({
      packageJson,
      percent: flowCoverage.percent,
    });
  } else {
    console.warning('flow-coverage.json is incompatible');
  }

  return process.exit(0);
};

main();
