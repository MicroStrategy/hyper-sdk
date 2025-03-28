import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../css/preview.css';
import './utils/common';

import { getMainBundleUrl } from './utils/getMainBundleUrl';
import { storage } from './utils/storage';
import { validateServerUrl } from './utils/validateServerUrl';

let renderedPrimaries = [];
let renderedAlternates = [];
let textNodes = [];

const status = (message, type) => {
  const label = document.getElementById('hyper-init-status');
  label.getElementsByTagName('p')[0].innerHTML = message;
  label.setAttribute('class', `hero is-small is-${type}`);
};

const loadMainJs = (server) =>
  new Promise((resolve, reject) => {
    let timeoutId;
    const handleLoad = () => {
      if (timeoutId) clearTimeout(timeoutId);
      resolve();
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = getMainBundleUrl(server);
    script.onload = handleLoad;
    script.onload = handleLoad;
    document.body.appendChild(script);

    timeoutId = setTimeout(
      () =>
        reject(
          new Error('Failed to load the main Hyper SDK JavaScript bundle.')
        ),
      5000
    );
  });

const deleteCard = () => {
  for (const textNode of textNodes) {
    textNode.node.remove();
  }
  for (const renderedPrimary of renderedPrimaries) {
    renderedPrimary.node.remove();
  }
  for (const renderedAlternate of renderedAlternates) {
    renderedAlternate.node.remove();
  }
  renderedPrimaries = [];
  renderedAlternates = [];
  textNodes = [];
};

const init = async () => {
  const server = storage.server();
  await validateServerUrl(server);
  await loadMainJs(server);
  const keywordInput = storage.keywordInput();
  let authMode = storage.authMode();
  if (authMode.startsWith('mstrHyper.')) {
    authMode = mstrHyper.AUTH_MODES[authMode.split('.').pop()];
  }
  const authModeRequiresPassword = [
    mstrHyper.AUTH_MODES.STANDARD,
    mstrHyper.AUTH_MODES.LDAP
  ].includes(authMode);

  const onSessionErrorText = storage
    .onSessionError()
    .replace(/(var|let|const)\s+onSessionError\s*=/, 'window.onSessionError =')
    .replace(
      /function\s+onSessionError\s*\(/,
      'window.onSessionError = function ('
    );
  try {
    eval(onSessionErrorText);
  } catch (error) {
    window.onSessionError = async (err) => {
      console.log('Session Error:', JSON.stringify(err));
      await mstrHyper.login({
        authMode: mstrHyper.AUTH_MODES.GUEST
      });
    };
  }

  const cards = storage.cards();
  if (cards) {
    try {
      eval(`window.hyperCards = ${cards};`);
    } catch (error) {
      window.hyperCards = null;
    }
  }

  // Example onSearch callback which prints searchResults and searchId for each chunk
  const onSearch = (searchResults, searchId) => {
    console.log('This is an example of a custom onSearch callback.');
    console.log('searchResults :', searchResults, `searchId :`, searchId);
  };

  // Example onSort callback which prints the sanitizedKeywords, sortingMap, and searchId once all search chunks are completed
  const onSort = (sanitizedKeywords, sortingMap, searchId) => {
    console.log('This is an example of a custom onSort callback.');
    console.log(
      'sanitizedKeywords :',
      sanitizedKeywords,
      'sortingMap :',
      sortingMap,
      'searchId :',
      searchId
    );
  };

  const authToken = storage.authToken() || null;
  const username = storage.username() || null;
  const password = storage.password() || (username ? '' : null);
  const hyperObject = await mstrHyper.start({
    server,
    auth: {
      authMode,
      username: authToken || !authModeRequiresPassword ? null : username,
      password: authToken || !authModeRequiresPassword ? null : password,
      authToken,
      onSessionError: onSessionErrorText ? window.onSessionError : null
    },
    cards: cards ? hyperCards : null,
    logLevel: storage.logLevel() || 'error',
    highlight: {
      type: storage.highlightType() || 'insertion',
      highlightIframes: storage.highlightIframes() !== 'false'
    },
    searchEnabled: true,
    searching: { onSort, onSearch }
  });
  // await mstrHyper.enableCards();
  if (keywordInput.length > 0) {
    await window.searchKeyword(keywordInput);
  }
  return hyperObject;
};

const addCountElement = (count, parentNode) => {
  const newDiv = document.createElement('div');
  const newContent = document.createTextNode(`${count} card(s) not shown`);
  newDiv.appendChild(newContent);
  newDiv.style.backgroundColor = '#FFCC00';
  newDiv.style.fontFamily = 'Robtoto';
  newDiv.style.color = 'white';
  newDiv.style.textAlign = 'center';
  parentNode.insertBefore(newDiv, null);
  return { node: newDiv, result: null };
};

const addElement = async (result, parentNode) => {
  // create a new div element
  const newDiv = document.createElement('div');
  parentNode.insertBefore(newDiv, null);
  await mstrHyper.showCard({
    elementId: result.ref,
    cardUID: result.cardSetId,
    nodeToRenderTo: newDiv
  });
  return { node: newDiv, result };
};

function addSectionTextElement(sectionText, parentNode) {
  const newDiv = document.createElement('div');
  const newContent = document.createTextNode(sectionText);
  newDiv.appendChild(newContent);
  newDiv.style.backgroundColor = '#24a0ed';
  newDiv.style.fontFamily = 'Robtoto';
  newDiv.style.color = 'white';
  newDiv.style.textAlign = 'center';
  parentNode.insertBefore(newDiv, null);
  return { node: newDiv, result: null };
}

async function handleResultList(resultList, storageList, sectionText) {
  const IFrameNode = document.getElementById('card-list');
  let count = 0;
  if (resultList.length > 0) {
    textNodes.push(addSectionTextElement(sectionText, IFrameNode));
  }
  for (const result of resultList) {
    if (count === 5) {
      textNodes.push(addCountElement(resultList.length - 5, IFrameNode));
      break;
    }
    storageList.push(await addElement(result, IFrameNode));
    count += 1;
  }
  return count > 0;
}

window.searchKeyword = async (
  searchTerm = document.getElementById('searchTerm').value
) => {
  deleteCard();
  console.log('Searching: ', searchTerm);
  const r = await mstrHyper.searchKeyword(searchTerm);
  const results = await mstrHyper.mergeSearchResults(r.searchResults);
  console.log('Searching results ', results);
  let numRendered = 0;
  numRendered += await handleResultList(
    results.primaryResults,
    renderedPrimaries,
    'Primary Results'
  );
  numRendered += await handleResultList(
    results.alternateResults,
    renderedAlternates,
    'Alternate Results'
  );
  if (numRendered > 0) {
    window.togglePanel(true);
  }
};

window.togglePanel = (toggle) => {
  const container = document.getElementById('card-list');
  container.style.display = toggle ? 'block' : 'none';
};

window.hideCard = () => {
  for (const textNode of textNodes) {
    textNode.node.style.visibility = 'hidden';
  }
  for (const renderedPrimary of renderedPrimaries) {
    mstrHyper.hideCard({ nodeToRenderTo: renderedPrimary.node });
  }
  for (const renderedAlternate of renderedAlternates) {
    mstrHyper.hideCard({ nodeToRenderTo: renderedAlternate.node });
  }
};

window.showCard = async () => {
  for (const textNode of textNodes) {
    textNode.node.style.visibility = 'visible';
  }
  for (const renderedPrimary of renderedPrimaries) {
    await mstrHyper.showCard({
      elementId: renderedPrimary.result.ref,
      cardUID: renderedPrimary.result.cardSetId,
      nodeToRenderTo: renderedPrimary.node
    });
  }
  for (const renderedAlternate of renderedAlternates) {
    await mstrHyper.showCard({
      elementId: renderedAlternate.result.ref,
      cardUID: renderedAlternate.result.cardSetId,
      nodeToRenderTo: renderedAlternate.node
    });
  }
};

// const deleteHighlights = (e) => {
//   const highlights = e.getElementsByTagName('mstr-hi');
//   for (let i = 0; i < highlights.length; i += 1) {
//     const it = highlights[i];
//     const p = it.parentElement;
//
//     const span = document.createElement('span');
//     span.innerText = it.innerText;
//     p.insertBefore(span, it);
//     p.removeChild(it);
//   }
// };

const bindEdit = () => {
  const button = document.getElementById('edit');
  const content = storage.previewPageContent();
  if (content) button.parentElement.querySelector('div').innerText = content;

  button.addEventListener('click', (e) => {
    const btn = e.target;
    const parent = btn.parentElement;
    const isEditing = parent.classList.contains('is-editing');

    if (isEditing) {
      const editor = btn.nextElementSibling;
      const container = document.createElement('div');
      container.innerText = editor.value;
      storage.previewPageContent(editor.value);
      parent.removeChild(editor);
      parent.appendChild(container);
    } else {
      const container = btn.nextElementSibling;
      parent.removeChild(container);
      container.innerHTML = container.innerHTML.replace(
        /<mstr-hi>(.*)<\/mstr-hi>/g,
        '$1'
      );

      const editor = document.createElement('textarea');
      editor.style.height = '50rem';
      editor.classList.add('input', 'is-info');
      editor.value = storage.previewPageContent() || container.innerText;
      parent.appendChild(editor);
    }

    btn.innerText = isEditing ? 'Edit' : 'Save';
    btn.classList.toggle('is-info');
    btn.style.zIndex = 999;
    parent.classList.toggle('is-editing');
  });
};

window.addEventListener('load', () => {
  status('Initializing...', 'info');

  document.getElementById('go-back').addEventListener('click', () => {
    window.history.back();
  });

  bindEdit();

  init()
    .then(() => {
      status(
        `Strategy HyperIntelligence is initialized.<br/><br/>
You may now open the DevTools and call any of the Hyper SDK APIs, such as <i>mstrHyper.enableCards</i> and <i>mstrHyper.disableCards</i>.
`,
        'success'
      );
    })
    .catch((error) => {
      status(
        `Failed to initialize Hyper SDK, error: \n\n${error.stack}`.replace(
          /\n/g,
          '<br/>'
        ),
        'warning'
      );
    });
});
