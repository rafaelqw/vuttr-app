import { useState } from 'react';
import { styled } from '@stitches/react';
import { Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { blackA, mauve, red, yellow } from '@radix-ui/colors';
import { toast } from 'react-toastify';
import Modal from './Dialog';
import ButtonComponent from './Button';
import Input from './Input';
import Textarea from './Textarea';
import api from '../services/api';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  background: 'white',
  padding: 20,
  borderRadius: 4,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: mauve.mauve3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

const Header = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 15
});

const Title = styled('h3', {
  textDecoration: 'underline',
  cursor: 'pointer'
});

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
  gap: 5,
  '&:hover': { backgroundColor: red.red5 },
  '&:focus': { boxShadow: `0 0 0 2px ${red.red7}` },
  cursor: 'pointer'
});

const Content = styled('div', {});
const Description = styled('p', {});

const TagsList = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 10,
  gap: 10,
});

const TagItemStyled = styled('p', {
  fontWeight: 'bold'
});

const ButtonsActions = styled('div', {
  display: 'flex',
  gap: 15
});

const ContentFields = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
});

type ToolItemTypes = {
  id: string,
  title: string,
  link: string,
  description: string,
  tags: string[],
  onRemove: Function,
  onEdit: Function,
}

type TagItemTypes = {
  name: string,
}

function TagItem({name}: TagItemTypes){
  return(
    <TagItemStyled>
      #{name}
    </TagItemStyled>
  )
}

function ToolItem({id, title, link, description, tags, onRemove, onEdit}: ToolItemTypes) {
  const [ fields, setFields ] = useState({
    title: '',
    link: '',
    description: '',
    tags: '',
  });
  
  const handleChangeText = (e: any) => {
    setFields(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  }

  return (
    <Container>
      <Header>
        <Title onClick={() => {window.open(link)}}>{title}</Title>
        <ButtonsActions>
          <Modal 
            icon={<Pencil1Icon />}
            title='Edit'
            TriggerButton={
              <Button 
                style={{
                  backgroundColor: yellow.yellow4,
                  color: yellow.yellow11,
                }}
                onClick={() => {
                  setFields({title, link, description, tags: tags.join(' ')})
                }}
              ><Pencil1Icon/>Edit</Button>
            }
            CloseButtons={
              <ButtonComponent 
                aria-label="Close"
                variant="green"
                onClick={()=> {
                  onEdit({
                    id, 
                    title: fields.title,
                    link: fields.link,
                    description: fields.description,
                    tags: fields.tags.split(' ')
                  });
                }}
              >
                Save
              </ButtonComponent>
            }
          >
            <ContentFields>
              <Input
                name='title'
                label='Tool Name'
                onChange={handleChangeText}
                value={fields.title || ''}
              />
              <Input
                name='link'
                label='Tool Link'
                onChange={handleChangeText}
                value={fields.link || ''}
              />
              <Textarea
                name='description' 
                label='Tool Description' 
                onChange={handleChangeText}
                value={fields.description || ''}
              />
              <Input 
                name='tags' 
                label='Tags' 
                onChange={handleChangeText}
                value={fields.tags || ''}
              />
            </ContentFields>
          </Modal>
          <Modal 
            icon={<Cross2Icon />} 
            title='Remove Tool' 
            TriggerButton={
              <Button style={{
                backgroundColor: red.red4,
                color: red.red11,
              }}
              ><Cross2Icon/>Remove</Button>
            }
            CloseButtons={
              <ButtonComponent 
                aria-label="Close"  
                variant="red" 
                onClick={() => {onRemove(id)}}
              >
                Yes, remove
              </ButtonComponent>
            }
          >
            <p>
              Are you sure you want to remove {title}?
            </p>
          </Modal>
        </ButtonsActions>
      </Header>
      <Content>
        <Description>{description}</Description>
        <TagsList>
          {tags.map((tag, index) => (
            <TagItem key={index} name={tag}/>
          ))}
        </TagsList>
      </Content>
    </Container>
  )
}

export default ToolItem;