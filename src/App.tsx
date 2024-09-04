import Header from './components/Header';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          // @ts-ignore
          merge(existing, incoming){
            return incoming;
          }
        },
        projects: {
          // @ts-ignore
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache
})

const App = ():JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
