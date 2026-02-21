import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      title
      description
      icon
      color
      createdAt
    }
  }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: String!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      title
      description
      icon
      color
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
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
    }
  }
`;

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($id: String!, $input: UpdateTransactionInput!) {
    updateTransaction(id: $id, input: $input) {
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
      updatedAt
    }
  }
`;

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
    }
  }
`;
