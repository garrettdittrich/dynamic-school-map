import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet'
import CustomPopup from './CustomPopup'
import Request from 'superagent'


class DeviceNode extends React.Component {
    constructor() {
        super()
        this.toggleActive = this.toggleActive.bind(this)
        
    }
    
    
    state = {
        alive: false,
        test: 'This is some text',
        hasBeenClicked: false,
        textForPop: 'Test',
        increment: 1,

        //State for Popup window
        nodeId: null,
        ip: null,
        ping: null,
        
        
    }

    componentWillMount(){
        
    }

    toggleActive(){
        
            let url = 'http://127.0.0.1:5000/api/node/1'
            Request.get(url).then((response) => {
                this.setState({ip: response.body.ip})
                this.setState({name: response.body.name})
                this.setState({ping: response.body.alive})
                
            })
        
        
        this.setState({increment: ++this.state.increment})
        
        
    }
    componentDidMount() {
        const markerRef = this.refs.marker
        this.setState({nodeId: this.props.id, name: this.props.name})
        
    }

    
    render() {
        
        if (!this.props.position) {
            console.log('!!!!!NO API DATA')
            return <div> Whatever </div>
        }
            var loc1 =this.props.node[0].location.split(',')[0]
            var loc2 =this.props.node[0].location.split(',')[1]

            
            return( 
                <Marker ref="marker" position={[this.props.position[0], this.props.position[1]]} onclick={this.toggleActive}>
                    <CustomPopup clicked={this.state.hasBeenClicked} text={this.state.textForPop} ip={this.state.ip} name={this.state.name} 
                                ping={this.state.ping}
                    />
                </Marker>
                )
        
        
        }
}

export default DeviceNode;

    
