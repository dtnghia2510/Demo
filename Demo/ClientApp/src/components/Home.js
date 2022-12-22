import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = { 
      listNumber: '',
      listNumberAfterOrder: '',
    };
  }

  componentDidMount = () => {
    this.randomData();
  }


  randomData() {
    let data = '1'
    for (let index = 2; index <= 50; index++) {
      data = data +  ',' + index
    }
    this.setState({
      listNumber: data
    })
  }

  handleChange = (e) => {
    const {name, value} = e.target
    console.log(name, value);
    this.setState({
      listNumber: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5285/demo?parameter=${this.state.listNumber}`);
    // console.log('response', response);
    // console.log('response', await response.text());
    var data = await response.json()
    this.setState({ listNumberAfterOrder: data});
  }

  render() {
    let response = this.state.listNumberAfterOrder
    let firstNumbers, secondNumbers, thirdNumbers, otherNumbers = ''
    if(response){
      firstNumbers = response.firstNumbers.length > 0 ? response.firstNumbers.map(x => x).join(',') : ""
      secondNumbers = response.secondNumbers.length > 0 ? response.secondNumbers.map(x => x).join(',') : ""
      thirdNumbers = response.thirdNumbers.length > 0 ? response.thirdNumbers.map(x => x).join(',') : ""
      otherNumbers = response.otherNumbers.length > 0 ? response.otherNumbers.map(x => x).join(',') : ""
    }
    return (
      <div>
        <label>Please input list number for re-order (split with ,)</label>
        <input type='text' className='form-control' 
              value={this.state.listNumber} name='listNumber'
              onChange={(e) => this.handleChange(e)}/>
        <button className='btn btn-success mt-2' 
              onClick={(e) => this.handleSubmit(e)}>Submit</button>
        <h3>List number before re-order</h3>
        <h5>{this.state.listNumber}</h5>
        <h3>List number after re-order</h3>
        <h5>{response ? 
         `<${secondNumbers}>, 
          <${otherNumbers}>, 
          <${firstNumbers}>, 
          <${otherNumbers}>, 
          <${thirdNumbers}>` : ""}
        </h5>
      </div>
    );
  }
}
