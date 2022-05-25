const head = document.querySelector('head');

const title = document.createElement('title');
title.innerText = 'Breaking Bad character page';
head.appendChild(title);

const body = document.querySelector('body');

const header = document.createElement('header');
body.appendChild(header);

const heading = document.createElement('div');
heading.setAttribute('class', 'heading');
header.appendChild(heading);

const headingTitle = document.createElement('h1');
headingTitle.innerText = "Breaking Bad character page";
heading.appendChild(headingTitle);

const headingCaptionLink = document.createElement('a');
headingCaptionLink.innerText = "Breaking Bad API";
headingCaptionLink.setAttribute('href', 'https://breakingbadapi.com/');

const headingCaption = document.createElement('p');
headingCaption.innerText = 'The page displays a random selection of 8 characters from the show; hitting the refresh button to the right will load another selection.\nBuilt with pure JavaScript & CSS, and the ';
heading.appendChild(headingCaption);
headingCaption.appendChild(headingCaptionLink);

const searchBox = document.createElement('input');
header.appendChild(searchBox);

const refreshButton = document.createElement('button');
refreshButton.innerText = '🗘';
header.appendChild(refreshButton);

function card(apidata) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  body.appendChild(card);

  const charName = document.createElement('h3');
  charName.innerText = apidata.name;
  card.appendChild(charName);

  const charImg = document.createElement('img');
  charImg.setAttribute('src', apidata.img);
  card.appendChild(charImg);

  const charOccupation = document.createElement('p');
  apidata.occupation[0] === 'unknown' ? charOccupation.innerText = 'Occupation unknown' : charOccupation.innerText = apidata.occupation[0];
  charOccupation.setAttribute('class', 'caption');
  card.appendChild(charOccupation);

  const hidden = document.createElement('div');
  hidden.setAttribute('class', 'hidden');
  card.appendChild(hidden);

  const hRule = document.createElement('hr');

  const charNick = document.createElement('p');
  charNick.innerText = apidata.nickname;
  hidden.appendChild(charNick);
  charNick.after(hRule.cloneNode(true));

  const charBorn = document.createElement('p');
  apidata['birthday'] === 'Unknown' ? charBorn.innerText = 'Unknown' : charBorn.innerText = apidata['birthday'].substring(6, 10);
  hidden.appendChild(charBorn);
  charBorn.after(hRule.cloneNode(true));

  const charStatus = document.createElement('p');
  charStatus.innerText = apidata.status;
  hidden.appendChild(charStatus);
  charStatus.after(hRule.cloneNode(true));

  const charActor = document.createElement('p');
  charActor.innerText = apidata.portrayed;
  hidden.appendChild(charActor);
};

function idSelect(apidata) {
  let select = [];
  let index;

  here: while (select.length < 8) {
    index = Math.floor(Math.random() * apidata.length);
    for (let id of select) {
      if (id === index) {
        continue here;
      }
    }
    select.push(index);
  }
  return select;
}

function delCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.remove());
}

function loadCards(apidata, select) {
  delCards();
  for (let id of select) {
    card(apidata[id]);
  }
}

function searchCards(apidata) {
  delCards();
  let result = [];

  for (character of apidata) {
    if (character.name.toLowerCase().includes(searchBox.value.toLowerCase())) {
      result.push(apidata.indexOf(character));
    }
  }
  loadCards(apidata, result);
}

fetch('https://www.breakingbadapi.com/api/characters')
  .then(res => res.json())
  .then(data => {
    loadCards(data, idSelect(data));
    const reCard = function () {
      loadCards(data, idSelect(data));
      searchBox.value = '';
    };
    refreshButton.addEventListener('click', reCard);

    const searchResult = function () {
      searchCards(data);
    };
    searchBox.addEventListener('input', searchResult);
  }
  );