import React, { Component } from 'react';

export class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#fcdf03" }}>
                    <div className="container-fluid">

                        <select className="form-select form-select-lg " aria-label=".form-select-lg example" name='Location' 
                            style={{ width: "fit-content" }} onChange={this.props.handle_Submit}>
                            <option>Location</option>
                            <option value="1,38">Kenya</option>
                            <option value="-6,35">Tanzania</option>
                            <option value="1.25,32.5">Uganda</option>
                            {/* Add more location options as needed */}
                        </select>
                        <a className="navbar-brand d-flex ml-auto display-2 text-dark fs-2 fw-bold text-uppercase "
                            style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }} href="/"
                        >
                            Hourly Weather Forecast Dashboard
                        </a>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;