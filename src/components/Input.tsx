import { styled } from '@stitches/react';
import { violet } from '@radix-ui/colors';

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

const Label = styled('label', {
  fontSize: 15,
  color: violet.violet11,
});

const InputCustom = styled('input', {
  all: 'unset',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  height: 35,

  '&:focus': { 
    boxShadow: `0 0 0 2px ${violet.violet8}` 
  },

  '&::-webkit-input-placeholder': {
    color: '#c3c3c3'
  }

});

type InputTypes = React.HTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  type?: string;
  value?: string;
}

function Input({name, label, ...props}: InputTypes) {
  return (
    <Fieldset>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputCustom id={name} {...props}/>
    </Fieldset>
  )
}

export default Input;