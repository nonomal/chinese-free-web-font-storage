export function originLink(e: Event) {
    e.preventDefault();
    /** @ts-ignore */
    window.location.href = e.currentTarget.href;
}
