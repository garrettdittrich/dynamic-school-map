import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet'

class VideoOverlayExample extends React.Component {
  state = {
    play: true,
    bounds: [[32, -130], [13, -100]],
    maxbounds: [[-300, -180], [85, 200]],
    mapbounds: [[-300, -180], [85, 200]]
  }

  formatLatLng(south, north)  {
    var sCoords = [south['lng'], -200];
    var nCoords = [north['lng'] , 200]
    console.log(sCoords, nCoords)
    return [sCoords, nCoords]
  }
   formatLatLng(south, north)  {
    var sCoords = [south['lng'], -200];
    var nCoords = [north['lng'] , 200]
    console.log(sCoords, nCoords)
    return [sCoords, nCoords]
  }
  onTogglePlay = () => {
    this.setState({ play: !this.state.play })
  }
  componentDidMount() {
    var w = 4950,
    h = 4246,
    url = 'http://i.imgur.com/EiqPHmH.jpg';
    var map = this.refs.a.leafletElement

    var southWest = this.refs.a.leafletElement.unproject([0, h], this.refs.a.leafletElement.getMaxZoom()-1);
    var northEast = this.refs.a.leafletElement.unproject([w, 0], this.refs.a.leafletElement.getMaxZoom()-1);
    console.log(northEast, southWest)
    
    var computedBounds = this.formatLatLng(southWest, northEast)
    var ogBounds = new L.LatLngBounds(southWest, northEast);
    //console.log(this.state.bounds)
    this.setState({ bounds: computedBounds, maxbounds: computedBounds })
    console.log(map)
    //this.refs.a.leafletElement.setMaxBounds(ogBounds);
    
    
    
  }
  render() {
    return (
      <Map ref="a" center={[0, 0]} onClick={this.onTogglePlay} zoom={2.5} minZoom={2} maxZoom={3} maxBounds={this.state.maxbounds}  >
        
         <ImageOverlay
          bounds={this.state.maxbounds}
          
          url="http://i.imgur.com/EiqPHmH.jpg"
        />
      </Map>
    )
  }
}
render(<VideoOverlayExample />, document.getElementById('container'));