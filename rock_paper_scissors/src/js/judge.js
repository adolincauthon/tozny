const url = process.env.URL;

const judgeRound = async () => {
  const round = document.getElementById('enter-round').value;
  judgeText = document.getElementById('judge');
  judgeText.innerText = 'Judging...';
  const response = await fetch(`${url}/api/user/${user}/round/${round}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    const { winner } = await response.json();
    judgeText.innerText = winner === 'Tie' ? 'It was a Tie!' : `${winner} won!`;
  } else {
    judgeText.innerText = 'Error finding winner';
  }
};

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

window.onload = async () => {
  document.querySelector('.judge-winner').addEventListener('click', (e) => {
    e.preventDefault();
    judgeRound();
  });
  document.querySelector('.check-winner').addEventListener('click', (e) => {
    e.preventDefault();
    checkRound();
  });
};
