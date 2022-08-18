import React, { Component } from "react";
import StudentService from "../services/StudentService";

class CreateStudentComponent extends Component {
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
    this.saveOrUpdateStudent = this.saveOrUpdateStudent.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      StudentService.getStudentById(this.state.id).then(res => {
        let student = res.data;
        this.setState({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email
        });
      });
    }
  }
  saveOrUpdateStudent = e => {
    e.preventDefault();
    let student = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    };
    console.log("student => " + JSON.stringify(student));

    if (this.state.id === "_add") {
      StudentService.createStudent(student).then(res => {
        this.props.history.push("/students");
      });
    } else {
      StudentService.updateStudent(student, this.state.id).then(res => {
        this.props.history.push("/students");
      });
    }
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

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center mt-4">Add Student</h3>;
    } else {
      return <h3 className="text-center mt-4">Update Student</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
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
                      onClick={this.saveOrUpdateStudent}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger flex-grow-1 ms-2"
                      onClick={this.cancel.bind(this)}
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

export default CreateStudentComponent;
