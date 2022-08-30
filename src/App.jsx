import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from './shared/Button/Button';
import ModalWindow from './shared/Modal/Modal';
import * as API from './components/services/pixabay';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [currentLargeImageURL, setCurrentLargeImageURL] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query !== '') {
      addImages(query, page);
    }
  }, [query, page]);

  const onFormSubmit = newQuery => {
    if (newQuery.trim().length === 0) {
      alert('Please, enter request');
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setItems([]);
  };

  const addImages = async (query, page) => {
    try {
      setIsLoading(true);
      const image = await API.loadImage(query, page);
      setItems(prevState => [...prevState, ...image]);
      setIsLoading(false);

      if (image.length === 0) {
        alert(
          "Sorry, we can't find anyting for your request. Please, enter another request"
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={onFormSubmit} isLoading={isLoading} />
      {error && <p>{error}</p>}
      {items.length > 0 && (
        <ImageGallery items={items} onClick={setCurrentLargeImageURL} />
      )}
      {isLoading && (
        <ThreeDots height="50" width="50" color="#303f9f" ariaLabel="loading" />
      )}
      {items.length > 0 && (
        <Button
          onLoadMore={() => setPage(prev => prev + 1)}
          isLoading={isLoading}
        />
      )}
      {currentLargeImageURL && (
        <ModalWindow
          src={currentLargeImageURL}
          closeModal={() => setCurrentLargeImageURL('')}
        />
      )}
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     page: 1,
//     query: '',
//     items: [],
//     currentLargeImageURL: '',
//     error: null,
//     isLoading: false,
//   };

//   onOpenModalWithLargeImage = url => {
//     this.setState({
//       currentLargeImageURL: url,
//     });
//   };

//   onModalClose = () => {
//     this.setState({
//       currentLargeImageURL: '',
//     });
//   };

//   onFormSubmit = query => {
//     if (query.trim().length === 0) {
//       alert('Please, enter request');
//       return;
//     }

//     this.setState({
//       query,
//       page: 1,
//       items: [],
//     });
//   };

//   onLoadMoreButton = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   addImages = async (query, page) => {
//     try {
//       this.setState({
//         isLoading: true,
//       });
//       const images = await API.loadImage(query, page);

//       this.setState(prevState => ({
//         items: [...prevState.items, ...images],
//         isLoading: false,
//       }));
//       if (images.length === 0) {
//         alert(
//           "Sorry, we can't find anyting for your request. Please, enter another request"
//         );
//       }
//     } catch (error) {
//       this.setState({
//         error: error.message,
//       });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       prevState.page !== this.state.page ||
//       prevState.query !== this.state.query
//     ) {
//       this.addImages(this.state.query, this.state.page);
//     }
//   }

//   render() {
//     const { items, currentLargeImageURL, isLoading, error } = this.state;

//     return (
//       <Container>
//         <Searchbar onSubmit={this.onFormSubmit} isLoading={isLoading} />
//         {error && <p>{error}</p>}
//         {items.length > 0 && (
//           <ImageGallery
//             items={items}
//             onClick={this.onOpenModalWithLargeImage}
//           />
//         )}
//         {isLoading && (
//           <ThreeDots
//             height="50"
//             width="50"
//             color="#303f9f"
//             ariaLabel="loading"
//           />
//         )}
//         {items.length > 0 && (
//           <Button onLoadMore={this.onLoadMoreButton} isLoading={isLoading} />
//         )}
//         {currentLargeImageURL && (
//           <ModalWindow
//             src={currentLargeImageURL}
//             closeModal={this.onModalClose}
//           />
//         )}
//       </Container>
//     );
//   }
// }
