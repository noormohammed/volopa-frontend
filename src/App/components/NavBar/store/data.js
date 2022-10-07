import wallet from './images/wallet@2x.png';
import payments from './images/payments.png';
import cards from './images/cards.png';
import accounting from './images/accounting.png';
import analytics from './images/analytics.png';
import squareLogo from './images/logo.png';
// import URLS from '../../../../Routes/constants'; // Since this is not given in the frontend repo of the challenge

const items = [
    {
        label: 'Wallet Dashboard',
        key: 1
    },
    {
        label: 'Fund Wallet',
        key: 2
    },
    {
        label: 'Convert Balances',
        key: 3
    },
    {
        label: 'Funding History',
        key: 4
    }
];

const bellDropdownItems = [
    {
        label: '1st menu item',
    },
    {
        label: '2nd menu item',
    },
    {
        label: '3rd menu item',
    },
];

const moduleData = [
    {
        name: 'Wallet',
        image: wallet
    },
    {
        name: 'Payments',
        image: payments
    },
    {
        name: 'Cards',
        image: cards
    },
    {
        name: 'Accounting',
        image: accounting
    },
    {
        name: 'Analytics',
        image: analytics
    },
    {
        name: 'Settings',
        image: squareLogo
    }
]

export { items, bellDropdownItems, moduleData };