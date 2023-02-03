import { calculateByte } from '@/common/utils/number';
import { createColor } from '@/common/utils/string';

export default {
  grid: {
    top: '80px',
    right: '0',
    bottom: '24px',
    left: '50px',
    show: true,
    borderColor: 'transparent'
  },
  title: {
    text: 'Redis 储存情况',
    subtext: 'Redis storage situation'
  },
  tooltip: {
    trigger: 'axis',
    extraCssText:'min-width: 200px;',
    formatter([a, b, c]) {
      const axisValue = a.axisValue;
      const label = axisValue.length > 40 ? axisValue.slice(0, 40) + '...' : axisValue;
      const style_spaceBetween = 'display: flex;justify-content: space-between;';
      const style_point = 'display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 6px; background:';
      const html = `<div>${label}
        <p style='${style_spaceBetween}'>
          <strong><span style='${style_point}#6767fd;'></span>${a.seriesName}</strong>
          <span>${a.value}</span>
        </p>
        <p style='${style_spaceBetween}'>
          <strong><span style='${style_point}#67fdd8;'></span>${b.seriesName}</strong><span>${b.value}</span>
        </p>
        <p style='${style_spaceBetween}'>
          <strong><span style='${style_point}#a567fd;'></span>${c.seriesName}</strong><span>${calculateByte(c.value)}</span>
        </p>
      </div>`;
      return html;
    }
  },
  xAxis: {
    type: 'category',
    data: [],
    axisTick: { show: false },
    axisLabel: {
      formatter(value) {
        if (value.length < 9) return value;
        return value.slice(0, 9) + '...';
      }
    }
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '缓存时间',
      type: 'bar',
      stack: 'total',
      symbol: 'none',
      smooth: true,
      data: [],
    },
    {
      name: '过期时间',
      type: 'bar',
      stack: 'total',
      symbol: 'none',
      smooth: true,
      data: [],
    },
    {
      name: '大小',
      type: 'bar',
      stack: 'total',
      symbol: 'none',
      smooth: true,
      data: [],
      itemStyle: {
        color: function () {
          return createColor() + '99'
        }
      },
    },
  ]
};
