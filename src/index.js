import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet'
import Slider from './components/slider'
import ReactSlider from 'react-slider'
import DeviceNode from './components/DeviceNode'
import Request from 'superagent'
import _       from 'lodash'

class VideoOverlayExample extends React.Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    

    
  
  }
  state = {
    play: true,
    bounds: [[32, -130], [13, -100]],
    maxbounds: [[-300, -180], [85, 200]],
    mapbounds: [[-300, -180], [85, 200]],
    url: 'http://127.0.0.1:5000/api/node',


    //slider state
    range: 'range',
    value: '',
    value2: '',

    sliderStyle: {
      width: '100%'
    }
   
  }

  

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleChange2(event) {
    this.setState({value2: event.target.value});
  }

  formatLatLng(south, north)  {
    var sCoords = [south['lng'], -200];
    var nCoords = [north['lng'] , 200];
    console.log(sCoords, nCoords)
    return [sCoords, nCoords]
  }
   formatLatLng(south, north)  {
    var sCoords = [south['lng'], -200]
    var nCoords = [north['lng'] , 200]
    console.log(sCoords, nCoords)
    return [sCoords, nCoords]
  }
  onTogglePlay = () => {
    this.setState({ play: !this.state.play })
  }
  componentDidUpdate() {
    
  }
  componentWillMount() {
    Request.get(this.state.url).then((response) => {
      
      this.setState({nodes: response.body.objects})
      console.log(this.state.nodes[0].location.split(',')[0])
      
      
  })

  }
  
  componentDidMount() {
    var w = 4950,
    h = 4246,
    url = 'http://i.imgur.com/EiqPHmH.jpg';
    var map = this.refs.a.leafletElement

    var southWest = this.refs.a.leafletElement.unproject([0, h], this.refs.a.leafletElement.getMaxZoom()-1)
    var northEast = this.refs.a.leafletElement.unproject([w, 0], this.refs.a.leafletElement.getMaxZoom()-1)
    
    
    var computedBounds = this.formatLatLng(southWest, northEast)
    var ogBounds = new L.LatLngBounds(southWest, northEast);
    //console.log(this.state.bounds)
    this.setState({ bounds: computedBounds, maxbounds: computedBounds })
    
    //this.refs.a.leafletElement.setMaxBounds(ogBounds);
    console.log(this.state.nodes)
    //Testing Root API
    
    
  
  
    
    
  }
  render() {
    const position = [39,-102]
    if (!this.state.nodes) {
      return (
        <div>   
           <Map ref="a" center={[30, 0]} onClick={this.onTogglePlay} zoom={2.5} minZoom={2} maxZoom={3} maxBounds={this.state.maxbounds}  >
             
             <ImageOverlay
               bounds={this.state.maxbounds}
               
               url="http://i.imgur.com/EiqPHmH.jpg"
             />
           </Map>
           
        </div>
       )
    }
    
    return (
     <div>   
        <Map ref="a" center={[30, 0]} onClick={this.onTogglePlay} zoom={2.5} minZoom={2} maxZoom={3} maxBounds={this.state.maxbounds}  >
          {
            Object.keys(this.state.nodes).map((key) => {
              console.log('one iteration')
              let loc1 = this.state.nodes[key].location.split(',')[0]
              let loc2 = this.state.nodes[key].location.split(',')[1]

              let name = this.state.nodes[key].name
              return <DeviceNode key={key} name={name} node={this.state.nodes} position={[loc1,loc2]} id={1}/>
            })
          }
          <ImageOverlay
            bounds={this.state.maxbounds}
            
            url="http://i.imgur.com/EiqPHmH.jpg"
          />
        </Map>
        
        
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input style={this.state.sliderStyle} type="range" min="-300" max="300" id="slider1" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <span> {this.state.value} </span>

      <form onSubmit={this.handleSubmit2}>
        <label>
          Name:
          <input style={this.state.sliderStyle} type="range" min="-300" max="300" id="slider1" value={this.state.value2} onChange={this.handleChange2} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <span> {this.state.value2} </span>

      
          
          
        
     </div>
    )
  }
}
render(<VideoOverlayExample />, document.getElementById('container'));