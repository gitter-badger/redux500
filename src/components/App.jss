const $colorWhite = "white";
const $colorBlack = "black";
const $colorPrimary = "black";
const $colorSecondary = "#53a0fd";
const $colorBorder = "#cccccc";
const $colorBackground = "#eaeaea";
const $fontFamily = "Helvetica Neue, sans-serif";
const $fontSize = "16px";

module.exports = {
  "html": {
    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"
  },
  "body": {
    "color": $colorPrimary,
    "background": $colorWhite,
    "font-size": $fontSize,
    "font-family": $fontFamily,
    "font-weight": 300
  },
  "html, body, #root": {
    "height": "100%"
  },
  ".test-class": {
    "color": "blue",
    "font-size": "26px"
  },
  "a": {
    "color": $colorSecondary
  },
  "h1": {
    "font-weight": 300,
    "text-align": "center"
  }
};
