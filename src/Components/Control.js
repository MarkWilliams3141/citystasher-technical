import React, { Component } from "react";
import Toggle from "./Toggle";
import LocationForm from "./LocationForm";
const FontAwesome = require("react-fontawesome");

class ControlToolbar extends Component {
    render() {
        let secondaryBarOpacity = 0.4;
        secondaryBarOpacity = this.props.initialSearch
            ? (secondaryBarOpacity = 1.0)
            : (secondaryBarOpacity = 0.4);

        return (
            <div>
                <div className="topBar">
                    <div className="logoContainer">
                        <img alt="CityStasher Logo" src="/images/logo.png" />
                    </div>
                    <div className="searchInputContainer">
                        <LocationForm
                            className="searchInput"
                            handleFormSubmit={this.props.handleFormSubmit}
                            onAddressChange={this.props.onAddressChange}
                            currentAddress={this.props.currentAddress}
                        />
                        <FontAwesome name="search" />
                    </div>
                </div>
                <div
                    className="secondaryBar"
                    style={{ display: "flex", opacity: secondaryBarOpacity }}
                >
                    <div>
                        <button
                            onClick={this.props.handleDistanceSort}
                            className="controlButton"
                        >
                            Sort by Distance
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={this.props.handlePopularSort}
                            className="controlButton"
                        >
                            Sort by Popularity
                        </button>
                    </div>
                    <div>
                        <div className="controlToggle">
                            <Toggle
                                handleOpenLateFilter={this.props.handleOpenLateFilter}
                                text="Open late only"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ControlToolbar;
