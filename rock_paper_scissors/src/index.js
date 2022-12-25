const url = 'http://localhost:4000';
let round;

const getRound = async (user) => {
  try {
    const response = await fetch(`${url}/data/${user}/round`);
    const data = await response.json();
    round = data.round;
  } catch (error) {
    return 'Not Found, please reload.';
  }
};

const heroClick = (btnType) => {
  document.querySelector(`.${btnType}-btn`).addEventListener('click', () => {
    document.querySelector('.hero').setAttribute('style', 'display: none');
    document.querySelector(`.${btnType}`).setAttribute('style', '');
  });
};

const sendMove = async (move, user) => {
  try {
    const response = await fetch(`${url}/api/${user}/round/${round}/${move}`);
    if (response.status === 200) {
      document.querySelector('.success').setAttribute('style', '');
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = () => {
  heroClick('play');
  if (document.getElemendById('round')) {
    document.getElementById('round').innerText = `Round ${round}`;
  } else {
    setTimeout(
      () => (document.getElementById('round').innerText = `Round ${round}`),
      200
    );
  }
  document.querySelectorAll('.move-btn').forEach((btn) => {
    btn.addEventListener('click', () => sendMove(btn.id, user));
  });
};
