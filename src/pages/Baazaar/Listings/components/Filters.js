import Input from "components/UI/Input/Input";
import InputGroup from "components/UI/InputGroup/InputGroup";
import Option from "components/UI/Select/Option";
import Select from "components/UI/Select/Select";
import Switch from "components/UI/Switch/Switch";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LISTING_CATEGORY } from "utils/constants";
import { convertFromTokenDecimalsToWei } from "utils/numbers";
import { TOKENS } from "utils/tokens";

const Style = styled.div`
  margin-bottom: 30px;
  display: flex;
`

const Label = styled.span`
  margin-right: 10px;
  font-size: 14px;
`

const Filter = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 20px;
`

const parseFilters = filters => Object.entries(filters).reduce((acc, [key, { suffix, value }]) => {
  if (value === '')
    value = undefined;
  else if (key === 'priceInWei' && !!value)
    value = convertFromTokenDecimalsToWei(value, TOKENS.GHST);

  return { 
    ...acc, 
    [`${key}${suffix ? `_${suffix}` : ''}`]: value
  }
}, {});

const INITIAL_FILTERS = {
  cancelled: {
    value: false
  },
  category: {
    value: undefined
  },
  hauntId: {
    value: 1
  },
  priceInWei: {
    suffix: undefined,
    value: undefined
  },
  seller: {
    suffix: 'contains',
    value: undefined
  },
  timePurchased: {
    value: "0"
  }
}

export const PARSED_INITIAL_FILTERS = parseFilters(INITIAL_FILTERS);

const Filters = ({ onChange }) => {
  const mounted = useRef(null);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const changeFilter = (field, key = 'value') => value => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: { ...prevFilters[field], [key]: value } }))
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    onChange(parseFilters(filters))
  }, [filters, onChange])

  return (
    <Style>
      <Filter>
        <Label>Category</Label>
        <Select value={filters.category.value} onChange={changeFilter('category')}>
          <Option>All</Option>
          <Option value={LISTING_CATEGORY.portal}>Closed Portal</Option>
          <Option value={LISTING_CATEGORY.openPortal}>Open Portal</Option>
          <Option value={LISTING_CATEGORY.aavegotchi}>Aavegotchi</Option>
        </Select>
      </Filter>
      <Filter>
        <Label>Price</Label>
        <InputGroup>
          <Select value={filters.priceInWei.suffix} onChange={changeFilter('priceInWei', 'suffix')} noArrow>
            <Option value={undefined}>=</Option>
            <Option value="gt">&gt;</Option>
            <Option value="gte">&gt;=</Option>
            <Option value="lt">&lt;</Option>
            <Option value="lte">&lt;=</Option>
          </Select>
          <Input value={filters.priceInWei.value} onChange={e => changeFilter('priceInWei')(e.target.value)} size="4" />
        </InputGroup>
      </Filter>
      <Filter>
        <Label>Seller</Label>
        <Input value={filters.seller.value} onChange={e => changeFilter('seller')(e.target.value)} />
      </Filter>
      <Filter>
        <Label>Haunt</Label>
        <Select value={filters.hauntId.value} onChange={changeFilter('hauntId')}>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
        </Select>
      </Filter>
      <Filter>
        <Switch label="Include Cancelled" checked={filters.cancelled.value} onChange={changeFilter('cancelled')} />
      </Filter>
    </Style>
  )
}

export default React.memo(Filters);