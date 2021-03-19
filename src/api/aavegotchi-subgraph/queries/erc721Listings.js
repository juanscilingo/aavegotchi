import { gql } from "graphql-request";

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
      gotchi {
        baseRarityScore
        claimedAt
        collateral
        createdAt
        equippedWearables
        escrow
        experience
        hauntId
        id
        kinship
        lastInteracted
        level
        locked
        minimumStake
        modifiedNumericTraits
        modifiedRarityScore
        name
        modifiedNumericTraits
        owner {
          id
        }
        portal {  
          boughtAt
          buyer {
            id
          }
          claimedAt
          hauntId
          id
          openedAt
          owner {
            id
          }
          status
        }
        randomNumber
        stakedAmount
        status
        timesInteracted
        toNextLevel
        usedSkillPoints
      }
    }
  }
`