import React, { Component } from "react";

class ResultRow extends Component {
    render() {
        let thumbnail;
        if (this.props.thumbnail !== undefined) {
            thumbnail = <img src={this.props.thumbnail} alt="CityStash Thumbnail" />;
        } else {
            thumbnail = <img src="/images/logo.png" alt="CityStash Thumbnail" />;
        }

        let currency = this.props.ccy === "GBP" ? "£" : "€";
        let open_late = this.props.open_late === true ? "Yes" : "No";

        return (
            <div className="resultBox">
                <div>
                    <div className="resultsImageContainer">
                        {thumbnail}
                        <span className="resultsCurrency">
              First day only {currency}{" "}
                            {(this.props.first_day_cost / 100).toFixed(2)}
            </span>
                    </div>
                </div>
                <div style={{ padding: "0 10px" }}>
                    <h1 style={{ margin: "10px 0" }}>
                        {this.props.name}, {this.props.location_name}
                    </h1>
                    <p className="resultAddress">{this.props.address}</p>
                    <p className="resultPopularity">
                        Popularity: {this.props.bags_last_30_days} recent bookings
                    </p>
                    <p className="resultOpenLate">Open Late: {open_late} </p>
                    <p className="resultDescription">{this.props.description}</p>
                </div>
            </div>
        );
    }
}

export default ResultRow;
