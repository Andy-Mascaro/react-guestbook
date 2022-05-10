import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import App from './src/App';
import { UserProvider } from './src/context/UserContext';
import { fakeData } from './src/services/testInfo';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.post(
    `https://ezwbsacoojmonmiqffad.supabase.co/auth/v1/token`,
    (req, res, ctx) => res(ctx.json(fakeData))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Entry List', () => {
  it('List', async () => {
    render(
      <UserProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </UserProvider>
    );

    

    const email = await screen.findByPlaceholderText('click');
    userEvent.type(email, 'bill@bill.com');
    

    const password = await screen.findByPlaceholderText('click2');
    userEvent.type(password, '111111');

    const button = await screen.findByRole('button');
    userEvent.click(button);
    
    const user = {
      id: 1,
      created_at: '2022-05-07T00:11:35.267813Z',
      content: 'test',
      guest_id: '1',
    };
     
    const addedEntry = [{
        id: 2,
        created_at: '2022-05-07T00:11:35.267813Z',
        content: 'test1',
        guest_id: '1',
      }, {
        id: 3,
        created_at: '2022-05-07T00:11:35.267813Z',
        content: 'fake entry',
        guest_id: '1',
      },]

      const newEntry = [{
        id: 4,
        created_at: '2022-05-07T00:11:35.267813Z',
        content: 'fake entry',
        guest_id: '1',
      }]
    

    server.use(
      rest.get(
        `https://ezwbsacoojmonmiqffad.supabase.co/rest/v1/entries`,
        (req, res, ctx) => res(ctx.json([user]))
      )
    );

    const loading =  await screen.findByText(/...loading/i);
    expect(loading).toBeInTheDocument();


    const entry = await screen.findByPlaceholderText('Type here', {}, { timeout: 3000 });
    userEvent.type(entry,'fake entry');

    
    
    const add = await screen.findByText('Add New Entry');
    server.use(
        rest.post(
          `https://ezwbsacoojmonmiqffad.supabase.co/rest/v1/entries`,
          (req, res, ctx) => res(ctx.json(newEntry))
        )
      );
      server.use(
        rest.get(
          `https://ezwbsacoojmonmiqffad.supabase.co/rest/v1/entries`,
          (req, res, ctx) => res(ctx.json(addedEntry))
        )
      );
    userEvent.click(add);
    
    

    const data = await screen.findByText('fake entry');
    expect(data).toBeInTheDocument();
    screen.debug();
  });
  
});
