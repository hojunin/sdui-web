import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  // 여기서 토큰을 가져오는 로직을 구현할 수 있습니다.
  // 예: localStorage나 다른 상태 관리 시스템에서 가져오기
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRsc2dod25zMTJAZ21haWwuY29tIiwic3ViIjoxLCJpYXQiOjE3MzgzMDY5MjIsImV4cCI6MTczODM5MzMyMn0.U6G87FoH2pwJJnqgFd0rFLDbv7sTyndL0Y33XO1YGAE';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
