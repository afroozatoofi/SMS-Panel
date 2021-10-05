import React, { Component } from "react";
import Card from "../components/card";
import Grid from "../components/grid";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rows: [],
      loading: true,
      text: "",
      tel: "",
      id: 1
    };
  }
  async componentDidMount() {
    let data = await this.getData();
    this.setState({ data: data, loading: false });
  }

  send = async () => {
    // sendSms(this.state.tel, this.state.text);
    let { rows, id } = this.state
    rows.push({id: id, user: this.state.tel, text: this.state.text, sender: "Afrooz", status: 1});
    this.setState(rows);
    this.setState({
      tel: "",
      text: "",
      loading: false,
      id: id+1
    });
  };

  getData = async () => {
    let data = {
      columns: [
        {
          label: "ID",
          name: "id",
          width: "10px"
        },
        {
          label: "Mobile No.",
          name: "user",
          width: "200px"
        },
        {
          label: "Text",
          name: "text",
          width: "200px"
        },
        {
          label: "Sender",
          name: "sender",
          width: "200px"
        },
        {
          label: "Status",
          name: "status",
          type: "boolean",
          width: "200px",
          search: [
            {
              key: 0,
              value: "Error!"
            },
            {
              key: 1,
              value: "Success"
            }
          ],
          mapper: value => {
            switch (value) {
              case 0:
                return "Error!";
              case 1:
                return "";
              default:
                return "";
            }
          }
        }
      ]
    };
    return data;
  };

  render() {
    return (
      <div className="container-fluid">
        <Card title="Send SMS">
          <div className="row">
            <label className="col-sm-4 col-md-3 col-lg-2 required">
              Mobile Number
            </label>
            <input
              type="text"
              className="form-control col-sm-8 col-md-5 col-lg-4"
              value={this.state.tel}
              onChange={e => this.setState({ tel: e.target.value })}
            />
          </div>
          <div className="row">
            <label className="col-sm-4 col-md-3 col-lg-2 required">
              Text
            </label>
            <input
              type="text"
              className="form-control col-sm-8 col-md-5 col-lg-4"
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
            />
          </div>
          <div className="btn-group">
            <button className="btn btn-warning" onClick={this.send}>
              Send
            </button>
          </div>
        </Card>
        <Card title="Logs">
          <Grid
            data={this.state.data}
            rows={this.state.rows}
            loading={this.state.loading}
            props={this.props}
          />
        </Card>
      </div>
    );
  }
}

export default Main;
