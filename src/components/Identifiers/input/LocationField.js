import React, { Component } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import L from "leaflet";

class LocationField extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateMarker = this.updateMarker.bind(this);

    this.state = {
      mapId: Math.random().toString()
    };
  }

  componentDidMount = () => {
    this.map = L.map(this.state.mapId, {
      center: [0,0],
      zoom: 0,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    let setFieldValue = this.props.setFieldValue;
    let name = this.props.name;
    this.map.on("click", function(e) {
      console.log(e.latlng);
      setFieldValue(name, [e.latlng.lat, e.latlng.lng], true);
    });

    // add layer
    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarker();
  };

  componentDidUpdate() {
    // check if data has changed
    this.updateMarker();
  }

  updateMarker() {
    const coordinates = this.props.values[this.props.name];
    this.layer.clearLayers();
    if (coordinates.length == 2 && !this.props.errors[this.props.name]) {
      L.marker(coordinates).addTo(this.layer);
    }
  }

  render() {
    const { name } = this.props;
    const coordinates = this.props.values[name];
    let setFieldValue = this.props.setFieldValue;

    const style = {
      height: "200px",
      width: "100%"
    };
    return (
      <div>
        <div className="locationMap" style={style} id={this.state.mapId} />
        <input type="text" value={coordinates[0]} onChange={(e) => {setFieldValue(name, [e.target.value, coordinates[1]], true);}} />
        <input type="text" value={coordinates[1]} onChange={(e) => {setFieldValue(name, [coordinates[0], e.target.value], true);}} />
        <div>{this.props.errors[name]}</div>
      </div>
    );
  }
}

export default LocationField;
