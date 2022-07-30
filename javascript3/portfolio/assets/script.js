// tsparticles
(async () => {
  await tsParticles.load('tsparticles', {
    background: {
      opacity: 0,
    },
    fullScreen: {
      zIndex: -1,
    },
    particles: {
      links: {
        distance: 150,
        triangles: {
          frequency: 0.1,
        },
      },
      move: {
        speed: 1,
      }
    },
    preset: 'triangles',
  });
})();

// binary clock
const clock = document.getElementById("bin-clock");

function getTime() {
  let now = new Date();
  let hours = now.getHours().toString(2).padStart(6, "0");
  let minutes = now.getMinutes().toString(2).padStart(6, "0");
  let seconds = now.getSeconds().toString(2).padStart(6, "0");
  return time = hours + ' ' + minutes + ' ' + seconds;
}

let loop = () => {
  let final = getTime();
  clock.innerText = final;
  window.requestAnimationFrame(loop);
};
loop();

// navigation
let pages = [...document.querySelectorAll('article')];
let navButtons = [...document.querySelectorAll('.nav-button')];

pages[0].setAttribute('style', 'height:auto;width:auto;overflow:visible;');
navButtons[0].setAttribute('style', 'border-color: coral;');

for (button of navButtons) {
  button.addEventListener('click', loadPage);
}

document.querySelector('svg').addEventListener('click', loadPage);

function loadPage(event) {
  pages = [...document.querySelectorAll('article')];
  navButtons = [...document.querySelectorAll('.nav-button')];

  for (page of pages) {
    page.removeAttribute('style');
    if ('nav-' + page.id === event.target.closest('button').id) {
      page.setAttribute('style', 'height:auto;width:auto;overflow:visible;');
    }
  }

  for (button of navButtons) {
    button.removeAttribute('style');
    if (button.id === event.target.closest('button').id) {
      button.setAttribute('style', 'border-color: coral;');
    }
  }
}

// repositories
const repoPage = document.querySelector('#repos');
let gitData;
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.github.com/users/fn-ix/repos', true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);

function processRequest() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    gitData = JSON.parse(xhr.responseText);
    buildRepos();
  } else if (xhr.readyState == 4 && xhr.status == 403) {
    displayError();
  }
}

function displayError() {
  const errorMessage = document.createElement('p');
  errorMessage.setAttribute('class', 'error');
  errorMessage.innerText = 'Error 403: API rate limit exceeded!';
  repoPage.append(errorMessage);
}

function buildRepos() {
  for (repo of gitData) {
    const repoCard = document.createElement('section');
    repoCard.setAttribute('class', 'repository');
    repoPage.append(repoCard);

    const repoHeader = document.createElement('h3');
    repoHeader.setAttribute('class', 'repo-header');
    repoHeader.innerText = repo.name;
    repoCard.append(repoHeader);

    const repoDesc = document.createElement('span');
    repoDesc.setAttribute('class', 'repo-desc');
    if (repo.description !== null) {
      repoDesc.innerText = repo.description;
    } else {
      repoDesc.innerText = 'no description available';
    }
    repoHeader.append(repoDesc);

    const cardContent = document.createElement('div');
    cardContent.setAttribute('class', 'card-content');
    repoCard.append(cardContent);

    const created = document.createElement('p');
    const createdVal = document.createElement('p');
    created.innerText = 'Repository created';
    createdVal.innerText = repo.created_at.substring(0, 10);
    cardContent.append(created);
    cardContent.append(createdVal);

    const updated = document.createElement('p');
    const updatedVal = document.createElement('p');
    updated.innerText = 'Repository updated';
    updatedVal.innerText = repo.updated_at.substring(0, 10);
    cardContent.append(updated);
    cardContent.append(updatedVal);

    const fork = document.createElement('p');
    const forkVal = document.createElement('p');
    fork.innerText = 'Is a fork?';
    forkVal.innerText = repo.fork === true ? 'Yes' : 'No';
    cardContent.append(fork);
    cardContent.append(forkVal);

    const topics = document.createElement('p');
    const topicsVal = document.createElement('p');
    topics.innerText = 'Topics';
    if (repo.topics.length !== 0) {
      topicsVal.innerText = repo.topics;
    } else {
      topicsVal.innerText = 'no topics assigned';
    }
    cardContent.append(topics);
    cardContent.append(topicsVal);

    const readmeTitle = document.createElement('h4');
    const readme = document.createElement('p');
    readmeTitle.setAttribute('class', 'readme-title');
    readme.setAttribute('class', 'readme');
    readmeTitle.innerText = 'README.md';
    cardContent.append(readmeTitle);
    cardContent.append(readme);

    const readmeUrl = 'https://raw.githubusercontent.com/' + repo.full_name + '/' + repo.default_branch + '/README.md';
    fetch(readmeUrl)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        readme.innerHTML = marked.parse(data);
      });

    repoHeader.addEventListener('click', openCloseCard);
    cardContent.setAttribute('style', 'height: 0;');

    function openCloseCard() {
      if (cardContent.getAttribute('style') === 'height: 0;') {
        cardContent.setAttribute('style', `height: auto; overflow: auto;`);
        repoHeader.setAttribute('style', 'border-bottom: 1px solid rgb(186, 186, 186);');
      } else {
        cardContent.setAttribute('style', 'height: 0;');
        repoHeader.removeAttribute('style');
      }
    }
  }
}

// admin
const adminPage = document.querySelector('#admin');
const deletion = document.querySelector('.deletion');
const addition = document.querySelector('.addition');

createDeleteButtons();

function createDeleteButtons() {
  pages = [...document.querySelectorAll('article')];

  for (page of pages) {
    if ((page.id === 'admin') || (document.querySelector(`#admin-${page.id}`) !== null)) {
      continue;
    }

    const pageDelete = document.createElement('button');
    pageDelete.setAttribute('id', `admin-${page.id}`);
    pageDelete.setAttribute('class', 'delete-button');
    pageDelete.innerText = `Delete ${page.id} page!`;
    pageDelete.addEventListener('click', deletePage);
    deletion.append(pageDelete);
  }
}

function deletePage(event) {
  pageId = event.target.id.slice(6);
  document.querySelector(`#nav-${pageId}`).remove();
  document.querySelector(`#${pageId}`).remove();
  document.querySelector(`#admin-${pageId}`).remove();
}

const pageWrapper = document.querySelector('.page-wrapper');
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', addPage);

function addPage() {
  const title = document.querySelector('#add-title').value;
  const id = title.toLowerCase().replaceAll(' ', '-');
  const text = document.querySelector('#add-text').value;

  if (document.querySelector('.alert') !== null) {
    document.querySelector('.alert').remove();
  }

  if (document.querySelector(`#${id}`) !== null) {
    const alert = document.createElement('p');
    alert.setAttribute('class', 'alert');
    alert.innerText = 'A page with this name already exists! Use another name.';
    addButton.after(alert);
    return;
  }

  const page = document.createElement('article');
  page.setAttribute('id', id);
  pageWrapper.append(page);

  const pageTitle = document.createElement('div');
  pageTitle.setAttribute('class', 'page-title');
  page.append(pageTitle);

  const pageHeader = document.createElement('h3');
  pageHeader.innerText = title.toUpperCase().replaceAll(' ', '');
  pageTitle.append(pageHeader);

  const pageText = document.createElement('p');
  pageText.innerHTML = text;
  page.append(pageText);

  const navAdmin = document.querySelector('#nav-admin');
  const addNav = document.createElement('button');
  addNav.setAttribute('class', 'nav-button');
  addNav.setAttribute('id', `nav-${id}`);
  addNav.addEventListener('click', loadPage);
  addNav.innerText = title;
  navAdmin.before(addNav);

  createDeleteButtons();
}

const passwordPage = document.querySelector('.password');
const password = document.querySelector('#enter-password');
function accessAdmin() {
  if (password.value !== 'secret') {
    if (document.querySelector('#wrong-pass') === null) {
      const wrongPass = document.createElement('p');
      wrongPass.setAttribute('id', 'wrong-pass');
      const passForm = document.querySelector('#password-form');
      wrongPass.innerText = 'Incorrect password, try again!';
      passForm.after(wrongPass);
      const hint = document.createElement('p');
      hint.innerHTML = `Hint: it rhymes with <i>biscuit</i> and is something that you don't tell anyone.`;
      wrongPass.after(hint);
    }
    return;
  }
  passwordPage.remove();
  deletion.setAttribute('style', 'display: flex;');
  addition.setAttribute('style', 'display: block;');
}