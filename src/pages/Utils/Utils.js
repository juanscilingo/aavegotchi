import Button from "components/UI/Button/Button";
import Input from "components/UI/Input/Input";
import InputGroup from "components/UI/InputGroup/InputGroup";
import { useState } from "react";
import { diamondContract } from "utils/contracts";

const Utils = props => {
  const [value, setValue] = useState('');

  const checkNameAvailability = async () => {
    if (!value) {
      alert('Please enter a name');
      return;
    }

    const result = await diamondContract.methods.aavegotchiNameAvailable(value).call();
    alert(result ? "Name taken :(" : "Name available :D");
  }

  const onKeyDown = e => e.key === 'Enter' && checkNameAvailability();

  return (
    <div>
      <InputGroup>
        <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter a name" onKeyDown={onKeyDown} /> 
        <Button onClick={checkNameAvailability}>Check Availability</Button>
      </InputGroup>
    </div>
  )
}

export default Utils;