import React from 'react';

class Form extends React.Component {
  state = { question: '',answer: '' }

  handleSubmit = (e) => {
    console.log("inside form")
    e.preventDefault()
    const { question,answer } = this.state
    if(this.props.qa2!==null && this.props.qa2.id !== 0)
      this.props.editQA(this.props.qa2.id,question,answer)
    else
      this.props.addQA(question,answer)
    this.setState({ question: '',answer: '' })
  }

  handleQuestionChange = (e) => {
    this.setState({ question: e.target.value })
  }
  handleAnswerChange = (e) => {
    this.setState({ answer: e.target.value })
  }


  render() {
    
    
    if(this.props.qa2!==null && this.props.qa2.id!==0){
      debugger
      this.setState({ question: this.props.qa2.question, answer: this.props.qa2.answer})
    }
    const { question,answer } = this.state
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input 
          value={question}
          onChange={this.handleQuestionChange}
          required 
          placeholder="Question" 
        />
        <input 
          value={answer}
          onChange={this.handleAnswerChange}
          required 
          placeholder="Answer" 
        />
        <input type="submit" value="Submit" />
        </form>
        </div>
    )
  }
}

export default Form