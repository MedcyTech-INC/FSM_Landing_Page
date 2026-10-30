import React from "react";
import { LUMINOUS_BG_CONFIG } from "./luminousBgConfig";

export default function LuminousBackground() {
  const { colors, desktop, mobile } = LUMINOUS_BG_CONFIG;

  const desktopLayers = [
    `radial-gradient(circle ${desktop.topRightCircleSize} at ${desktop.topRightCenter}, ${colors.blueTopRightCore} 0%, ${colors.blueTopRightMid} 25%, ${colors.blueTopRightEdge} 55%, transparent 75%)`,
    `radial-gradient(ellipse ${desktop.goldHaloWidth} ${desktop.goldHaloHeight} at ${desktop.goldHaloCenter}, ${colors.goldHaloCore} 0%, ${colors.goldHaloMid} 40%, transparent 70%)`,
    `radial-gradient(circle ${desktop.bottomLeftCircleSize} at ${desktop.bottomLeftCenter}, ${colors.blueBottomLeftCore} 0%, ${colors.blueBottomLeftMid} 35%, ${colors.blueBottomLeftEdge} 60%, transparent 80%)`,
    `radial-gradient(ellipse ${desktop.centerGlowWidth} ${desktop.centerGlowHeight} at ${desktop.centerGlowCenter}, ${colors.warmWhiteCenter} 0%, ${colors.warmWhiteCenter} 28%, ${colors.warmWhiteCenterSoft} 50%, transparent 82%)`,
    `radial-gradient(ellipse ${desktop.leftWashWidth} ${desktop.leftWashHeight} at ${desktop.leftWashCenter}, ${colors.mintTopLeft} 0%, ${colors.mintTopLeftMid} 20%, ${colors.tealGreyMid1} 50%, ${colors.tealGreyMid2} 70%, transparent 95%)`,
    `radial-gradient(ellipse ${desktop.rightWashWidth} ${desktop.rightWashHeight} at ${desktop.rightWashCenter}, ${colors.skyBlueRight2} 0%, ${colors.skyBlueRight1} 40%, transparent 75%)`,
    `linear-gradient(135deg, ${colors.tealGreyMid1} 0%, ${colors.coolPaleGrey1} 30%, ${colors.coolPaleGrey2} 65%, ${colors.skyBlueRight2} 100%)`,
  ].join(", ");

  const mobileLayers = [
    `radial-gradient(circle ${mobile.topRightCircleSize} at ${mobile.topRightCenter}, ${colors.blueTopRightCore} 0%, ${colors.blueTopRightMid} 25%, ${colors.blueTopRightEdge} 55%, transparent 75%)`,
    `radial-gradient(ellipse ${mobile.goldHaloWidth} ${mobile.goldHaloHeight} at ${mobile.goldHaloCenter}, ${colors.goldHaloCore} 0%, ${colors.goldHaloMid} 40%, transparent 70%)`,
    `radial-gradient(circle ${mobile.bottomLeftCircleSize} at ${mobile.bottomLeftCenter}, ${colors.blueBottomLeftCore} 0%, ${colors.blueBottomLeftMid} 35%, ${colors.blueBottomLeftEdge} 60%, transparent 80%)`,
    `radial-gradient(ellipse ${mobile.centerGlowWidth} ${mobile.centerGlowHeight} at ${mobile.centerGlowCenter}, ${colors.warmWhiteCenter} 0%, ${colors.warmWhiteCenter} 28%, ${colors.warmWhiteCenterSoft} 50%, transparent 82%)`,
    `radial-gradient(ellipse ${mobile.leftWashWidth} ${mobile.leftWashHeight} at ${mobile.leftWashCenter}, ${colors.mintTopLeft} 0%, ${colors.mintTopLeftMid} 20%, ${colors.tealGreyMid1} 50%, ${colors.tealGreyMid2} 70%, transparent 95%)`,
    `radial-gradient(ellipse ${mobile.rightWashWidth} ${mobile.rightWashHeight} at ${mobile.rightWashCenter}, ${colors.skyBlueRight2} 0%, ${colors.skyBlueRight1} 40%, transparent 75%)`,
    `linear-gradient(135deg, ${colors.tealGreyMid1} 0%, ${colors.coolPaleGrey1} 30%, ${colors.coolPaleGrey2} 65%, ${colors.skyBlueRight2} 100%)`,
  ].join(", ");

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-0"
    >
      <style>{`
        .luminous-screen-canvas {
          background-image: ${desktopLayers};
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        @media (max-width: 1024px) {
          .luminous-screen-canvas {
            background-image: ${mobileLayers};
          }
        }
      `}</style>
      <div className="sticky top-0 left-0 w-full h-screen h-[100dvh] luminous-screen-canvas" />
    </div>
  );
}
