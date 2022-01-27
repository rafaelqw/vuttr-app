import React from 'react';
import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import { CheckIcon } from '@radix-ui/react-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: violet.violet3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: violet.violet11,
});

const CheckboxIndicator = StyledIndicator;

const Flex = styled('div', { display: 'flex' });
const Label = styled('label', {
  color: 'white',
  fontSize: 15,
  lineHeight: 1,
  userSelect: 'none',
});

export const Checkbox = ({name, label, ...props}: any) => (
  <Flex css={{ alignItems: 'center' }}>
    <StyledCheckbox id={name} {...props}>
      <CheckboxIndicator>
        <CheckIcon />
      </CheckboxIndicator>
    </StyledCheckbox>
    <Label css={{ paddingLeft: 15 }} htmlFor={name}>
      {label}
    </Label>
  </Flex>
);

export default Checkbox;

