function classroom(teacher) {
  return function study() {
    console.log(`
      ${ teacher } says to study ${ this.topic }
    `);
  };
}

var assignment = classroom('Kyle');

assignment();

var homework = {
  topic: 'JS',
  assignment: assignment,
};

homework.assignment();

var otherHomework = {
  topic: 'Math',
};

assignment.call(otherHomework);
