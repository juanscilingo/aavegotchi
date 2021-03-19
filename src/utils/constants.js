export const LISTING_TYPE = {
  ERC721: 'ERC721',
  ERC1155: 'ERC1155'
}

export const LISTING_CATEGORY = {
  portal: 0,
  verificationPending: 1,
  openPortal: 2,
  aavegotchi: 3
}

export const LISTING_CATEGORY_NAME = {
  [LISTING_CATEGORY.portal]: 'Closed Portal',
  [LISTING_CATEGORY.verificationPending]: 'Verification Pending',
  [LISTING_CATEGORY.openPortal]: 'Open Portal',
  [LISTING_CATEGORY.aavegotchi]: 'Aavegotchi',
}

export const LISTING_STATUS = {
  listed: 'listed',
  purchased: 'purchased'
}

export const TRAITS_BY_INDEX = {
  0: 'Energy',
  1: 'Aggression',
  2: 'Spookiness',
  3: 'Brain Size',
  4: 'Eye Shape',
  5: 'Eye Color',
}

export const CHAIN_ID = {
  Matic: 137
}