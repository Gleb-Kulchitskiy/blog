const tableName = 'articles'

export const seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {
          heading: 'First Article',
          content: 'Why, if there is anything in supply and demand, life is the cheapest thing in the world. ' +
            'There is only so much water, so much earth, so much air; but the life that is demanding to be born is limitless. ' +
            'Nature is a spendthrift. Look at the fish and their millions of eggs. For that matter, look at you and me. ' +
            'In our loins are the possibilities of millions of lives. Could we but find time and opportunity ' +
            'and utilize the last bit and every bit of the unborn life that is in us, we could become the fathers of nations ' +
            'and populate continents. Life? Bah! It has no value. Of cheap things it is the cheapest. Everywhere it goes begging. ' +
            'Nature spills it out with a lavish hand. Where there is room for one life, she sows a thousand lives, ' +
            'and it\'s life eats life till the strongest and most piggish life is left'
        },
        {
          heading: 'Second Article',
          content: 'Why, if there is anything in supply and demand, life is the cheapest thing in the world. ' +
            'There is only so much water, so much earth, so much air; but the life that is demanding to be born is limitless. ' +
            'Nature is a spendthrift. Look at the fish and their millions of eggs. For that matter, look at you and me.'
        },
        {
          heading: 'Third Article',
          content: 'Why, if there is anything in supply and demand, life is the cheapest thing in the world. ' +
            'There is only so much water, so much earth, so much air; but the life that is demanding to be born is limitless. ' +
            'Nature is a spendthrift. Look at the fish and their millions of eggs. For that matter, look at you and me. ' +
            'In our loins are the possibilities of millions of lives.'
        },
        {
          heading: 'Forth Article',
          content: 'Why, if there is anything in supply and demand, life is the cheapest thing in the world. ' +
            'There is only so much water, so much earth, so much air; but the life that is demanding to be born is limitless. ' +
            'Nature is a spendthrift. Look at the fish and their millions of eggs. For that matter, look at you and me. ' +
            'In our loins are the possibilities of millions of lives. Could we but find time and opportunity ' +
            'and utilize the last bit and every bit of the unborn life that is in us, we could become the fathers of nations ' +
            'and populate continents.'
        },
        {
          heading: 'Fifth Article',
          content: 'Why, if there is anything in supply and demand, life is the cheapest thing in the world. ' +
            'There is only so much water, so much earth, so much air; but the life that is demanding to be born is limitless. ' +
            'Nature is a spendthrift. Look at the fish and their millions of eggs. For that matter, look at you and me. ' +
            'In our loins are the possibilities of millions of lives. Could we but find time and opportunity ' +
            'and utilize the last bit and every bit of the unborn life that is in us, we could become the fathers of nations ' +
            'and populate continents. Life? Bah! It has no value. Of cheap things it is the cheapest. Everywhere it goes begging. ' +
            'Nature spills it out with a lavish hand.'
        }
      ]);
    });
};
