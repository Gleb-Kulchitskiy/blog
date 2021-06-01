import React, {Component} from 'react'
import axios from 'axios'
import {articlesUrl} from "../../endpoints";
import {ListItem} from './ListItem'

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      sortColumn: 'id',
      order: 'desc'
    }
  }

  changeOrder = () => {
    this.setState((prev) => {
      return {
        order: prev.order === 'desc' ? 'asc' : 'desc'
      }
    }, () => {
      axios.get(`${articlesUrl()}/?sort_column=${this.state.sortColumn}&order_by=${this.state.order}`)
        .then(data => {
          this.setState({articles: data.data})
        })
    })
  }

  createArticle = () => {
    this.props.history.push('/article/new')
  }

  componentDidMount() {
    axios.get(`${articlesUrl()}/?sort_column=${this.state.sortColumn}&order_by=${this.state.order}`)
      .then(data => {
        this.setState({articles: data.data})
      })
  }

  render() {
    return (
      <div>
        <div className='Article-list'>
          <div className='Article-list-header'>
            <div className='Article-list-header-left'>
              <i onClick={this.changeOrder}
                 className={this.state.order === 'asc' ? "Arrow Arrow-up" : "Arrow Arrow-down"}>
              </i>
              <p>Article header</p>
            </div>
            <div className='Article-list-header-right'>
              <p>Creation date</p>
            </div>
          </div>
          <div className='Article-list-body'>
            {this.state.articles.map((article, index, array) => (
              <ListItem key={article.id} data={article} lastElement={index === array.length - 1}/>)
            )
            }
          </div>
        </div>
        <div className="Create-article">
          <button
            className="Create-article-button"
            onClick={this.createArticle}
          >
            Create
          </button>
        </div>
      </div>
    )
  }
}