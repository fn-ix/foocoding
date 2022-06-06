// Maartje's work hours
const monday = [
  {
    name: 'Write a summary HTML/CSS',
    duration: 180
  },
  {
    name: 'Some web development',
    duration: 120
  },
  {
    name: 'Fix homework for class10',
    duration: 20
  },
  {
    name: 'Talk to a lot of people',
    duration: 1.0
  }
];

const tuesday = [
  {
    name: 'Keep writing summary',
    duration: 1.0
  },
  {
    name: 'Some more web development',
    duration: 180
  },
  {
    name: 'Staring out the window',
    duration: 10
  },
  {
    name: 'Talk to a lot of people',
    duration: 1.0
  },
  {
    name: 'Look at application assignments new students',
    duration: 40
  }
];

// salary calculation with higher-order functions
let salary = monday.concat(tuesday)
  .map(task => ({ name: task.name, duration: task.duration / 60 }))
  .filter(task => task.duration >= 2)
  .map(task => ({ name: task.name, wage: task.duration * 20 }))
  .reduce((sum, task) => sum += task.wage, 0)
  .toFixed(2);
salary = '€' + salary;

console.log(salary); // ==> €160.00