export {};

type UserResponse = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    streets: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const users: UserResponse = await fetch(
  'https://jsonplaceholder.typicode.com/users'
).then((response) => response.json());

console.log(users.email);
