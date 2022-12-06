// external
import { BarConfig, HeatmapConfig, PieConfig } from "@ant-design/plots";
import { Types } from "@antv/g2";
import { TooltipMapping } from "@antv/g2plot/lib/types/tooltip";
// types
import { IHeatmapChart } from "@models/charts";

export interface HeatmapConfigFix
  extends Omit<HeatmapConfig, "tooltip" | "legend" | "data"> {
  tooltip:
  | false
  | (Omit<
    Types.TooltipCfg & TooltipMapping,
    "customContent" | "container"
  > & {
    customContent?: (
      title: string,
      // eslint-disable-next-line
      data: any[]
    ) => React.ReactNode | string | unknown;
    container?: React.ReactNode;
  });
  legend: boolean | Types.LegendCfg;
  data: IHeatmapChart[];
  xField: "year" | "month";
  yField: "month" | "year";
}

export interface PieConfigFix extends Omit<PieConfig, "tooltip"> {
  tooltip:
  | false
  | (Omit<
    Types.TooltipCfg & TooltipMapping,
    "customContent" | "container"
  > & {
    customContent?: (
      title: string,
      // eslint-disable-next-line
      data: any[]
    ) => React.ReactNode | string | unknown;
    container?: React.ReactNode;
  });
}

export interface BarConfigFix extends Omit<BarConfig, "tooltip"> {
  tooltip:
  | false
  | (Omit<
    Types.TooltipCfg & TooltipMapping,
    "customContent" | "container"
  > & {
    customContent?: (
      title: string,
      // eslint-disable-next-line
      data: any[]
    ) => React.ReactNode | string | unknown;
    container?: React.ReactNode;
  });
}
