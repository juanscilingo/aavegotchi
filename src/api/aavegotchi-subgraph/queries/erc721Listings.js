import { gql } from "@urql/core";

export const erc721Listings = gql`
  query ($first: Int = 20, $skip: Int = 0, $orderBy: ERC721Listing_orderBy = timeCreated, $orderDirection: OrderDirection! = desc, $where: ERC721Listing_filter) {
    erc721Listings(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      tokenId
      category
      cancelled
      erc721TokenAddress
      priceInWei
      seller
      timeCreated
      timePurchased
    }
  }
`