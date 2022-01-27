import { useEffect, useState } from 'react';
import { styled } from '@stitches/react';
import { red } from '@radix-ui/colors';
import { PlusIcon, LockClosedIcon, PersonIcon, ExitIcon } from '@radix-ui/react-icons';
import { Button, Checkbox, Input, Textarea, ToolItem, Modal } from './components';
import { toast } from 'react-toastify';
import api from './services/api';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '50vw'
});

const Header = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const TitleContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled('h1', {
  marginBottom: 10,
  color: 'white'
});

const Subtitle = styled('h3', {
  marginBottom: 50,
  color: 'white'
});

const UserContainer = styled('div', {
  display: 'flex',
  gap: 15
});

const FunctionalitiesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20
});

const SearchContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  alignItems: 'center'
})

const ToolsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
  paddingBottom: 30
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
});

const CloseButtons = styled('div', {
  display: 'flex',
  gap: 15
});

type EditToolTypes = {
  id: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

function App() {
  const [searchTagsOnly, setSearchTagsOnly] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tools, setTools] = useState([]);
  const [ fields, setFields ] = useState({
    search: '',
    title: '',
    link: '',
    description: '',
    tags: '',
    email: '',
    password: '',
    name: '',
  });

  const handleChangeText = (e: any) => {
    setFields(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  }

  const handleLogin = async () => {
    try {
      const loginResponse = await api.post(`/sessions`, {
        email: fields.email,
        password: fields.password,
      });
  
      localStorage.setItem('token', loginResponse.data.token);
      setLoggedIn(true);
      setFields(prev => ({
        ...prev,
        name: '',
        email: '',
        password: '',
      }));
    } catch(error: any){
      toast.error(error.response.data.message)
    }
  }

  const handleAddUser = async () => {
    try {
      await api.post(`/users`, {
        name: fields.name,
        email: fields.email,
        password: fields.password,
      });
      
      handleLogin();
    } catch(error: any){
      toast.error(error.response.data.message)
    }
  }

  const handleAddTool = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        toast.warn(`You must be logged in`);
        return false;
      }

      const createResponse = await api.post(`/tools`, {
        title: fields.title,
        link: fields.link,
        description: fields.description,
        tags: fields.tags.split(' '),
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if(createResponse.status !== 201){
        alert('Ocorreu um erro ao gravar');
        return false;
      }

      toast.success(`Record inserted!`);
      loadTools();
    } catch(error: any){
      toast.error(error.response.data.message)
    }
  }

  const handleEditTool = async ({id, title, link, description, tags}: EditToolTypes) => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        toast.warn(`You must be logged in`);
        return false;
      }

      await api.put(`/tools/${id}`, {
        title,
        link,
        description,
        tags,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Record Updated!');
      loadTools();
    } catch(error: any){
      toast.error(error.response.data.message);
    }
  }

  const handleDeleteTool = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        toast.warn(`You must be logged in`);
        return false;
      }

      const createResponse = await api.delete(`/tools/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if(createResponse.status !== 204){
        alert('Ocorreu um erro ao deletar');
        return false;
      }

      toast.success(`Record deleted!`);
      loadTools();
    } catch(error: any){
      toast.error(error.response.data.message)
    }
  }

  const loadTools = async () => {
    let queryString = '';
    if(searchTagsOnly){
      queryString = `?tag=${fields.search}`;
    } else {
      queryString = `${ fields.search ? '?all='+fields.search : ''}`
    }

    const { data: toolsResponse } = await api.get(`/tools${queryString}`);

    setTools(toolsResponse);
  }

  useEffect(() => {
    loadTools();
  },[searchTagsOnly, fields.search])

  useEffect(() => {
    if(localStorage.getItem('token')){
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])
  
  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>VUTTR</Title>
          <Subtitle>Very Useful Tools to Remember</Subtitle>
        </TitleContainer>
        <UserContainer>
          {loggedIn ? (
            <Modal 
              icon={<ExitIcon />} 
              title='Log Out' 
              TriggerButton={
                <Button style={{
                  backgroundColor: red.red4,
                  color: red.red11,
                }}
                ><ExitIcon/>Log Out</Button>
              }
              CloseButtons={
                <Button
                  aria-label="Close"  
                  variant="red" 
                  onClick={() => {
                    localStorage.removeItem('token');
                    setFields(prev => ({
                      ...prev,
                      name: '',
                      email: '',
                      password: '',
                    }));
                    setLoggedIn(false);
                  }}
                >
                  Yes, log out
                </Button>
              }
            >
              <p>
                Are you sure you want to logout?
              </p>
            </Modal>
          ) : (
            <>
              <Modal 
                icon={<PersonIcon/>}
                title='Sign Up'
                TriggerButton={
                  <Button onClick={()=> {
                    setFields(prev => ({
                      ...prev,
                      name: '',
                      email: '',
                      password: '',
                    }));
                  }}>
                    <PersonIcon/>Sign Up
                  </Button>
                }
                CloseButtons={
                  <CloseButtons>
                    <Button 
                      aria-label="Close" 
                      variant="green" 
                      onClick={()=> {handleAddUser()}}
                    >
                      Sign Up
                    </Button>
                  </CloseButtons>
                }
              >
                <Content>
                  <Input
                    name='name'
                    label='Name'
                    onChange={handleChangeText}
                  />
                  <Input
                    name='email'
                    label='Email'
                    onChange={handleChangeText}
                  />
                  <Input
                    type='password'
                    name='password'
                    label='Password'
                    onChange={handleChangeText}
                  />
                </Content>
              </Modal>
              <Modal 
                icon={<LockClosedIcon/>}
                title='Sign In'
                TriggerButton={
                  <Button 
                    onClick={() => {
                      setFields(prev => ({
                        ...prev,
                        email: '',
                        password: '',
                      }));
                    }}
                  >
                      <LockClosedIcon/>Sign In
                  </Button>
                }
                CloseButtons={
                  <CloseButtons>
                    <Button 
                      aria-label="Close" 
                      variant="green" 
                      onClick={()=> {handleLogin()}}
                    >
                      Sign In
                    </Button>
                  </CloseButtons>
                }
              >
                <Content>
                  <Input
                    name='email'
                    label='Email'
                    onChange={handleChangeText}
                  />
                  <Input
                    type='password'
                    name='password'
                    label='Password'
                    onChange={handleChangeText}
                  />
                </Content>
              </Modal>
            </>
          )}
        </UserContainer>
      </Header>
      <FunctionalitiesContainer>
        <SearchContainer>
          <Input 
            name='search' 
            style={{ width: 300, color: 'white'}} 
            placeholder='Search...' 
            onChange={handleChangeText}
          />
          <Checkbox 
            label='search in tags only'
            defaultChecked={searchTagsOnly}
            onCheckedChange={setSearchTagsOnly}
          />
        </SearchContainer>
        <Modal 
          icon={<PlusIcon />}
          title='Add new tool'
          TriggerButton={
            <Button><PlusIcon/>Add</Button>
          }
          CloseButtons={
            <Button 
              aria-label="Close" 
              variant="green" 
              onClick={()=> {handleAddTool()}}
            >
              Add Tool
            </Button>
          }
        >
          <Content>
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
          </Content>
        </Modal>
      </FunctionalitiesContainer>
      <ToolsList>
        {tools.map((item, index) => (
          <ToolItem
            key={index}
            onRemove={(id: string) => {
              handleDeleteTool(id)
            }}
            onEdit={(payload: EditToolTypes) => {
              handleEditTool(payload)
            }}

            {...item} 
          />
        ))}
      </ToolsList>
    </Container>
  )
}

export default App