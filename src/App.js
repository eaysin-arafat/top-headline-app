import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import News, { newsCategory } from "./news/newsCategory";
import Header from "./Header/Header";
import Pagination from "./Components/Pagination/Pagination";
import NewsList from "./Components/NewsList.jsx/NewsList";
import Loading from "./Components/Loading/Loading";

const news = new News(newsCategory.technology);
class App extends React.Component {
  state = {
    data: {},
    isLoading: true,
  };

  aboutRestlt = React.createRef();

  resetAll = () => {
    this.setState({ isLoading: true });
    news
      .reset()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Somenting Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  changeCategory = (category) => {
    this.setState({ isLoading: true });
    news
      .changeCategory(category)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Somenting Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  search = (searchTerm) => {
    this.setState({ isLoading: true });
    news
      .search(searchTerm)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Somenting Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    news
      .getNews()
      .then((data) => {
        console.log(data);
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Somenting Went Wrong");
        this.setState({ isLoading: false });
      });
  }

  gotoTop = () => {
    window.scroll(0, this.aboutRestlt.current.scrollTop);
  };

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true });
    }
    news
      .next()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Somenting Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  prev = () => {
    if (this.state.data.isPrevious) {
      this.setState({ isLoading: true });
    }
    news
      .prev()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Somenting Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  handlePageChange = (value) => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value),
      },
    });
  };

  goToPage = () => {
    this.setState({ isLoading: true });
    news
      .setCurrentPage(this.state.data.currentPage)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Somenting Went Wrong");
        this.setState({ isLoading: false });
      });
  };

  render() {
    const {
      article,
      isPrevious,
      isNext,
      category,
      totalResults,
      currentPage,
      totalPage,
    } = this.state.data;
    return (
      <div style={{ margin: "0 auto", width: "500px" }}>
        <div>
          <Header
            changeCategory={this.changeCategory}
            category={this.state.data.category}
            search={this.search}
            resetAll={this.resetAll}
          />
          <div
            ref={this.aboutRestlt}
            className='d-flex justify-content-between'
          >
            <p className='text-black-50'>About {totalResults} results found</p>
            <p className='text-black-50 ml-auto'>
              {currentPage} page of {totalPage}
            </p>
          </div>
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <div>
              <NewsList news={article} category={category} clallName='mb-2' />
              <Pagination
                next={this.next}
                prev={this.prev}
                isPrevious={isPrevious}
                isNext={isNext}
                totalPage={totalPage}
                currentPage={currentPage}
                handlePageChange={this.handlePageChange}
                goToPage={this.goToPage}
              />
              <button className='btn btn-secondary' onClick={this.gotoTop}>
                Go To Top
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default App;
