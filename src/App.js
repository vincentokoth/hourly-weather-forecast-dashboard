import React, { Component } from 'react';
import CardSection from './components/CardSection';
import ChartSection from './components/ChartSection';
import Header from './components/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 1,
      longitude: 38,
      weatherData: {},
      highestTempHour: '',
      highestTempProbability: '',
      lowestTempHour: '',
      lowestTempProbability: '',
      highestPrecipHour: '',
      highestPrecipProbability: '',
      lowestPrecipHour: '',
      lowestPrecipProbability: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${this.state.latitude}&longitude=${this.state.longitude}&hourly=temperature_2m,precipitation_probability&forecast_days=1`
      );
      const jsonData = await response.json();

      // Determine highest and lowest temperature probability
      const temperatureProbabilities = jsonData.hourly.temperature_2m;
      const highestTempProbability = Math.max(...temperatureProbabilities);
      const lowestTempProbability = Math.min(...temperatureProbabilities);
      const highestTempIndex = temperatureProbabilities.indexOf(highestTempProbability);
      const lowestTempIndex = temperatureProbabilities.indexOf(lowestTempProbability);

      // Determine highest and lowest temperature hours
      const temperatureHours = jsonData.hourly.time;
      const highestTempHour = temperatureHours[highestTempIndex];
      const lowestTempHour = temperatureHours[lowestTempIndex];

      // Determine highest and lowest precipitation probability
      const precipitationProbabilities = jsonData.hourly.precipitation_probability;
      const highestPrecipProbability = Math.max(...precipitationProbabilities);
      const lowestPrecipProbability = Math.min(...precipitationProbabilities);
      const highestPrecipIndex = precipitationProbabilities.indexOf(highestPrecipProbability);
      const lowestPrecipIndex = precipitationProbabilities.indexOf(lowestPrecipProbability);

      // Determine highest and lowest precipitation hours
      const precipitationHours = jsonData.hourly.time;
      const highestPrecipHour = precipitationHours[highestPrecipIndex];
      const lowestPrecipHour = precipitationHours[lowestPrecipIndex];

      this.setState({ 
        weatherData: jsonData,
        highestTempHour,
        highestTempProbability,
        lowestTempHour,
        lowestTempProbability,
        highestPrecipHour,
        highestPrecipProbability,
        lowestPrecipHour,
        lowestPrecipProbability
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
    this.interval = setInterval(() => this.fetchData(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit = async (event) => {
    const selectedOption = event.target.value;
    const [latitude, longitude] = selectedOption.split(',');
    
    await this.setState({ latitude, longitude, weatherData: {} }, () => {
        this.fetchData();
    });
  };

  render() {
    const { weatherData, highestTempHour, highestTempProbability, lowestTempHour, lowestTempProbability, highestPrecipHour, highestPrecipProbability, lowestPrecipHour, lowestPrecipProbability } = this.state;

    return (
      <div>
        <Header handle_Submit={this.handleSubmit} />
        <CardSection
          highestTempHour={highestTempHour}
          highestTempProbability={highestTempProbability+"°C"}
          lowestTempHour={lowestTempHour}
          lowestTempProbability={lowestTempProbability+"°C"}
          highestPrecipHour={highestPrecipHour}
          highestPrecipProbability={highestPrecipProbability+"mm"}
          lowestPrecipHour={lowestPrecipHour}
          lowestPrecipProbability={lowestPrecipProbability+"mm"}
        />
        <ChartSection
          temperature={weatherData.hourly ? weatherData.hourly.temperature_2m : []}
          precipitationProbability={weatherData.hourly ? weatherData.hourly.precipitation_probability : []}
        />
      </div>
    );
  }
}