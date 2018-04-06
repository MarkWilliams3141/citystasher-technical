import React from "react";
import SimpleMap from "./SimpleMap";
import Control from "./Control";
import ResultsContainer from "./ResultsContainer";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialSearch: false,
            mapHeight: props.mapHeight,
            mapLat: 51.533,
            mapLng: -0.105,
            currentAddress: "",
            requestUrl: "",
            stashPoints: [],
            loadingResults: false,
            sortPopular: false,
            sortDistance: false,
            filterOpenLate: false
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePopularSort = this.handlePopularSort.bind(this);
        this.handleDistanceSort = this.handleDistanceSort.bind(this);
        this.handleOpenLateFilter = this.handleOpenLateFilter.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
    }

    buildUrl(url, parameters) {
        let qs = "";
        for (let key in parameters) {
            let value = parameters[key];
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1); //chop off last "&"
            url = url + "?" + qs;
        }
        return url;
    }

    updateResults() {
        geocodeByAddress(this.state.currentAddress)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState(
                    {
                        loadingResults: true,
                        initialSearch: true,
                        mapLat: latLng.lat,
                        mapLng: latLng.lng
                    },
                    () => {
                        let params = {
                            centre_lat: this.state.mapLat,
                            centre_lon: this.state.mapLng,
                            nearby_radius: 3.0
                        };

                        if (this.state.sortPopular) {
                            params.by_bags_last_30_days = "desc";
                        }

                        if (this.state.sortDistance) {
                            params.by_distance = "desc";
                        }

                        if (this.state.filterOpenLate) {
                            params.open_late = true;
                        }

                        fetch(
                            this.buildUrl(
                                "https://nameless-castle-51857.herokuapp.com/api/v1/stashpoints",
                                params
                            )
                        )
                            .then(resp => resp.json()) // Transform the data into json
                            .then(json => {
                                this.setState({
                                    stashPoints: json,
                                    loadingResults: false
                                });
                            })
                            .catch(error => console.error("Error", error));
                    }
                );
            })
            .catch(error => console.error("Error", error));
    }

    onAddressChange(address) {
        this.setState(prevState => ({
            currentAddress: address
        }));
    }

    handlePopularSort = () => {
        if (this.state.initialSearch) {
            this.setState(
                () => ({
                    sortDistance: false,
                    sortPopular: true
                }),
                this.updateResults()
            );
        }
    };

    handleDistanceSort = () => {
        if (this.state.initialSearch) {
            this.setState(
                () => ({
                    sortDistance: true,
                    sortPopular: false
                }),
                this.updateResults()
            );
        }
    };

    handleOpenLateFilter = event => {
        let checked = event.target.checked;
        if (this.state.initialSearch) {
            this.setState(
                () => ({
                    filterOpenLate: checked
                }),
                this.updateResults()
            );
        }
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.updateResults();
    };

    componentWillMount() {
        this.setState({ mapHeight: window.innerHeight - 160 + "px" });
    }

    /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
        this.setState({ mapHeight: window.innerHeight - 160 + "px" });
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        //to prevent memory leak
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        let opacity = 1.0;
        opacity = this.state.loadingResults ? (opacity = 0.3) : (opacity = 1.0);
        return (
            <div>
                <div style={{ height: this.state.controlHeight }}>
                    <Control
                        handlePopularSort={this.handlePopularSort}
                        handleDistanceSort={this.handleDistanceSort}
                        handleOpenLateFilter={this.handleOpenLateFilter}
                        handleFormSubmit={this.handleFormSubmit}
                        onAddressChange={this.onAddressChange}
                        currentAddress={this.state.currentAddress}
                        initialSearch={this.state.initialSearch}
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <div
                        className="resultsContainerOuter"
                        style={{
                            maxHeight: this.state.mapHeight,
                            opacity: opacity
                        }}
                    >
                        <ResultsContainer stashPoints={this.state.stashPoints} />
                    </div>
                    <div
                        className="resultsMapOuter"
                        style={{ height: this.state.mapHeight }}
                    >
                        <SimpleMap lat={this.state.mapLat} lng={this.state.mapLng} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
