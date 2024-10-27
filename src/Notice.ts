import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import { isServer } from 'solid-js/web';
export const Notice = isServer
    ? ({
          error() {},
          success() {},
          open() {},
      } as any as Notyf)
    : new Notyf();
