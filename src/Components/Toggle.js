import React, { Component } from "react";

class Toggle extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>{this.props.text}</span>
                    <label
                        aria-checked="false"
                        className="switch switch_type1"
                        role="switch"
                    >
                        <input
                            type="checkbox"
                            className="switch__toggle"
                            onChange={this.props.handleOpenLateFilter}
                        />
                        <span className="switch__label" />
                    </label>
                </div>
            </div>
        );
    }
}

export default Toggle;