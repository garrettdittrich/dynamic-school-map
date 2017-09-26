import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet'

class CustomPopup extends React.Component {
    constructor() {
        super()
        this.state = {
            aliveStyle: {
                color: 'Green',
                borderStyle: 'solid',
                borderColor: 'Green',
                borderWidth: '1px'
            },
            offlineStyle: {
                color: 'Red',
                borderStyle: 'solid',
                borderColor: 'Red',
                borderWidth: '1px'
            }
        }
    }
    componentDidMount() {
        
        console.log(this.state.offline)
        var popupRef = this.refs.popup
        popupRef.leafletElement.options.autoPan = false
        popupRef.leafletElement.options.closeButton = false
        
        
        this.setState({ipAddress: this.props.ip})
    }
    
    componentWillUnmount(){
        console.log('Unmounted')
    }
    
    
    render() {
        return(
            <Popup ref="popup">
                
                <span><font size={12}> {this.props.name} </font><br />
                      Ip address: {this.props.ip}<br />
                      The Host is: {this.props.ping == 'true' ? <span style={this.state.aliveStyle}>Alive </span> : 
                      <span style={this.state.offlineStyle}>Offline </span>}
                      
                    
                </span>
            </Popup> 
        )
    }
 }


export default CustomPopup;