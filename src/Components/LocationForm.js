import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

class LocationForm extends React.Component {
    render() {
        const inputProps = {
            value: this.props.currentAddress,
            onChange: this.props.onAddressChange,
            placeholder: "Search Places..."
        };

        const cssClasses = {
            root: "form-group",
            input: "searchInput",
            autocompleteContainer: "autocomplete-container"
        };

        return (
            <form onSubmit={this.props.handleFormSubmit}>
                <PlacesAutocomplete inputProps={inputProps} classNames={cssClasses} />
                <button type="submit">Search</button>
            </form>
        );
    }
}

export default LocationForm;
