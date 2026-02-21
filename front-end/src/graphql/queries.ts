import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      createdAt
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      title
      description
      icon
      color
      createdAt
      updatedAt
    }
  }
`;

export const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
      id
      description
      amount
      type
      date
      categoryId
      category {
        id
        title
        icon
        color
      }
      createdAt
      updatedAt
    }
  }
`;
