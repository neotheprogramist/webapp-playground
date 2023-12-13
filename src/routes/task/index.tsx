import { $, component$, useStore, useVisibleTask$ } from '@builder.io/qwik';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5'
import { chains, metadata } from '~/constants';

type Store = {
  network: string | undefined;
  address: string | undefined;
  connected: boolean;
}

const projectId = import.meta.env.PUBLIC_WC_PROJECT_ID;

const modal = createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: chains,
  projectId
})

export default component$(() => {
  const store = useStore<Store>({
    network: undefined,
    address: undefined,
    connected: false,
  })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    store.network = getChainName(modal.getChainId())
    store.address = modal.getAddress();

    store.connected = store.address ? true : false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modal.subscribeEvents(_ => {
      store.network = getChainName(modal.getChainId());
      store.address = modal.getAddress();
    })

    modal.subscribeProvider(data => {
      if (!data.provider) {
        store.connected = false;
        store.network = undefined;
        store.address = undefined;
        return;
      }

      store.network = getChainName(data.chainId)
      store.address = data.address;
      store.connected = true;
    })
  })

  return (
    <div class="gap-8 bg-black text-white h-screen grid place-items-center">
      <div class="space-y-4 flex flex-col justify-center items-center">
        <button onClick$={$(() => modal.open())} class="bg-red-500 text-lg font-semibold px-12 py-3 rounded-lg w-max uppercase">CONNECT</button>

        {store.network && store.address && (
          <>
            <p class="text-xl">Network: <span class="font-semibold">{store.network}</span></p>
            <p class="text-xl">Address: <span class="font-semibold">{store.address}</span></p>
          </>
        )}

        {store.connected && (
          <p class="text-green-500">You're connected</p>
        )}
      </div>
    </div >
  );
});

// Currently configured for Sepolia, Ethereum Mainnet and Polygon Mainnet 

function getChainName(chainId: number | undefined) {
  if (!chainId) {
    return 'Unknown'
  }

  const chain = chains.find(chain => chain.chainId === chainId)

  if (!chain) {
    return 'Unknown'
  }

  return chain.name
}