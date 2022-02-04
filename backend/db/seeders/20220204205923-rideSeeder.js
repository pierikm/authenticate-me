'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rides', [{
      userId: '1',
      name: 'KITT',
      location: 'California',
      description: 'KITT is armored with "Tri-Helical Plasteel 1000 MBS" (Molecular Bonded Shell) plating which protects him from almost all forms of conventional firearms and explosive devices. He can only be harmed by heavy artillery and rockets, and even then, the blast usually left most of his body intact and only damaged internal components. This makes KITT\'s body durable enough to act as a shield for explosives, ram through rigid barriers of strong material without suffering damage himself and sustain frequent long jumps on turbo boost. The shell also protected him from fire. However, it was vulnerable to electricity, as seen in the episode "Lost Knight" (season 3 episode 10), when a surge of electricity shorted out his memory. The shell was also vulnerable to some potent acids and, in episode 70 "Knight Of The Juggernaut", a formula was made (with knowledge of the shell\'s chemical base) to neutralize it completely. The shell offers little to almost no protection from lasers in certain episodes. The shell is a combination of three secret substances together referred to as the Knight Compound, developed by Wilton Knight, who entrusted parts of the formula to three separate people, who each know only two pieces of the formula. The shell provided a frame tolerance of 223,000 lb (111.5 tons) and a front and rear axle suspension load of 57,000 lb (28.5 tons). In the pilot, "Knight of the Phoenix", the shell is described as the panels of the car itself; in later episodes, especially from season two onward, the idea of the shell being applied to a base vehicle chemically is used.',
      price: 10000000.00,
      speed: 200,
      travelType: "Ground/Automobile",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rides', null, {});
  }
};
