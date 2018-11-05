import React from 'react';

class Form extends React.Component {
  state = { question: '',answer: '' }

  componentDidUpdate(prevProps, prevState){
    console.log(prevProps)
    if(prevProps.id !== this.props.id){
      this.setState({...this.props})
    }
  }

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

  handleChange = (e) => {
    const {target: {name,value}} =e
    this.setState({ [name]:value })
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
        name="question"
          value={question}
          onChange={this.handleChange}
          required 
          placeholder="Question" 
        />
        <input 
        name="answer"
          value={answer}
          onChange={this.handleChange}
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