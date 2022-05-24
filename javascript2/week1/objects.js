const head = document.querySelector('head');
const title = document.createElement('title');
title.innerText = 'Breaking Bad character page';
head.appendChild(title);

const body = document.querySelector('body');

const header = document.createElement('header');
body.appendChild(header);

const heading = document.createElement('h1');
heading.innerText = "Breaking Bad character page";
header.appendChild(heading);

const headingCaptionLink = document.createElement('a');
headingCaptionLink.innerText = "Breaking Bad API";
headingCaptionLink.setAttribute('href', 'https://breakingbadapi.com/');
const headingCaption = document.createElement('p');
headingCaption.innerText = 'The page displays a random selection of 8 characters from the show; hitting the refresh button to the right will load another selection.\nBuilt with pure JavaScript & CSS, and the ';
header.appendChild(headingCaption);
headingCaption.appendChild(headingCaptionLink);

const refreshButton = document.createElement('button');
refreshButton.innerText = '🗘';
header.appendChild(refreshButton);


function card(apidata) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const charName = document.createElement('h3');
  const charImg = document.createElement('img');
  const charOccupation = document.createElement('p');

  const hidden = document.createElement('div');
  const charNick = document.createElement('p');
  const charBorn = document.createElement('p');
  const charStatus = document.createElement('p');
  const charActor = document.createElement('p');

  charName.innerText = apidata.name;
  charImg.setAttribute('src', apidata.img);
  apidata.occupation[0] === 'unknown' ? charOccupation.innerText = 'Occupation unknown' : charOccupation.innerText = apidata.occupation[0];
  charOccupation.setAttribute('class', 'caption');

  hidden.setAttribute('class', 'hidden');
  charNick.innerText = apidata.nickname;
  apidata['birthday'] === 'Unknown' ? charBorn.innerText = 'Unknown' : charBorn.innerText = apidata['birthday'].substring(6, 10);
  charStatus.innerText = apidata.status;
  charActor.innerText = apidata.portrayed;

  body.appendChild(card);

  card.appendChild(charName);
  card.appendChild(charImg);
  card.appendChild(charOccupation);

  card.appendChild(hidden);
  hidden.appendChild(charNick);
  hidden.appendChild(charBorn);
  hidden.appendChild(charStatus);
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

fetch("https://www.breakingbadapi.com/api/characters")
  .then(res => res.json())
  .then(data => {
    let select = idSelect(data);

    for (let id of select) {
      card(data[id]);
    }

    function reCard() {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => card.remove());
      select = idSelect(data);
      for (let id of select) {
        card(data[id]);
      }
    }
    refreshButton.addEventListener("click", reCard);
  });