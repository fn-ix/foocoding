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
headingCaption.innerText = 'Using the ';
heading.appendChild(headingCaption);
headingCaption.appendChild(headingCaptionLink);

const searchBox = document.createElement('input');
searchBox.setAttribute('placeholder', 'Filter by name...');
header.appendChild(searchBox);

const refreshButton = document.createElement('button');
refreshButton.innerText = '🗘';
refreshButton.setAttribute('title', 'Load another selection');
header.appendChild(refreshButton);

const headerBackground = document.createElement('div');
headerBackground.setAttribute('class', 'periodic-table');
header.appendChild(headerBackground);

const headerBackgroundBase = document.createElement('div');
headerBackgroundBase.setAttribute('class', 'periodic-table-base');
header.appendChild(headerBackgroundBase);

const cardContainer = document.createElement('main');
body.appendChild(cardContainer);

const hiddenRule = document.styleSheets[0].cssRules[28]['style'];

let pinnedCards = ['0'];

function card(apidata, apidataindex) {
  const cardWrap = document.createElement('div');
  cardWrap.setAttribute('class', 'card-wrap');
  cardContainer.appendChild(cardWrap);

  const cardNotch = document.createElement('div');
  cardNotch.setAttribute('class', 'card-notch');
  cardNotch.setAttribute('id', apidataindex);
  cardNotch.addEventListener('click', cardPin);
  for (id of pinnedCards) {
    if (id === apidataindex) {
      cardNotch.setAttribute('style', 'background-color: coral;');
    }
  }
  cardWrap.appendChild(cardNotch);

  const cardBase = document.createElement('div');
  cardBase.setAttribute('class', 'card-base');
  cardWrap.appendChild(cardBase);

  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  cardBase.appendChild(card);

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
  const charNickDesc = document.createElement('span');
  charNickDesc.innerText = 'Also known as: ';
  charNick.prepend(charNickDesc);

  const charBorn = document.createElement('p');
  apidata['birthday'] === 'Unknown' ? charBorn.innerText = 'Unknown' : charBorn.innerText = apidata['birthday'].substring(6, 10);
  hidden.appendChild(charBorn);
  charBorn.after(hRule.cloneNode(true));
  const charBornDesc = document.createElement('span');
  charBornDesc.innerText = 'Born: ';
  charBorn.prepend(charBornDesc);

  const charStatus = document.createElement('p');
  charStatus.innerText = apidata.status;
  hidden.appendChild(charStatus);
  charStatus.after(hRule.cloneNode(true));
  const charStatusDesc = document.createElement('span');
  charStatusDesc.innerText = 'Currently: ';
  charStatus.prepend(charStatusDesc);

  const charActor = document.createElement('p');
  charActor.innerText = apidata.portrayed;
  hidden.appendChild(charActor);
  const charActorDesc = document.createElement('span');
  charActorDesc.innerText = 'Portrayed by: ';
  charActor.prepend(charActorDesc);

  const hiddenHeight = hidden.offsetHeight;
  hidden.setAttribute('style', `bottom: -${hiddenHeight}px; margin-top: -${hiddenHeight}px;`);
};

function idSelect(apidata) {
  let select = [...pinnedCards];
  let index;

  here: while (select.length < 8) {
    index = Math.floor(Math.random() * apidata.length);
    for (let id of select) {
      if (id == index) {
        continue here;
      }
    }
    select.push(index);
  }
  return select;
}

function delCards() {
  const cards = document.querySelectorAll('.card-wrap');
  cards.forEach(card => card.remove());
}

function loadCards(apidata, select) {
  if (document.querySelector('.no-results') !== null) {
    document.querySelector('.no-results').remove();
  }
  delCards();
  hiddenRule.transition = 'none';
  for (let id of select) {
    card(apidata[id], id);
  }
  setTimeout(function () {
    hiddenRule.transition = 'all 0.5s ease';
  }, 50);
}

function searchCards(apidata, select) {
  if (searchBox.value === '') {
    loadCards(apidata, select);
    return;
  }
  delCards();
  let result = [...pinnedCards];

  here: for (character of apidata) {
    if (character.name.toLowerCase().includes(searchBox.value.toLowerCase())) {
      for (id of pinnedCards) {
        if (id == apidata.indexOf(character)) {
          continue here;
        }
      }
      result.push(apidata.indexOf(character));
    }
  }

  if (result.length !== 0) {
    loadCards(apidata, result);
  } else if (document.querySelector('.no-results') === null) {
    noResults();
  }
}

function noResults() {
  const noRes = document.createElement('div');
  noRes.setAttribute('class', 'no-results');

  const noResPara = document.createElement('p');
  noResPara.innerText = 'No results found 😖';

  cardContainer.appendChild(noRes);
  noRes.appendChild(noResPara);

  const headerHeight = header.offsetHeight;
  noRes.setAttribute('style', `height: calc(100vh - ${headerHeight}px - 41px);`);
}

function resizeCard() {
  hiddenRule.transition = 'none';
  const hiddenArray = [...document.querySelectorAll('.hidden')];

  for (element of hiddenArray) {
    let hiddenHeight = element.offsetHeight;
    element.setAttribute('style', `bottom: -${hiddenHeight}px; margin-top: -${hiddenHeight}px;`);
  }
  hiddenRule.transition = 'all 0.5s ease';
}

function cardPin() {
  const notchId = event.target.id;

  for (id of pinnedCards) {
    if (id === notchId) {
      pinnedCards.splice(pinnedCards.indexOf(id), 1);
      event.target.removeAttribute('style');
      if ((pinnedCards.length === 0) && ([...document.querySelectorAll('.card')].length) === 1) {
        delCards();
        noResults();
      }
      return;
    }
  }
  pinnedCards.push(notchId);
  event.target.setAttribute('style', 'background-color: coral;');
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
      searchCards(data, idSelect(data));
    };
    searchBox.addEventListener('input', searchResult);

    window.onresize = resizeCard;
  }
  );