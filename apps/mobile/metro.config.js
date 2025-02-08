// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "hono/client") {
    return {
      type: "sourceFile",
      filePath: path.resolve(
        __dirname,
        "../..",
        "node_modules/hono/dist/client/index.js"
      ),
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
