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
refreshButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 94.073 94.072" style="enable-background:new 0 0 30 30" xml:space="preserve" class=""><g>
<g xmlns="http://www.w3.org/2000/svg">
	<g>
		<path d="M91.465,5.491c-0.748-0.311-1.609-0.139-2.18,0.434l-8.316,8.316C72.046,5.057,60.125,0,47.399,0    c-2.692,0-5.407,0.235-8.068,0.697C21.218,3.845,6.542,17.405,1.944,35.244c-0.155,0.599-0.023,1.235,0.355,1.724    c0.379,0.489,0.962,0.775,1.581,0.775h12.738c0.839,0,1.59-0.524,1.878-1.313c3.729-10.193,12.992-17.971,23.598-19.814    c1.747-0.303,3.525-0.456,5.288-0.456c8.428,0,16.299,3.374,22.168,9.5l-8.445,8.444c-0.571,0.572-0.742,1.432-0.434,2.179    c0.311,0.748,1.039,1.235,1.848,1.235h28.181c1.104,0,2-0.896,2-2V7.338C92.7,6.53,92.211,5.801,91.465,5.491z" fill="#008080" data-original="#008080" class=""></path>
		<path d="M90.192,56.328H77.455c-0.839,0-1.59,0.523-1.878,1.312c-3.729,10.193-12.992,17.972-23.598,19.814    c-1.748,0.303-3.525,0.456-5.288,0.456c-8.428,0-16.3-3.374-22.168-9.5l8.444-8.444c0.572-0.572,0.743-1.432,0.434-2.179    c-0.31-0.748-1.039-1.235-1.848-1.235H3.374c-1.104,0-2,0.896-2,2v28.181c0,0.809,0.487,1.538,1.235,1.848    c0.746,0.31,1.607,0.138,2.179-0.435l8.316-8.315c8.922,9.183,20.843,14.241,33.569,14.241c2.693,0,5.408-0.235,8.069-0.697    c18.112-3.146,32.789-16.708,37.387-34.547c0.155-0.6,0.023-1.234-0.354-1.725C91.395,56.615,90.811,56.328,90.192,56.328z" fill="#008080" data-original="#008080" class=""></path>
	</g>
</g></svg>`;
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