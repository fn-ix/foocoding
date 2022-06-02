'use strict';

{
  const bookTitles = [
    'martian',
    'age_of_ai',
    'revelation_space',
    'zen_mind',
    'selfish_gene',
    'foundation',
    'what_is_real',
    'homo_deus',
    'hobbit',
    'a_thousand_splendid_suns',
  ];

  const bookDetails = {
    martian: { title: 'The Martian', language: 'English', author: 'Andy Weir' },
    age_of_ai: { title: 'The Age of AI', language: 'English', author: 'Henry Kissinger, Eric Schmidt & Daniel Huttenlocher' },
    revelation_space: { title: 'Revelation Space', language: 'English', author: 'Alastair Reynolds' },
    zen_mind: { title: 'Zen Mind, Beginner\'s Mind', language: 'English', author: 'Shunryu Suzuki' },
    selfish_gene: { title: 'The Selfish Gene', language: 'English', author: 'Richard Dawkins' },
    foundation: { title: 'Foundation', language: 'English', author: 'Isaac Asimov' },
    what_is_real: { title: 'What Is Real?', language: 'English', author: 'Adam Becker' },
    homo_deus: { title: 'Homo Deus', language: 'English', author: 'Yuval Noah Harari' },
    hobbit: { title: 'The Hobbit', language: 'English', author: 'J.R.R. Tolkien' },
    a_thousand_splendid_suns: { title: 'A Thousand Splendid Suns', language: 'English', author: 'Khaled Hosseini' }
  };

  const bookCovers = {
    martian: './img/martian.jpg',
    age_of_ai: './img/ageofai.webp',
    revelation_space: './img/revelation.webp',
    zen_mind: './img/zen.webp',
    selfish_gene: './img/gene.jpg',
    foundation: './img/foundation.jpg',
    what_is_real: './img/what_real.jpg',
    homo_deus: './img/homo_deus.jpg',
    hobbit: './img/hobbit.jpg',
    a_thousand_splendid_suns: './img/thousand_suns.jpeg'
  };

  function createList(arr) {
    const unorderedList = document.createElement('ul');
    document.body.appendChild(unorderedList);

    for (let book of arr) {
      const listItem = document.createElement('li');
      listItem.setAttribute('id', book);
      unorderedList.appendChild(listItem);

      const title = document.createElement('h3');
      title.innerText = bookDetails[book].title;
      listItem.appendChild(title);

      const author = document.createElement('p');
      author.innerText = 'by ' + bookDetails[book].author;
      listItem.appendChild(author);

      const language = document.createElement('p');
      language.innerText = 'Language: ' + bookDetails[book].language;
      listItem.appendChild(language);
    }
  }

  function addCovers() {
    const coverKeys = Object.keys(bookCovers);

    for (let key of coverKeys) {
      const coverImage = document.createElement('img');
      coverImage.setAttribute('src', bookCovers[key]);
      document.querySelector(`#${key}`).appendChild(coverImage);
    }
  }

  createList(bookTitles);
  addCovers();
}
