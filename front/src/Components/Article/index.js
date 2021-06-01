import React, {Component} from 'react'
import axios from "axios";
import queryString from 'query-string'
import {articlesUrl} from "../../endpoints";
import {formatDate} from "../../utils/date";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.getArticleId(props.history).id,
      article: {},
      editable: this.isEditable(props.history),
      editedContent: '',
      editedTitle: '',
      isNew: this.getArticleId(props.history).isNew
    }
  }

  getArticleId(history) {
    const finalPathPart = history?.location?.pathname?.split('/')[2]

    return {
      id: Number.isInteger(+finalPathPart) ? finalPathPart : null,
      isNew: finalPathPart === 'new'
    }
  }

  isEditable(history) {
    const {edit} = queryString.parse(history?.location?.search)

    return edit === 'true'
  }

  onContentChange = (e) => {
    this.setState((state) => ({
      ...state,
      editedContent: e.target.value
    }))
  }

  onTitleChange = (e) => {
    this.setState((state) => ({
      ...state,
      editedTitle: e.target.value
    }))
  }

  editArticle = () => {
    this.props.history.push(`/article/${this.state.article.id}?edit=true`)
    this.setState({
      editable: true,
      editedContent: this.state.article.content,
      editedTitle: this.state.article.heading,
    })
  }

  updateArticle = () => {
    axios.put(`${articlesUrl()}/${this.state.articleId}`, {
      dto: {
        ...this.state.article,
        content: this.state.editedContent,
        heading: this.state.editedTitle
      }
    })
      .then((data) => {
        this.setState(() => ({
          articleId: data.data.article.id,
          article: data.data.article,
          editable: false,
          editedContent: data.data.article.content,
          editedTitle: data.data.article.heading,
          isNew: false
        }))
      })
  }

  createArticle = () => {
    axios.post(`${articlesUrl()}`, {
      dto: {
        content: this.state.editedContent,
        heading: this.state.editedTitle
      }
    })
      .then((data) => {
        this.setState(() => ({
          articleId: data.data.article.id,
          article: data.data.article,
          editable: false,
          editedContent: data.data.article.content,
          editedTitle: data.data.article.heading,
          isNew: false
        }))
      })
  }

  turnOffEditable = () => {
    this.props.history.push(`/article/${this.state.article.id}`)
    // dirty hack
    this.setState({editable: false})
  }

  returnToList = () => {
    this.props.history.push(`/`)
  }

  deleteArticle = () => {
    axios.delete(`${articlesUrl()}/${this.state.articleId}`)
      .then(() => {
        this.props.history.push('/')
      })
  }

  componentDidMount() {
    this.state.articleId && axios.get(`${articlesUrl()}/${this.state.articleId}`)
      .then(data => {
        this.setState((state) => ({
          ...state,
          article: data.data,
          editedContent: data.data.content,
          editedTitle: data.data.heading,
        }))
      })
  }

  render() {
    const created = this.state.article.created_at ? formatDate(this.state.article.created_at) : {}
    const updated = this.state.article.updated_at ? formatDate(this.state.article.updated_at) : {}
    const editMode = this.state.editable || this.state.isNew

    return (
      <div className="Article-wrapper">
        <div className="Article-header">
          <div
            className={editMode ? "Article-header-title-editable" : "Article-header-title"}
            style={!this.state.article.updated_at ? {border: 'none'} : {}}
          >
            <p>Title:</p>
            {editMode
              ? <input
                value={this.state.editedTitle/* || this.state.article.heading*/}
                onChange={this.onTitleChange}
              />
              : <p>{this.state.article.heading}</p>}
          </div>
          {!editMode &&
          <div
            className="Article-header-created"
            style={!this.state.article.updated_at ? {border: 'none'} : {}}
          >
            <p> Created:</p>
            <i>{created.date}</i>
            <i>{created.time}</i>
          </div>
          }
          {!editMode && this.state.article.updated_at &&
          <div className="Article-header-updated">
            <p>Updated:</p>
            <i>{updated.date}</i>
            <i>{updated.time}</i>
          </div>
          }
        </div>
        <div className="Article-content">
          <p>Story:</p>
          {editMode
            ? <textarea
              className="Edit-article-textarea"
              value={this.state.editedContent /*|| this.state.article.content*/}
              onChange={this.onContentChange}
            />
            : <p>{this.state.article.content}</p>

          }
        </div>
        {editMode
          ? (<div className="Article-active-buttons">
            <button
              className="Article-active-buttons-edit"
              onClick={this.state.isNew ? this.createArticle : this.updateArticle}
            >
              save
            </button>
            <button className="Article-active-buttons-return"
                    onClick={this.state.isNew ? this.returnToList : this.turnOffEditable}
            >
              return
            </button>
          </div>)
          : (<div className="Article-active-buttons">
            <button className="Article-active-buttons-edit" onClick={this.editArticle}>edit</button>
            <button className="Article-active-buttons-delete" onClick={this.deleteArticle}>delete</button>
            <button className="Article-active-buttons-return" onClick={this.returnToList}>return</button>
          </div>)
        }
      </div>
    )
  }
}