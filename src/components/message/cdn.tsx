import { resource, atom } from '@cn-ui/reactive';
import { Show } from 'solid-js';
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
        return fetch('https://cache-api.deno.dev?url=https://imagekit-analyze.deno.dev')
            .then((res) => res.json())
            .then((res) => res.filter(Boolean));
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
                </section>
            </Show>
        </>
    );
};

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
