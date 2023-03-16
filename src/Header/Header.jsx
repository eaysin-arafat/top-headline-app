import React from "react";
import { newsCategory } from "../news/newsCategory";
import shortid from "shortid";

class Header extends React.Component {
  state = {
    searchTerm: "",
  };

  searchBarRef = React.createRef();

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
    if (e.target.value === "") {
      this.props.resetAll();
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.search(this.state.searchTerm);
    }
  };

  componentDidMount() {
    this.searchBarRef.current.focus();
  }

  render() {
    const { category, changeCategory } = this.props;
    return (
      <div className='my-3'>
        <h1 className='mb-3' style={{ fontWeight: "300" }}>
          Block Buster Headlines
        </h1>

        <input
          ref={this.searchBarRef}
          type='search'
          className='form-control'
          placeholder='Type Anything & Press Enter to Search'
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <div className='my-3'>
          {newsCategory &&
            Object.keys(newsCategory).map((item) => {
              return (
                <button
                  key={shortid.generate()}
                  className={`btn btn-sm mr-2 mb-1 ${
                    category === newsCategory[item]
                      ? "btn-warning"
                      : "btn-light "
                  }`}
                  onClick={() => changeCategory(newsCategory[item])}
                >
                  {`#${newsCategory[item]}`}
                </button>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Header;
