module.exports = {
  stories: ["../src/**/*.story.js", "../src/**/*.stories.js"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-links",
    "@storybook/addon-actions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: false,
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ["../public"],
  features: {
    storyStoreV7: false, // Support legacy storiesOf API
  },
}
