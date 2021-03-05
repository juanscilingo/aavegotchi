import Button from "components/UI/Button/Button";
import Input from "components/UI/Input/Input";
import { useState } from "react";
import { diamondContract } from "utils/contracts";

const Utils = props => {
  const [value, setValue] = useState('');

  const checkNameAvailability = async () => {
    const result = await diamondContract.methods.aavegotchiNameAvailable(value).call();
    alert(result ? "Name taken :(" : "Name available :D");
  }

  return (
    <div>
      <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter a name" /> 
      <Button onClick={checkNameAvailability}>Check</Button>
    </div>
  )
}

export default Utils;