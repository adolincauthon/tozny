const url = 'http://localhost:4000';
let round;

//gets user current round from API
const getRound = async (user) => {
  try {
    const response = await fetch(`${url}/data/${user}/round`);
    const data = await response.json();
    round = data.round;
    return round;
  } catch (error) {
    return 'Not Found, please reload.';
  }
};

//manages initial click on hero menu
const heroClick = (btnType) => {
  document.querySelector(`.${btnType}-btn`).addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.main-menu').setAttribute('style', 'display: none');
    document.querySelector(`.${btnType}`).setAttribute('style', '');
  });
};

//sends user selected move to API and updates UI
const sendMove = async (move, user) => {
  console.log(`Sending ${move}`);
  try {
    const response = await fetch(
      `${url}/api/user/${user}/round/${round}/move/${move}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      document.querySelector(
        '.hero-heading'
      ).innerText = `Great Move, ${user}!`;
      document.querySelector('.play').setAttribute('style', 'display: none');
      document.querySelector('.main-menu').setAttribute('style', '');
      round = await getRound(user);
      document.getElementById('round').innerText = `Round ${round}`;
    } else {
      alert(`Error ${response.status}`);
    }
  } catch (error) {
    alert('Error occurred try again');
    console.log(error);
  }
};

//check winner for round
const checkRound = async () => {
  const round = document.getElementById('enter-round').value;
  judgeText = document.getElementById('judge');
  judgeText.innerText = 'Judging...';
  const response = await fetch(`${url}/api/winner/user/${user}/round/${round}`);
  if (response.status === 200) {
    const { winner } = await response.json();
    judgeText.innerText = winner === 'Tie' ? 'It was a Tie!' : `${winner} won!`;
  } else {
    judgeText.innerText = 'Error finding winner';
  }
};

//fire on load events
window.onload = async () => {
  heroClick('play');
  heroClick('winner');
  round = await getRound(user);
  document.getElementById('round').innerText = `Round ${round}`;
  document.querySelectorAll('.move-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sendMove(btn.id, user);
    });
  });
  document.querySelector('.check-winner').addEventListener('click', (e) => {
    e.preventDefault();
    checkRound();
  });
};
