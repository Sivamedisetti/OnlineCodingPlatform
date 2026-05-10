const buildInfo = {
  releaseVersion: process.env.REACT_APP_RELEASE_VERSION || 'local',
  releaseCodename: process.env.REACT_APP_RELEASE_CODENAME || 'Development',
  buildTimestamp: process.env.REACT_APP_BUILD_TIMESTAMP || 'local build',
  buildEnvironment: process.env.REACT_APP_BUILD_ENVIRONMENT || process.env.NODE_ENV || 'development'
};

export const appSpecLog = [
  '#AppSpec',
  `Release Version: ${buildInfo.releaseVersion}`,
  `Release Codename: ${buildInfo.releaseCodename}`,
  `Build Timestamp: ${buildInfo.buildTimestamp}`,
  `Build Environment: ${buildInfo.buildEnvironment}`
].join('\n');

export default buildInfo;
