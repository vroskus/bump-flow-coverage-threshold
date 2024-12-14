#! /usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');

const identSize = 2;
const errorExitCode = 0;

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

const updatePackageJsonThreshold = ({
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
        identSize,
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

    return process.exit(errorExitCode);
  }

  const flowCoverage = getFlowCoverage();

  if (flowCoverage === null) {
    console.warning('Unable to get flow-coverage.json');

    return process.exit(errorExitCode);
  }

  if (flowCoverage.percent) {
    updatePackageJsonThreshold({
      packageJson,
      percent: flowCoverage.percent,
    });
  } else {
    console.warning('flow-coverage.json is incompatible');
  }

  return process.exit(errorExitCode);
};

main();
