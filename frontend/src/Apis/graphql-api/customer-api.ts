import { gql } from "@apollo/client";

export const GET_CUSTOMER = gql`
  query CustomerAll {
    customerAll {
      id
      name
      email
      phone
      company {
        id
        name
        address
        industry
      }
    }
  }
`;

export const GET_CUSTOMER_BY_ID = gql`
  query Customer($id: Int!) {
    customer(id: $id) {
      id
      name
      email
      phone
      company {
        id
        name
        address
        industry
      }
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation RemoveCustomer($id: Int!) {
    removeCustomer(id: $id)
  }
`;

export const ADD_CUSTOMER = gql`
  mutation CreateCustomer(
    $name: String!
    $email: String!
    $phone: String!
    $company_id: Int!
  ) {
    createCustomer(
      createCustomerInput: {
        name: $name
        email: $email
        phone: $phone
        company: $company_id
      }
    ) {
      id
      name
      email
      phone
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $id: Int!
    $name: String!
    $email: String!
    $phone: String!
    $company: Int!
  ) {
    updateCustomer(
      id: $id
      updateCustomerInput: {
        name: $name
        email: $email
        phone: $phone
        company: $company
      }
    ) {
      id
      name
      email
      phone
    }
  }
`;
