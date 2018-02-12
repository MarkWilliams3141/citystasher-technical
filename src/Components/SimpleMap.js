import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class SimpleMap extends Component {
    static defaultProps = {
        zoom: 14
    };

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBQl0bh4haMV0M_5kkQvSGE7gqiamkQgy4" }}
                apiKey={""}
                center={{ lat: this.props.lat, lng: this.props.lng }}
                zoom={this.props.zoom}
            />
        );
    }
}

export default SimpleMap;