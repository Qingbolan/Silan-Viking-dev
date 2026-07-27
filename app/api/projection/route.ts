import { NextResponse } from "next/server";
import { activeSilanDevContext, getRouteMatrix } from "../../../lib/site/projection";

export function GET() {
  return NextResponse.json({
    activeSite: activeSilanDevContext,
    routeMatrix: getRouteMatrix(),
  });
}
