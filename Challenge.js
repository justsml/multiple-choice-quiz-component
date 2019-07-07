import React from 'react';
import marked from 'marked';
import injectSheet from 'react-jss';

const styles = {
  outerBox: {
    maxWidth: '620px',
    margin: '1em auto',
    border: '1px solid #ccc',
    padding: '0em 1em 1em 1em'
  },
  description: {},
  optionList: {
    // cursor: 'pointer',
    listStyle: 'none',
    margin: '0',
    paddingLeft: '1em'
  },
  optionItem: {
    cursor: 'pointer',
    margin: '1.2em 0.25em',
    padding: '0.5em',
    border: '1px solid transparent',
    '> *': {
      cursor: 'pointer',
    },
    '&:hover': { 
      border: '1px solid #333'
    }
  },
  optionItemCompleted: {
    margin: '1.2em 0.25em',
    padding: '0.5em',
    border: '1px solid transparent'    
  }
}

const isHtml = text => text.split(/<[^>]+>/).length > 1
const isMarkdown = text => text.split(/^#/).length >= 1

class Challenge extends React.Component {
  state = {
    selection: '',
    attempts: 0
  }

  componentDidMount() {
    this.loadState()
  }

  saveState = () => {
    const { attempts, selection } = this.state
    const data = JSON.stringify({ attempts, selection })
    console.log('saving cachedState', data)
    localStorage.setItem("Challenge_" + this.props.title, data)
  }

  loadState = () => {
    let cachedState = localStorage.getItem("Challenge_" + this.props.title)
    console.log('loading cachedState', this.props.title, cachedState)
    cachedState = cachedState ? JSON.parse(cachedState) : {
      attempts: 0,
      selection: ''
    }
    this.setState(cachedState)
  }

  isCorrect = (answer) => {
    if (answer === this.props.answer) return true
    return this.state.selection === this.props.answer
  }

  tryAnswer = option => {
    const isCorrect = this.isCorrect()
    this.props.onAnswer({correct: isCorrect, value: option, questionTitle: this.props.title })
    if (isCorrect) return null
    this.setState((state, props) => ({ selection: option, attempts: ++state.attempts }))
    setTimeout(this.saveState, 1)
  }

  getOption = option => {
    const { classes } = this.props;
    const selectionIcon = this.state.selection === option && option === this.props.answer ? "✅ "
      : "⬜ "

    return (
      <li key={option}
        onClick={() => this.tryAnswer(option)}
        className={this.isCorrect() ? classes.optionItemCompleted : classes.optionItem}
      >
        <span>{selectionIcon}</span>
        <label>{option}</label>
      </li>
    )
  }

  reset = () => {
    this.setState({ attempts: 0, selection: '' }, () => setTimeout(this.saveState, 1))
    
  }

  getMarkdownHtml = (markdown) => {
    return ({
      __html: marked(markdown, {
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
    })
  }

  render() {
    const { classes } = this.props;
    let challengeClasses = classes.outerBox + " challenge-block " + (this.isCorrect() ? classes.correct : classes.incorrect)
    // this.isCorrect()

    return (<section className={challengeClasses} >
      <h1>{this.props.title}</h1>
      <div className={classes.description} dangerouslySetInnerHTML={this.getMarkdownHtml(this.props.description)} />
      <blockquote>Please select from the following options:</blockquote>
      <ul className={classes.optionList}>
        {this.props.options.map(this.getOption)}
      </ul>
      {this.state.attempts > 0 && <div className={"status"}>
        {`Attempts: ${this.state.attempts}`}
        {this.isCorrect() ? ` ✅ Correct: ${this.state.selection}` : " ❌ "}
        <button onClick={this.reset}>Reset</button>
      </div>}
      {this.isCorrect() && <div className={"explanation"}>{this.props.explanation}</div>}
    </section>)
  }
}


export default injectSheet(styles)(Challenge);
