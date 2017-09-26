import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet'


class Slider extends React.Component {
    constructor() {
        super()
        this.showValue = this.showValue.bind(this)
    }

    showValue(newValue)
    {
        console.log(this.refs.a)
    }

    render() {
        return (
            <div  id="slider">
                <input ref="a" type="range" min="0" max="50" value="0" step="5" onchange={this.showValue(this.value)} />
                <span id="range">0</span>
            </div>
        )
    }
}

export default Slider;