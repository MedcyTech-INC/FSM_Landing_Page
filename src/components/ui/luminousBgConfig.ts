/**
 * FIELDCRUX Luminous Background Configuration
 * All colors, stop percentages, proportions, positions, and responsive scaling.
 * Edit values here to fine-tune the luminous background.
 */

export const LUMINOUS_BG_CONFIG = {
  // Color Palette
  colors: {
    // Left Aqua-Mint Wash
    mintTopLeft: "#7FC5C5",
    mintTopLeftMid: "#95D0CA",
    tealGreyMid1: "#BFDED9",
    tealGreyMid2: "#C4DCDE",

    // Center Warm White Glow & Pale Grey Wash
    warmWhiteCenter: "#FDF9F0",
    warmWhiteCenterSoft: "rgba(253, 249, 240, 0.88)",
    coolPaleGrey1: "#E9EDEC",
    coolPaleGrey2: "#ECEDF2",

    // Top-Right Soft Blue Circle & Iridescent Rim
    blueTopRightCore: "#267EC5",
    blueTopRightMid: "#3889CB",
    blueTopRightEdge: "#589DD4",
    goldHaloCore: "rgba(229, 169, 98, 0.28)",
    goldHaloMid: "rgba(223, 152, 82, 0.12)",

    // Bottom-Left Soft Blue Circle
    blueBottomLeftCore: "#3D89C7",
    blueBottomLeftMid: "#3F88CC",
    blueBottomLeftEdge: "rgba(63, 136, 204, 0.40)",

    // Right Pale Sky Blue Wash
    skyBlueRight1: "#73AEDA",
    skyBlueRight2: "#74B0D5",
  },

  // Desktop Dimensions & Coordinates (Proportions specified in prompt)
  desktop: {
    // Top-Right Circle: ~40% screen width, centered near top-right corner (~1/3 cropped)
    topRightCircleSize: "40vw",
    topRightCenter: "92% 8%",

    // Gold-Orange Halo on lower edge of top-right circle
    goldHaloWidth: "35vw",
    goldHaloHeight: "25vw",
    goldHaloCenter: "86% 28%",

    // Bottom-Left Circle: ~30% screen width, centered near bottom-left corner (~1/2 cropped)
    bottomLeftCircleSize: "30vw",
    bottomLeftCenter: "3% 95%",

    // Center Warm Glow: ~45% screen width, sits near center
    centerGlowWidth: "48vw",
    centerGlowHeight: "52vh",
    centerGlowCenter: "50% 50%",

    // Left Aqua-Mint Wash
    leftWashWidth: "44vw",
    leftWashHeight: "65vh",
    leftWashCenter: "0% 12%",

    // Right Sky Blue Wash
    rightWashWidth: "36vw",
    rightWashHeight: "80vh",
    rightWashCenter: "100% 50%",
  },

  // Tablet & Mobile Dimensions (scaled down ~25% so they don't dominate narrow screens)
  mobile: {
    topRightCircleSize: "30vw",
    topRightCenter: "94% 6%",

    goldHaloWidth: "26vw",
    goldHaloHeight: "20vw",
    goldHaloCenter: "88% 22%",

    bottomLeftCircleSize: "22.5vw",
    bottomLeftCenter: "2% 96%",

    centerGlowWidth: "35vw",
    centerGlowHeight: "38vh",
    centerGlowCenter: "50% 50%",

    leftWashWidth: "40vw",
    leftWashHeight: "50vh",
    leftWashCenter: "0% 10%",

    rightWashWidth: "30vw",
    rightWashHeight: "65vh",
    rightWashCenter: "100% 50%",
  },
};
