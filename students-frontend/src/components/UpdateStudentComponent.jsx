import React, { Component } from "react";
import StudentService from "../services/StudentService";

class UpdateStudentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      email: ""
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  componentDidMount() {
    StudentService.getStudentById(this.state.id).then(res => {
      let student = res.data;
      this.setState({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      });
    });
  }

  updateStudent = e => {
    e.preventDefault();
    let student = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };
    console.log("student => " + JSON.stringify(student));
    console.log("id => " + JSON.stringify(this.state.id));
    StudentService.updateStudent(student, this.state.id).then(res => {
      this.props.history.push("/students");
    });
  };

  changeFirstNameHandler = event => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = event => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = event => {
    this.setState({ email: event.target.value });
  };

  cancel() {
    this.props.history.push("/students");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center mt-4">Update Student</h3>
              <div className="card-body p-0">
                <form>
                  <div className="form-group my-4">
                    <label> First Name: </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group my-4">
                    <label> Last Name: </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="form-group my-4">
                    <label> Email: </label>
                    <input
                      placeholder="Email Address"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>
                  <div className="my-2 w-100 d-flex justify-content-between">
                    <button
                      className="btn btn-success flex-grow-1 me-2"
                      onClick={this.updateStudent}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger flex-grow-1 ms-2"
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: "10px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateStudentComponent;
