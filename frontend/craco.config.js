const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@redux": path.resolve(__dirname, "src/redux/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
    },
  },
};
