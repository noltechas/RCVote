const { sequelize, User, Poll, Option } = require('./database');

async function insertTestData() {
    // First, we create a user
    let user = await User.create({ username: 'test', password: 'test' });

    // Next, we create a poll
    let poll = await Poll.create({ name: 'Test Poll', creatorId: user.id });

    // Then, we create some options for the poll
    let options = ['Option 1', 'Option 2', 'Option 3'];
    for (let text of options) {
        await Option.create({ text, pollId: poll.id });
    }

    console.log('Test data inserted');
}

insertTestData().then(() => sequelize.close());
