import React from 'react';
import Form from './components/Form';
import './App.css'
import {Button,Row,Col} from 'react-materialize';


class App extends React.Component {
  state = {
    lists: [],
    editing: null
  }

  componentDidUpdate(){
    
     this.interval= setInterval(()=>{
      const {lists} = this.state
      console.log("INSIDE UPDATE" + lists)
        if(lists){
          const randomQA = lists[Math.floor(Math.random()*lists.length)]
        document.getElementById("ques").innerHTML = randomQA.question
        document.getElementById("answer").innerHTML = randomQA.answer
        document.getElementById("ans").style.display = "none"
        }
      }, 5000);
    
    
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  addQA = (question,answer) => {
    const id = Math.floor(( 1 + Math.random()) * 0x1000)
    const { lists } = this.state
    const qa = { question, id, answer }
    this.setState({ lists: [qa, ...lists] })
    
  }
  deleteQA = (id) => {
    const lists = this.state.lists
    this.setState({ lists: lists.filter(t => t.id !==id)})

  }

  editQA = (id,question,answer)=>{
    const lists = this.state.lists
    const newList =lists.forEach((qa1) => {
        if (qa1.id === id) {
          qa1.question = question
          qa1.answer = answer
        }
    })
    debugger
    this.setState({ lists: [...newList] })
  }

  handleEdit = (qa) => (
    <Form qa2 = {qa} editQA={this.editQA} addQA={this.addQA} />
  )
   

  
  
  qaList = () => {
    return this.state.lists.map(qa => {
      return(
        <Row key={qa.id}>
          <Col m={3} className='grid-example'> {qa.question} </Col>
          <Col m={3} className='grid-example'> {qa.answer} </Col>
          <Col m={3} className='grid-example'> <Button onClick={()=>(this.handleEdit(qa))}>Edit</Button> </Col>
          <Col m={3} className='grid-example'> <Button onClick={()=>(this.deleteQA(qa.id))}>X</Button> </Col>
        </Row>
      )
    })
  }

  listButton = () =>{
    document.getElementById("list").style.display = "block"
    document.getElementById("play").style.display = "none"
  }

  playButton = () =>{
    document.getElementById("list").style.display = "none"
    document.getElementById("play").style.display = "block"
  }
  displayAnswer = () =>{
    document.getElementById("ans").style.display = "block"
  }

  render() {

      
    return (
      <div className="container">
        
          <h1>FlashCard</h1>
          <Button onClick={this.playButton}>Play</Button>
          <Button onClick={this.listButton}>List</Button>
          <div id="play">
            <h3>Question</h3>
            <h4><span id='ques'></span></h4>
            <div id="ans">
              <h3>Answer</h3>
              <h4><span id='answer'></span></h4>
            </div>
            <Button onClick={this.displayAnswer}>Click here for Answer</Button>
            </div>
          <div id="list">
            <Form qa2 = {null} editQA={this.editQA} addQA={this.addQA} />
            <div>
            {this.qaList()}
            </div>
        </div>
      </div>
    );
  }
}

export default App;
