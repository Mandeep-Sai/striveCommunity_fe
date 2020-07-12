import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Map } from "google-maps-react";

const style = {
  width: "100%",
  height: "100%",
  overflow: "auto",
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      selectedPlace: {},
      activeMarker: {},
      showingInfoWindow: false,
    };
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  componentDidMount = async () => {
    const response = await fetch("http://localhost:3007/students");
    const students = await response.json();
    this.setState({ students });
  };
  render() {
    return (
      <Map
        google={this.props.google}
        style={style}
        onClick={this.onMapClick}
        initialCenter={{
          lat: 52.5368,
          lng: 13.39494,
        }}
        zoom={7}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={"Strive School"}
          link={"https://www.linkedin.com/school/strive-school/"}
        />
        {this.state.students.map((student) => (
          <Marker
            name={student.name}
            link={student.linkedInUrl}
            position={{ lat: student.lat, lng: student.lng }}
            onClick={this.onMarkerClick}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div className="infoWindow">
            <p>{this.state.selectedPlace.name}</p>
            <p>
              <a href={this.state.selectedPlace.link} target="_blank">
                Visit LinkedIn profile
              </a>
            </p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCOkjTz6RSQBRGtI63oiP4i4UtSp8WoXgQ",
})(Home);
