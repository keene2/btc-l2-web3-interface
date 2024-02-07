import coinbase_logo from '@/assets/logo/coinbase_logo.png';
import gnosis_logo from '@/assets/logo/gnosis_logo.png';
import imToken_logo from '@/assets/logo/imToken_logo.png';
import metamask_logo from '@/assets/logo/metaMask_logo.png';
import multibit_logo from '@/assets/logo/multibit_logo.png';
import nansen_logo from '@/assets/logo/nansen_logo.png';
import okx_logo from '@/assets/logo/okx_logo.png';
import pyth_logo from '@/assets/logo/pyth_logo.png';
import quick_swap_logo from '@/assets/logo/quick_swap_logo.png';
import teleportDao_logo from '@/assets/logo/teleportDao_logo.png';
import trust_wallet_logo from '@/assets/logo/trust_wallet_logo.png';
import walletConnect_logo from '@/assets/logo/walletConnect_logo.png';
import { LINKS } from '@/consts/links';

export const ALL_DATA = [
  {
    title: 'MetaMask',
    desc: 'A crypto wallet & gateway to blockchainapps.',
    url: metamask_logo,
    href: LINKS.Metamask,
  },
  {
    title: 'Coinbase',
    desc: `A self-custody crypto wallet. Puts you in control of your crypto, keys, and data.
GetHold`,
    url: coinbase_logo,
    href: LINKS.CoinbaseWallet,
  },
  {
    title: 'OKX',
    url: okx_logo,
    href: LINKS.Okx,
    desc: 'Secure and transfer your tokens, swap crypto, and more with OKX wallet',
  },
  {
    title: 'Quick Swap',
    desc: 'Use QuickSwap to exchange and add liquidity.',
    url: quick_swap_logo,
    href: LINKS.Quickswap,
  },
  {
    title: 'WalletConnect',
    url: walletConnect_logo,
    href: LINKS.Walletconnect,
    desc: `Brings the ecosystem together by enabling wallets and apps to securely connect and interact.`,
  },
  {
    title: 'Trust Wallet',
    desc: 'An easy-to-use crypto wallet of Binance.',
    url: trust_wallet_logo,
    href: LINKS.Trustwallet,
  },
  {
    title: 'Nansen',
    url: nansen_logo,
    href: LINKS.Nansen,
    desc: 'Discover opportunities, perform due diligence and defend your portfolios with real-time dashboards and alerts.',
  },
  {
    title: 'Pyth',
    url: pyth_logo,
    href: LINKS.Pyth,
    desc: 'Get high-fidelity, high-frequency market data for your dApps.',
  },
  {
    title: 'imToken',
    href: LINKS.Imtoken,
    desc: 'An easy and secure digital wallet.',
    url: imToken_logo,
  },
  {
    title: 'Gnosis Safe',
    url: gnosis_logo,
    href: LINKS.GensisSafe,
    desc: 'The most trusted decentralized custody protocol and collective asset management platform.',
  },
  {
    title: 'Multibit',
    href: LINKS.Multibit,
    desc: 'MultiBit Bridge makes it seamless to transfer tokens between ETH and BTC networks.',
    url: multibit_logo,
  },
  {
    title: 'TeleportDAO',
    url: teleportDao_logo,
    href: LINKS.Teleportdao,
    desc: 'TeleportDAO is a trustless interoperability protocol that provides an infrastructure for developers to build cross-chain applications.',
  },
];
