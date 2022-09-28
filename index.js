import Web3 from 'web3';
import configuration from '../build/contracts/Pinkslips.json';
import 'bootstrap/dist/css/bootstrap.css';
import pinkslipImage from './images/pinkslip.png';

const createElementFromString = (string) => {
  const el = document.createElement('div');
  el.innerHTML = string;
  return el.firstChild;
};

const CONTRACT_ADDRESS =
  configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
  Web3.givenProvider || 'http://127.0.0.1:7545'
);
const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

let account;

const accountEl = document.getElementById('account');
const pinkslipsEl = document.getElementById('pinkslips');
const Total_Pinkslips = 5;
const EMPTY_ADDRESS =
  '0x0000000000000000000000000000000000000000';

const buyPinkslip = async (pinkslip) => {
  await contract.methods
    .buyPinkslip(pinkslip.id)
    .send({ from: account, value: pinkslip.price });
};

const refreshPinkslips = async () => {
  pinkslipsEl.innerHTML = '';
  for (let i = 0; i < Total_Pinkslips; i++) {
    const pinkslip = await contract.methods.pinkslips(i).call();
    pinkslip.id = i;
    if (pinkslip.owner === EMPTY_ADDRESS) {
      const pinkslipEl = createElementFromString(
        `<div class="pinkslip card" style="width: 18rem;">
          <img src="${pinkslipImage}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Pinkslip</h5>
            <p class="card-text">${
              pinkslip.price 
            } Eth</p>
            <button class="btn btn-primary">Buy Pinkslip</button>
          </div>
        </div>`
      );
      pinkslipEl.onclick = buyPinkslip.bind(null, pinkslip);
      pinkslipsEl.appendChild(pinkslipEl);
    }
  }
};

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  account = accounts[0];
  accountEl.innerText = account;
  await refreshPinkslips();
};

main();