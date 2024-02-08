import React, { Component } from 'react';

export class CardSection extends Component {
    render() {
        const { 
            highestTempHour, 
            highestTempProbability, 
            lowestTempHour, 
            lowestTempProbability, 
            highestPrecipHour, 
            highestPrecipProbability, 
            lowestPrecipHour, 
            lowestPrecipProbability 
        } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Highest Temperature Forecast</h5>
                                <p className="card-text">Hour: {highestTempHour}</p>
                                <p className="card-text">Forecast: {highestTempProbability}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Lowest Temperature Forecast</h5>
                                <p className="card-text">Hour: {lowestTempHour}</p>
                                <p className="card-text">Forecast: {lowestTempProbability}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Highest Precipitation Probability Forecast</h5>
                                <p className="card-text">Hour: {highestPrecipHour}</p>
                                <p className="card-text">Forecast: {highestPrecipProbability}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Lowest Precipitation Probability Forecast</h5>
                                <p className="card-text">Hour: {lowestPrecipHour}</p>
                                <p className="card-text">Forecast: {lowestPrecipProbability}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardSection;