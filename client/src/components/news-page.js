import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions/posts';
import { Container, Item, Header} from 'semantic-ui-react';

export class NewsPage extends React.Component {
    componentDidMount() {
        return this.props.dispatch(getPosts());
    }

    render() {
        let posts = this.props.posts ? this.props.posts.map(post => (<Item>
            <Item.Image size='small' src={post.image} />
      
            <Item.Content>
              <Item.Header as='h2'>{post.title}</Item.Header>
              <Item.Description>
                <p><small>submitted by {post.author.username} {post.date}</small></p>
                <p>{post.body}</p>
              </Item.Description>
            </Item.Content>
          </Item>)) : 'no posts to show yet'

        
        return (
            <Container>
                <Header size="huge">Latest MPK News</Header>
                <Item.Group>
                    {posts}
                </Item.Group>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    posts: state.post.posts
});

export default connect(mapStateToProps)(NewsPage)