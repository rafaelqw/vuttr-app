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

const TextareaCustom = styled('textarea', {
  all: 'unset',
  padding: 10,
  borderRadius: 4,
  fontSize: 15,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  
  '&:focus': {
    boxShadow: `0 0 0 2px ${violet.violet8}` 
  },
});

type TextareaTypes = React.HTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  value?: string;
}

function Textarea({name, label, ...props}: TextareaTypes) {
  return (
    <Fieldset>
      <Label htmlFor={name}>{label}</Label>
      <TextareaCustom id={name} {...props}/>
    </Fieldset>
  )
}

export default Textarea;