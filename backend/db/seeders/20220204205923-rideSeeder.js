'use strict';

const rides = [
  {
    userId: 1,
    name: 'KITT',
    location: 'California',
    description: 'KITT is armored with "Tri-Helical Plasteel 1000 MBS" (Molecular Bonded Shell) plating which protects him from almost all forms of conventional firearms and explosive devices. He can only be harmed by heavy artillery and rockets, and even then, the blast usually left most of his body intact and only damaged internal components. This makes KITT\'s body durable enough to act as a shield for explosives, ram through rigid barriers of strong material without suffering damage himself and sustain frequent long jumps on turbo boost. The shell also protected him from fire. However, it was vulnerable to electricity, as seen in the episode "Lost Knight" (season 3 episode 10), when a surge of electricity shorted out his memory. The shell was also vulnerable to some potent acids and, in episode 70 "Knight Of The Juggernaut", a formula was made (with knowledge of the shell\'s chemical base) to neutralize it completely. The shell offers little to almost no protection from lasers in certain episodes. The shell is a combination of three secret substances together referred to as the Knight Compound, developed by Wilton Knight, who entrusted parts of the formula to three separate people, who each know only two pieces of the formula. The shell provided a frame tolerance of 223,000 lb (111.5 tons) and a front and rear axle suspension load of 57,000 lb (28.5 tons). In the pilot, "Knight of the Phoenix", the shell is described as the panels of the car itself; in later episodes, especially from season two onward, the idea of the shell being applied to a base vehicle chemically is used.',
    price: 10000000.00,
    speed: 200,
    travelType: "Automobile",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: 'Air Force One',
    location: 'Washington DC',
    description: 'Air Force One is the official air traffic control call sign for a United States Air Force aircraft carrying the president of the United States. In common parlance, the term is used to denote US Air Force aircraft modified and used to transport the president and a metonym for the primary presidential aircraft, VC-25, although it can be used to refer to any Air Force aircraft the president travels on.',
    price: 90000000.00,
    speed: 500,
    travelType: "Aircraft",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: 'Fellbeast',
    location: 'Mordor',
    description: 'The fellbeasts were described as large, winged creatures without feathers, that had pinions in between their horned fingers, and whose bodies gave off a stench. It is possible that fellbeasts came from "an older world". The dark lord Sauron bred these fellbeasts and gave them to the Nine.',
    price: 9,
    speed: 168,
    travelType: "Animal-Powered",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: 'Shadowfax',
    location: 'Mordor',
    description: 'Shadowfax was a descendant of Felaróf, and a chieftain of the race of long-lived Mearas, the greatest horses of Middle-earth. Shadowfax was capable of comprehending human speech and was said to run faster than the wind. Originally belonging to Théoden, King of Rohan, Shadowfax was too wild to be tamed by the Rohirrim. Eventually, Théoden gave him to the wizard Gandalf the White.',
    price: 30,
    speed: 150,
    travelType: "Animal-Powered",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: 'A Rock',
    location: 'Bikini Bottom',
    description: 'It\'s not just a boulder...it\'s a rock! The pioneers used to ride these babies for miles',
    price: 0.99,
    speed: 55,
    travelType: "Other",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: 'Anakin\'s Podracer',
    location: 'Tattoine',
    description: 'Anakin Skywalker\'s Podracer was a Podracer custom-built by a young Anakin Skywalker as a slave on Tatooine. It was used to secure his freedom and the replacement hyperdrive components for Queen Amidala\'s ship during the Boonta Eve Classic',
    price: 300000,
    speed: 588,
    travelType: "Automobile",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rides', rides, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rides', null, {});
  }
};
