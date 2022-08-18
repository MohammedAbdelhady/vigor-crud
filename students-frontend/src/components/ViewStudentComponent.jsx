import React, { Component } from "react";
import StudentService from "../services/StudentService";

class ViewStudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      student: {}
    };
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then(res => {
      this.setState({ student: res.data });
    });
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center mt-4"> View Student Details</h3>
          <div className="card-body px-3">
            <div className="d-flex">
              <label> First Name: </label>
              <div className="ms-1"> {this.state.student.firstName}</div>
            </div>
            <div className="d-flex">
              <label> Last Name: </label>
              <div className="ms-1"> {this.state.student.lastName}</div>
            </div>
            <div className="d-flex">
              <label> Email: </label>
              <div className="ms-1"> {this.state.student.email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewStudentComponent;
