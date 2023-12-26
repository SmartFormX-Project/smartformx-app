const path = require("path");
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer && config.name === "server") {
      const oldEntry = config.entry;
      env.config({ path: "./.env.local" });
      return {
        ...config,
        async entry(...args) {
          const entries = await oldEntry(...args);
          return {
            ...entries,
            worker: path.resolve(
              process.cwd(),
              "app/(backend)/workers/analyse.ts"
            ),
          };
        },
      };
    }
  },
};
