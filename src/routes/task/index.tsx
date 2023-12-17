import { $, component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { chains, modal, wagmiConfig } from '~/utils/modal';

type Store = {
  network: string | undefined;
  address: string | undefined;
  connected: boolean;
  mounting: boolean;
}

export default component$(() => {
  const store = useStore<Store>({
    network: undefined,
    address: undefined,
    connected: false,
    mounting: true,
  })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!wagmiConfig.data) {
      return;
    }

    store.network = getChainName(wagmiConfig.data.chain?.id);
    store.address = wagmiConfig.data.account;
    store.connected = wagmiConfig.data.account ? true : false;
    store.mounting = false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modal.subscribeEvents(_ => {
      if (!wagmiConfig.data || !wagmiConfig.data.chain) {
        store.connected = false;
        return;
      }

      store.network = getChainName(wagmiConfig.data.chain.id);
      store.address = wagmiConfig.data.account;
    })

    wagmiConfig.subscribe(event => {
      if (!event.data) {
        store.connected = false;
        return;
      }

      store.address = event.data.account;
      store.network = getChainName(event.data.chain?.id);
      store.connected = true;
    })
  })

  if (store.mounting) {
    return (
      <div class="gap-8 bg-black h-screen grid place-items-center">
        <p class="text-yellow-500 text-3xl">Loading...</p>
      </div>
    )
  }

  if (!store.connected) {
    return (
      <div class="gap-8 bg-black text-white h-screen grid place-items-center">
        <div class="space-y-4 flex flex-col justify-center items-center">
          <div class="flex flex-col items-center justify-center">
            <button onClick$={$(() => modal.open())} class="bg-red-500 text-lg font-semibold px-12 py-3 rounded-lg w-max uppercase">CONNECT</button>

            <p class="text-red-500 py-4 text-center">CONNECT YOUR WALLET TO INTERACT WITH APP</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="gap-8 bg-black text-white h-screen grid place-items-center">
      <div class="space-y-4 flex flex-col justify-center bg-[#0f0f0f] p-12 rounded-3xl">
        <button onClick$={$(() => modal.open())} class="bg-red-500 text-lg font-semibold px-12 py-3 rounded-lg w-max uppercase">OPEN MODAL</button>

        <p class="text-xl">Network: <span class="font-semibold">{store.network}</span></p>
        <p class="text-xl">Address: <span class="font-semibold">{store.address}</span></p>
      </div>
    </div>
  );
});

function getChainName(chainId: number | undefined) {
  if (!chainId) {
    return 'Unknown'
  }

  const chain = chains.find(chain => chain.id === chainId)

  if (!chain) {
    return 'Unknown'
  }

  return chain.name
}