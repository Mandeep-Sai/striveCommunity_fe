import React, { Component } from "react";
import { Form, Container, Button, Col } from "react-bootstrap";
import axios from "axios";

export class JoinForm extends Component {
  state = {
    info: {
      name: "",
      striveId: "",
      linkedInUrl: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      lat: "",
      lng: "",
    },
  };
  updateForm = async (e) => {
    let info = this.state.info;
    let id = e.currentTarget.id;

    info[id] = e.currentTarget.value;
    if (id === "zip") {
      info[id] = parseInt(e.currentTarget.value);
    }
    this.setState({ info });
  };

  sendInfo = async (e) => {
    e.preventDefault();
    var url = "https://maps.googleapis.com/maps/api/geocode/json";
    var postUrl = "http://localhost:3007/students";
    await axios
      .get(url, {
        params: {
          address:
            this.state.info.address +
            this.state.info.city +
            this.state.info.state +
            this.state.info.zip,
          key: "AIzaSyCOkjTz6RSQBRGtI63oiP4i4UtSp8WoXgQ",
        },
      })
      .then((response) => {
        let coordinates = response.data.results[0].geometry.location;
        this.setState((prevState) => ({
          info: {
            ...prevState.info,
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
        }));
      });
    axios.post(postUrl, { data: this.state.info }).then((res) => {
      alert("Added successfully");
      this.setState((prevState) => ({
        info: {
          ...prevState,
          name: "",
          striveId: "",
          linkedInUrl: "",
          email: "",
          address: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          lat: "",
          lng: "",
        },
      }));
    });
  };
  render() {
    return (
      <Container className="form">
        <p className="text-center display-4">Join the Community</p>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={this.state.info.name}
                onChange={this.updateForm}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Strive ID</Form.Label>
              <Form.Control
                type="text"
                id="striveId"
                value={this.state.info.striveId}
                onChange={this.updateForm}
                placeholder="Strive ID"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Linked In URL</Form.Label>
              <Form.Control
                type="text"
                id="linkedInUrl"
                value={this.state.info.linkedInUrl}
                onChange={this.updateForm}
                placeholder="Enter your Linked In profile URL"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={this.state.info.email}
                onChange={this.updateForm}
                placeholder="Your email"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                id="address"
                value={this.state.info.address}
                onChange={this.updateForm}
                placeholder="1234 Main St"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                type="text"
                onChange={this.updateForm}
                value={this.state.info.address2}
                id="address2"
                placeholder="Apartment, studio, or floor"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                id="city"
                value={this.state.info.city}
                onChange={this.updateForm}
                placeholder="City"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>State</Form.Label>
              <Form.Control
                id="state"
                value={this.state.info.state}
                onChange={this.updateForm}
                placeholder="State"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                id="zip"
                value={this.state.info.zip}
                onChange={this.updateForm}
                placeholder="zip"
              />
            </Form.Group>
          </Form.Row>

          <Button
            variant="primary"
            className="submit"
            onClick={this.sendInfo}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default JoinForm;
