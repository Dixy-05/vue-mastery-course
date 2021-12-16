module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.customElement = true;
        options.compilerOptions.isCustomElement = (tag) =>
          tag === "trix-editor";
        return options;
      });
  },
};
