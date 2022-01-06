// Import bar charts, all with Chart suffix
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import the Canvas renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import 'echarts/theme/macarons.js';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  SVGRenderer,
]);

export const customTreeShakedChart = echarts;
