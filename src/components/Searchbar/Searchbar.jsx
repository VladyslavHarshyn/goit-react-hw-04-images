import PropTypes from 'prop-types';
import { Header, Form, Button, Span, Input } from './Searchbar.styled';
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  resetInput() {
    this.setState({ inputValue: '' });
  }

  render() {
    const { inputValue } = this.state;
    const { onSubmit, isLoading } = this.props;

    return (
      <Header>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(inputValue);
            this.resetInput();
          }}
        >
          <Button type="submit" disabled={isLoading}>
            <Span>Search</Span>
          </Button>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputValue}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
}
