module.exports = {
    extends: "airbnb-base",
    rules: {
      'import/no-extraneous-dependencies': [
        "warn", {"devDependencies": true}
      ],
    },
};
