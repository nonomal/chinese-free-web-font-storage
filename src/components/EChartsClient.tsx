import { atom } from '@cn-ui/reactive';
import { onCleanup, onMount } from 'solid-js';
import { type EChartsCoreOption, type ECharts as _ECharts } from 'echarts/core';
const renderSVGChart = async (reporter: EChartsCoreOption, dom: HTMLElement | null = null) => {
    const { echarts } = await import('../routes/[lang]/fonts/[font]/_detail/registerEcharts');
    const myChart = echarts.init(dom, null, {
        renderer: 'svg',
        ssr: false,
        height: 400,
        width: 600,
    });
    myChart.setOption(reporter);

    return myChart;
};

export const ECharts = (props: {
    options: EChartsCoreOption;
    onReady?: (chart: _ECharts) => void;
    height?: string;
}) => {
    const dom = atom<HTMLElement | null>(null);
    let myChart: _ECharts;

    onMount(async () => {
        myChart = await renderSVGChart(props.options, dom());
        setTimeout(() => {
            myChart.resize({
                height: props.height ? parseInt(props.height) : 400,
                width: 'auto',
            });
        }, 0);
        props.onReady && props.onReady(myChart);
    });

    onCleanup(() => {
        myChart?.dispose();
    });
    return (
        <div
            ref={dom}
            class="m-auto flex w-full items-center justify-center rounded-xl bg-white"
            style={{ height: props.height ?? '400px' }}
        ></div>
    );
};
