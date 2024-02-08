import React, { Component } from 'react';
import Chart from "react-apexcharts";

export class ChartSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            temperatureChartData: {
                options: {
                    chart: {
                        id: 'temperature-chart',
                        toolbar: {
                            show: false
                        }
                    },
                    grid: {
                        show: false
                    },
                    title: {
                        text: "Temperature (°C)",
                        style: {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: "#fcdf03"
                        }
                    },
                    xaxis: {
                        type: "datetime",
                        labels: {
                            style: {
                                colors: '#fcdf03'
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return value.toFixed(1) + "°C";
                            },
                            style: {
                                colors: '#fcdf03'
                            }
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'dd MMM yyyy'
                        }
                    },
                    colors: ["#fcdf03"],
                    fill: {
                        colors: ["#fcdf03"],
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0,
                            stops: [0, 90, 100]
                        }
                    },
                },
                series: [{
                    name: 'Temperature',
                    data: []
                }]
            },
            precipitationProbabilityChartData: {
                options: {
                    chart: {
                        id: 'precipitation-probability-chart',
                        toolbar: {
                            show: false
                        }
                    },
                    grid: {
                        show: false
                    },
                    title: {
                        text: "Precipitation Probability (%)",
                        style: {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: "#fcdf03"
                        }
                    },
                    xaxis: {
                        type: "datetime",
                        labels: {
                            style: {
                                colors: '#fcdf03'
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                return value.toFixed(1) + "%";
                            },
                            style: {
                                colors: '#fcdf03'
                            }
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'dd MMM yyyy'
                        }
                    },
                    colors: ["#fcdf03"],
                    fill: {
                        colors: ["#73BFFF"], // Blue color gradient for water
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0,
                            stops: [0, 90, 100]
                        }
                    },
                },
                series: [{
                    name: 'Precipitation Probability',
                    data: []
                }]
            }
        };
    }

    componentDidUpdate(prevProps) {
        console.log('Temperature:', this.props.temperature);
        console.log('Precipitation Probability:', this.props.precipitationProbability);
        if (prevProps.temperature !== this.props.temperature || prevProps.precipitationProbability !== this.props.precipitationProbability) {
            const temperatureData = this.props.temperature.map((value, index) => ({
                x: new Date(new Date().setHours(0, 0, 0, 0) + index * 3600 * 1000),
                y: value
            }));
            const precipitationProbabilityData = this.props.precipitationProbability.map((value, index) => ({
                x: new Date(new Date().setHours(0, 0, 0, 0) + index * 3600 * 1000),
                y: value
            }));
            const temperatureChartData = { ...this.state.temperatureChartData };
            temperatureChartData.series[0].data = temperatureData;
            const precipitationProbabilityChartData = { ...this.state.precipitationProbabilityChartData };
            precipitationProbabilityChartData.series[0].data = precipitationProbabilityData;
            this.setState({ temperatureChartData, precipitationProbabilityChartData });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Chart
                            options={{
                                ...this.state.temperatureChartData.options,
                                title: {
                                    text: "Temperature (°C)",
                                    style: {
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: "#fcdf03"
                                    }
                                },
                                yaxis: {
                                    ...this.state.temperatureChartData.options.yaxis,
                                    labels: {
                                        formatter: function (value) {
                                            return value.toFixed(1) + "°C";
                                        },
                                        style: {
                                            colors: '#fcdf03'
                                        }
                                    }
                                }
                            }}
                            series={this.state.temperatureChartData.series}
                            type="area"
                            height="300"
                        />
                    </div>
                    <div className="col-md-6">
                        <Chart
                            options={{
                                ...this.state.precipitationProbabilityChartData.options,
                                title: {
                                    text: "Precipitation Probability (%)",
                                    style: {
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: "#fcdf03"
                                    }
                                },
                                yaxis: {
                                    ...this.state.precipitationProbabilityChartData.options.yaxis,
                                    labels: {
                                        formatter: function (value) {
                                            return value.toFixed(1) + "%";
                                        },
                                        style: {
                                            colors: '#fcdf03'
                                        }
                                    }
                                }
                            }}
                            series={this.state.precipitationProbabilityChartData.series}
                            type="area"
                            height="300"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartSection;