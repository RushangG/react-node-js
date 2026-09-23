import { gql } from "@apollo/client";

export const GET_CUSTOMER = gql`
  query CustomerAll {
    customerAll {
      id
      name
      email
      phone
      company_id
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation RemoveCustomer($id: Int!) {
    removeCustomer(id: $id) {
      id
      name
      email
      phone
      company_id
    }
  }
`;
