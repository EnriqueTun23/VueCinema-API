'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

//  @type {import('@adonisjs/lucid/src/Factory')} 
const Factory = use('Factory');
const Hash = use('Hash');


Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    created_at: faker.date()
  }
});

Factory.blueprint('App/Models/Customer', async (faker) => {
    return {
      user_id: async () => {
          return (await Factory.model('App/Models/User').create()).id
      },
      customer_phone: faker.phone(),
      customer_credit_card: faker.cc({type: 'Mastercard'})
    }
});


Factory.blueprint('App/Models/Cinema', async (faker) => {
    const cinema_name = faker.company();
    return {
        cinema_name: cinema_name,
        cinema_screenshot: `http://fakeimg.pl/600x400/?text=${cinema_name}`,
        cinema_address: faker.address(),
        cinema_phone: faker.phone(),
        cinema_seat_capacity: faker.integer({min: 250, max:500}),
        cinema_details: faker.sentence({words: 35}),
    }
});


Factory.blueprint('App/Models/Room', async (faker, i, data) => {
    const rows = faker.integer({min:5, max:20});
    return {
        cinema_id: data.cinema_id,
        room_rows: rows,
        room_seats: rows * 10,
        room_number: faker.integer({min:1, max: 20}),
    }
});

Factory.blueprint('App/Models/Movie', async (faker) => {
    const movie_name =  faker.sentence({words: 3});
    return {
        movie_name: movie_name,
        movie_director: faker.name(),
        movie_screenshot: `http://fakeimg.pl/600x400/?text=${movie_name}`,
        movie_synopsis: faker.sentence({words: 50}),
        created_at: faker.date(),
    }
});