import { resource, atom, computed } from '@cn-ui/reactive';
import { Show, type JSX } from 'solid-js';
import { ECharts } from '../fontDisplay/ECharts';
import prettyBytes from 'pretty-bytes';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export const useHotCDN = () => {
    const hotSubCDN = atom<{ key: string[]; value: number }[]>([]);
    resource(() => {
        return fetchEventSource(
            'https://cache-api.deno.dev?url=https://chinese-fonts-cdn.deno.dev/v1/deno-kv?get=["records","hit_cdn"]',
            {
                onmessage(e) {
                    hotSubCDN((i) => [...i, JSON.parse(e.data)]);
                },

                onerror(err) {
                    throw err;
                },
            }
        );
    });
    return hotSubCDN;
};
export type ImageKitAnalyzeData = {
    name: string;
    count: number;
    storage_bytes: {
        total: number;
    };
    original_cache_storage_bytes: {
        total: number;
    };
    request: {
        total: number;
        dateWise: {
            labels: Array<string>;
            datasets: Array<{
                fillColor: string;
                data: Array<number>;
            }>;
        };
        pattern: Array<{
            name: string;
            count: number;
        }>;
    };
    bandwidth: {
        total: number;
        dateWise: {
            labels: Array<string>;
            datasets: Array<{
                fillColor: string;
                data: Array<number>;
            }>;
        };
        pattern: Array<{
            name: string;
            count: number;
        }>;
    };
    topImages: {
        bandwidthWise: Array<{
            url: string;
            bandwidth: number;
            views: number;
        }>;
        requestWise: Array<{
            url: string;
            bandwidth: number;
            views: number;
        }>;
    };
    topVideos: {
        bandwidthWise: Array<any>;
        requestWise: Array<any>;
    };
    topOthers: {
        bandwidthWise: Array<{
            url: string;
            bandwidth: number;
            views: number;
        }>;
        requestWise: Array<{
            url: string;
            bandwidth: number;
            views: number;
        }>;
    };
    top404: {
        t404: Array<{
            url: string;
            views: number;
        }>;
    };
    formatWise: Array<{
        name: string;
        bandwidth: number;
        count: number;
    }>;
    referral: {
        items: Array<{
            name: string;
            bandwidth: number;
            count: number;
        }>;
    };
    country: {
        count: number;
        bandwidth: number;
        items: Array<{
            name?: string;
            bandwidth: number;
            count: number;
            code?: string;
        }>;
    };
    transform: {
        count: number;
        bandwidth: number;
        items: Array<{
            name: string;
            bandwidth: number;
            count: number;
        }>;
    };
    videoTransform: {
        count: number;
        bandwidth: number;
        items: Array<any>;
    };
    savings: {
        sav: number;
        size: number;
        savingsTrend: {
            labels: Array<any>;
            datasets: Array<{
                fillColor: string;
                data: Array<any>;
            }>;
        };
    };
    networkDistribution: {};
    statusCodeWise: Array<{
        name: number;
        count: number;
    }>;
    errorCodeWise: Array<{
        name: string;
        count: number;
    }>;
    browserDistribution: Array<{
        name: string;
        count: number;
        bandwidth: number;
    }>;
    topIps: Array<{
        name: string;
        count: number;
        bandwidth: number;
    }>;
    topUserAgent: Array<{
        name: string;
        count: number;
        bandwidth: number;
    }>;
    deviceDistribution: Array<{
        name: string;
        count: number;
        bandwidth: number;
    }>;
    deviceTypeDistribution: Array<{
        name: string;
        count: number;
        bandwidth: number;
    }>;
    resultType: Array<{
        name: string;
        count: number;
        bandwidth: number;
    }>;
    videoProcessingUnits: {
        total: number;
        videoProcessingResolutionData: {
            SD: number;
            HD: number;
            '4K': number;
            '8K': number;
            '16K': number;
        };
        dateWise: Array<{
            date: string;
            duration: {
                SD: number;
                HD: number;
                '4K': number;
                '8K': number;
                '16K': number;
            };
            vpuUsage: {
                SD: number;
                HD: number;
                '4K': number;
                '8K': number;
                '16K': number;
            };
        }>;
    };
    extensionUnits: {
        total: number;
        extensionWiseOperations: {
            'aws-auto-tagging': number;
            'google-auto-tagging': number;
            'remove-bg': number;
        };
        dateWise: Array<any>;
    };
};

export const CDNAnalyze = () => {
    const data = resource<ImageKitAnalyzeData[]>(() => {
        return fetch(
            'https://cache-api.deno.dev/index.js?url=https://imagekit-analyze.deno.dev/index.js'
        )
            .then((res) => res.json())
            .then((res) => res.filter(Boolean));
    });
    const combineReferer = computed(() => {
        if (!data()) return [];
        const mapper = new Map<string, { name: string; count: number; bandwidth: number }>();
        data().forEach((i) => {
            return i.referral.items.map((j) => {
                if (mapper.has(j.name)) {
                    const old = mapper.get(j.name)!;
                    old.bandwidth += j.bandwidth;
                    old.count += j.count;
                } else {
                    mapper.set(j.name, j);
                }
            });
        });
        return [...mapper.values()].sort((a, b) => b.bandwidth - a.bandwidth);
    });
    return (
        <>
            <h2 class=" my-12 text-center text-3xl leading-9">中文网字计划 CDN 分析（近三天）</h2>
            <Show when={data()}>
                <section class="m-auto grid max-w-7xl grid-cols-2 gap-4">
                    <PieChart data={data()} key="request" title="请求数"></PieChart>
                    <PieChart
                        data={data()}
                        key="bandwidth"
                        title="请求带宽"
                        format={(q) => {
                            return prettyBytes(q);
                        }}
                    ></PieChart>
                    <LineChart data={data()} key={'bandwidth'} title="请求曲线图"></LineChart>
                    <ErrorChart data={data()}></ErrorChart>
                    <section class="max-h-96 overflow-scroll bg-white p-4">
                        <Table
                            data={combineReferer()}
                            render={{
                                name: (value) => (
                                    <a href={'https://' + value} target="_blank">
                                        {value}
                                    </a>
                                ),
                                count: (value) => <>{value}</>,
                                bandwidth: (value) => <>{prettyBytes(value)}</>,
                            }}
                        ></Table>
                    </section>
                    <CacheRate data={data()}></CacheRate>
                    <section class="col-span-2 row-span-2">
                        <GlobalMap data={data()}></GlobalMap>
                    </section>
                </section>
                <div class="h-24"></div>
            </Show>
        </>
    );
};

// 一个 table 表格，自动解析 props.data 的属性并渲染
function Table<T>(props: {
    data: T[];
    render?: Partial<{
        [key in keyof T]: (value: T[key]) => JSX.Element;
    }>;
}) {
    // 获取所有列名
    const columnNames = computed(() => Object.keys(props.data[0] ?? {}));
    const renderToDom = (value: any, render: any): any => {
        return render?.(value) ?? value;
    };
    return (
        <table class="font-sans">
            <thead>
                <tr>
                    {columnNames().map((columnName) => (
                        <th>{columnName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map((item) => (
                    <tr>
                        {columnNames().map((columnName) => (
                            <td>{renderToDom(item[columnName], props.render?.[columnName])}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

import worldJSON from './datamaps.world.json';
import { echarts } from '../fontDisplay/registerEcharts';
import { MapChart } from 'echarts/charts';
import { VisualMapComponent } from 'echarts/components';
echarts.use([MapChart]);
echarts.registerMap('Global', worldJSON as any);
echarts.use([VisualMapComponent]);
function GlobalMap(props: { data: ImageKitAnalyzeData[] }) {
    // const data = computed(() => {
    //     const dataMap = new Map<string, { name: string; code: string; count: number }>();
    //     props.data.forEach((i) => {
    //         i.country.items.forEach((country) => {
    //             const name = nameMapper(country.name || 'China')
    //             country.name = name
    //             if (dataMap.has(name)) {
    //                 const old = dataMap.get(name)!;
    //                 old.count += country.count;
    //             } else {
    //                 dataMap.set(name, country as any);
    //             }
    //         });
    //     });
    //     return [...dataMap.values()];
    // });
    const mapper = {
        'USA (LA)': 'United States of America',
        UK: 'United Kingdom',
        Taiwan: 'China',
        Kong: 'China',
    };
    const nameMapper = (name: string) => {
        return mapper[name] ?? name;
    };
    return (
        <ECharts
            height="800px"
            options={{
                title: {
                    text: '全球访问',
                },
                visualMap: {
                    left: 'right',
                    min: 1000,
                    max: props.data.length * 6000,
                    inRange: {
                        color: [
                            '#66B3FF',
                            '#99CCFF',
                            '#CCE6FF',
                            '#FFCC99',
                            '#FF9966',
                            '#FF6633',
                            '#FF3300',
                        ],
                    },
                    text: ['High', 'Low'],
                    calculable: true,
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                },
                series: [
                    {
                        name: '访问数',
                        type: 'map',
                        map: 'Global',
                        emphasis: {
                            label: {
                                show: true,
                            },
                        },
                        data: props.data?.flatMap((server) => {
                            return server.country.items.map((i) => {
                                return { name: nameMapper(i.name || 'China'), value: i.count };
                            });
                        }),
                    },
                ],
            }}
        ></ECharts>
    );
}

function CacheRate(props: { data: ImageKitAnalyzeData[] }) {
    const titles = ['Hit', 'Miss', 'Error'];
    return (
        <ECharts
            options={{
                title: {
                    text: `缓存率分析`,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'value',
                },
                yAxis: {
                    type: 'category',
                    data: props.data.map((i) => i.name),
                },
                series: titles.map((i) => {
                    return {
                        name: i,
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                            formatter: (params: { value: number }) =>
                                Math.round(params.value * 1000) / 10 + '%',
                        },
                        emphasis: {
                            focus: 'series',
                        },
                        data: props.data.map(
                            (row) =>
                                (row.resultType.find((ii) => ii.name === i)?.count ?? 0) /
                                row.resultType.reduce((a, b) => a + b.count, 0)
                        ),
                    };
                }),
            }}
        />
    );
}

function ErrorChart(props: { data: ImageKitAnalyzeData[]; format?: (a: number) => string }) {
    const table = props.data.map((i) => {
        return Object.fromEntries(i.errorCodeWise.map((i) => [i.name, i.count]));
    });
    const titles = [...new Set(table.flatMap((i) => Object.keys(i)))];
    return (
        <ECharts
            options={{
                title: {
                    text: `请求错误分析`,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'value',
                },
                yAxis: {
                    type: 'category',
                    data: props.data.map((i) => i.name),
                },
                series: titles.map((i) => {
                    return {
                        name: i,
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true,
                        },
                        emphasis: {
                            focus: 'series',
                        },
                        data: table.map((row) => row[i] ?? 0),
                    };
                }),
            }}
        ></ECharts>
    );
}

function LineChart(props: {
    data: ImageKitAnalyzeData[];
    key: keyof ImageKitAnalyzeData;
    title: string;
    format?: (a: number) => string;
}) {
    return (
        <ECharts
            options={{
                title: {
                    text: `请求数折线`,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    top: '8%',
                    left: 'center',
                },
                xAxis: {
                    type: 'category',
                    data: props.data[0].bandwidth.dateWise.labels,
                },
                yAxis: {
                    type: 'value',
                },
                series: props.data.map((data) => {
                    return {
                        data: data.request.dateWise.datasets[0].data,
                        type: 'line',
                        name: data.name,
                        smooth: true,
                    };
                }),
            }}
        ></ECharts>
    );
}
function PieChart(props: {
    data: ImageKitAnalyzeData[];
    key: keyof ImageKitAnalyzeData;
    title: string;
    format?: (a: number) => string;
}) {
    const format = props.format ?? ((i: number) => new Intl.NumberFormat().format(i));
    const getItem = (a: any) => a[props.key] as ImageKitAnalyzeData['request'];
    const total = () => props.data.reduce((a, b) => a + getItem(b).total, 0);
    return (
        <ECharts
            options={{
                title: {
                    text: `${props.title}统计`,
                    subtext: `各个服务器${props.title}统计, 总数 ` + format(total()),
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    top: '15%',
                    left: 'center',
                },
                series: [
                    {
                        name: props.title,
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: ['50%', '70%'],
                        data: props.data.map((i, index) => {
                            return {
                                value: getItem(i).total,
                                name: [i.name, '-', format(getItem(i).total)].join(' '),
                            };
                        }),
                    },
                ],
            }}
        ></ECharts>
    );
}
