import React, { Component } from "react";
import ResultsRow from "./ResultRow";

class ResultsContainer extends Component {
    render() {
        let output = <div />;
        if (this.props.stashPoints.length === 0) {
            output = <div />;
        } else {
            output = (
                <div>
                    {this.props.stashPoints.map((e, i) => (
                        <ResultsRow
                            key={i}
                            name={e.name}
                            thumbnail={e.photos[0]}
                            description={e.description}
                            address={e.address}
                            location_name={e.location_name}
                            bags_last_30_days={e.bags_last_30_days}
                            ccy={e.pricing_structure.ccy}
                            open_late={e.open_late}
                            first_day_cost={e.pricing_structure.first_day_cost}
                        />
                    ))}
                </div>
            );
        }
        return <div>{output}</div>;
    }
}

export default ResultsContainer;